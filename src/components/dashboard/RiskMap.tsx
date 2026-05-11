"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Sector } from "@/types";
import "leaflet/dist/leaflet.css";

const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false }) as any;
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false }) as any;
const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false }) as any;
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false }) as any;
const CircleMarker = dynamic(() => import("react-leaflet").then((mod) => mod.CircleMarker), { ssr: false }) as any;

interface RiskMapProps {
  sectors: Sector[];
}

const sectorCoordinates: Record<string, [number, number]> = {
  "Rubavu": [-1.6917, 29.3517],
  "Rutsiro": [-1.9333, 29.3167],
  "Nyabihu": [-1.6500, 29.5000],
  "Musanze": [-1.5000, 29.6333],
  "Burera": [-1.4833, 29.8167],
};

export const RiskMap = ({ sectors }: RiskMapProps) => {
  const getRiskColor = (level: string) => {
    switch (level) {
      case "CRITICAL": return "#ef4444";
      case "HIGH": return "#f97316";
      case "MODERATE": return "#eab308";
      case "LOW": return "#06b6d4";
      default: return "#94a3b8";
    }
  };

  return (
    <div className="w-full h-full glass-card relative min-h-[500px]">
      <div className="absolute top-4 left-4 z-[1000] glass px-4 py-2 rounded-lg border border-white/10">
        <h3 className="text-white text-sm font-bold flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
          NATIONAL RISK VISUALIZATION
        </h3>
      </div>

      <MapContainer 
        center={[-1.9403, 29.8739]} 
        zoom={9} 
        scrollWheelZoom={false}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        
        {sectors.map((sector) => {
          const coords = sectorCoordinates[sector.name] || [-1.9403, 29.8739];
          const riskColor = getRiskColor(sector.current_risk_level);
          
          return (
            <CircleMarker
              key={sector.id}
              center={coords}
              radius={sector.current_risk_level === "CRITICAL" ? 15 : 10}
              pathOptions={{
                fillColor: riskColor,
                fillOpacity: 0.6,
                color: riskColor,
                weight: 2,
              }}
            >
              <Popup>
                <div className="p-2 min-w-[200px] bg-slate-900 text-white rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-bold text-lg">{sector.name}</h4>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full`} style={{ backgroundColor: `${riskColor}33`, color: riskColor, border: `1px solid ${riskColor}55` }}>
                      {sector.current_risk_level}
                    </span>
                  </div>
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between text-slate-400">
                      <span>Risk Score:</span>
                      <span className="text-white font-mono">{sector.current_risk_score}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Slope Factor:</span>
                      <span className="text-white font-mono">{sector.slope_factor}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Population:</span>
                      <span className="text-white font-mono">{sector.population_estimate.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="mt-3 pt-2 border-t border-white/10 text-[10px] text-slate-500 italic">
                    Last update: {new Date(sector.last_updated).toLocaleString()}
                  </div>
                </div>
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>

      <div className="absolute bottom-4 right-4 z-[1000] glass px-4 py-2 rounded-lg border border-white/10 text-[10px]">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500" />
            <span className="text-slate-300">CRITICAL</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-orange-500" />
            <span className="text-slate-300">HIGH RISK</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-yellow-500" />
            <span className="text-slate-300">MODERATE</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-cyan-500" />
            <span className="text-slate-300">STABLE</span>
          </div>
        </div>
      </div>
    </div>
  );
};
