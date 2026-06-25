"use client";

export default function SettingsPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h1 className="text-3xl font-bold">Settings ⚙️</h1>

      <div className="bg-card border border-border rounded-3xl p-6">
        <h3 className="text-xl font-bold mb-6 border-b border-border pb-4">Profile Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold mb-2">Full Name</label>
            <input type="text" defaultValue="Priya Sharma" className="w-full bg-muted border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2">Email Address</label>
            <input type="email" defaultValue="priya.sharma@example.com" className="w-full bg-muted border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2">Phone Number</label>
            <input type="tel" defaultValue="+91 98765 43210" className="w-full bg-muted border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
        </div>
        <button className="mt-6 bg-foreground text-background font-bold px-6 py-3 rounded-xl hover:bg-primary transition-colors">Save Changes</button>
      </div>

      <div className="bg-card border border-border rounded-3xl p-6">
        <h3 className="text-xl font-bold mb-6 border-b border-border pb-4">Preferences</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold">Email Notifications</p>
              <p className="text-sm text-muted-foreground">Receive booking confirmations and reminders via email.</p>
            </div>
            <div className="w-12 h-6 bg-primary rounded-full relative cursor-pointer">
              <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold">SMS Notifications</p>
              <p className="text-sm text-muted-foreground">Receive OTPs and urgent updates via SMS.</p>
            </div>
            <div className="w-12 h-6 bg-primary rounded-full relative cursor-pointer">
              <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold">Location Services</p>
              <p className="text-sm text-muted-foreground">Allow BeautyVerseAI to access your location for better recommendations.</p>
            </div>
            <div className="w-12 h-6 bg-muted rounded-full relative cursor-pointer border border-border">
              <div className="absolute left-1 top-1 w-4 h-4 bg-muted-foreground rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
