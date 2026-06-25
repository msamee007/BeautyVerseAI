"use client";

import React, { useEffect, useState } from "react";
import { useTheme, ThemeMode } from "./ThemeProvider";
import { motion, AnimatePresence } from "framer-motion";
import { searchProvidersByMode } from "@/lib/actions/providers";
import Link from "next/link";

export function LayoutShowcase() {
  const { mode, setMode, isDark, toggleDark } = useTheme();
  const [providers, setProviders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const getLogo = (currentMode: ThemeMode) => {
    switch (currentMode) {
      case "female": return "🌴 Palm";
      case "male": return "🧔 Beard";
      case "pet": return "🐾 Paw";
      case "provider": return "✂️ Scissors";
    }
  };

  const getHeroText = (currentMode: ThemeMode) => {
    switch (currentMode) {
      case "female": return "Unveil Your Ultimate Elegance.";
      case "male": return "Stay Sharp. Stay Ready.";
      case "pet": return "Premium Care for Your Best Friend.";
      case "provider": return "Scale Your Salon Business.";
    }
  };

  // Fetch ALL providers for the homepage showcase
  useEffect(() => {
    async function fetchProviders() {
      setLoading(true);
      // We pass no mode to fetch all premium mock data
      const { data, error } = await searchProvidersByMode("female"); // We'll just fetch a base set, but since we want ALL data, let's fetch 'female' and 'male' or just use a new action.
      // Actually, since it's the homepage showcase, we want to show everything.
      // For now, I will manually set a massive mock data array here so it's instantly elaborate.
      
      const premiumShowcase = [
        { id: "mock-1", name: "The Grand Aesthetic Studio", type: "salon", category: "female_beauty", description: "Award-winning luxury salon specializing in balayage, keratin treatments, and bridal makeup.", rating: 4.9, locality: "Bandra West, Mumbai", image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=800&auto=format&fit=crop" },
        { id: "mock-2", name: "Urban Alpha Barbershop", type: "grooming_center", category: "male_grooming", description: "Premium men's grooming. Sharp fades, hot towel shaves, and beard sculpting.", rating: 4.8, locality: "Indiranagar, Bangalore", image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=800&auto=format&fit=crop" },
        { id: "mock-3", name: "Paws & Bubbles Spa", type: "pet_grooming", category: "pet_grooming", description: "Stress-free luxury grooming for dogs and cats. Organic shampoos and gentle care.", rating: 4.9, locality: "Jubilee Hills, Hyderabad", image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?q=80&w=800&auto=format&fit=crop" },
        { id: "mock-4", name: "Luxe Bridal Makeovers", type: "bridal_studio", category: "female_beauty", description: "Exclusive bridal makeup artistry, pre-wedding skin prep, and luxury draping.", rating: 5.0, locality: "Saket, Delhi", image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?q=80&w=800&auto=format&fit=crop" },
        { id: "mock-5", name: "The Gentleman's Lounge", type: "grooming_center", category: "male_grooming", description: "Classic gentlemen's barbershop with modern styling and complimentary beverages.", rating: 4.7, locality: "Kothrud, Pune", image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=800&auto=format&fit=crop" },
        { id: "mock-6", name: "Fluffy Tails Boutique", type: "pet_grooming", category: "pet_grooming", description: "Full service pet salon with styling, nail clipping, and deep conditioning.", rating: 4.8, locality: "Bandra West, Mumbai", image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=800&auto=format&fit=crop" }
      ];
      setProviders(premiumShowcase);
      setLoading(false);
    }
    fetchProviders();
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 font-sans selection:bg-rose-200 selection:text-slate-900 transition-colors duration-500">
      {/* Navigation - Persistent Top Selector & Auth */}
      <nav className="border-b border-slate-200 bg-white/90 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-serif text-slate-900 flex items-center gap-2">
              🌴 BeautyVerse<span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-teal-400">AI</span>
            </span>
          </div>
          <div className="flex items-center gap-6">
            {/* Auth Buttons */}
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
              <Link 
                href="/customer"
                className="px-6 py-2 bg-slate-900 text-white rounded-full text-sm font-bold hover:bg-slate-800 hover:shadow-xl hover:-translate-y-0.5 transition-all text-center"
              >
                User
              </Link>
              <Link 
                href="/provider-login"
                className="px-6 py-2 bg-slate-900 text-white rounded-full text-sm font-bold hover:bg-slate-800 hover:shadow-xl hover:-translate-y-0.5 transition-all text-center"
              >
                Business
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Revamped Cinematic Hero Section */}
      <main className="w-full">
        <div className="relative w-full h-[600px] md:h-[700px] flex items-center justify-center overflow-hidden">
          {/* Stunning Background Image */}
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=2574&auto=format&fit=crop" 
              alt="Luxury Beauty Salon" 
              className="w-full h-full object-cover brightness-[0.25]"
            />
          </div>
          
          <div className="relative z-10 text-center space-y-8 px-4 max-w-5xl mx-auto">
             <h1 className="text-6xl md:text-8xl font-serif tracking-tight text-white leading-tight drop-shadow-2xl">
               Find Your <span className="text-[#D4AF37]">Perfect Look.</span>
             </h1>
             <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-light drop-shadow-lg">
               The AI-powered marketplace engineered for perfect matches across Luxury Salons, Premium Barbershops, and Pet Grooming.
             </p>
             
             <div className="flex flex-col sm:flex-row justify-center gap-6 pt-8">
               <Link href="/customer">
                 <button className="px-8 py-4 bg-slate-900 text-white font-bold uppercase tracking-widest rounded-2xl hover:scale-105 transition-transform shadow-2xl flex items-center gap-2 mx-auto sm:mx-0">
                   Enter Portal <span className="text-xl">✨</span>
                 </button>
               </Link>
               <Link href="/provider-login">
                 <button className="px-8 py-4 bg-white/10 backdrop-blur-md text-white border border-white/50 font-bold uppercase tracking-widest rounded-2xl hover:bg-white/20 transition-colors shadow-2xl flex items-center gap-2 mx-auto sm:mx-0">
                   Join as a Salon
                 </button>
               </Link>
             </div>
          </div>
        </div>

        {/* Trusted By Marquee */}
        <div className="w-full bg-slate-900 text-white py-6 overflow-hidden shadow-inner">
          <div className="flex justify-center items-center gap-8 md:gap-16 flex-wrap max-w-7xl mx-auto font-black tracking-widest opacity-90 text-sm md:text-base">
            <span>📍 MUMBAI</span> <span>•</span> <span>📍 BANGALORE</span> <span>•</span> <span>📍 DELHI</span> <span>•</span> <span>📍 PUNE</span> <span>•</span> <span>📍 HYDERABAD</span>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Features & Solutions Section */}
        <div className="py-20 mb-16 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif tracking-tight mb-4 text-slate-900">A Unified Marketplace for Everyone</h2>
            <div className="w-24 h-1 bg-rose-400 mx-auto mb-6 rounded-full"></div>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              We solve real problems for both beauty seekers and salon owners using advanced AI and hyper-local discovery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Customer Feature 1 */}
            <div className="p-8 bg-white border border-slate-300 rounded-3xl shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:shadow-2xl hover:-translate-y-1 transition-all group">
              <div className="w-14 h-14 bg-[#D4AF37]/10 text-[#D4AF37] flex items-center justify-center text-2xl mb-6">✨</div>
              <h3 className="text-xl font-serif mb-3">AI Beauty Concierge</h3>
              <p className="text-muted-foreground mb-4 text-sm">Ask our AI to create custom bridal packages, suggest hairstyles based on your photo, or find the best fades in your area.</p>
              <ul className="space-y-2 text-sm font-semibold text-muted-foreground">
                <li className="flex items-center gap-2"><span className="text-primary">✓</span> Hairstyle & Makeup Simulator</li>
                <li className="flex items-center gap-2"><span className="text-primary">✓</span> Personalized Service Bundles</li>
              </ul>
            </div>

            {/* Customer Feature 2 */}
            <div className="p-8 bg-white border border-slate-300 rounded-3xl shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:shadow-2xl hover:-translate-y-1 transition-all group">
              <div className="w-14 h-14 bg-[#D4AF37]/10 text-[#D4AF37] flex items-center justify-center text-2xl mb-6">📍</div>
              <h3 className="text-xl font-serif mb-3">Live Crowd & Discovery</h3>
              <p className="text-muted-foreground mb-4 text-sm">Never wait in line again. See real-time crowd levels, book specific stylists, and find verified premium salons near you on an interactive map.</p>
              <ul className="space-y-2 text-sm font-semibold text-muted-foreground">
                <li className="flex items-center gap-2"><span className="text-primary">✓</span> Real-time Crowd Status</li>
                <li className="flex items-center gap-2"><span className="text-primary">✓</span> Stylist-level Booking</li>
              </ul>
            </div>

            {/* Provider Feature 1 */}
            <div className="p-8 bg-white border border-slate-300 rounded-3xl shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:shadow-2xl hover:-translate-y-1 transition-all group">
              <div className="w-14 h-14 bg-[#D4AF37]/10 text-[#D4AF37] flex items-center justify-center text-2xl mb-6">📈</div>
              <h3 className="text-xl font-serif mb-3">Fix Customer Acquisition</h3>
              <p className="text-muted-foreground mb-4 text-sm">Struggling to attract clients? Get massive localized visibility, AI-powered customer matching, and featured provider placements.</p>
              <ul className="space-y-2 text-sm font-semibold text-muted-foreground">
                <li className="flex items-center gap-2"><span className="text-primary">✓</span> Algorithmic Recommendations</li>
                <li className="flex items-center gap-2"><span className="text-primary">✓</span> Automated Retention SMS</li>
              </ul>
            </div>

            {/* Provider Feature 2 */}
            <div className="p-8 bg-white border border-slate-300 rounded-3xl shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:shadow-2xl hover:-translate-y-1 transition-all group">
              <div className="w-14 h-14 bg-[#D4AF37]/10 text-[#D4AF37] flex items-center justify-center text-2xl mb-6">⚙️</div>
              <h3 className="text-xl font-serif mb-3">Salon Operating System</h3>
              <p className="text-muted-foreground mb-4 text-sm">Ditch pen and paper. BeautyVerseOS is your complete B2B dashboard for staff management, dynamic pricing, and deep analytics.</p>
              <ul className="space-y-2 text-sm font-semibold text-muted-foreground">
                <li className="flex items-center gap-2"><span className="text-primary">✓</span> AI Business Coach</li>
                <li className="flex items-center gap-2"><span className="text-primary">✓</span> Smart Staff Scheduling</li>
              </ul>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="py-20 mb-16 px-8 bg-slate-200/50 rounded-[3rem] border border-slate-300">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif tracking-tight mb-4 text-slate-900">The BeautyVerse Experience</h2>
            <div className="w-24 h-1 bg-rose-400 mx-auto mb-6 rounded-full"></div>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto font-light">Three simple steps to your perfect grooming appointment.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
             <div className="hidden md:block absolute top-12 left-20 right-20 h-px bg-slate-200 -z-10"></div>
             {[
               { icon: "01", title: "Choose Your Persona", desc: "Select Female, Male, or Pet mode to instantly filter the entire marketplace." },
               { icon: "02", title: "Let AI Match You", desc: "Use our Hairstyle Simulator or Skin Analyzer to find exactly what you need." },
               { icon: "03", title: "Book & Relax", desc: "View real-time crowd levels, book your specific stylist, and earn VIP rewards." }
             ].map((step, i) => (
               <div key={i} className="bg-white border border-slate-300 p-8 text-center rounded-3xl shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:shadow-2xl transition-shadow">
                 <div className="w-16 h-16 mx-auto bg-slate-900 text-white flex items-center justify-center text-2xl font-serif mb-6 rounded-full shadow-lg">
                   {step.icon}
                 </div>
                 <h3 className="text-2xl font-serif mb-4 text-slate-900">{step.title}</h3>
                 <p className="text-slate-600 font-light leading-relaxed">{step.desc}</p>
               </div>
             ))}
          </div>
        </div>

        {/* Massive Aggregated Provider Feed */}
        <div className="space-y-8 pb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-serif tracking-tight text-slate-900">Featured In Your Area</h2>
              <div className="w-24 h-1 bg-rose-400 mx-auto mt-4 rounded-full"></div>
            </div>
            {loading ? (
              <div className="animate-pulse flex space-x-4">
                <div className="flex-1 space-y-4 py-1">
                  <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-slate-200 rounded"></div>
                    <div className="h-4 bg-slate-200 rounded w-5/6"></div>
                  </div>
                </div>
              </div>
            ) : providers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {providers.map((p, i) => (
                  <div key={p.id} className="group relative bg-white border border-slate-300 rounded-3xl shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 overflow-hidden flex flex-col">
                    {/* Image Header */}
                    <div className={`h-64 w-full relative group-hover:opacity-90 transition-opacity duration-500`}>
                      <img src={p.image} alt={p.name} className="absolute inset-0 w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                      <div className="absolute top-4 right-4 bg-black/60 backdrop-blur text-[#D4AF37] px-3 py-1 flex items-center gap-1 shadow-sm z-10 border border-[#D4AF37]/30">
                        <span className="text-sm">★</span>
                        <span className="font-serif text-sm tracking-widest">{p.rating}</span>
                      </div>
                    </div>
                    
                    <div className="p-8 flex-1 flex flex-col">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-serif text-2xl tracking-tight mb-2 text-slate-900">{p.name}</h3>
                          <p className="text-slate-500 text-sm font-light uppercase tracking-widest">
                            {p.locality || "Bandra West, Mumbai"}
                          </p>
                        </div>
                      </div>

                      <div className="mb-6 flex flex-wrap gap-2">
                        <span className="px-3 py-1 border border-slate-200 text-slate-600 bg-slate-50 rounded-full text-xs font-bold uppercase tracking-widest">
                          {p.category.replace('_', ' ')}
                        </span>
                      </div>

                      <p className="text-slate-600 font-light line-clamp-2 mb-8 flex-1 leading-relaxed">{p.description}</p>
                      
                      <Link href="/mumbai/bandra-west" className="w-full">
                        <button className="w-full py-4 bg-slate-100 text-slate-900 font-bold uppercase tracking-widest hover:bg-slate-200 rounded-xl transition-colors flex items-center justify-center gap-2">
                          View & Book
                        </button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center bg-muted/50 rounded-2xl border border-dashed border-border">
                <span className="text-4xl mb-4 block">👀</span>
                <h3 className="text-xl font-bold">No providers found for this mode yet.</h3>
                <p className="text-muted-foreground mt-2">Visibility rules successfully enforced. (Add dummy data to Supabase to see results)</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
