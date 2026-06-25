"use client";

import Link from "next/link";
import { ReactNode, useState } from "react";
import { useTheme, ThemeMode, MOCK_PROFILES } from "@/components/ThemeProvider";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function CustomerLayout({ children }: { children: ReactNode }) {
  const { mode, setMode, activeCity, setActiveCity, currentUser, setCurrentUser } = useTheme();
  const router = useRouter();
  const [isModeLoading, setIsModeLoading] = useState(false);
  const [isCityLoading, setIsCityLoading] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [loadingMode, setLoadingMode] = useState<ThemeMode>(mode);
  const [loadingCity, setLoadingCity] = useState(activeCity);

  const CITIES = [
    { id: "mumbai", name: "Mumbai" },
    { id: "bangalore", name: "Bangalore" },
    { id: "delhi", name: "Delhi" },
    { id: "pune", name: "Pune" },
    { id: "hyderabad", name: "Hyderabad" },
  ];

  const handleModeChange = (m: ThemeMode) => {
    if (m === mode) return;
    setLoadingMode(m);
    setIsModeLoading(true);
    
    setTimeout(() => {
      setMode(m);
      router.push('/customer');
      setTimeout(() => {
        setIsModeLoading(false);
      }, 300);
    }, 800);
  };

  const handleCityChange = (c: string) => {
    if (c === activeCity) return;
    setLoadingCity(c);
    setIsCityLoading(true);
    
    setTimeout(() => {
      setActiveCity(c);
      router.push('/customer');
      setTimeout(() => {
        setIsCityLoading(false);
      }, 300);
    }, 800);
  };

  const getModeEmoji = (m: ThemeMode) => {
    return m === 'female' ? '🌴' : m === 'male' ? '🧔' : '🐾';
  };

  const getCityEmoji = (c: string) => {
    switch(c) {
      case 'mumbai': return '🏙️'; // Gateway / Skyline
      case 'delhi': return '🏛️'; // India Gate
      case 'pune': return '🏰'; // Shaniwar Wada
      case 'hyderabad': return '🕌'; // Charminar
      case 'bangalore': return '🏢'; // Tech Parks / Vidhana Soudha
      default: return '📍';
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 flex relative">
      {/* Global Transition Overlays */}
      <AnimatePresence>
        {(isModeLoading || isCityLoading) && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background/90 backdrop-blur-xl flex flex-col items-center justify-center"
          >
            <motion.div
              animate={{ scale: [1, 1.5, 1], rotate: [0, 5, -5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="text-8xl mb-8"
            >
              {isModeLoading ? getModeEmoji(loadingMode) : getCityEmoji(loadingCity)}
            </motion.div>
            <h2 className="text-3xl font-bold font-serif text-primary">
              {isModeLoading ? `Switching to ${loadingMode.charAt(0).toUpperCase() + loadingMode.slice(1)} Mode...` : `Traveling to ${CITIES.find(c=>c.id===loadingCity)?.name}...`}
            </h2>
            <p className="text-muted-foreground mt-4 font-bold">Personalizing your experience</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar Navigation */}
      <aside className="w-64 bg-card border-r border-border hidden md:flex flex-col h-screen sticky top-0">
        <div className="p-6 border-b border-border">
          <Link href="/" className="text-2xl font-bold font-serif text-primary hover:opacity-80 transition-opacity">My Account</Link>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {[
            { name: "Dashboard", icon: "📊", href: "/customer" },
            { name: "My Bookings", icon: "📅", href: "/customer/bookings" },
            { name: "Saved Salons", icon: "❤️", href: "/customer/saved" },
            { name: "AI Consultations", icon: "✨", href: "/customer/consultations" },
            { name: "Wallet & Offers", icon: "👛", href: "/customer/wallet" },
            { name: "Settings", icon: "⚙️", href: "/customer/settings" },
          ].map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground transition-all font-medium"
            >
              <span className="text-xl">{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-border">
          <Link href="/" className="block text-center w-full py-2 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 rounded-lg font-bold hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors">
            Logout
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-8 sticky top-0 z-[60]">
          {/* Mode Selector for Customer Portal */}
          <div className="flex bg-muted p-1 rounded-lg">
            {(["female", "male", "pet"] as ThemeMode[]).map((m) => (
              <button
                key={m}
                onClick={() => handleModeChange(m)}
                className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-all duration-300 capitalize ${
                  mode === m ? "bg-background text-foreground shadow-sm ring-1 ring-border" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {m === 'female' ? '🌴 Female' : m === 'male' ? '🧔 Male' : '🐾 Pet'}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {/* City Selector injected into Navbar */}
            <div className="flex bg-muted/50 p-1 rounded-lg border border-border">
              {CITIES.map((city) => (
                <button
                  key={city.id}
                  onClick={() => handleCityChange(city.id)}
                  className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all duration-300 ${
                    activeCity === city.id 
                      ? "bg-primary text-primary-foreground shadow-md" 
                      : "text-muted-foreground hover:bg-background hover:text-foreground"
                  }`}
                >
                  {city.name}
                </button>
              ))}
            </div>

            <div className="relative border-l border-border pl-4">
              <button 
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center gap-3 text-left focus:outline-none group"
              >
                <div>
                  <p className="text-sm font-bold group-hover:text-primary transition-colors">{currentUser.name}</p>
                  <p className="text-xs text-muted-foreground">{currentUser.subtitle}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold shadow-sm group-hover:scale-105 transition-transform">
                  {currentUser.initials}
                </div>
              </button>
              
              <AnimatePresence>
                {isProfileDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-3 w-64 bg-white border border-slate-100 rounded-2xl shadow-2xl overflow-hidden py-2 z-[100]"
                  >
                    <div className="px-4 py-2 border-b border-border mb-2">
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Switch Profile</p>
                    </div>
                    {MOCK_PROFILES.map(profile => (
                      <button
                        key={profile.id}
                        onClick={() => {
                          setCurrentUser(profile);
                          setIsProfileDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3 flex items-center gap-3 transition-colors hover:bg-slate-50 ${
                          currentUser.id === profile.id ? 'bg-primary/5' : ''
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                          currentUser.id === profile.id ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                        }`}>
                          {profile.initials}
                        </div>
                        <div>
                          <p className={`text-sm font-bold ${currentUser.id === profile.id ? 'text-primary' : 'text-foreground'}`}>
                            {profile.name}
                          </p>
                          <p className="text-xs text-muted-foreground">{profile.subtitle}</p>
                        </div>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
