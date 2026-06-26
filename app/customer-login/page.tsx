"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trees, UserCircle, PawPrint, Sparkles, LogIn, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useTheme, MOCK_PROFILES } from "@/components/ThemeProvider";

export default function CustomerLogin() {
  const router = useRouter();
  const { setCurrentUser, setIsDemo } = useTheme();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setLoading(true);
    
    setTimeout(() => {
      // Set to real user
      setIsDemo(false);
      setCurrentUser({
        id: 'real',
        name: name.trim(),
        subtitle: 'Premium Member',
        initials: name.trim().charAt(0).toUpperCase()
      });
      router.push("/customer");
    }, 800);
  };

  const handleDemoLogin = () => {
    setLoading(true);
    setTimeout(() => {
      // Set to demo user (first mock profile)
      setIsDemo(true);
      setCurrentUser(MOCK_PROFILES[0]);
      router.push("/customer");
    }, 800);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden transition-colors duration-500">
      {/* Background Decor */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-rose-200/30 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-teal-200/30 rounded-full blur-3xl pointer-events-none"></div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 text-center mb-8">
        <Link href="/" className="inline-flex items-center justify-center gap-2 text-3xl font-bold text-foreground mb-2">
          <Trees className="w-8 h-8 text-primary" /> BeautyVerse<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-teal-400">AI</span>
        </Link>
        <h2 className="text-3xl font-serif font-bold text-foreground">Welcome Back</h2>
        <p className="text-muted-foreground mt-2">Sign in to your customer portal</p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-card py-10 px-6 sm:px-10 shadow-2xl rounded-3xl border border-border">
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-foreground">
                Full Name
              </label>
              <div className="mt-2 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserCircle className="h-5 w-5 text-muted-foreground" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="appearance-none block w-full pl-10 pr-3 py-3 bg-background border border-border rounded-xl shadow-sm placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm transition-all text-foreground"
                  placeholder="Enter your name"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !name.trim()}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-background bg-foreground hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:-translate-y-0.5"
            >
              {loading ? "Authenticating..." : "Log in to Portal"}
            </button>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-card text-muted-foreground">Or continue without account</span>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={handleDemoLogin}
                disabled={loading}
                className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-border rounded-xl shadow-sm text-sm font-bold text-foreground bg-card hover:bg-muted focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-foreground disabled:opacity-50 transition-all"
              >
                <Sparkles className="w-4 h-4 text-primary" />
                Open using demo account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
