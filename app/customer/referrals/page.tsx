"use client";

import { useState } from "react";

export default function ReferralsPage() {
  const referralCode = "PRIYA250";
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl space-y-12">
      <div>
        <h1 className="text-4xl font-bold mb-4">Invite Friends & Earn</h1>
        <p className="text-xl text-muted-foreground">Give ₹250, Get ₹250. Grow the BeautyVerse community.</p>
      </div>

      <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-3xl p-8 text-white flex flex-col md:flex-row items-center justify-between shadow-2xl">
        <div className="mb-6 md:mb-0">
          <h2 className="text-3xl font-bold mb-2">Your Referral Code</h2>
          <p className="text-pink-100 mb-6">Share this code to give your friends ₹250 off their first premium booking.</p>
          
          <div className="flex items-center gap-4 bg-white/20 p-2 rounded-xl backdrop-blur-md w-fit">
            <span className="font-mono text-2xl font-bold tracking-widest pl-4 pr-2">{referralCode}</span>
            <button 
              onClick={copyCode}
              className="bg-white text-purple-700 px-4 py-2 rounded-lg font-bold hover:bg-pink-50 transition-colors"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
        <div className="w-48 h-48 bg-white/10 rounded-full flex items-center justify-center border-4 border-white/20">
          <div className="text-center">
            <span className="text-4xl block mb-1">🎁</span>
            <span className="font-bold">Rewards</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Total Invites Sent", value: "12", icon: "📬" },
          { label: "Successful Signups", value: "4", icon: "👥" },
          { label: "Wallet Credits Earned", value: "₹1000", icon: "💰", highlight: true },
        ].map((stat, i) => (
          <div key={i} className={`p-6 rounded-3xl border ${stat.highlight ? 'bg-primary/5 border-primary/30' : 'bg-card border-border'}`}>
            <span className="text-3xl mb-4 block">{stat.icon}</span>
            <h3 className="text-lg text-muted-foreground font-medium mb-1">{stat.label}</h3>
            <p className={`text-4xl font-bold ${stat.highlight ? 'text-primary' : ''}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-card border border-border rounded-3xl p-8">
        <h3 className="text-2xl font-bold mb-6">Referral Progress</h3>
        <div className="space-y-4">
          {[
            { friend: "Sneha R.", status: "Completed First Booking", reward: "+₹250", color: "text-green-600" },
            { friend: "Anjali K.", status: "Signed Up", reward: "Pending Booking", color: "text-amber-500" },
            { friend: "Riya M.", status: "Completed First Booking", reward: "+₹250", color: "text-green-600" },
          ].map((ref, i) => (
            <div key={i} className="flex justify-between items-center p-4 border border-border rounded-xl">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center font-bold">{ref.friend[0]}</div>
                <div>
                  <p className="font-bold">{ref.friend}</p>
                  <p className="text-sm text-muted-foreground">{ref.status}</p>
                </div>
              </div>
              <span className={`font-bold ${ref.color}`}>{ref.reward}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
