"use client";

import { useTheme } from "@/components/ThemeProvider";
import Link from "next/link";
import { Bot, Camera, MessageSquareText, ScanFace, Gift } from "lucide-react";

export default function ConsultationsPage() {
  const { mode, activeCity } = useTheme();
  const cityName = activeCity.charAt(0).toUpperCase() + activeCity.slice(1);
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h1 className="text-3xl font-bold flex items-center gap-3">
        AI Consultations <Bot className="w-8 h-8 text-primary" />
      </h1>
      <p className="text-muted-foreground">Powered by AI - Your personal beauty and grooming architect.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Simulator */}
        <div className="bg-card border border-border rounded-3xl p-6 hover:shadow-xl transition-all group">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-blue-500 rounded-2xl mb-6 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
            <Camera className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold mb-2">
            {mode === 'male' ? "AI Beard Simulator" : mode === 'pet' ? "Pet Breed Classifier" : "AI Hairstyle Simulator"}
          </h3>
          <p className="text-muted-foreground mb-6">
            {mode === 'male' ? `Upload a selfie and preview 20+ trending beard and hair fade styles popular in ${cityName}.` : 
             mode === 'pet' ? `Upload a photo of your pet and let our AI classify the breed and recommend coat-specific care for ${cityName} weather.` :
             `Upload a selfie and let our AI generate how you'd look with 20+ trending hairstyles and colors inspired by ${cityName} stylists.`}
          </p>
          <Link href="/consultation" className="block w-full">
            <button className="w-full py-3 bg-foreground text-background font-bold rounded-xl hover:bg-primary transition-colors">
              {mode === 'pet' ? "Scan Pet" : "Launch Simulator"}
            </button>
          </Link>
        </div>

        {/* Beauty Concierge */}
        <div className="bg-card border border-border rounded-3xl p-6 hover:shadow-xl transition-all group">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mb-6 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
            <MessageSquareText className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold mb-2">Beauty Concierge Chat</h3>
          <p className="text-muted-foreground mb-6">Tell our AI about your upcoming wedding, party, or date. It will build a custom beauty roadmap for you.</p>
          <Link href="/chat" className="block w-full">
            <button className="w-full py-3 bg-foreground text-background font-bold rounded-xl hover:bg-primary transition-colors">
              Start Chat
            </button>
          </Link>
        </div>

        {/* Skin Analysis */}
        <div className="bg-card border border-border rounded-3xl p-6 hover:shadow-xl transition-all group">
          <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-500 rounded-2xl mb-6 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
            <ScanFace className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold mb-2">AI Skin Analysis</h3>
          <p className="text-muted-foreground mb-6">Take a close-up photo. Our AI will analyze your skin type and recommend specific facials available near you.</p>
          <Link href="/skin-analysis" className="block w-full">
            <button className="w-full py-3 bg-foreground text-background font-bold rounded-xl hover:bg-primary transition-colors">
              Scan Face
            </button>
          </Link>
        </div>

        {/* Service Bundler */}
        <div className="bg-card border border-border rounded-3xl p-6 hover:shadow-xl transition-all group">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl mb-6 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
            <Gift className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold mb-2">Smart Bundle Generator</h3>
          <p className="text-muted-foreground mb-6">Input your budget and our AI will negotiate and bundle services across different premium salons for you.</p>
          <Link href="/bundle-generator" className="block w-full">
            <button className="w-full py-3 bg-foreground text-background font-bold rounded-xl hover:bg-primary transition-colors">
              Create Bundle
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
}
