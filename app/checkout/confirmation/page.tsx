"use client";

import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function CheckoutConfirmationPage() {
  const [bookingId, setBookingId] = useState("");

  useEffect(() => {
    // Generate a secure-looking random Booking ID
    const randomHash = Math.random().toString(36).substring(2, 10).toUpperCase();
    setBookingId(`BV-${randomHash}`);
  }, []);

  if (!bookingId) return null; // Avoid hydration mismatch

  return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-center">
      <motion.div 
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-100 dark:bg-green-900/30 dark:shadow-none"
      >
        <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </motion.div>

      <h1 className="text-4xl font-bold mb-4">Booking Confirmed!</h1>
      <p className="text-xl text-muted-foreground mb-12">
        Your VIP appointment has been secured. Show this QR code at the salon.
      </p>

      <div className="bg-card border border-border shadow-2xl rounded-3xl overflow-hidden max-w-md mx-auto relative">
        <div className="bg-primary p-6 text-primary-foreground text-center">
          <p className="text-sm uppercase tracking-widest font-bold opacity-80 mb-1">Booking ID</p>
          <h2 className="text-3xl font-bold font-mono tracking-wider">{bookingId}</h2>
        </div>

        <div className="p-8 space-y-6">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-white rounded-xl shadow-inner border border-gray-100">
              <QRCodeSVG 
                value={`https://beautyverse.ai/verify/${bookingId}`} 
                size={180}
                level="H"
                fgColor="#000000"
                bgColor="#ffffff"
              />
            </div>
          </div>

          <div className="space-y-3 text-left border-t border-border pt-6">
            <div className="flex justify-between">
              <span className="text-muted-foreground text-sm">Date & Time</span>
              <span className="font-bold">Today, 4:15 PM</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground text-sm">Salon</span>
              <span className="font-bold">The Grand Aesthetic Studio</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground text-sm">Stylist</span>
              <span className="font-bold">Aisha M.</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground text-sm">Amount Paid</span>
              <span className="font-bold text-green-600">₹2950 (UPI)</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/customer">
          <button className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-bold w-full sm:w-auto hover:opacity-90">
            View Dashboard
          </button>
        </Link>
        <Link href="/">
          <button className="px-8 py-3 border border-border bg-card rounded-full font-bold w-full sm:w-auto hover:bg-muted">
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
}
