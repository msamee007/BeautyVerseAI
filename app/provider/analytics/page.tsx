export default function AnalyticsPage() {
  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="text-3xl font-bold mb-2 tracking-tight">Business Analytics</h1>
        <p className="text-muted-foreground">Monitor your revenue, retention, and service performance.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Total Revenue (MTD)", value: "₹4,12,000", trend: "+12%" },
          { label: "Total Bookings", value: "142", trend: "+5%" },
          { label: "Average Booking Value", value: "₹2,900", trend: "+8%" },
          { label: "Repeat Customers", value: "68%", trend: "+2%" },
        ].map((stat, i) => (
          <div key={i} className="bg-card border border-border p-6 rounded-2xl shadow-sm">
            <p className="text-sm text-muted-foreground mb-2">{stat.label}</p>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-xs text-green-500 font-bold mt-1">{stat.trend} vs last month</p>
          </div>
        ))}
      </div>

      <div className="bg-card border border-border rounded-3xl p-6 shadow-sm">
        <h2 className="text-xl font-bold mb-6">Revenue by Service Category</h2>
        <div className="space-y-4">
          {[
            { name: "Hair Color & Styling", width: "60%", value: "₹2,47,200" },
            { name: "Bridal Makeup", width: "25%", value: "₹1,03,000" },
            { name: "Keratin & Spa", width: "10%", value: "₹41,200" },
            { name: "Basic Grooming", width: "5%", value: "₹20,600" },
          ].map((bar, i) => (
            <div key={i}>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium">{bar.name}</span>
                <span className="font-bold">{bar.value}</span>
              </div>
              <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary" style={{ width: bar.width }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dynamic Technical Disclaimer */}
      <p className="text-center text-xs text-muted-foreground mt-16 pt-6 border-t border-border opacity-70">
        Live revenue data is aggregated from POS terminals and BeautyVerse bookings. Revenue forecasts are AI-generated based on historical data. BeautyVerse AI can make mistakes. Always consult your accountant.
      </p>
    </div>
  );
}
