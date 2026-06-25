"use client";

import { useTheme } from "@/components/ThemeProvider";

export default function WalletPage() {
  const { mode } = useTheme();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h1 className="text-3xl font-bold">Wallet & Offers 👛</h1>

      {/* Wallet Balance Card */}
      <div className="bg-gradient-to-r from-primary to-blue-500 rounded-3xl p-8 text-primary-foreground relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
        <div className="relative z-10">
          <p className="text-primary-foreground/80 font-semibold mb-2 tracking-widest uppercase text-sm">Available Balance</p>
          <h2 className="text-6xl font-extrabold mb-6">₹1,240</h2>
          <div className="flex gap-4">
            <button className="bg-background text-foreground px-6 py-2 rounded-full font-bold hover:opacity-90 transition-opacity">Add Money</button>
            <button className="bg-primary-foreground/20 text-primary-foreground px-6 py-2 rounded-full font-bold border border-primary-foreground/30 hover:bg-primary-foreground/30 transition-colors">View History</button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Active Offers */}
        <div className="bg-card border border-border rounded-3xl p-6">
          <h3 className="text-xl font-bold mb-6">Active Offers</h3>
          <div className="space-y-4">
            {(mode === 'male' ? [
              { title: "20% Off Premium Fades", code: "FADE20", validity: "Valid till Oct 30" },
              { title: "Flat ₹500 Off Grooming Bundles", code: "GROOM500", validity: "Valid till Nov 15" },
              { title: "10% Cashback on HDFC Cards", code: "HDFC10", validity: "Valid till Dec 31" }
            ] : mode === 'pet' ? [
              { title: "Flat ₹200 Off Full Grooming", code: "PAWS200", validity: "Valid till Oct 30" },
              { title: "10% Cashback on Tick Treatments", code: "TICK10", validity: "Valid till Nov 15" },
              { title: "Free Pet Toy with First Spa", code: "FREETOY", validity: "Valid till Dec 31" }
            ] : [
              { title: "20% Off Premium Spas", code: "RELAX20", validity: "Valid till Oct 30" },
              { title: "Flat ₹500 Off Bridal Makeup", code: "BRIDE500", validity: "Valid till Nov 15" },
              { title: "10% Cashback on HDFC Cards", code: "HDFC10", validity: "Valid till Dec 31" }
            ]).map((offer, i) => (
              <div key={i} className="flex justify-between items-center p-4 border border-border border-dashed rounded-xl bg-muted/20">
                <div>
                  <p className="font-bold text-lg">{offer.title}</p>
                  <p className="text-sm text-muted-foreground">{offer.validity}</p>
                </div>
                <div className="text-right">
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-md font-mono font-bold tracking-widest block mb-2">{offer.code}</span>
                  <button className="text-xs font-bold hover:underline text-muted-foreground">Copy Code</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Loyalty Tier */}
        <div className="bg-card border border-border rounded-3xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Loyalty Tier</h3>
              <span className="bg-yellow-500/10 text-yellow-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">VIP Member</span>
            </div>
            
            <p className="text-muted-foreground mb-8">You are 1,450 points away from the Elite Tier. Keep booking to unlock exclusive perks and free priority styling!</p>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-bold">
                <span>VIP Tier</span>
                <span>Elite Tier</span>
              </div>
              <div className="w-full bg-muted rounded-full h-3">
                <div className="bg-yellow-500 h-3 rounded-full" style={{ width: '65%' }}></div>
              </div>
              <p className="text-right text-xs text-muted-foreground font-semibold mt-1">3,550 / 5,000 pts</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
