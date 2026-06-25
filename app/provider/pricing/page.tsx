import Link from "next/link";

export default function PricingIntelligencePage() {
  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="text-3xl font-bold mb-2 tracking-tight">Pricing Intelligence</h1>
        <p className="text-muted-foreground">Compare your service rates against competitors in your area.</p>
      </div>

      <div className="bg-gradient-to-r from-amber-500/10 to-transparent border border-amber-500/20 rounded-3xl p-6 flex flex-col md:flex-row items-center gap-6 shadow-sm">
        <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/30 text-amber-600 rounded-full flex items-center justify-center text-3xl shrink-0">
          💡
        </div>
        <div>
          <h3 className="text-xl font-bold mb-1 text-amber-900 dark:text-amber-400">Premium Pricing Opportunity</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Your salon is rated <span className="font-bold text-foreground">4.8⭐</span>. Similar highly-rated salons in <span className="font-bold text-foreground">Bandra West</span> charge an average of <strong>₹2,500</strong> for a Haircut & Blowdry, but you are currently charging <strong>₹1,800</strong>. You could safely increase your price by 15-20% without impacting booking volume.
          </p>
        </div>
        <button className="px-6 py-2 bg-amber-500 text-white rounded-full font-bold whitespace-nowrap hover:bg-amber-600 transition-colors">
          Review Pricing
        </button>
      </div>

      <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-sm">
        <div className="p-6 border-b border-border bg-muted/30">
          <h2 className="text-xl font-bold">Service Benchmarks: Bandra West</h2>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border text-muted-foreground text-sm bg-muted/10">
              <th className="py-4 px-6 font-medium">Service Category</th>
              <th className="py-4 px-6 font-medium">Your Price</th>
              <th className="py-4 px-6 font-medium">Area Average</th>
              <th className="py-4 px-6 font-medium text-right">Variance</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            <tr className="border-b border-border/50 hover:bg-muted/30 transition-colors">
              <td className="py-5 px-6 font-bold flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-red-500"></span> Haircut & Blowdry</td>
              <td className="py-5 px-6 font-mono">₹1,800</td>
              <td className="py-5 px-6 font-mono text-muted-foreground">₹2,500</td>
              <td className="py-5 px-6 text-right font-bold text-red-500">-28%</td>
            </tr>
            <tr className="border-b border-border/50 hover:bg-muted/30 transition-colors">
              <td className="py-5 px-6 font-bold flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-green-500"></span> Keratin Treatment</td>
              <td className="py-5 px-6 font-mono">₹8,000</td>
              <td className="py-5 px-6 font-mono text-muted-foreground">₹7,500</td>
              <td className="py-5 px-6 text-right font-bold text-green-500">+6%</td>
            </tr>
            <tr className="border-b border-border/50 hover:bg-muted/30 transition-colors">
              <td className="py-5 px-6 font-bold flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-muted-foreground"></span> Bridal Makeup (Trial)</td>
              <td className="py-5 px-6 font-mono">₹5,000</td>
              <td className="py-5 px-6 font-mono text-muted-foreground">₹5,200</td>
              <td className="py-5 px-6 text-right font-bold text-muted-foreground">On Par</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Dynamic Technical Disclaimer */}
      <p className="text-center text-xs text-muted-foreground mt-16 pt-6 border-t border-border opacity-70">
        Pricing intelligence is derived by webscraping local competitor rates and utilizing dynamic AI demand models. BeautyVerse AI can make mistakes. Check important competitor info.
      </p>
    </div>
  );
}
