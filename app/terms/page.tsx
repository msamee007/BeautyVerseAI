import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">Terms & Conditions</h1>
      <p className="text-muted-foreground mb-12 text-lg">Last updated: {new Date().toLocaleDateString()}</p>

      <div className="space-y-12 prose dark:prose-invert max-w-none">
        <section>
          <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
          <p className="text-muted-foreground leading-relaxed">
            By accessing or using the BeautyVerse AI platform, you agree to be bound by these Terms. 
            BeautyVerse AI operates as a digital marketplace connecting consumers with independent beauty and grooming service providers.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">2. AI Consultations & Recommendation Transparency</h2>
          <p className="text-muted-foreground leading-relaxed">
            Our AI Concierge, Visual Consultations, and City-Specific Pricing Engines are powered by advanced AI. While highly advanced, they are <strong>advisory in nature</strong>. 
            AI-generated price estimates (especially for Home Services or Luxury categories) are algorithmic suggestions, not binding financial quotes. Final decisions and pricing must be aligned upon directly with your chosen Stylist.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">3. Provider Independence</h2>
          <p className="text-muted-foreground leading-relaxed">
            All Salons, Groomers, Bridal Studios, and Pet Groomers listed on BeautyVerse AI are independent contractors. BeautyVerse AI is not the employer of these service providers. We facilitate the booking, but the responsibility for service quality, safety, and hygiene rests entirely with the Provider.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">4. Cancellations & Refunds</h2>
          <p className="text-muted-foreground leading-relaxed">
            Appointments can be canceled up to 4 hours before the scheduled time for a full refund. Cancellations made within 4 hours may incur a 50% penalty fee. If a Provider cancels your appointment, you will receive a 100% refund immediately to your original payment method (UPI/Card).
          </p>
        </section>
      </div>

      <div className="mt-16 pt-8 border-t border-border">
        <Link href="/">
          <button className="px-6 py-2 border border-border rounded-full hover:bg-muted font-bold">
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
}
