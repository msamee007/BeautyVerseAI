"use client";

import { useEffect, useState } from "react";
import { searchProvidersByMode } from "@/lib/actions/providers";
import { useTheme } from "@/components/ThemeProvider";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

const DynamicMap = dynamic(() => import("./LeafletMap"), { 
  ssr: false, 
  loading: () => <div className="w-full h-full bg-muted flex items-center justify-center animate-pulse rounded-3xl">Loading Map...</div>
});

export function LocalityProviderList({ city, locality, localityName }: { city: string, locality: string, localityName: string }) {
  const { mode } = useTheme();
  const [providers, setProviders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (mode === "provider") return;

    async function fetchProviders() {
      setLoading(true);
      const { data, error } = await searchProvidersByMode(mode, city, locality);
      if (data) setProviders(data);
      setLoading(false);
    }
    fetchProviders();
  }, [mode, city, locality]);

  if (mode === "provider") {
    return <div className="p-8 text-center">Provider mode active. Switch modes to browse salons.</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Top matches in {localityName}</h2>
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-border rounded-full text-sm font-medium hover:bg-muted">Filter</button>
          <button className="px-4 py-2 border border-border rounded-full text-sm font-medium hover:bg-muted">Sort: Rating</button>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-64 bg-muted animate-pulse rounded-2xl border border-border"></div>
          ))}
        </div>
      ) : providers.length > 0 ? (
        <>
          <div className="h-96 mb-8">
            <DynamicMap 
              center={[19.0760, 72.8777]} // We can make this dynamic per city later
              providers={providers.map((p, index) => ({
                id: p.id,
                name: p.name,
                lat: 19.0760 + (Math.random() * 0.05 - 0.025), // Mock coordinates around Mumbai
                lng: 72.8777 + (Math.random() * 0.05 - 0.025),
                rating: p.rating,
                category: p.category.replace('_', ' ')
              }))}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
            {providers.map((p, i) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                key={p.id}
              >
                <Link href={`/${city}/${locality}/${p.slug}`} className="block h-full">
                  <div className="h-full p-6 bg-card rounded-2xl border border-border shadow-sm hover:shadow-lg transition-all group flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-bold text-xl group-hover:text-primary transition-colors">{p.name}</h3>
                      <span className="font-bold bg-muted px-2 py-1 rounded text-sm flex items-center gap-1">
                        ⭐ {p.rating}
                      </span>
                    </div>
                    
                    <span className="inline-block px-2 py-1 bg-primary/10 text-primary text-xs font-bold rounded uppercase mb-3 self-start">
                      {p.category.replace('_', ' ')}
                    </span>
                    
                    <p className="text-muted-foreground line-clamp-2 text-sm flex-grow">{p.description}</p>
                    
                    <div className="mt-6 pt-4 border-t border-border flex justify-between items-center">
                      <span className="text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 px-2 py-1 rounded-full">
                        🟢 Available
                      </span>
                      <span className="text-primary text-sm font-semibold group-hover:underline">View Profile →</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
            </AnimatePresence>
          </div>
        </>
      ) : (
        <div className="p-16 text-center bg-muted/30 rounded-3xl border border-dashed border-border">
          <span className="text-4xl mb-4 block">🏝️</span>
          <h3 className="text-2xl font-bold mb-2">No providers found</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            We couldn't find any {mode} providers in {localityName} yet. They might be fully booked or coming soon!
          </p>
        </div>
      )}
    </div>
  );
}
