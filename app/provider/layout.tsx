"use client";

import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";

export default function ProviderLayout({ children }: { children: ReactNode }) {
  const [providerDetails, setProviderDetails] = useState({ username: "Owner", store: "Premium Salon", city: "Mumbai" });

  useEffect(() => {
    // Read from local storage (set during provider-login)
    const username = localStorage.getItem("provider_username");
    const store = localStorage.getItem("provider_store");
    const city = localStorage.getItem("provider_city");

    if (username || store || city) {
      setProviderDetails({
        username: username || "Owner",
        store: store || "Premium Salon",
        city: city || "Mumbai"
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-muted/30 flex">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-card border-r border-border flex flex-col hidden md:flex sticky top-0 h-screen">
        <div className="p-6 border-b border-border">
          <Link href="/provider" className="font-bold text-2xl tracking-tighter text-primary">BeautyVerse<span className="text-foreground">OS</span></Link>
          <p className="text-xs text-muted-foreground mt-1 font-mono uppercase tracking-widest">Salon Success Platform</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <Link href="/provider" className="block px-4 py-2 rounded-lg bg-primary/10 text-primary font-bold">Overview</Link>
          <div className="pt-4 pb-2">
            <p className="px-4 text-xs font-bold text-muted-foreground uppercase tracking-widest">Growth & Marketing</p>
          </div>
          <Link href="/provider/growth" className="block px-4 py-2 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">🧠 AI Business Coach</Link>
          <Link href="/provider/marketing" className="block px-4 py-2 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">📈 Marketing Assistant</Link>
          <Link href="/provider/pricing" className="block px-4 py-2 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">💰 Pricing Intelligence</Link>
          
          <div className="pt-4 pb-2">
            <p className="px-4 text-xs font-bold text-muted-foreground uppercase tracking-widest">Operations</p>
          </div>
          <Link href="/provider/analytics" className="block px-4 py-2 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">📊 Business Analytics</Link>
          <Link href="/provider/appointments" className="block px-4 py-2 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">📅 Appointments</Link>
          <Link href="/provider/staff" className="block px-4 py-2 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">✂️ Staff Management</Link>
          <Link href="/provider/reviews" className="block px-4 py-2 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">⭐ Reviews & Reputation</Link>
        </nav>
        <div className="p-4 border-t border-border">
          <Link href="/" className="block text-center w-full py-2 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 rounded-lg font-bold hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors">
            Logout
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        {/* Top Header */}
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-8 sticky top-0 z-10">
          <h1 className="font-bold text-xl">Dashboard</h1>
          <div className="flex items-center gap-6">
            <Link 
              href="/"
              className="hidden md:flex text-sm font-bold text-primary bg-primary/10 px-4 py-2 rounded-lg hover:bg-primary/20 transition-colors"
            >
              View Marketplace
            </Link>
            <div className="hidden md:flex flex-col items-end text-right">
              <p className="text-sm font-bold leading-none">{providerDetails.username}</p>
              <p className="text-xs text-muted-foreground mt-1">{providerDetails.store} • {providerDetails.city}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold bg-green-500/10 text-green-600 px-3 py-1 rounded-full border border-green-500/20">
                🟢 Online
              </span>
              <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center text-lg shadow-md border-2 border-primary/20">
                {providerDetails.username.charAt(0).toUpperCase()}
              </div>
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
