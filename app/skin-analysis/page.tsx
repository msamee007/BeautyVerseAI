"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, ScanFace, CheckCircle2, Camera, X } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { analyzeSkin } from "@/lib/actions/skin";

export default function SkinAnalysisPage() {
  const { mode } = useTheme();
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startCamera = async () => {
    setResult(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsCameraActive(true);
    } catch (err) {
      console.error("Error accessing camera:", err);
      alert("Could not access camera. Please allow permissions.");
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
  };

  const captureAndAnalyze = async () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const base64Image = canvas.toDataURL('image/jpeg', 0.8);
    
    stopCamera();
    setScanning(true);
    
    const analysis = await analyzeSkin(base64Image, mode);
    setScanning(false);
    setResult(analysis);
  };

  useEffect(() => {
    return () => stopCamera();
  }, []);

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
          AI Skin Analysis <ScanFace className="w-10 h-10 text-primary" />
        </h1>
        <p className="text-xl text-muted-foreground">
          Deep dermal scanning to recommend the perfect {mode} treatments.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-card border-2 border-border rounded-3xl overflow-hidden relative shadow-lg min-h-[400px] flex items-center justify-center bg-muted/30">
          <canvas ref={canvasRef} className="hidden" />
          
          <div className={isCameraActive ? 'hidden' : 'w-full h-full'}>
            {!scanning && !result && (
              <div className="text-center p-8 h-full flex flex-col items-center justify-center min-h-[400px]">
                <ScanFace className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                <button onClick={startCamera} className="bg-primary text-primary-foreground px-8 py-3 rounded-xl font-bold hover:brightness-110 shadow-md flex items-center gap-2 mx-auto">
                  <Camera className="w-5 h-5" /> Start Camera
                </button>
              </div>
            )}
          </div>

          <div className={`relative w-full h-full min-h-[400px] bg-black flex flex-col ${isCameraActive ? 'block' : 'hidden'}`}>
            <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover absolute inset-0" />
            
            {isCameraActive && (
              <>
                <div className="absolute top-4 right-4 z-20">
                  <button onClick={stopCamera} className="bg-black/50 p-2 rounded-full text-white hover:bg-black/80 transition-colors">
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center">
                  <div className="w-64 h-64 border-2 border-white/30 rounded-full border-dashed animate-[spin_10s_linear_infinite]"></div>
                </div>

                <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center">
                  <button 
                    onClick={captureAndAnalyze}
                    className="bg-primary text-primary-foreground px-8 py-4 rounded-full font-bold text-lg hover:brightness-110 shadow-xl shadow-primary/20 flex items-center gap-2 animate-bounce"
                  >
                    <ScanFace className="w-6 h-6" /> Capture & Analyze
                  </button>
                </div>
              </>
            )}
          </div>

          {scanning && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-10 flex-col">
              <div className="w-48 h-48 border-2 border-primary rounded-full relative overflow-hidden flex items-center justify-center">
                <div className="w-full h-1 bg-primary absolute top-0 animate-[scan_1.5s_ease-in-out_infinite] shadow-[0_0_15px_#fff]"></div>
                <ScanFace className="w-24 h-24 text-primary opacity-50 animate-pulse" />
              </div>
              <p className="text-primary font-bold mt-6 tracking-widest uppercase animate-pulse">Analyzing Topography...</p>
            </div>
          )}
          {result && !result.error && (
            <div className="absolute inset-0 bg-black/90 p-8 flex flex-col justify-center items-center text-white text-center">
              <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
              <h3 className="text-2xl font-bold mb-2">Scan Complete</h3>
              <p className="text-green-400 font-bold mb-8">Confidence: {result.confidence}</p>
              
              <div className="w-full space-y-4 text-left">
                <div className="bg-white/10 p-4 rounded-xl backdrop-blur-md">
                  <p className="text-white/60 text-sm font-bold uppercase tracking-wider mb-1">Detected Profile</p>
                  <p className="font-bold text-lg">{result.skinType}</p>
                </div>
                <div className="bg-white/10 p-4 rounded-xl backdrop-blur-md">
                  <p className="text-white/60 text-sm font-bold uppercase tracking-wider mb-1">Health Indicator</p>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-white/20 h-2 rounded-full overflow-hidden">
                      <div className="bg-blue-400 h-full" style={{ width: result.hydration }}></div>
                    </div>
                    <span className="font-bold">{result.hydration}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {result && result.error && (
            <div className="absolute inset-0 bg-black/90 p-8 flex flex-col justify-center items-center text-white text-center">
              <X className="w-16 h-16 text-red-500 mb-4" />
              <h3 className="text-2xl font-bold mb-2">Scan Failed</h3>
              <p className="text-red-400 font-bold mb-8">{result.error}</p>
              <button onClick={startCamera} className="bg-primary text-primary-foreground px-8 py-3 rounded-xl font-bold hover:brightness-110 shadow-md">
                Try Again
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-col justify-center space-y-6">
          <div className="bg-card border border-border p-8 rounded-3xl shadow-sm">
            <h3 className="text-xl font-bold mb-4">Treatment Plan</h3>
            {result && !result.error ? (
              <div>
                <p className="text-muted-foreground mb-6">Based on the real-time AI topographical scan, we have matched your profile with the optimal clinical treatment.</p>
                <div className="p-4 bg-primary/10 border border-primary/20 rounded-xl mb-6">
                  <p className="text-primary font-bold text-lg">{result.recommendation}</p>
                </div>
                <Link href="/customer" className="block w-full">
                  <button className="w-full bg-foreground text-background py-3 rounded-xl font-bold hover:opacity-90">
                    Find Clinics Near Me
                  </button>
                </Link>
              </div>
            ) : (
              <p className="text-muted-foreground">Run the scanner to generate your personalized clinical treatment plan.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
