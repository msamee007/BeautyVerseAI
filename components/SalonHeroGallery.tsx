"use client";

import React, { useState } from "react";
import { Play, Image as ImageIcon, Star, MapPin } from "lucide-react";

export function SalonHeroGallery({ category, salonName }: { category: string, salonName: string }) {
  const [activeTab, setActiveTab] = useState<"photos" | "video">("photos");

  const getImages = () => {
    if (category === "male") {
      return [
        "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?q=80&w=800&auto=format&fit=crop"
      ];
    } else if (category === "pet") {
      return [
        "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1597626133663-cb34ae92318d?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=800&auto=format&fit=crop"
      ];
    } else {
      // Female
      return [
        "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1512413914421-4d3753549646?q=80&w=800&auto=format&fit=crop"
      ];
    }
  };

  const images = getImages();

  return (
    <div className="w-full relative rounded-3xl overflow-hidden bg-card border border-border shadow-xl">
      {/* Top Controls */}
      <div className="absolute top-6 right-6 z-20 flex gap-2">
        <button 
          onClick={() => setActiveTab("photos")}
          className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm backdrop-blur-md transition-all ${activeTab === "photos" ? "bg-white text-black" : "bg-black/50 text-white hover:bg-black/70"}`}
        >
          <ImageIcon className="w-4 h-4" /> Photos
        </button>
        <button 
          onClick={() => setActiveTab("video")}
          className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm backdrop-blur-md transition-all ${activeTab === "video" ? "bg-white text-black" : "bg-black/50 text-white hover:bg-black/70"}`}
        >
          <Play className="w-4 h-4" /> Virtual Tour
        </button>
      </div>

      <div className="h-[500px] md:h-[600px] w-full relative">
        {activeTab === "photos" ? (
          <div className="grid grid-cols-4 grid-rows-2 h-full gap-2 p-2 bg-muted/50">
            {/* Main Featured Image */}
            <div className="col-span-4 md:col-span-2 row-span-2 relative group overflow-hidden rounded-2xl cursor-pointer">
              <img src={images[0]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Main Salon View" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            
            {/* Top Right */}
            <div className="hidden md:block col-span-2 row-span-1 relative group overflow-hidden rounded-2xl cursor-pointer">
              <img src={images[1]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Interior View 2" />
            </div>

            {/* Bottom Right 1 */}
            <div className="hidden md:block col-span-1 row-span-1 relative group overflow-hidden rounded-2xl cursor-pointer">
              <img src={images[2]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Interior View 3" />
            </div>

            {/* Bottom Right 2 - With Overlay */}
            <div className="hidden md:block col-span-1 row-span-1 relative group overflow-hidden rounded-2xl cursor-pointer">
              <img src={images[3]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Interior View 4" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center hover:bg-black/60 transition-colors">
                <span className="text-white font-bold text-lg flex items-center gap-2">
                  <ImageIcon className="w-5 h-5" /> +12 Photos
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full h-full relative bg-black flex items-center justify-center">
            {/* Video Placeholder */}
            <img src={images[0]} className="w-full h-full object-cover opacity-50 blur-sm" alt="Video Background" />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center cursor-pointer hover:bg-white/30 hover:scale-110 transition-all border border-white/40 shadow-2xl">
                <Play className="w-8 h-8 text-white ml-1" />
              </div>
              <p className="text-white mt-4 font-bold tracking-widest uppercase text-sm">Play Virtual Tour</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
