"use client";

import { useState } from "react";
import { useTheme } from "@/components/ThemeProvider";
import { analyzeUserPhoto } from "@/lib/actions/vision";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Sparkles, ArrowLeft, Image as ImageIcon } from "lucide-react";
import Link from "next/link";

export default function VisionConsultationPage() {
  const { mode } = useTheme();
  const [photo, setPhoto] = useState<string | null>(null);
  const [consultationType, setConsultationType] = useState("hairstyle");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [photoError, setPhotoError] = useState("");

  const getTypesForMode = () => {
    switch (mode) {
      case "female": return ["Hairstyle Preview", "Hair Color Preview", "Makeup Preview", "Bridal Preview"];
      case "male": return ["Haircut Preview", "Beard Preview"];
      case "pet": return ["Grooming Preview"];
      default: return ["Hairstyle Preview"];
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhotoError("");
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setPhoto(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleAnalyze = async () => {
    if (!photo) {
      setPhotoError("Please upload a clear selfie or use the demo photo first.");
      return;
    }
    setPhotoError("");
    setLoading(true);
    const analysis = await analyzeUserPhoto(photo, mode, consultationType);
    setResult(analysis);
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Navigation */}
      <div className="mb-8">
        <Link href="/customer/consultations" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-bold">
          <ArrowLeft className="w-5 h-5" />
          Back to Dashboard
        </Link>
      </div>

      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">AI Photo Consultation</h1>
        <p className="text-xl text-muted-foreground">
          Upload a photo. Let our Vision AI deeply analyze your features and pair you with the perfect {mode} stylist.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Upload & Controls */}
        <div className="space-y-6">
          <div className="border-2 border-dashed border-border rounded-3xl p-8 text-center hover:border-primary transition-colors relative bg-card flex flex-col items-center justify-center min-h-[300px]">
            {!photo && (
              <input 
                type="file" 
                accept="image/*" 
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                onChange={handleFileUpload}
              />
            )}
            {photo ? (
              <div className="relative w-full">
                <img src={photo} alt="Upload Preview" className="mx-auto max-h-64 rounded-xl object-cover shadow-lg" />
                <button 
                  onClick={() => setPhoto(null)} 
                  className="mt-4 px-4 py-2 bg-muted text-muted-foreground font-bold text-sm rounded-full hover:bg-secondary transition-colors"
                >
                  Remove Photo
                </button>
              </div>
            ) : (
              <div className="py-12 flex flex-col items-center">
                <Camera className="w-16 h-16 text-muted-foreground mb-4 block" />
                <p className="font-bold text-lg">Tap to upload a clear selfie</p>
                <p className="text-sm text-muted-foreground mt-2">JPEG or PNG</p>
                
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setPhotoError("");
                    const demoImg = mode === 'pet' 
                      ? "https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=800&auto=format&fit=crop" 
                      : "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop";
                    setPhoto(demoImg);
                  }}
                  className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm font-bold hover:bg-secondary/80 transition-colors z-20 relative"
                >
                  <ImageIcon className="w-4 h-4" />
                  Use Demo Photo
                </button>
              </div>
            )}
          </div>
          {photoError && (
            <p className="text-red-500 font-bold text-sm text-center animate-in fade-in slide-in-from-top-2">{photoError}</p>
          )}

          <div>
            <label className="block text-sm font-bold mb-2">What do you want to analyze?</label>
            <div className="flex flex-wrap gap-2">
              {getTypesForMode().map(type => (
                <button 
                  key={type}
                  onClick={() => setConsultationType(type)}
                  className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                    consultationType === type 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <button 
            onClick={handleAnalyze}
            disabled={loading}
            className="w-full py-4 bg-foreground text-background rounded-xl font-bold text-lg hover:opacity-90 disabled:opacity-50 transition-opacity"
          >
            {loading ? "Analyzing..." : "Start Consultation"}
          </button>
        </div>

        {/* Results Canvas */}
        <div className="bg-card border border-border rounded-3xl p-8 relative overflow-hidden min-h-[400px]">
          <AnimatePresence mode="wait">
            {!result && !loading && (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center"
              >
                <Sparkles className="w-16 h-16 text-muted-foreground opacity-20 mb-4" />
                <h3 className="text-xl font-bold text-muted-foreground">Your expert analysis will appear here.</h3>
              </motion.div>
            )}

            {loading && (
              <motion.div 
                key="loading"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center"
              >
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                <h3 className="text-xl font-bold">Scanning features...</h3>
                <p className="text-muted-foreground">Our AI is analyzing your face structure and hair texture.</p>
              </motion.div>
            )}

            {result && !loading && (
              <motion.div 
                key="result"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {result.error ? (
                  <div className="flex flex-col items-center justify-center p-8 text-center text-red-500">
                    <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-4">
                      <Sparkles className="w-8 h-8 text-red-600 dark:text-red-400" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Analysis Failed</h3>
                    <p className="text-muted-foreground">{result.error}</p>
                    <button 
                      onClick={() => { setResult(null); setPhoto(null); }}
                      className="mt-6 px-6 py-2 bg-red-500 text-white rounded-full font-bold hover:bg-red-600 transition-colors"
                    >
                      Try Again
                    </button>
                  </div>
                ) : (
                  <>
                    <div>
                      <h3 className="text-sm uppercase tracking-wider text-primary font-bold mb-2">Deep Analysis</h3>
                      <p className="text-lg leading-relaxed">{result.analysis}</p>
                    </div>
                
                <div>
                  <h3 className="text-sm uppercase tracking-wider text-green-600 font-bold mb-2">Expert Recommendation</h3>
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl">
                    <p className="font-medium text-green-900 dark:text-green-400">{result.recommendation}</p>
                    <p className="text-sm mt-3 text-green-700 dark:text-green-500">
                      <strong>Maintenance:</strong> {result.estimated_maintenance}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm uppercase tracking-wider font-bold mb-2">Matching Stylists</h3>
                  <p className="text-sm text-muted-foreground mb-4">We instantly scanned the database for stylists specializing in:</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {result.search_tags.map((tag: string) => (
                      <span key={tag} className="px-3 py-1 bg-muted rounded-full text-sm font-bold">#{tag}</span>
                    ))}
                  </div>
                  
                  <button className="w-full py-3 border-2 border-primary text-primary font-bold rounded-xl hover:bg-primary hover:text-primary-foreground transition-colors">
                    Find Stylists Near Me
                  </button>
                </div>
                </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
