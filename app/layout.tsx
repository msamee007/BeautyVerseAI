import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const fontInter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const fontOutfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BeautyVerse AI | Premium Salon & Grooming Marketplace",
  description: "AI-powered platform to discover and book premium salons, bridal studios, and grooming centers.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "BeautyVerse AI",
  },
  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fontInter.variable} ${fontOutfit.variable} font-sans h-full antialiased`}
    >
      <body className="min-h-full flex flex-col transition-colors duration-500 font-sans">
        <ThemeProvider defaultMode="female">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
