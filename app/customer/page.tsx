"use client";

import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { searchProvidersByMode } from "@/lib/actions/providers";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Map } from "lucide-react";

import { useTheme } from "@/components/ThemeProvider";

const DynamicMap = dynamic(() => import("@/components/LeafletMap"), { 
  ssr: false, 
  loading: () => <div className="w-full h-full bg-muted flex items-center justify-center animate-pulse rounded-3xl">Loading Map...</div>
});

export default function CustomerDashboardPage() {
  const { mode, activeCity, currentUser } = useTheme();
  const [providers, setProviders] = useState<any[]>([]);
  const [activeLocality, setActiveLocality] = useState("bandra-west");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const CITIES = [
    { id: "mumbai", name: "Mumbai", defaultLocality: "Bandra West", localities: ["Bandra West", "Juhu", "Andheri", "Colaba", "Powai"] },
    { id: "bangalore", name: "Bangalore", defaultLocality: "Indiranagar", localities: ["Indiranagar", "Koramangala", "HSR Layout", "Whitefield"] },
    { id: "delhi", name: "Delhi", defaultLocality: "Saket", localities: ["Saket", "Vasant Kunj", "Hauz Khas", "Connaught Place"] },
    { id: "pune", name: "Pune", defaultLocality: "Kothrud", localities: ["Kothrud", "Koregaon Park", "Viman Nagar", "Baner"] },
    { id: "hyderabad", name: "Hyderabad", defaultLocality: "Jubilee Hills", localities: ["Jubilee Hills", "Banjara Hills", "HITEC City", "Gachibowli"] }
  ];

  const currentCityData = CITIES.find(c => c.id === activeCity) || CITIES[0];

  useEffect(() => {
    // Reset locality when city changes
    setActiveLocality(currentCityData.defaultLocality);
  }, [activeCity]);

  useEffect(() => {
    async function fetchMapData() {
      // 1. Fetch from Supabase / Mock Backend
      const { data } = await searchProvidersByMode(mode === 'provider' ? 'female' : mode, activeCity, activeLocality);
      
      // 2. Fetch locally registered providers (Cross-App Sync)
      const localProviders = JSON.parse(localStorage.getItem("registered_providers") || "[]");
      const matchedLocal = localProviders.filter((p: any) => {
        const cityMatch = p.city.toLowerCase() === (CITIES.find(c => c.id === activeCity)?.name.toLowerCase() || "");
        const localityMatch = p.locality.toLowerCase().includes(activeLocality.toLowerCase());
        const modeMatch = mode === 'provider' || 
                         (mode === 'female' && (p.category === 'female_beauty' || p.category === 'bridal_studio')) ||
                         (mode === 'male' && p.category === 'male_grooming') ||
                         (mode === 'pet' && p.category === 'pet_grooming');
        return cityMatch && localityMatch && modeMatch;
      });

      if (data) {
        setProviders([...matchedLocal, ...data]);
      }
    }
    fetchMapData();
  }, [mode, activeCity, activeLocality]);
  const getModeData = () => {
    // Format locality for display (e.g. "Bandra West")
    const locName = activeLocality.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    
    // Deterministic hash to pick names based on city and locality
    const hashStr = activeCity + locName;
    const hash = hashStr.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);

    const getNames = (modeStr: string) => {
      if (modeStr === "male") {
        const prefixes = ["Urban", "Alpha", "Classic", "Prime", "Elite", "Royal", "Sharp", "Modern", "Iron", "Kingsman", "Rustic"];
        const suffixes = ["Barbers", "Lounge", "Fades", "Cuts", "Studio", "Grooming", "Clipper", "Mane", "Scissors", "Shave"];
        return [
          `${prefixes[hash % prefixes.length]} ${suffixes[(hash + 1) % suffixes.length]}`,
          `${prefixes[(hash + 2) % prefixes.length]} ${suffixes[(hash + 3) % suffixes.length]}`,
          `${prefixes[(hash + 4) % prefixes.length]} ${suffixes[(hash + 5) % suffixes.length]}`
        ];
      } else if (modeStr === "pet") {
        const prefixes = ["Paws", "Fluffy", "Happy", "Furry", "Bark", "Purrfect", "Snouts", "Luxury", "Bow Wow", "Wagging"];
        const suffixes = ["Spa", "Boutique", "Tails", "Retreat", "Grooming", "Whiskers", "Wash", "Salon"];
        return [
          `${prefixes[hash % prefixes.length]} ${suffixes[(hash + 1) % suffixes.length]}`,
          `${prefixes[(hash + 2) % prefixes.length]} ${suffixes[(hash + 3) % suffixes.length]}`,
          `${prefixes[(hash + 4) % prefixes.length]} ${suffixes[(hash + 5) % suffixes.length]}`
        ];
      } else {
        const prefixes = ["Grand", "Luxe", "Urban", "Elegance", "Velvet", "Aura", "Divine", "Radiance", "Crown", "Pure"];
        const suffixes = ["Aesthetic Studio", "Nail Bar", "Glow", "Hair Hub", "Rose Spa", "Beauty", "Makeovers", "Chic"];
        return [
          `${prefixes[hash % prefixes.length]} ${suffixes[(hash + 1) % suffixes.length]}`,
          `${prefixes[(hash + 2) % prefixes.length]} ${suffixes[(hash + 3) % suffixes.length]}`,
          `${prefixes[(hash + 4) % prefixes.length]} ${suffixes[(hash + 5) % suffixes.length]}`
        ];
      }
    };

    const names = getNames(mode);

    switch(mode) {
      case "male":
        return {
          upcoming: { title: "Today, 5:30 PM", salon: `${names[0]} • for ${currentUser.name.split(' ')[0]}`, services: ["Fade Haircut", "Hot Towel Shave"], qr: "BV-M7T9Q" },
          recent: [
            { date: "Oct 12, 2023", salon: names[1], service: "Beard Sculpting", price: "₹650" },
            { date: "Sep 05, 2023", salon: names[0], service: "Haircut & Wash", price: "₹850" }
          ],
          aiPrompt: `Based on your last "Fade Haircut", our AI suggests these grooming services to maintain your sharp look in ${CITIES.find(c=>c.id===activeCity)?.name}.`,
          recs: [
            { name: "Beard Trim & Shape", salon: names[0], match: "99%" },
            { name: "Charcoal Face Mask", salon: names[1], match: "95%" }
          ]
        };
      case "pet":
        return {
          upcoming: { title: "Tomorrow, 10:00 AM", salon: `${names[0]} • for ${currentUser.name.split(' ')[0]}`, services: ["Full Grooming", "Nail Trim"], qr: "BV-P4W1X" },
          recent: [
            { date: "Oct 12, 2023", salon: names[1], service: "Deshedding Treatment", price: "₹1200" },
            { date: "Sep 05, 2023", salon: names[0], service: "Basic Bath", price: "₹800" }
          ],
          aiPrompt: `Based on your dog's last "Full Grooming", our AI suggests these wellness add-ons for the changing season in ${CITIES.find(c=>c.id===activeCity)?.name}.`,
          recs: [
            { name: "Flea & Tick Treatment", salon: names[0], match: "97%" },
            { name: "Pawdicure", salon: names[1], match: "91%" }
          ]
        };
      case "female":
      default:
        return {
          upcoming: { title: "Today, 4:15 PM", salon: `${names[0]} • for ${currentUser.name.split(' ')[0]}`, services: ["Signature Haircut", "Keratin Pro"], qr: "BV-X9K2M" },
          recent: [
            { date: "Oct 12, 2023", salon: names[1], service: "Gel Manicure", price: "₹850" },
            { date: "Sep 05, 2023", salon: names[2], service: "HydraFacial", price: "₹3200" }
          ],
          aiPrompt: `Based on your last "Keratin Pro" booking, our AI suggests these maintenance services to keep your hair flawless in ${CITIES.find(c=>c.id===activeCity)?.name}.`,
          recs: [
            { name: "Post-Keratin Hair Spa", salon: names[0], match: "98%" },
            { name: "Root Touch-up", salon: names[2], match: "92%" }
          ]
        };
    }
  };

  const dynamicData = getModeData();

  // Orientation shift
  const isReversed = activeCity === "delhi" || activeCity === "pune";

  const getCityGradient = () => {
    switch(activeCity) {
      case "mumbai": return "from-pink-500/10 to-orange-500/5";
      case "bangalore": return "from-green-500/10 to-emerald-500/5";
      case "delhi": return "from-red-500/10 to-rose-500/5";
      case "pune": return "from-blue-500/10 to-indigo-500/5";
      case "hyderabad": return "from-yellow-500/10 to-amber-500/5";
      default: return "from-primary/10 to-primary/5";
    }
  };

  return (
    <div className="space-y-8 relative min-h-[500px]">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          Welcome back, {currentUser.name.split(' ')[0]}! <Sparkles className="w-8 h-8 text-primary" />
        </h1>
        <div className="relative inline-block z-50">
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <span className="text-muted-foreground text-sm flex items-center gap-1">📍 <span className="hidden sm:inline">Locality:</span></span>
            <span className="font-bold text-sm text-slate-800 capitalize ml-1">
              {activeLocality.replace('-', ' ')}
            </span>
            <svg className={`w-4 h-4 text-slate-500 transition-transform duration-200 ml-2 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="absolute right-0 mt-2 w-56 bg-white border border-slate-100 rounded-2xl shadow-2xl overflow-hidden py-2"
              >
                {currentCityData.localities.map(loc => (
                  <button
                    key={loc}
                    onClick={() => {
                      setActiveLocality(loc.toLowerCase().replace(/\s+/g, '-'));
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 text-sm font-medium transition-colors hover:bg-slate-50 flex items-center justify-between ${
                      activeLocality === loc.toLowerCase().replace(/\s+/g, '-') 
                        ? 'text-primary bg-primary/5' 
                        : 'text-slate-600'
                    }`}
                  >
                    {loc}
                    {activeLocality === loc.toLowerCase().replace(/\s+/g, '-') && (
                      <span className="w-2 h-2 rounded-full bg-primary"></span>
                    )}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Upcoming Booking Highlight */}
      <div className={`bg-gradient-to-r ${getCityGradient()} border border-primary/20 rounded-3xl p-8 relative overflow-hidden transition-all duration-700`}>
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
        <div className={`relative z-10 flex flex-col ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} justify-between items-center gap-8`}>
          <div className={isReversed ? "text-right" : ""}>
            <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4 inline-block">
              Upcoming Appointment
            </span>
            <h2 className="text-3xl font-bold mb-2">{dynamicData.upcoming.title}</h2>
            <p className="text-lg text-muted-foreground mb-4">{dynamicData.upcoming.salon}</p>
            <div className={`flex gap-2 ${isReversed ? 'justify-end' : ''}`}>
              {dynamicData.upcoming.services.map((srv, idx) => (
                <span key={idx} className="px-3 py-1 bg-card border border-border rounded-lg text-sm font-bold">{srv}</span>
              ))}
            </div>
          </div>
          <div className="bg-white p-3 rounded-2xl shadow-xl shrink-0">
            <QRCodeSVG value={`https://beautyverse.ai/verify/${dynamicData.upcoming.qr}`} size={120} />
            <p className="text-center text-xs font-bold text-gray-500 mt-2 tracking-widest">{dynamicData.upcoming.qr}</p>
          </div>
        </div>
      </div>

      <div className={`grid grid-cols-1 md:grid-cols-2 gap-8`}>
        {/* Past Bookings */}
        <div className={`bg-card border border-border rounded-3xl p-6 ${isReversed ? 'order-last' : ''}`}>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold">Recent Bookings</h3>
            <Link href="/customer/bookings" className="text-sm font-bold text-primary">View All</Link>
          </div>
          <div className="space-y-4">
            {dynamicData.recent.map((booking, i) => (
              <div key={i} className="flex justify-between items-center p-4 border border-border rounded-xl">
                <div>
                  <p className="font-bold">{booking.salon}</p>
                  <p className="text-sm text-muted-foreground">{booking.service} • {booking.date}</p>
                </div>
                <div className="text-right flex flex-col items-end justify-center">
                  <p className="font-bold">{booking.price}</p>
                  <Link href={`/${activeCity}/${activeLocality}/${booking.salon.toLowerCase().replace(/\s+/g, '-')}`}>
                    <button className="text-xs font-bold text-primary border border-primary px-4 py-1.5 rounded-lg mt-1 hover:bg-primary hover:text-white transition-colors">
                      Rebook
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="bg-card border border-border rounded-3xl p-6">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-6 h-6 text-primary" />
            <h3 className="text-xl font-bold">AI Recommendations for You</h3>
          </div>
          <p className="text-muted-foreground text-sm mb-6">{dynamicData.aiPrompt}</p>
          
          <div className="space-y-4">
            {dynamicData.recs.map((rec, i) => (
              <div key={i} className="flex justify-between items-center p-4 border border-border rounded-xl bg-muted/30">
                <div>
                  <p className="font-bold">{rec.name}</p>
                  <p className="text-sm text-muted-foreground">{rec.salon}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-green-600 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full mb-2 inline-block">
                    {rec.match} Match
                  </span>
                  <Link href={`/${activeCity}/${activeLocality}/${rec.salon.toLowerCase().replace(/\s+/g, '-')}`}>
                    <p className="text-sm font-bold text-primary hover:underline">Book</p>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Discovery Map Integration */}
      <div className="bg-card border border-border rounded-3xl p-6 mb-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Map className="w-6 h-6 text-primary" /> Local Salons in {CITIES.find(c => c.id === activeCity)?.name}
          </h3>
        </div>

        <div className="h-[400px] w-full rounded-2xl overflow-hidden border border-border">
          <DynamicMap 
            center={
              activeCity === "mumbai" ? [19.0760, 72.8777] :
              activeCity === "bangalore" ? [12.9716, 77.5946] :
              activeCity === "delhi" ? [28.6139, 77.2090] :
              activeCity === "pune" ? [18.5204, 73.8567] :
              [17.3850, 78.4867] // hyderabad
            } 
            providers={providers.map((p) => ({
              id: p.id,
              name: p.name,
              lat: (activeCity === "mumbai" ? 19.0760 : activeCity === "bangalore" ? 12.9716 : activeCity === "delhi" ? 28.6139 : activeCity === "pune" ? 18.5204 : 17.3850) + (Math.random() * 0.05 - 0.025),
              lng: (activeCity === "mumbai" ? 72.8777 : activeCity === "bangalore" ? 77.5946 : activeCity === "delhi" ? 77.2090 : activeCity === "pune" ? 73.8567 : 78.4867) + (Math.random() * 0.05 - 0.025),
              rating: p.rating,
              category: p.category.replace('_', ' '),
              city: activeCity,
              locality: activeLocality
            }))}
          />
        </div>
      </div>
    </div>
  );
}
