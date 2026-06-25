"use client";

import { useState } from 'react';
import Map, { Marker, Popup, NavigationControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Link from 'next/link';

export function MapboxView({ providers, userLocation }: { providers: any[], userLocation?: { lat: number, lng: number } }) {
  const [selectedProvider, setSelectedProvider] = useState<any | null>(null);

  // Default to central India or specific city center if no user location
  const initialViewState = userLocation ? {
    longitude: userLocation.lng,
    latitude: userLocation.lat,
    zoom: 13
  } : {
    longitude: 77.2090, // Delhi Default
    latitude: 28.6139,
    zoom: 11
  };

  return (
    <div className="w-full h-[500px] rounded-3xl overflow-hidden border border-border shadow-md relative">
      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        initialViewState={initialViewState}
        mapStyle="mapbox://styles/mapbox/dark-v11"
      >
        <NavigationControl position="bottom-right" />

        {userLocation && (
          <Marker longitude={userLocation.lng} latitude={userLocation.lat} color="blue" />
        )}

        {providers.map((provider) => (
          <Marker
            key={provider.id}
            longitude={provider.lng}
            latitude={provider.lat}
            onClick={e => {
              e.originalEvent.stopPropagation();
              setSelectedProvider(provider);
            }}
          >
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center cursor-pointer shadow-lg transform hover:scale-110 transition-transform">
              💈
            </div>
          </Marker>
        ))}

        {selectedProvider && (
          <Popup
            longitude={selectedProvider.lng}
            latitude={selectedProvider.lat}
            anchor="bottom"
            onClose={() => setSelectedProvider(null)}
            className="rounded-2xl"
          >
            <div className="p-2 space-y-2 max-w-[200px]">
              <h3 className="font-bold text-gray-900">{selectedProvider.name}</h3>
              <p className="text-xs text-gray-600 line-clamp-2">{selectedProvider.description}</p>
              
              <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-200">
                <span className="text-xs font-bold text-amber-600">⭐ {selectedProvider.rating}</span>
                <span className="text-xs font-medium text-gray-500">{selectedProvider.distance} km</span>
              </div>
              
              <Link href={`/${selectedProvider.city}/${selectedProvider.locality}/${selectedProvider.slug}`}>
                <button className="w-full mt-2 py-1.5 bg-primary text-white text-xs font-bold rounded-md hover:bg-primary/90">
                  Book Now
                </button>
              </Link>
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
}
