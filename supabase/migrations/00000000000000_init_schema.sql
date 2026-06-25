-- Enable PostGIS for geospatial queries (Searching for salons nearby)
CREATE EXTENSION IF NOT EXISTS postgis WITH SCHEMA extensions;

-- Set up custom types
CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'completed', 'cancelled');
CREATE TYPE provider_type AS ENUM ('salon', 'freelance', 'pet');
CREATE TYPE provider_category AS ENUM ('female_beauty', 'male_grooming', 'unisex', 'pet_grooming');
CREATE TYPE service_target_mode AS ENUM ('female', 'male', 'pet', 'unisex');
CREATE TYPE user_role AS ENUM ('customer', 'provider', 'admin');
CREATE TYPE crowd_status AS ENUM ('low', 'moderate', 'busy', 'very_busy');
CREATE TYPE appointment_status AS ENUM ('pending', 'confirmed', 'completed', 'cancelled');

-------------------------------------------------------------------
-- 1. PROFILES (Extends Supabase Auth Users)
-------------------------------------------------------------------
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  phone TEXT UNIQUE,
  avatar_url TEXT,
  role user_role DEFAULT 'customer' NOT NULL,
  preferences JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-------------------------------------------------------------------
-- 2. PROVIDERS (Salons, Freelancers)
-------------------------------------------------------------------
CREATE TABLE public.providers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  owner_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  type provider_type NOT NULL,
  category provider_category NOT NULL,
  description TEXT,
  city TEXT NOT NULL,
  locality TEXT NOT NULL,
  location geography(POINT) NOT NULL, -- PostGIS geospatial coordinate
  address TEXT NOT NULL,
  rating NUMERIC(3, 2) DEFAULT 0.0,
  is_active BOOLEAN DEFAULT false,
  is_verified BOOLEAN DEFAULT false,
  license_url TEXT,
  status crowd_status DEFAULT 'low',
  estimated_wait_mins INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Index for geospatial fast search
CREATE INDEX providers_geo_index ON public.providers USING GIST (location);
CREATE INDEX providers_city_locality_index ON public.providers (city, locality);
CREATE INDEX providers_slug_index ON public.providers (slug);

-------------------------------------------------------------------
-- 3. STAFF (Stylists, Groomers, Artists)
-------------------------------------------------------------------
CREATE TABLE public.staff (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  provider_id UUID REFERENCES public.providers(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  experience_years INTEGER DEFAULT 0,
  expertise_tags TEXT[] DEFAULT '{}',
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-------------------------------------------------------------------
-- 4. PORTFOLIOS (Transformations, Before/After)
-------------------------------------------------------------------
CREATE TABLE public.portfolios (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  provider_id UUID REFERENCES public.providers(id) ON DELETE CASCADE,
  staff_id UUID REFERENCES public.staff(id) ON DELETE SET NULL, -- Optional: Tie to specific staff
  title TEXT NOT NULL,
  description TEXT,
  before_image_url TEXT,
  after_image_url TEXT NOT NULL,
  category TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-------------------------------------------------------------------
-- 5. APPOINTMENTS (Booking Engine)
-------------------------------------------------------------------
CREATE TABLE public.appointments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  provider_id UUID REFERENCES public.providers(id) ON DELETE CASCADE,
  staff_id UUID REFERENCES public.staff(id) ON DELETE SET NULL, -- Optional: Stylist Booking
  service_names TEXT[] NOT NULL,
  total_price NUMERIC(10, 2) NOT NULL,
  appointment_date DATE NOT NULL,
  appointment_time TIME NOT NULL,
  status appointment_status DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- RLS
ALTER TABLE public.providers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view active providers" ON public.providers FOR SELECT USING (is_active = true OR auth.uid() = owner_id);
CREATE POLICY "Owners can manage their providers" ON public.providers FOR ALL USING (auth.uid() = owner_id);

-------------------------------------------------------------------
-- 3. SERVICES (Provider Menus)
-------------------------------------------------------------------
CREATE TABLE public.services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  provider_id UUID REFERENCES public.providers(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  duration_mins INTEGER NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  category TEXT NOT NULL,
  target_mode service_target_mode NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- RLS
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view services" ON public.services FOR SELECT USING (true);
CREATE POLICY "Providers can manage their services" ON public.services 
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.providers WHERE id = services.provider_id AND owner_id = auth.uid())
  );

-------------------------------------------------------------------
-- 4. STAFF (Stylists, Groomers)
-------------------------------------------------------------------
CREATE TABLE public.staff (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  provider_id UUID REFERENCES public.providers(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL, -- Optional linking to an auth user
  name TEXT NOT NULL,
  avatar_url TEXT,
  role TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- RLS
ALTER TABLE public.staff ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view staff" ON public.staff FOR SELECT USING (true);
CREATE POLICY "Providers can manage their staff" ON public.staff 
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.providers WHERE id = staff.provider_id AND owner_id = auth.uid())
  );

-------------------------------------------------------------------
-- 5. BOOKINGS
-------------------------------------------------------------------
CREATE TABLE public.bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  provider_id UUID REFERENCES public.providers(id) ON DELETE CASCADE,
  service_id UUID REFERENCES public.services(id) ON DELETE CASCADE,
  staff_id UUID REFERENCES public.staff(id) ON DELETE SET NULL,
  booking_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  status booking_status DEFAULT 'pending',
  total_price NUMERIC(10, 2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- RLS
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Customers can view their own bookings" ON public.bookings FOR SELECT USING (auth.uid() = customer_id);
CREATE POLICY "Providers can view their received bookings" ON public.bookings FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.providers WHERE id = bookings.provider_id AND owner_id = auth.uid())
);
CREATE POLICY "Customers can create bookings" ON public.bookings FOR INSERT WITH CHECK (auth.uid() = customer_id);

-------------------------------------------------------------------
-- 6. REVIEWS
-------------------------------------------------------------------
CREATE TABLE public.reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  booking_id UUID REFERENCES public.bookings(id) ON DELETE CASCADE UNIQUE,
  customer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  provider_id UUID REFERENCES public.providers(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  ai_sentiment TEXT, -- Generated by Gemini
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- RLS
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view reviews" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Customers can create reviews for their bookings" ON public.reviews FOR INSERT WITH CHECK (auth.uid() = customer_id);

-------------------------------------------------------------------
-- REALTIME SUBSCRIPTIONS
-------------------------------------------------------------------
-- Enable real-time for bookings (so salon dashboard updates instantly)
alter publication supabase_realtime add table public.bookings;
