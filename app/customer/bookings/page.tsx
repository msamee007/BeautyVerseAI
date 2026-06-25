"use client";

import { useTheme } from "@/components/ThemeProvider";
import { Calendar, Scissors, PawPrint, Sparkles, X } from "lucide-react";
import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";

export default function BookingsPage() {
  const { mode, activeCity } = useTheme();
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
  const [isQrOpen, setIsQrOpen] = useState(false);
  const [isRescheduleOpen, setIsRescheduleOpen] = useState(false);

  const citySuffix = activeCity === "mumbai" ? "Bandra" :
                     activeCity === "bangalore" ? "Indiranagar" :
                     activeCity === "delhi" ? "Saket" :
                     activeCity === "pune" ? "Kothrud" : "Jubilee Hills";

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 relative">
      {/* Modals */}
      {isQrOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-card p-8 rounded-3xl shadow-2xl relative w-full max-w-sm text-center">
            <button onClick={() => setIsQrOpen(false)} className="absolute top-4 right-4 p-2 bg-muted rounded-full hover:bg-slate-200">
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-bold text-xl mb-6">Scan to Check-in</h3>
            <div className="bg-white p-4 rounded-2xl inline-block mb-4 border border-border">
              <QRCodeSVG value="https://beautyverse.ai/checkin/test" size={200} />
            </div>
            <p className="text-muted-foreground text-sm font-bold tracking-widest">BV-M7T9Q</p>
          </div>
        </div>
      )}

      {isRescheduleOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-card p-8 rounded-3xl shadow-2xl relative w-full max-w-md">
            <button onClick={() => setIsRescheduleOpen(false)} className="absolute top-4 right-4 p-2 bg-muted rounded-full hover:bg-slate-200">
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-bold text-xl mb-6">Reschedule Appointment</h3>
            <div className="space-y-4 mb-6">
              <input type="date" className="w-full p-3 border border-border rounded-xl bg-muted/50" />
              <select className="w-full p-3 border border-border rounded-xl bg-muted/50">
                <option>10:00 AM</option>
                <option>1:00 PM</option>
                <option>4:30 PM</option>
              </select>
            </div>
            <button onClick={() => setIsRescheduleOpen(false)} className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-bold hover:brightness-110">
              Confirm Reschedule
            </button>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          My Bookings <Calendar className="w-8 h-8 text-primary" />
        </h1>
        <div className="bg-muted p-1 rounded-lg flex">
          <button 
            onClick={() => setActiveTab("upcoming")}
            className={`px-4 py-1.5 rounded-md text-sm font-bold transition-all ${activeTab === "upcoming" ? "bg-card shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            Upcoming
          </button>
          <button 
            onClick={() => setActiveTab("past")}
            className={`px-4 py-1.5 rounded-md text-sm font-bold transition-all ${activeTab === "past" ? "bg-card shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            Past
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {mode === 'male' ? (
          <>
            <div className="bg-card border border-border rounded-3xl p-6 relative overflow-hidden group">
              <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                <div className="flex gap-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-blue-500/20 rounded-2xl flex items-center justify-center text-primary shadow-sm">
                    <Scissors className="w-10 h-10" />
                  </div>
                  <div>
                    <span className="bg-green-500/10 text-green-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-2 inline-block">Confirmed</span>
                    <h3 className="text-2xl font-bold mb-1">Urban Alpha Barbershop {citySuffix}</h3>
                    <p className="text-muted-foreground mb-4">Tomorrow, 5:30 PM • with Rahul K.</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-muted rounded-lg text-sm font-semibold">Fade Haircut</span>
                      <span className="px-3 py-1 bg-muted rounded-lg text-sm font-semibold">Hot Towel Shave</span>
                    </div>
                  </div>
                </div>
                <div className="text-right flex flex-col justify-between h-full w-full md:w-auto">
                  <div>
                    <p className="text-2xl font-bold text-primary">₹850</p>
                    <p className="text-xs text-muted-foreground">Paid via UPI</p>
                  </div>
                  <div className="flex gap-2 mt-4 md:mt-0">
                    <button onClick={() => setIsQrOpen(true)} className="px-4 py-2 bg-foreground text-background rounded-xl font-bold text-sm w-full md:w-auto hover:bg-primary transition-colors">View QR</button>
                    <button onClick={() => setIsRescheduleOpen(true)} className="px-4 py-2 border border-border rounded-xl font-bold text-sm hover:bg-muted w-full md:w-auto transition-colors">Reschedule</button>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : mode === 'pet' ? (
          <>
            <div className="bg-card border border-border rounded-3xl p-6 relative overflow-hidden group">
              <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                <div className="flex gap-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-green-500/20 to-teal-500/20 rounded-2xl flex items-center justify-center text-green-600 shadow-sm">
                    <PawPrint className="w-10 h-10" />
                  </div>
                  <div>
                    <span className="bg-green-500/10 text-green-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-2 inline-block">Confirmed</span>
                    <h3 className="text-2xl font-bold mb-1">Paws & Bubbles Spa {citySuffix}</h3>
                    <p className="text-muted-foreground mb-4">Tomorrow, 10:00 AM • with Dr. Sarah</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-muted rounded-lg text-sm font-semibold">Full Grooming</span>
                      <span className="px-3 py-1 bg-muted rounded-lg text-sm font-semibold">Nail Trim</span>
                    </div>
                  </div>
                </div>
                <div className="text-right flex flex-col justify-between h-full w-full md:w-auto">
                  <div>
                    <p className="text-2xl font-bold text-primary">₹1,200</p>
                    <p className="text-xs text-muted-foreground">Paid via UPI</p>
                  </div>
                  <div className="flex gap-2 mt-4 md:mt-0">
                    <button onClick={() => setIsQrOpen(true)} className="px-4 py-2 bg-foreground text-background rounded-xl font-bold text-sm w-full md:w-auto hover:bg-primary transition-colors">View QR</button>
                    <button onClick={() => setIsRescheduleOpen(true)} className="px-4 py-2 border border-border rounded-xl font-bold text-sm hover:bg-muted w-full md:w-auto transition-colors">Reschedule</button>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="bg-card border border-border rounded-3xl p-6 relative overflow-hidden group">
              <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                <div className="flex gap-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-blue-500/20 rounded-2xl flex items-center justify-center text-primary shadow-sm">
                    <Scissors className="w-10 h-10" />
                  </div>
                  <div>
                    <span className="bg-green-500/10 text-green-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-2 inline-block">Confirmed</span>
                    <h3 className="text-2xl font-bold mb-1">The Grand Aesthetic Studio {citySuffix}</h3>
                    <p className="text-muted-foreground mb-4">Tomorrow, 4:15 PM • with Aisha M.</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-muted rounded-lg text-sm font-semibold">Signature Haircut</span>
                      <span className="px-3 py-1 bg-muted rounded-lg text-sm font-semibold">Keratin Pro</span>
                    </div>
                  </div>
                </div>
                <div className="text-right flex flex-col justify-between h-full w-full md:w-auto">
                  <div>
                    <p className="text-2xl font-bold text-primary">₹3,450</p>
                    <p className="text-xs text-muted-foreground">Paid via UPI</p>
                  </div>
                  <div className="flex gap-2 mt-4 md:mt-0">
                    <button onClick={() => setIsQrOpen(true)} className="px-4 py-2 bg-foreground text-background rounded-xl font-bold text-sm w-full md:w-auto hover:bg-primary transition-colors">View QR</button>
                    <button onClick={() => setIsRescheduleOpen(true)} className="px-4 py-2 border border-border rounded-xl font-bold text-sm hover:bg-muted w-full md:w-auto transition-colors">Reschedule</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-3xl p-6 relative overflow-hidden opacity-75 hover:opacity-100 transition-opacity">
              <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                <div className="flex gap-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center text-pink-600 shadow-sm">
                    <Sparkles className="w-10 h-10" />
                  </div>
                  <div>
                    <span className="bg-blue-500/10 text-blue-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-2 inline-block">Pending Approval</span>
                    <h3 className="text-2xl font-bold mb-1">Luxe Nail Bar {citySuffix}</h3>
                    <p className="text-muted-foreground mb-4">Friday, 2:00 PM • with Priya S.</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-muted rounded-lg text-sm font-semibold">Gel Manicure</span>
                      <span className="px-3 py-1 bg-muted rounded-lg text-sm font-semibold">Nail Art</span>
                    </div>
                  </div>
                </div>
                <div className="text-right flex flex-col justify-between h-full w-full md:w-auto">
                  <div>
                    <p className="text-2xl font-bold text-primary">₹1,200</p>
                    <p className="text-xs text-muted-foreground">Pay at Salon</p>
                  </div>
                  <div className="flex gap-2 mt-4 md:mt-0">
                    <button onClick={() => alert("Request Cancelled Successfully.")} className="px-4 py-2 border border-border text-red-500 rounded-xl font-bold text-sm hover:bg-red-50 dark:hover:bg-red-950 w-full md:w-auto transition-colors">Cancel Request</button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
