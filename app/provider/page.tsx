"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function ProviderOverviewPage() {
  const isVerified = true;
  const [category, setCategory] = useState("bridal_studio"); 

  useEffect(() => {
    const cat = localStorage.getItem("provider_category");
    if (cat) setCategory(cat);
  }, []);

  const getDisplayCategory = (cat: string) => {
    switch(cat) {
      case "pet_grooming": return "Pet Groomer";
      case "male_grooming": return "Premium Barbershop";
      case "female_beauty": return "Beauty Salon";
      case "bridal_studio": return "Bridal Studio";
      default: return "Salon";
    }
  };

  return (
    <div className="space-y-8">
      {/* Verification Banner */}
      <div className={`p-6 rounded-2xl border flex items-center justify-between ${
        isVerified ? "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800" : "bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800"
      }`}>
        <div className="flex items-center gap-4">
          <span className="text-4xl">{isVerified ? "✅" : "⚠️"}</span>
          <div>
            <h3 className={`text-xl font-bold ${isVerified ? "text-green-800 dark:text-green-400" : "text-amber-800 dark:text-amber-400"}`}>
              {isVerified ? `Verified ${getDisplayCategory(category)}` : "Verification Pending"}
            </h3>
            <p className={isVerified ? "text-green-700 dark:text-green-500" : "text-amber-700 dark:text-amber-500"}>
              {isVerified ? "Your business license has been approved. You are receiving maximum marketplace visibility." : "Please upload your business license to get the Verified Badge and boost your ranking."}
            </p>
          </div>
        </div>
        {!isVerified && (
          <button className="px-6 py-2 bg-amber-500 text-white rounded-full font-bold hover:bg-amber-600 transition-colors">
            Upload License
          </button>
        )}
      </div>

      {/* Quick Analytics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Today's Appointments", value: "8", trend: "+2", color: "blue" },
          { label: "Revenue (MTD)", value: "₹45,200", trend: "+12%", color: "green" },
          { label: "Profile Views", value: "1,204", trend: "+24%", color: "purple" },
          { label: "Average Rating", value: "4.9", trend: "+0.1", color: "amber" },
        ].map((stat, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={stat.label} 
            className="p-6 bg-card border border-border rounded-2xl shadow-sm"
          >
            <p className="text-muted-foreground font-medium mb-2">{stat.label}</p>
            <div className="flex items-end justify-between">
              <h4 className="text-3xl font-bold">{stat.value}</h4>
              <span className={`text-sm font-bold text-${stat.color}-500 bg-${stat.color}-100 dark:bg-${stat.color}-900/30 px-2 py-1 rounded`}>
                {stat.trend}
              </span>
            </div>
          </motion.div>
        ))}
        {/* Loyalty & Retention Analytics */}
        <div className="md:col-span-4 bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-3xl p-6 flex items-center justify-between mt-4">
          <div>
            <h3 className="text-xl font-bold flex items-center gap-2">👑 Customer Loyalty Tracker</h3>
            <p className="text-muted-foreground text-sm mt-1">Your retention metrics are in the top 10% of your city.</p>
          </div>
          <div className="flex gap-8 text-right">
            <div>
              <p className="text-sm text-muted-foreground">Repeat Booking Rate</p>
              <p className="text-2xl font-bold text-primary">68%</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">VIP Customers</p>
              <p className="text-2xl font-bold text-amber-600">42</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Appointments Section */}
        <div className="bg-card border border-border rounded-3xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold">Upcoming Appointments</h3>
            <button className="text-primary text-sm font-bold">View Calendar</button>
          </div>
          <div className="space-y-4">
            {[
              { time: "2:00 PM", client: "Sneha R.", service: "Bridal Makeup Trial", status: "confirmed", isVip: true },
              { time: "3:30 PM", client: "Priya M.", service: "Keratin Spa", status: "pending", isVip: false },
              { time: "5:00 PM", client: "Anita K.", service: "Haircut & Color", status: "confirmed", isVip: true },
            ].map((apt, i) => (
              <div key={i} className="flex items-center justify-between p-4 border border-border rounded-xl hover:border-primary/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center font-bold text-muted-foreground">
                    {apt.client[0]}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold">{apt.client}</h4>
                      {apt.isVip && <span className="text-[10px] bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 px-2 py-0.5 rounded-full font-bold uppercase tracking-widest">VIP</span>}
                    </div>
                    <p className="text-sm text-muted-foreground">{apt.service}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold mb-1">{apt.time}</p>
                  <span className={`text-xs px-2 py-1 rounded-full font-bold uppercase ${
                    apt.status === 'confirmed' ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                  }`}>
                    {apt.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic Crowd Status Control */}
        <div className="bg-card border border-border rounded-3xl p-6">
          <h3 className="text-xl font-bold mb-2">Live Crowd Control</h3>
          <p className="text-muted-foreground mb-6">Update this so walk-in users know your current availability via the marketplace.</p>
          
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 border-2 border-green-500 bg-green-50 dark:bg-green-900/20 rounded-xl text-left">
              <span className="text-2xl mb-2 block">🟢</span>
              <h4 className="font-bold text-green-800 dark:text-green-400">Available</h4>
              <p className="text-xs text-green-700/70">Accepting walk-ins</p>
            </button>
            <button className="p-4 border border-border hover:border-amber-500 rounded-xl text-left transition-colors">
              <span className="text-2xl mb-2 block">🔴</span>
              <h4 className="font-bold">Busy</h4>
              <p className="text-xs text-muted-foreground">30+ min wait</p>
            </button>
            <button className="p-4 border border-border hover:border-gray-500 rounded-xl text-left transition-colors">
              <span className="text-2xl mb-2 block">⚫</span>
              <h4 className="font-bold">At Capacity</h4>
              <p className="text-xs text-muted-foreground">No walk-ins</p>
            </button>
            <button className="p-4 border border-border hover:border-gray-400 rounded-xl text-left transition-colors">
              <span className="text-2xl mb-2 block">⚪</span>
              <h4 className="font-bold">Closed</h4>
              <p className="text-xs text-muted-foreground">Off duty</p>
            </button>
          </div>
        </div>
      </div>

      {/* Dynamic Technical Disclaimer */}
      <p className="text-center text-xs text-muted-foreground mt-16 pt-6 border-t border-border opacity-70">
        This overview dashboard aggregates live data from all BeautyVerse AI modules. Predictive metrics are AI-generated. BeautyVerse AI can make mistakes. Check important info.
      </p>
    </div>
  );
}
