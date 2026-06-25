"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTheme } from "@/components/ThemeProvider";

export default function CheckoutPage() {
  const router = useRouter();
  const { mode } = useTheme();
  const [paymentMethod, setPaymentMethod] = useState("upi");

  // Simulated booking data
  const baseTotal = 3200;
  const isPuneHomeService = true; // In real app, derived from Context/Route
  const travelFee = isPuneHomeService ? 250 : 0;
  const discount = 500;
  const grandTotal = baseTotal + travelFee - discount;

  const handleCheckout = () => {
    // Simulate payment processing
    setTimeout(() => {
      router.push("/checkout/confirmation");
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Secure Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Payment Methods */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Pune Specific Logic */}
          {isPuneHomeService && (
            <div className="p-6 bg-blue-50 border border-blue-200 dark:bg-blue-900/20 dark:border-blue-800 rounded-2xl">
              <h3 className="font-bold text-blue-900 dark:text-blue-400 mb-2 flex items-center gap-2">
                🏠 Home Service Delivery (Pune)
              </h3>
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div>
                  <p className="text-sm text-blue-700/70">Provider Distance</p>
                  <p className="font-bold text-blue-800">4.2 km</p>
                </div>
                <div>
                  <p className="text-sm text-blue-700/70">Estimated ETA</p>
                  <p className="font-bold text-blue-800">18 mins</p>
                </div>
                <div>
                  <p className="text-sm text-blue-700/70">Travel Fee</p>
                  <p className="font-bold text-blue-800">₹{travelFee}</p>
                </div>
              </div>
            </div>
          )}

          <div className="bg-card border border-border rounded-3xl p-8">
            <h2 className="text-2xl font-bold mb-6">Payment Method</h2>
            
            <div className="space-y-4">
              {[
                { id: "upi", name: "UPI (Google Pay, PhonePe)", icon: "📱" },
                { id: "card", name: "Credit / Debit Card", icon: "💳" },
                { id: "wallet", name: "Wallets (Paytm, Amazon Pay)", icon: "👛" },
                { id: "netbanking", name: "Net Banking", icon: "🏦" },
              ].map((method) => (
                <label 
                  key={method.id} 
                  className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
                    paymentMethod === method.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                  }`}
                >
                  <input 
                    type="radio" 
                    name="payment" 
                    value={method.id} 
                    checked={paymentMethod === method.id}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-5 h-5 text-primary"
                  />
                  <span className="text-xl">{method.icon}</span>
                  <span className="font-bold text-lg">{method.name}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-card border border-border rounded-3xl p-8 shadow-xl">
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
            
            <div className="space-y-4 text-sm mb-6">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Signature Haircut & Style</span>
                <span className="font-bold">₹1200</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Keratin Treatment Pro</span>
                <span className="font-bold">₹2000</span>
              </div>
              {isPuneHomeService && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Travel Convenience Fee</span>
                  <span className="font-bold">₹{travelFee}</span>
                </div>
              )}
            </div>

            {/* Offers Engine */}
            <div className="p-4 bg-muted/50 rounded-xl mb-6 border border-dashed border-border">
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-green-600">🎉 Festive Offer Applied</span>
                <span className="font-bold text-green-600">-₹{discount}</span>
              </div>
              <p className="text-xs text-muted-foreground">15% off on HDFC Credit Cards</p>
            </div>

            <div className="border-t border-border pt-4 mb-8">
              <div className="flex justify-between items-center text-xl font-bold">
                <span>Grand Total</span>
                <span>₹{grandTotal}</span>
              </div>
            </div>

            <button 
              onClick={handleCheckout}
              className="w-full py-4 bg-primary text-primary-foreground rounded-full font-bold text-lg hover:opacity-90 transition-opacity"
            >
              Pay ₹{grandTotal} securely
            </button>
            <p className="text-center text-xs text-muted-foreground mt-4">
              By proceeding, you agree to our <Link href="/terms" className="underline">Terms</Link> & <Link href="/privacy" className="underline">Privacy Policy</Link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
