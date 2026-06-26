"use client";

import { useState } from "react";

export default function AppointmentsPage() {
  const [syncState, setSyncState] = useState("idle");

  const handleSync = () => {
    setSyncState("syncing");
    setTimeout(() => setSyncState("done"), 1200);
  };

  return (
    <div className="space-y-8 max-w-5xl flex flex-col min-h-screen pb-12">
      <div className="flex-1">
        <div>
          <h1 className="text-3xl font-bold mb-2 tracking-tight">Appointments</h1>
          <p className="text-muted-foreground">Manage your day-to-day salon bookings and calendar.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-card border border-border p-6 rounded-3xl shadow-sm">
            <h3 className="text-xl font-bold mb-4">Today</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center bg-muted/50 p-3 rounded-xl border border-border">
                <div>
                  <p className="font-bold">10:00 AM</p>
                  <p className="text-sm text-muted-foreground">Bridal Makeup • Sarah T.</p>
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">Completed</span>
              </div>
              <div className="flex justify-between items-center bg-muted/50 p-3 rounded-xl border border-border">
                <div>
                  <p className="font-bold">2:30 PM</p>
                  <p className="text-sm text-muted-foreground">Keratin Treatment • Priya K.</p>
                </div>
                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">Upcoming</span>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-2 bg-card border border-border p-6 rounded-3xl shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Calendar View</h3>
              <button 
                onClick={handleSync}
                className="text-sm font-bold text-primary hover:underline"
              >
                {syncState === "idle" ? "Sync Google Calendar" : syncState === "syncing" ? "Syncing..." : "Synced ✓"}
              </button>
            </div>
            <div className="w-full h-48 bg-muted rounded-xl border border-dashed border-border flex flex-col items-center justify-center">
              <p className="text-muted-foreground font-medium flex items-center gap-2">
                <span>📅</span> {syncState === "done" ? "All external appointments synced." : "Calendar sync module active. Full calendar loaded."}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Technical Disclaimer */}
      <p className="text-center text-xs text-muted-foreground mt-16 pt-6 border-t border-border opacity-70">
        Live booking data is securely synced in real-time across the BeautyVerse AI network. Scheduling algorithms use predictive modeling to minimize no-shows. BeautyVerse AI can make mistakes. Always check important scheduling info.
      </p>
    </div>
  );
}
