import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy & AI Trust Center</h1>
      <p className="text-muted-foreground mb-12 text-lg">Last updated: {new Date().toLocaleDateString()}</p>

      <div className="space-y-12 prose dark:prose-invert max-w-none">
        
        <section>
          <h2 className="text-2xl font-bold mb-4">1. The BeautyVerse AI Commitment</h2>
          <p className="text-muted-foreground leading-relaxed">
            At BeautyVerse AI, we leverage state-of-the-art Artificial Intelligence to provide you with hyper-personalized beauty and grooming recommendations. We believe that innovation must be built on a foundation of absolute trust. Your data is yours.
          </p>
        </section>

        <section className="p-8 bg-card border-2 border-primary/20 rounded-3xl">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span className="text-primary text-3xl">🛡️</span> How We Handle Your Photos (AI Consultations)
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            When you use our <strong>Vision AI Consultation</strong> feature to upload a photo (for hairstyle, makeup, or beard previews), strict data protocols apply:
          </p>
          <ul className="space-y-3">
            <li className="flex items-start gap-2">
              <span className="text-green-500 font-bold">✓</span>
              <span><strong>In-Memory Processing:</strong> Photos are sent securely to our AI API for real-time analysis. They are processed entirely in-memory and are <strong>never</strong> saved to our databases.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 font-bold">✓</span>
              <span><strong>No Facial Training:</strong> We explicitly opt-out of allowing Google or any third party to use your uploaded photos to train their foundational AI models.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 font-bold">✓</span>
              <span><strong>Ephemeral Hashes:</strong> We use cryptographic hashing solely to cache the *textual recommendation* to save processing time. The original image data is discarded immediately after the consultation completes.</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">2. Geospatial Data & Mapbox</h2>
          <p className="text-muted-foreground leading-relaxed">
            To provide accurate Provider distances and ETAs (especially for our Pune Home Service platform), we request your location. This data is fed into our PostGIS engine to calculate `ST_Distance`. We do not continuously track your location in the background.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">3. Payment Information</h2>
          <p className="text-muted-foreground leading-relaxed">
            All UPI, Credit Card, and Net Banking transactions are processed by highly secure, PCI-DSS compliant third-party gateways. BeautyVerse AI does not store your raw credit card numbers or UPI PINs.
          </p>
        </section>
      </div>

      <div className="mt-16 pt-8 border-t border-border flex gap-4">
        <Link href="/">
          <button className="px-6 py-2 border border-border rounded-full hover:bg-muted font-bold">
            Back to Home
          </button>
        </Link>
        <Link href="/terms">
          <button className="px-6 py-2 bg-primary text-primary-foreground rounded-full hover:opacity-90 font-bold">
            View Terms & Conditions
          </button>
        </Link>
      </div>
    </div>
  );
}
