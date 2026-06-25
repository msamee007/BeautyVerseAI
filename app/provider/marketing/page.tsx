"use client";

import { useState } from "react";

export default function MarketingPage() {
  const [generating, setGenerating] = useState(false);
  const [postIdea, setPostIdea] = useState("");

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setPostIdea("✨ Glow up this weekend at The Grand Aesthetic Studio! 💅 Book a Keratin Spa today and get a complimentary Hair Trim. Limited slots available. Link in bio to secure your spot! 🌟 #MumbaiSalon #KeratinTreatment #GlowUp");
      setGenerating(false);
    }, 1500);
  };

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="text-3xl font-bold mb-2 tracking-tight">Marketing & Promotions</h1>
        <p className="text-muted-foreground">Fill empty slots and grow your audience with AI-powered campaigns.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Empty Slot Filler */}
        <div className="bg-card border border-border p-6 rounded-3xl space-y-6 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="text-3xl">⏰</span>
            <div>
              <h2 className="text-xl font-bold">Empty Slot Filler</h2>
              <p className="text-sm text-muted-foreground">You have 4 unbooked slots tomorrow.</p>
            </div>
          </div>
          
          <div className="bg-primary/5 p-4 rounded-2xl border border-primary/20">
            <p className="font-bold text-primary mb-2">Suggested Campaign:</p>
            <p className="text-sm text-muted-foreground mb-4">"Last Minute 20% Off - Tomorrow 11 AM to 3 PM"</p>
            <button className="w-full bg-primary text-primary-foreground py-2 rounded-lg font-bold hover:opacity-90 transition-all">
              Broadcast to Nearby Users
            </button>
          </div>
          <p className="text-xs text-muted-foreground text-center">Broadcasts appear on the BeautyVerse AI Marketplace homepage for users within 5km.</p>
        </div>

        {/* AI Social Media Generator */}
        <div className="bg-card border border-border p-6 rounded-3xl space-y-6 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="text-3xl">📸</span>
            <div>
              <h2 className="text-xl font-bold">Instagram Post Generator</h2>
              <p className="text-sm text-muted-foreground">Let our AI write your social copy.</p>
            </div>
          </div>

          <div className="space-y-3">
            <select className="w-full bg-muted border border-border p-3 rounded-xl text-sm outline-none">
              <option>Promote: Keratin Spa</option>
              <option>Promote: Bridal Package</option>
              <option>Promote: Weekend Haircut</option>
            </select>
            <button 
              onClick={handleGenerate}
              className="w-full border border-primary text-primary py-2 rounded-lg font-bold hover:bg-primary hover:text-primary-foreground transition-all"
            >
              {generating ? "Generating..." : "Generate Caption"}
            </button>
          </div>

          {postIdea && (
            <div className="bg-muted p-4 rounded-xl border border-border mt-4 relative">
              <p className="text-sm text-foreground pr-8">{postIdea}</p>
              <button 
                className="absolute top-4 right-4 text-muted-foreground hover:text-primary"
                title="Copy to clipboard"
                onClick={() => navigator.clipboard.writeText(postIdea)}
              >
                📋
              </button>
            </div>
          )}
        </div>

      </div>

      <div className="mt-8 border-t border-border pt-8">
        <h2 className="text-xl font-bold mb-4">Active Campaigns</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border text-muted-foreground text-sm">
              <th className="pb-3 font-medium">Campaign Name</th>
              <th className="pb-3 font-medium">Type</th>
              <th className="pb-3 font-medium">Status</th>
              <th className="pb-3 font-medium text-right">Bookings Generated</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            <tr className="border-b border-border/50">
              <td className="py-4 font-bold">Monsoon Frizz-Free</td>
              <td className="py-4 text-muted-foreground">Marketplace Banner</td>
              <td className="py-4"><span className="px-2 py-1 bg-green-500/10 text-green-600 rounded text-xs font-bold">Active</span></td>
              <td className="py-4 text-right font-bold text-primary">12</td>
            </tr>
            <tr>
              <td className="py-4 font-bold">Bridal Early Bird</td>
              <td className="py-4 text-muted-foreground">Notification Push</td>
              <td className="py-4"><span className="px-2 py-1 bg-muted rounded text-xs font-bold text-muted-foreground">Draft</span></td>
              <td className="py-4 text-right font-bold text-primary">-</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Dynamic Technical Disclaimer */}
      <p className="text-center text-xs text-muted-foreground mt-16 pt-6 border-t border-border opacity-70">
        Social media copy and promotional suggestions are generated by AI. Live marketing data is synced via API. BeautyVerse AI can make mistakes. Always review campaigns before publishing.
      </p>
    </div>
  );
}
