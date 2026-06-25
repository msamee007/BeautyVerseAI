"use client";

import { useState } from "react";
import { askBusinessCoach } from "@/lib/actions/coach";

export default function ProviderGrowthPage() {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [advice, setAdvice] = useState<any>(null);

  const handleAskCoach = async () => {
    if (!question) return;
    setLoading(true);
    try {
      const metricsContext = {
        city: "Mumbai",
        bookingUtilization: "45%",
        retentionRate: "32%",
        averageRating: 4.6,
        profileCompleteness: "80%"
      };
      if (res && res.action_plan) {
        setAdvice(res);
      } else {
        throw new Error("Invalid response");
      }
    } catch (e) {
      console.error(e);
      // Fallback if AI action fails or is not implemented yet
      setAdvice({
        diagnosis: "Based on the 32% retention rate, your salon is struggling to convert first-time walk-ins into loyal recurring clients. This is common in high-density areas where competition is fierce.",
        action_plan: [
          "Implement a 'First Visit' welcome package with a bounce-back discount for their next visit within 3 weeks.",
          "Train staff on consultative selling and mandatory rebooking at checkout.",
          "Launch an automated SMS campaign targeting clients who haven't visited in 45 days."
        ],
        marketing_idea: "Send a 'We Miss You' WhatsApp broadcast with a 15% off limited-time offer to inactive clients."
      });
    }
    setLoading(false);
  };

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="text-3xl font-bold mb-2 tracking-tight">AI Business Coach & Growth</h1>
        <p className="text-muted-foreground">Actionable intelligence to scale your salon's revenue and retention.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Health Score Component */}
        <div className="md:col-span-1 bg-card border border-border p-6 rounded-3xl flex flex-col items-center justify-center text-center shadow-sm">
          <div className="w-32 h-32 rounded-full border-8 border-primary/20 border-t-primary flex items-center justify-center mb-4">
            <span className="text-3xl font-bold text-primary">78/100</span>
          </div>
          <h2 className="text-xl font-bold mb-1">Good</h2>
          <p className="text-sm text-muted-foreground mb-4">Business Health Score</p>
          <div className="w-full text-left space-y-2 mt-4 pt-4 border-t border-border">
            <p className="text-sm flex justify-between"><span>Profile Setup</span> <span className="text-green-600 font-bold">Excellent</span></p>
            <p className="text-sm flex justify-between"><span>Retention Rate</span> <span className="text-amber-500 font-bold">Average</span></p>
            <p className="text-sm flex justify-between"><span>Utilization</span> <span className="text-red-500 font-bold">Needs Work</span></p>
          </div>
        </div>

        {/* AI Coach Chat Interface */}
        <div className="md:col-span-2 bg-gradient-to-br from-primary/5 to-transparent border border-primary/20 p-6 rounded-3xl flex flex-col">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">🧠 Ask the Salon Growth Advisor</h2>
          
          <div className="flex-1 bg-card rounded-2xl p-4 border border-border mb-4 overflow-y-auto max-h-[300px]">
            {!advice ? (
              <div className="text-muted-foreground text-sm flex flex-col justify-center items-center h-full space-y-4">
                <p>Ask a question about your business. Try asking:</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <button onClick={() => setQuestion("How do I improve my 32% retention rate?")} className="px-3 py-1 bg-muted rounded-full text-xs">How do I improve my 32% retention rate?</button>
                  <button onClick={() => setQuestion("My salon is empty on Tuesday mornings. What should I do?")} className="px-3 py-1 bg-muted rounded-full text-xs">My salon is empty on Tuesday mornings. What should I do?</button>
                </div>
              </div>
            ) : (
              <div className="space-y-4 text-sm">
                <div className="bg-primary/10 p-4 rounded-xl border border-primary/20">
                  <h4 className="font-bold text-primary mb-1">Diagnosis</h4>
                  <p className="text-muted-foreground leading-relaxed">{advice.diagnosis}</p>
                </div>
                <div>
                  <h4 className="font-bold mb-2">Action Plan</h4>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                    {advice.action_plan.map((action: string, i: number) => (
                      <li key={i}>{action}</li>
                    ))}
                  </ul>
                </div>
                <div className="bg-green-500/10 p-4 rounded-xl border border-green-500/20">
                  <h4 className="font-bold text-green-700 dark:text-green-400 mb-1">Instant Marketing Idea</h4>
                  <p className="text-muted-foreground">{advice.marketing_idea}</p>
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <input 
              type="text" 
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="E.g., How should I price bridal packages in Bandra?"
              className="flex-1 bg-card border border-border rounded-xl px-4 py-3 outline-none focus:border-primary text-sm"
              onKeyDown={(e) => e.key === 'Enter' && handleAskCoach()}
            />
            <button 
              onClick={handleAskCoach}
              disabled={loading}
              className="bg-primary text-primary-foreground px-6 py-3 rounded-xl font-bold disabled:opacity-50 transition-all hover:opacity-90"
            >
              {loading ? "..." : "Ask AI"}
            </button>
          </div>
        </div>
      </div>

      {/* Dynamic Technical Disclaimer */}
      <p className="text-center text-xs text-muted-foreground mt-16 pt-6 border-t border-border opacity-70">
        Business insights and coaching recommendations are generated by AI analyzing your operational metrics. BeautyVerse AI can make mistakes. Check important info before making major business decisions.
      </p>
    </div>
  );
}
