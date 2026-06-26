"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Send, Bot, User } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

export default function ChatConciergePage() {
  const { mode } = useTheme();
  const [messages, setMessages] = useState([
    { role: "assistant", content: `Hello! I'm your AI Beauty Concierge. Tell me about your upcoming event, budget, or goals in ${mode} grooming, and I'll build a custom roadmap for you.` }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const lowerInput = userMessage.toLowerCase();
      let aiReply = "";

      if (lowerInput.includes("yes") || lowerInput.includes("yeah") || lowerInput.includes("sure")) {
        aiReply = "Excellent! I've found 3 highly-rated providers in your area matching those criteria. I've sent the list to your Saved Salons. Shall I help you book the nearest one?";
      } else if (lowerInput.includes("no") || lowerInput.includes("nah")) {
        aiReply = "No problem at all! We can adjust the plan. What specific concerns or preferences do you have instead?";
      } else if (lowerInput.includes("hair") || lowerInput.includes("haircut") || lowerInput.includes("balding") || lowerInput.includes("loosing")) {
        aiReply = mode === "male"
          ? "For hair thinning or loss concerns, I highly recommend a texturizing cut that adds volume, paired with a stimulating scalp treatment to promote health."
          : "For hair concerns, a volumizing layered cut combined with a keratin or deep conditioning spa treatment works wonders. Would you like me to find specialists for this?";
      } else if (lowerInput.includes("price") || lowerInput.includes("cost") || lowerInput.includes("budget") || lowerInput.includes("cheap")) {
        aiReply = "Prices vary by salon, but a premium package for your needs usually runs around ₹2,500 - ₹4,000. I can filter for more budget-friendly options if you'd like!";
      } else if (lowerInput.includes("skin") || lowerInput.includes("face") || lowerInput.includes("acne") || lowerInput.includes("glow")) {
        aiReply = "To get that perfect glow, I'd suggest starting with a deep-cleansing HydraFacial a few days before your event to clear out pores and hydrate your skin deeply.";
      } else {
        // Fallbacks for general statements
        const fallbacks = [
          "That sounds like a great plan. To make sure you look your absolute best, I recommend booking your appointments at least a week in advance.",
          "I understand completely. Based on your profile, focusing on hydration and a clean, sharp look will give you the best results.",
          "Got it! A personalized grooming routine is key. Would you like me to recommend some specific treatments to match this?",
          "Interesting. If you're open to it, I think a slight change in your styling routine could really elevate your look for this occasion."
        ];
        aiReply = fallbacks[Math.floor(Math.random() * fallbacks.length)];
      }

      setMessages(prev => [...prev, { role: "assistant", content: aiReply }]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 h-screen flex flex-col">
      <div className="mb-6 flex-shrink-0">
        <Link href="/customer/consultations" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-bold">
          <ArrowLeft className="w-5 h-5" />
          Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold mt-4 flex items-center gap-3">
          Beauty Concierge Chat <Bot className="w-8 h-8 text-primary" />
        </h1>
      </div>

      <div className="flex-1 bg-card border border-border rounded-3xl overflow-hidden flex flex-col shadow-sm">
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                {msg.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
              </div>
              <div className={`max-w-[75%] p-4 rounded-2xl ${msg.role === 'user' ? 'bg-primary text-primary-foreground rounded-tr-none' : 'bg-muted rounded-tl-none'}`}>
                <p className="leading-relaxed">{msg.content}</p>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-muted text-muted-foreground flex items-center justify-center flex-shrink-0">
                <Bot className="w-5 h-5" />
              </div>
              <div className="bg-muted p-4 rounded-2xl rounded-tl-none flex items-center gap-2">
                <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 bg-background border-t border-border">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about styles, treatments, or event prep..."
              className="flex-1 bg-muted border-none rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/50"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className="bg-primary text-primary-foreground p-3 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              <Send className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
