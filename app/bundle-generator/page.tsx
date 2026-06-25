"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Gift, Sparkles, Wand2, CheckCircle2, Check } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { useRouter } from "next/navigation";

export default function BundleGeneratorPage() {
  const router = useRouter();
  const { mode, activeCity } = useTheme();
  const [budget, setBudget] = useState("3000");
  const [loading, setLoading] = useState(false);
  const [bundle, setBundle] = useState<any>(null);
  const [isBooked, setIsBooked] = useState(false);

  const handleGenerate = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setBundle({
        name: mode === 'male' ? "The Alpha Grooming Package" : mode === 'pet' ? "Ultimate Spa Day for Paws" : "Bridal Glow Pre-Care",
        price: parseInt(budget) * 0.85,
        originalPrice: parseInt(budget),
        services: mode === 'male' ? ["Zero Fade Haircut", "Charcoal Facial", "Hot Towel Shave"] : 
                  mode === 'pet' ? ["Oatmeal Bath", "De-shedding", "Nail Clipping", "Ear Cleaning"] : 
                  ["HydraFacial", "Gel Manicure", "Hair Spa", "Threading"],
        savings: "15%"
      });
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/customer/consultations" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-bold">
          <ArrowLeft className="w-5 h-5" />
          Back to Dashboard
        </Link>
      </div>

      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
          Smart Bundle Generator <Gift className="w-10 h-10 text-primary" />
        </h1>
        <p className="text-xl text-muted-foreground">
          Enter your budget. Our AI negotiates with top {activeCity} salons to build the perfect package.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-card border border-border p-8 rounded-3xl shadow-sm space-y-8">
          <div>
            <label className="block font-bold mb-4 text-lg">What is your maximum budget?</label>
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-muted-foreground">₹</span>
              <input 
                type="number" 
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="flex-1 bg-muted p-4 rounded-xl text-2xl font-bold outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
          
          <div>
            <label className="block font-bold mb-4 text-lg">Preferred Vibe</label>
            <div className="flex flex-wrap gap-2">
              {["Luxury", "Fast & Efficient", "Relaxing Spa", "Clinical"].map(v => (
                <span key={v} className="px-4 py-2 bg-muted rounded-full text-sm font-bold cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                  {v}
                </span>
              ))}
            </div>
          </div>

          <button 
            onClick={handleGenerate}
            disabled={loading || !budget}
            className="w-full bg-foreground text-background py-4 rounded-xl font-bold text-lg hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? <Sparkles className="animate-spin w-6 h-6" /> : <Wand2 className="w-6 h-6" />}
            {loading ? "Negotiating with Salons..." : "Generate Magic Bundle"}
          </button>
        </div>

        <div className="bg-gradient-to-br from-primary/10 to-blue-500/10 border-2 border-primary/20 rounded-3xl p-8 relative overflow-hidden flex flex-col justify-center min-h-[400px]">
          {bundle ? (
            <div className="animate-in zoom-in-95 duration-500 relative z-10">
              <div className="absolute -top-4 -right-4 bg-red-500 text-white font-black px-4 py-2 rounded-full transform rotate-12 shadow-lg">
                SAVE {bundle.savings}!
              </div>
              <h3 className="text-2xl font-black mb-6 text-primary">{bundle.name}</h3>
              
              <div className="space-y-3 mb-8">
                {bundle.services.map((s: string, i: number) => (
                  <div key={i} className="flex items-center gap-3 bg-white/60 dark:bg-black/40 p-3 rounded-lg backdrop-blur-sm">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <span className="font-bold text-sm">{s}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-end gap-4 mb-6">
                <p className="text-5xl font-black">₹{bundle.price}</p>
                <p className="text-xl text-muted-foreground line-through font-bold pb-1">₹{bundle.originalPrice}</p>
              </div>

              <button 
                onClick={() => {
                  setIsBooked(true);
                  setTimeout(() => router.push("/customer/bookings"), 1500);
                }}
                disabled={isBooked}
                className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg flex items-center justify-center gap-2 transition-all ${
                  isBooked ? 'bg-green-500 text-white' : 'bg-primary text-primary-foreground hover:brightness-110'
                }`}
              >
                {isBooked ? (
                  <>
                    <Check className="w-6 h-6 animate-in zoom-in" />
                    Booked Successfully!
                  </>
                ) : (
                  "Book Bundle Now"
                )}
              </button>
            </div>
          ) : (
            <div className="text-center opacity-50">
              <Gift className="w-24 h-24 mx-auto mb-4" />
              <h3 className="text-xl font-bold">Your Bundle Awaits</h3>
              <p>Set your budget and preferences to let AI do the work.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
