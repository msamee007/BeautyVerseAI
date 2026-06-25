"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";

const CITIES = [
  "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata", "Pune", "Ahmedabad"
];

export default function ProviderLogin() {
  const router = useRouter();
  const [city, setCity] = useState("Mumbai");
  const [locality, setLocality] = useState("Bandra West");
  const [username, setUsername] = useState("");
  const [storeName, setStoreName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // AI Categorization Inference
    const lowerName = storeName.toLowerCase();
    let category = "female_beauty";
    if (lowerName.includes("barber") || lowerName.includes("fade") || lowerName.includes("grooming") || lowerName.includes("men")) {
      category = "male_grooming";
    } else if (lowerName.includes("paw") || lowerName.includes("pet") || lowerName.includes("tail") || lowerName.includes("dog")) {
      category = "pet_grooming";
    } else if (lowerName.includes("bridal") || lowerName.includes("wedding")) {
      category = "bridal_studio";
    }

    const newProvider = {
      id: `local-${Date.now()}`,
      name: storeName || "The Grand Aesthetic",
      type: "salon",
      category,
      description: "A newly registered premium partner on BeautyVerse AI.",
      rating: 5.0,
      locality: locality,
      city: city,
      image: "https://images.unsplash.com/photo-1521590832167-7bfc17484d20?q=80&w=800&auto=format&fit=crop",
      is_active: true
    };
    
    // Save globally to simulate backend sync
    const existing = JSON.parse(localStorage.getItem("registered_providers") || "[]");
    localStorage.setItem("registered_providers", JSON.stringify([newProvider, ...existing]));

    // Save to local storage to persist across the provider dashboard
    localStorage.setItem("provider_city", city);
    localStorage.setItem("provider_locality", locality);
    localStorage.setItem("provider_username", username || email.split('@')[0]);
    localStorage.setItem("provider_store", storeName || "The Grand Aesthetic");
    localStorage.setItem("provider_category", category);

    // Simulate auth delay
    setTimeout(() => {
      setLoading(false);
      router.push("/provider");
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3 pointer-events-none" />

      {/* Header */}
      <header className="p-6 relative z-10 flex justify-center">
        <Link href="/" className="font-serif text-3xl tracking-tighter text-primary">
          BeautyVerse<span className="text-foreground">OS</span>
        </Link>
      </header>

      {/* Login Form Container */}
      <main className="flex-1 flex items-center justify-center p-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-card/80 backdrop-blur-xl border border-border/50 rounded-3xl p-8 shadow-2xl"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-serif font-bold mb-2">Partner Login</h1>
            <p className="text-muted-foreground text-sm">Access your BeautyVerse AI Business Dashboard.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-foreground">City</label>
                <select 
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-background border border-border/50 rounded-xl px-4 py-3 outline-none focus:border-primary transition-colors text-sm"
                >
                  {CITIES.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-foreground">Locality</label>
                <input 
                  type="text" 
                  value={locality}
                  onChange={(e) => setLocality(e.target.value)}
                  placeholder="e.g. Bandra West"
                  required
                  className="w-full bg-background border border-border/50 rounded-xl px-4 py-3 outline-none focus:border-primary transition-colors text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-foreground">Your Name</label>
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Rahul K."
                  required
                  className="w-full bg-background border border-border/50 rounded-xl px-4 py-3 outline-none focus:border-primary transition-colors text-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-foreground">Store Name</label>
                <input 
                  type="text" 
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  placeholder="Luxe Salon"
                  required
                  className="w-full bg-background border border-border/50 rounded-xl px-4 py-3 outline-none focus:border-primary transition-colors text-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-foreground">Store ID / Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="owner@thegrandaesthetic.com"
                required
                className="w-full bg-background border border-border/50 rounded-xl px-4 py-3 outline-none focus:border-primary transition-colors text-sm"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-sm font-bold text-foreground">Password</label>
                <Link href="#" className="text-xs font-bold text-primary hover:underline">Forgot?</Link>
              </div>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-background border border-border/50 rounded-xl px-4 py-3 outline-none focus:border-primary transition-colors text-sm"
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-foreground text-background font-bold tracking-widest uppercase py-4 rounded-xl hover:bg-primary transition-colors mt-4 flex items-center justify-center h-14"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-background border-t-transparent rounded-full animate-spin"></div>
              ) : (
                "Access Dashboard"
              )}
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-8">
            Want to list your salon? <Link href="#" className="font-bold text-primary hover:underline">Apply Here</Link>
          </p>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="p-6 text-center relative z-10">
        <p className="text-xs text-muted-foreground opacity-70">
          BeautyVerse AI requires an approved partner license.
        </p>
      </footer>
    </div>
  );
}
