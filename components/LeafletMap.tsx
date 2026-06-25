"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default Leaflet marker icons in Next.js
const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// A component to recenter the map when the center prop changes
function ChangeView({ center, zoom }: { center: [number, number], zoom: number }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

interface ProviderLocation {
  id: string;
  name: string;
  lat: number;
  lng: number;
  rating: number;
  category: string;
  city: string;
  locality: string;
}

export default function LeafletMap({
  center = [19.0760, 72.8777], // Default to Mumbai
  providers = [],
}: {
  center?: [number, number];
  providers?: ProviderLocation[];
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-full h-full bg-muted flex items-center justify-center animate-pulse rounded-3xl">Loading Map...</div>;
  }

  return (
    <div className="w-full h-full rounded-3xl overflow-hidden border border-border relative z-0">
      <MapContainer 
        center={center} 
        zoom={14} 
        scrollWheelZoom={false} 
        className="w-full h-full"
      >
        <ChangeView center={center} zoom={14} />
        {/* Using CartoDB Positron for a cleaner, premium startup look (free, no API key) */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        
        {providers.map((p) => (
          <Marker key={p.id} position={[p.lat, p.lng]} icon={customIcon}>
            <Popup className="rounded-xl">
              <div className="font-sans">
                <h3 className="font-bold text-sm mb-1">{p.name}</h3>
                <p className="text-xs text-muted-foreground">{p.category} • ⭐ {p.rating}</p>
                <a href={`/${p.city}/${p.locality}/${p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}>
                  <button className="mt-2 w-full bg-primary text-primary-foreground text-xs py-2 rounded-lg font-bold hover:brightness-110 transition-all shadow-md">
                    View Profile
                  </button>
                </a>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
