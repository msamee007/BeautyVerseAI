"use client";

import React from "react";
import { useTheme, ThemeMode } from "./ThemeProvider";
import { motion, AnimatePresence } from "framer-motion";

export function LayoutShowcase() {
  const { mode, setMode, isDark, toggleDark } = useTheme();

  const getLogo = (currentMode: ThemeMode) => {
    switch (currentMode) {
      case "female": return "🌴 Palm";
      case "male": return "🧔 Beard";
      case "pet": return "🐾 Paw";
      case "provider": return "✂️ Scissors";
    }
  };

  const getHeroText = (currentMode: ThemeMode) => {
    switch (currentMode) {
      case "female": return "Unveil Your Ultimate Elegance.";
      case "male": return "Stay Sharp. Stay Ready.";
      case "pet": return "Premium Care for Your Best Friend.";
      case "provider": return "Scale Your Salon Business.";
    }
  };

  const categories = {
    female: ["Bridal Makeup", "Hair Styling", "Nail Art", "Spa & Massage"],
    male: ["Fade Haircut", "Beard Trim", "Skin Care", "Hair Color"],
    pet: ["Full Grooming", "Bath & Brush", "Nail Trimming", "Teeth Cleaning"],
    provider: ["Dashboard", "Calendar", "Staff", "Revenue"],
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-500 font-sans">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-serif text-primary">
              <AnimatePresence mode="wait">
                <motion.span
                  key={mode}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                  className="inline-block"
                >
                  {getLogo(mode)} BeautyVerse
                </motion.span>
              </AnimatePresence>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={toggleDark} className="p-2 rounded-full hover:bg-accent text-accent-foreground transition-colors">
              {isDark ? "☀️" : "🌙"}
            </button>
            <div className="flex bg-muted p-1 rounded-lg">
              {(["female", "male", "pet", "provider"] as ThemeMode[]).map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-all duration-300 capitalize ${
                    mode === m ? "bg-card text-card-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.4 }}
            className="text-center space-y-6 py-20 bg-gradient-to-br from-background to-secondary rounded-3xl border border-border shadow-sm"
          >
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-foreground">
              {getHeroText(mode)}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The AI-powered marketplace engineered for perfect matches and seamless experiences.
            </p>
            <div className="pt-4 flex justify-center gap-4">
              <button className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-medium hover:opacity-90 transition-opacity animate-slide-up">
                {mode === "provider" ? "Start Free Trial" : "Book Now"}
              </button>
              <button className="bg-secondary text-secondary-foreground px-8 py-3 rounded-full font-medium hover:opacity-90 transition-opacity animate-slide-up" style={{ animationDelay: "100ms" }}>
                Explore Services
              </button>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Categories / Grid */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold mb-8">Popular Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories[mode].map((cat, i) => (
              <motion.div
                key={`${mode}-${cat}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
                className="bg-card border border-border rounded-2xl p-6 hover:shadow-md transition-shadow cursor-pointer group"
              >
                <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-primary text-xl">✨</span>
                </div>
                <h3 className="font-semibold text-card-foreground">{cat}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
