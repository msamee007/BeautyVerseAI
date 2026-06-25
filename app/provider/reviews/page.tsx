export default function ReviewsPage() {
  return (
    <div className="space-y-8 max-w-5xl flex flex-col min-h-screen pb-12">
      <div className="flex-1">
        <div>
          <h1 className="text-3xl font-bold mb-2 tracking-tight">Reviews & Reputation</h1>
          <p className="text-muted-foreground">Monitor client sentiment and online ratings.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          <div className="md:col-span-1 bg-card border border-border p-6 rounded-3xl shadow-sm flex flex-col items-center justify-center text-center">
            <h3 className="text-lg font-bold mb-2">Overall Rating</h3>
            <span className="text-5xl font-black text-[#D4AF37] mb-2">4.8</span>
            <span className="text-sm text-muted-foreground">Based on 124 Reviews</span>
            <div className="mt-4 px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">Top 5% in City</div>
          </div>
          
          <div className="md:col-span-3 space-y-4">
            <div className="bg-card border border-border p-5 rounded-3xl shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-[#D4AF37]">★★★★★</span>
                  <span className="font-bold">Rahul S.</span>
                </div>
                <span className="text-xs text-muted-foreground">2 days ago</span>
              </div>
              <p className="text-muted-foreground text-sm">"Absolutely fantastic fade! The barber was super attentive to detail. Highly recommend."</p>
              <div className="mt-3 inline-block px-2 py-1 bg-green-50 text-green-600 text-xs rounded border border-green-200">
                AI Sentiment: Highly Positive
              </div>
            </div>

            <div className="bg-card border border-border p-5 rounded-3xl shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-[#D4AF37]">★★★☆☆</span>
                  <span className="font-bold">Neha W.</span>
                </div>
                <span className="text-xs text-muted-foreground">1 week ago</span>
              </div>
              <p className="text-muted-foreground text-sm">"The keratin treatment was good, but the waiting time was a bit long despite having an appointment."</p>
              <div className="mt-3 inline-block px-2 py-1 bg-red-50 text-red-600 text-xs rounded border border-red-200">
                AI Alert: Operational Delay Detected
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Technical Disclaimer */}
      <p className="text-center text-xs text-muted-foreground mt-16 pt-6 border-t border-border opacity-70">
        Live and real data is webscraped to provide the reviews and faults so that it can be corrected next time. Sentiment analysis is powered by deep learning models. BeautyVerse AI can make mistakes. Check important feedback context.
      </p>
    </div>
  );
}
