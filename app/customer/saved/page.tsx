"use client";

import Link from "next/link";
import { useTheme } from "@/components/ThemeProvider";

export default function SavedSalonsPage() {
  const { mode, activeCity } = useTheme();
  const getImageUrl = (name: string, area: string) => {
    const hash = (name + area).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    
    const femaleImages = [
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1521590832167-7bfc17484d20?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?q=80&w=800&auto=format&fit=crop"
    ];
    const maleImages = [
      "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=80&w=800&auto=format&fit=crop"
    ];
    const petImages = [
      "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=800&auto=format&fit=crop"
    ];

    if (name.match(/barber|man|alpha|grooming/i)) return maleImages[hash % maleImages.length];
    if (name.match(/pet|paw|dog|cat/i)) return petImages[hash % petImages.length];
    return femaleImages[hash % femaleImages.length];
  };

  const getNames = (modeStr: string, hashVal: number) => {
    if (modeStr === "male") {
      const prefixes = ["Urban", "Alpha", "Classic", "Prime", "Elite"];
      const suffixes = ["Barbers", "Lounge", "Fades", "Cuts", "Studio"];
      return `${prefixes[hashVal % prefixes.length]} ${suffixes[(hashVal + 1) % suffixes.length]}`;
    } else if (modeStr === "pet") {
      const prefixes = ["Paws", "Fluffy", "Hound", "Bark", "Purrfect"];
      const suffixes = ["Spa", "Boutique", "Tails", "Retreat", "Grooming"];
      return `${prefixes[hashVal % prefixes.length]} ${suffixes[(hashVal + 1) % suffixes.length]}`;
    } else {
      const prefixes = ["Grand", "Luxe", "Urban", "Elegance", "Velvet"];
      const suffixes = ["Aesthetic Studio", "Nail Bar", "Glow", "Hair Hub", "Rose Spa"];
      return `${prefixes[hashVal % prefixes.length]} ${suffixes[(hashVal + 1) % suffixes.length]}`;
    }
  };

  const activeLocality = activeCity === "mumbai" ? "Bandra West" :
                         activeCity === "bangalore" ? "Indiranagar" :
                         activeCity === "delhi" ? "Saket" :
                         activeCity === "pune" ? "Kothrud" : "Jubilee Hills";

  const hashStr = activeCity + activeLocality + mode;
  const baseHash = hashStr.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);

  const savedSalons = [
    { id: "1", name: getNames(mode, baseHash), rating: "4.9", city: activeCity, area: activeLocality, img: getImageUrl(getNames(mode, baseHash), activeLocality) },
    { id: "2", name: getNames(mode, baseHash + 1), rating: "4.7", city: activeCity, area: activeLocality, img: getImageUrl(getNames(mode, baseHash + 1), activeLocality) },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h1 className="text-3xl font-bold">Saved Providers</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {savedSalons.map((salon) => (
          <div key={salon.id} className="bg-card border border-border rounded-3xl overflow-hidden hover:shadow-xl transition-shadow group cursor-pointer flex flex-col">
            <div className="h-40 bg-cover bg-center relative" style={{ backgroundImage: `url(${salon.img})` }}>
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              <button className="absolute top-4 right-4 w-10 h-10 bg-background/80 backdrop-blur rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform z-10 text-red-500">
                ❤️
              </button>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-xl group-hover:text-primary transition-colors">{salon.name}</h3>
              </div>
              <p className="text-muted-foreground text-sm mb-4">📍 {salon.area}</p>
              
              <div className="flex items-center gap-2 mb-6">
                <span className="text-yellow-500">⭐</span>
                <span className="font-bold">{salon.rating}</span>
                <span className="bg-green-500/10 text-green-600 px-2 py-1 rounded-md text-xs font-bold ml-auto">Verified</span>
              </div>
              
              <Link href={`/${salon.city}/${salon.area.toLowerCase().replace(/\s+/g, '-')}/${salon.name.toLowerCase().replace(/\s+/g, '-')}`} className="mt-auto">
                <button className="w-full py-2.5 bg-foreground text-background font-bold rounded-xl hover:bg-primary transition-colors">
                  Book Now
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
