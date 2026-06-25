import { notFound } from "next/navigation";
import Link from "next/link";
import { getCityById } from "@/lib/config/cities";
import { createClient } from "@/lib/supabase/server";
import { SalonHeroGallery } from "@/components/SalonHeroGallery";
import { Star, MapPin, Clock, CircleUser, Activity } from "lucide-react";

export default async function ProviderProfilePage({
  params,
}: {
  params: Promise<{ city: string; locality: string; provider_slug: string }>;
}) {
  const { city, locality, provider_slug } = await params;
  const cityProfile = getCityById(city);

  if (!cityProfile) notFound();

  // Dynamic parsing of provider slug
  const cleanSlug = provider_slug.replace(/[^a-z0-9]/g, ' ');
  const generatedName = cleanSlug.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  
  // Deterministic Hash for absolute uniqueness per city/locality/salon
  const hashStr = city + locality + provider_slug;
  const hash = hashStr.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);

  let detectedCategory = 'female';
  if (provider_slug.match(/barber|fade|blade|grooming|man|men|male|cut|shave|scissor|lounge|mane|alpha|kingsman/i)) {
    detectedCategory = 'male';
  } else if (provider_slug.match(/pet|paw|tail|dog|cat|vet|fluffy|bark|purrfect|snout|whisker|bow-wow|wagging/i)) {
    detectedCategory = 'pet';
  }

  // Dynamic color palettes for the 3D Viewer based on hash
  const femaleColors = ["#d4af37", "#ffb6c1", "#e6e6fa", "#98ff98", "#ff7f50"];
  const maleColors = ["#c89b3c", "#4a4a4a", "#8b0000", "#2f4f4f", "#4682b4"];
  const petColors = ["#7cb9e8", "#ffb347", "#77dd77", "#fdfd96", "#836953"];
  
  const themeColor = detectedCategory === 'male' ? maleColors[hash % maleColors.length] 
    : detectedCategory === 'pet' ? petColors[hash % petColors.length] 
    : femaleColors[hash % femaleColors.length];

  // Expanded Image Pools for High Combinatorial Uniqueness
  const femaleStaffImages = [
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1508214751196-bfd1432c4ce5?q=80&w=200&auto=format&fit=crop"
  ];
  
  const femalePortfolioBeforeAfter = [
    { cat: "Color Shift", b: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=600&auto=format&fit=crop", a: "https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=600&auto=format&fit=crop" },
    { cat: "Bridal", b: "https://images.unsplash.com/photo-1512413914421-4d3753549646?q=80&w=600&auto=format&fit=crop", a: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=600&auto=format&fit=crop" },
    { cat: "Keratin", b: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?q=80&w=600&auto=format&fit=crop", a: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=600&auto=format&fit=crop" },
    { cat: "Nail Art", b: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=600&auto=format&fit=crop", a: "https://images.unsplash.com/photo-1519014816548-bf5fe059e98b?q=80&w=600&auto=format&fit=crop" },
    { cat: "Blowout", b: "https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=600&auto=format&fit=crop", a: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=600&auto=format&fit=crop" },
    { cat: "Extensions", b: "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?q=80&w=600&auto=format&fit=crop", a: "https://images.unsplash.com/photo-1560014022-3860bbdd57a9?q=80&w=600&auto=format&fit=crop" }
  ];

  const maleStaffImages = [
    "https://images.unsplash.com/photo-1618077360395-f3068be8e001?q=80&w=200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?q=80&w=200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop"
  ];

  const malePortfolioBeforeAfter = [
    { cat: "Sharp Fade", b: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=80&w=600&auto=format&fit=crop", a: "https://images.unsplash.com/photo-1593702275687-f8b402bf1fb5?q=80&w=600&auto=format&fit=crop" },
    { cat: "Beard Sculpt", b: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=600&auto=format&fit=crop", a: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=600&auto=format&fit=crop" },
    { cat: "Pompadour", b: "https://images.unsplash.com/photo-1584043720379-b56bf917b69f?q=80&w=600&auto=format&fit=crop", a: "https://images.unsplash.com/photo-1620331317312-747069dc2a11?q=80&w=600&auto=format&fit=crop" },
    { cat: "Color Shift", b: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=600&auto=format&fit=crop", a: "https://images.unsplash.com/photo-1618077360395-f3068be8e001?q=80&w=600&auto=format&fit=crop" },
    { cat: "Buzz Cut", b: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=80&w=600&auto=format&fit=crop", a: "https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=600&auto=format&fit=crop" }
  ];

  const petStaffImages = [
    "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=200&auto=format&fit=crop", // Woman holding dog
    "https://images.unsplash.com/photo-1537368910025-7028ba482386?q=80&w=200&auto=format&fit=crop", // Man grooming
    "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?q=80&w=200&auto=format&fit=crop", // Woman playing with dog
    "https://images.unsplash.com/photo-1517331156700-3c241d2b4d83?q=80&w=200&auto=format&fit=crop", // Cats
    "https://images.unsplash.com/photo-1522276498395-f4f68f7f8454?q=80&w=200&auto=format&fit=crop"  // Woman hugging dog
  ];

  const petPortfolioBeforeAfter = [
    { cat: "Full Groom", b: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=600&auto=format&fit=crop", a: "https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=600&auto=format&fit=crop" },
    { cat: "Summer Cut", b: "https://images.unsplash.com/photo-1597626133663-cb34ae92318d?q=80&w=600&auto=format&fit=crop", a: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=600&auto=format&fit=crop" },
    { cat: "Puppy's First", b: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=600&auto=format&fit=crop", a: "https://images.unsplash.com/photo-1537151608804-ea6f25dc7cd5?q=80&w=600&auto=format&fit=crop" },
    { cat: "Cat Bath", b: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=600&auto=format&fit=crop", a: "https://images.unsplash.com/photo-1495360010541-f48722b34f7d?q=80&w=600&auto=format&fit=crop" }
  ];

  const fNamesFemale = ["Aisha", "Priya", "Neha", "Zara", "Simran", "Riya", "Sneha", "Tanya"];
  const fNamesMale = ["Rahul", "Vikram", "Arjun", "Sameer", "Daniel", "Marcus", "Kabir", "Leo"];
  const lInitials = ["M.", "S.", "K.", "A.", "R.", "D.", "T.", "V."];
  const femaleRoles = ["Senior Stylist", "Color Specialist", "Nail Tech", "Makeup Artist", "Balayage Expert"];
  const maleRoles = ["Master Barber", "Senior Barber", "Stylist", "Grooming Expert", "Fade Specialist"];
  const petRoles = ["Pet Stylist", "Junior Groomer", "Cat Groomer", "Senior Groomer", "Behaviorist"];
  
  // Deterministic shuffle logic so the 3 selected items are globally unique to this salon
  const getDynamicStaff = (imgPool: string[], fNames: string[], roles: string[], count: number) => {
    let result = [];
    for (let i = 0; i < count; i++) {
      const pHash = hash + (i * 137);
      result.push({
        id: i + 1,
        name: `${fNames[pHash % fNames.length]} ${lInitials[pHash % lInitials.length]}`,
        role: roles[pHash % roles.length],
        experience_years: (pHash % 10) + 2,
        expertise_tags: ["Top Rated"],
        image: imgPool[pHash % imgPool.length]
      });
    }
    return result;
  };

  const getDynamicPortfolios = (portPool: any[], count: number) => {
    let result = [];
    for (let i = 0; i < count; i++) {
      const pHash = hash + (i * 97);
      const sel = portPool[pHash % portPool.length];
      result.push({
        id: i + 1,
        category: sel.cat,
        beforeImg: sel.b,
        afterImg: sel.a,
        desc: "Stunning Transformation"
      });
    }
    return result;
  };

  const mockDb = {
    female: {
      desc: "Premium beauty treatments and specialized female grooming services.",
      services: [
        { id: 1, name: "Signature Haircut & Style", duration_mins: 45, price: 1200 },
        { id: 2, name: "Keratin Treatment Pro", duration_mins: 120, price: 5000 },
      ],
      staff: getDynamicStaff(femaleStaffImages, fNamesFemale, femaleRoles, 2),
      portfolios: getDynamicPortfolios(femalePortfolioBeforeAfter, 2)
    },
    male: {
      desc: "Elite men's grooming, sharp fades, and precision beard sculpting.",
      services: [
        { id: 1, name: "Precision Fade Haircut", duration_mins: 30, price: 600 },
        { id: 2, name: "Hot Towel Shave & Beard Trim", duration_mins: 45, price: 850 },
      ],
      staff: getDynamicStaff(maleStaffImages, fNamesMale, maleRoles, 2),
      portfolios: getDynamicPortfolios(malePortfolioBeforeAfter, 2)
    },
    pet: {
      desc: "Luxury grooming spa for your furry companions.",
      services: [
        { id: 1, name: "Full Grooming Package", duration_mins: 90, price: 1500 },
        { id: 2, name: "Deshedding & Bath", duration_mins: 60, price: 900 },
      ],
      staff: getDynamicStaff(petStaffImages, fNamesFemale, petRoles, 2), // Pets use female names generally
      portfolios: getDynamicPortfolios(petPortfolioBeforeAfter, 2)
    }
  };

  const catData = mockDb[detectedCategory as keyof typeof mockDb];

  const p = {
    name: generatedName,
    description: catData.desc,
    address: `123 Elite Ave, ${locality.replace("-", " ")}, ${cityProfile.name}`,
    rating: 4.9,
    status: "moderate", // low, moderate, busy, very_busy
    estimated_wait_mins: 15,
    type: detectedCategory === "pet" ? "pet grooming" : detectedCategory === "male" ? "barbershop" : "salon",
    services: catData.services,
    staff: catData.staff,
    portfolios: catData.portfolios,
    reviews: [
      { id: 1, rating: 5, comment: "Absolutely incredible experience. The ambiance is unmatched." }
    ]
  };

  const crowdStatusMap = {
    low: { text: "Low Crowd", icon: <Activity className="w-4 h-4" />, wait: "No wait", bg: "bg-green-100 dark:bg-green-900/30", textCol: "text-green-800 dark:text-green-400" },
    moderate: { text: "Moderate", icon: <Activity className="w-4 h-4" />, wait: `${p.estimated_wait_mins} min wait`, bg: "bg-amber-100 dark:bg-amber-900/30", textCol: "text-amber-800 dark:text-amber-400" },
    busy: { text: "Busy", icon: <Activity className="w-4 h-4" />, wait: `${p.estimated_wait_mins} min wait`, bg: "bg-orange-100 dark:bg-orange-900/30", textCol: "text-orange-800 dark:text-orange-400" },
    very_busy: { text: "Very Busy", icon: <Activity className="w-4 h-4" />, wait: `${p.estimated_wait_mins} min wait`, bg: "bg-red-100 dark:bg-red-900/30", textCol: "text-red-800 dark:text-red-400" },
  };

  const currentStatus = crowdStatusMap[p.status as keyof typeof crowdStatusMap] || crowdStatusMap.low;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-32">
      <nav className="text-sm font-medium text-muted-foreground mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <span>/</span>
        <Link href={`/${city}`} className="hover:text-primary transition-colors capitalize">{cityProfile.name}</Link>
        <span>/</span>
        <Link href={`/${city}/${locality}`} className="hover:text-primary transition-colors capitalize">{locality.replace("-", " ")}</Link>
        <span>/</span>
        <span className="text-foreground">{p.name}</span>
      </nav>

      {/* Hero Gallery Grid */}
      <div className="mb-12">
        <SalonHeroGallery category={detectedCategory} salonName={generatedName} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          
          {/* Header Info & Crowd Intelligence */}
          <div className="space-y-4 border-b border-border pb-8">
            <div className="flex justify-between items-start">
              <h1 className="text-4xl md:text-5xl font-bold">{p.name}</h1>
              <div className="text-right">
                <div className={`px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 ${currentStatus.bg} ${currentStatus.textCol} inline-block mb-1`}>
                  {currentStatus.icon} {currentStatus.text}
                </div>
                <p className="text-xs text-muted-foreground font-bold">{currentStatus.wait}</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
              <span className="font-bold text-foreground flex items-center gap-1"><Star className="w-5 h-5 text-[#D4AF37] fill-[#D4AF37]" /> {p.rating} ({p.reviews.length} reviews)</span>
              <span>•</span>
              <span className="capitalize">{p.type}</span>
              <span>•</span>
              <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {p.address}</span>
            </div>
          </div>

          {/* Portfolio System: Transformations */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Transformations & Portfolio</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {p.portfolios.map((port) => (
                <div key={port.id} className="border border-border rounded-2xl overflow-hidden bg-card">
                  <div className="flex h-48">
                    <div className="w-1/2 relative group bg-cover bg-center border-r border-border" style={{ backgroundImage: `url(${port.beforeImg})` }}>
                      <span className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded backdrop-blur-sm font-bold">Before</span>
                    </div>
                    <div className="w-1/2 relative group bg-cover bg-center" style={{ backgroundImage: `url(${port.afterImg})` }}>
                      <span className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded backdrop-blur-sm font-bold">After</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold">{port.category}</h4>
                    <p className="text-sm text-muted-foreground">{port.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stylist Booking System */}
          <div className="space-y-6 border-t border-border pt-12">
            <h2 className="text-3xl font-bold">Book a Specific Stylist</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {p.staff.map((stylist) => (
                <div key={stylist.id} className="flex gap-4 p-4 border border-border rounded-2xl bg-card">
                  <div className="w-20 h-20 rounded-full bg-cover bg-center shrink-0 border-2 border-primary/20" style={{ backgroundImage: `url(${stylist.image})` }}></div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg">{stylist.name}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{stylist.role} • {stylist.experience_years} Yrs Exp</p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {stylist.expertise_tags.map(tag => (
                        <span key={tag} className="text-xs bg-muted px-2 py-1 rounded font-medium">{tag}</span>
                      ))}
                    </div>
                    <Link href="/checkout">
                      <button className="w-full py-2 border border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-lg font-bold transition-all text-sm">
                        Book {stylist.name.split(' ')[0]}
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* General Services Booking */}
          <div className="space-y-6 border-t border-border pt-12">
            <h2 className="text-3xl font-bold">General Booking</h2>
            <p className="text-muted-foreground">Book the salon directly (Any available stylist will be assigned).</p>
            <div className="space-y-4">
              {p.services.map((service: any) => (
                <div key={service.id} className="flex justify-between items-center p-6 border border-border rounded-2xl hover:border-primary/50 transition-colors bg-card">
                  <div>
                    <h3 className="text-xl font-bold mb-1">{service.name}</h3>
                    <p className="text-muted-foreground text-sm flex items-center gap-1"><Clock className="w-4 h-4" /> {service.duration_mins} mins</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold mb-2">₹{service.price}</p>
                    <Link href="/checkout">
                      <button className="px-6 py-2 bg-primary text-primary-foreground rounded-full font-bold transition-all hover:opacity-90">
                        Book Now
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-card border border-border rounded-3xl p-8 shadow-xl">
             {/* ... Booking Sidebar logic omitted for brevity, stays same ... */}
             <h3 className="text-2xl font-bold mb-6">Review & Checkout</h3>
             <p className="text-muted-foreground mb-4">Please select a service or stylist from the left to proceed.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
