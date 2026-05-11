"use client";

import React from "react";
import { EnvironmentalData } from "@/types";
import { motion } from "framer-motion";
import { Droplets, Wind, Mountain, Sun } from "lucide-react";

interface EnvIndicatorsProps {
  data: EnvironmentalData;
}

export const EnvIndicators = ({ data }: EnvIndicatorsProps) => {
  const indicators = [
    { label: "Rainfall", value: `${data.rainfall_mm}mm`, icon: Droplets, color: "text-cyan-400", sub: "CHIRPS" },
    { label: "Soil Moisture", value: `${data.soil_moisture_percent}%`, icon: Wind, color: "text-blue-400", sub: "NASA SMAP" },
    { label: "Displacement", value: `${data.displacement_score}`, icon: Mountain, color: "text-orange-400", sub: "Sentinel-1 SAR" },
    { label: "Vegetation", value: `${(data.vegetation_index * 100).toFixed(0)}%`, icon: Sun, color: "text-emerald-400", sub: "Sentinel-2" },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {indicators.map((item, i) => (
        <motion.div 
          key={item.label}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.1 }}
          className="glass-card p-4 flex flex-col items-center text-center group"
        >
          <div className={`mb-3 p-3 rounded-full bg-slate-800/50 border border-white/5 group-hover:scale-110 transition-transform ${item.color}`}>
            <item.icon className="w-6 h-6" />
          </div>
          <span className="text-[10px] text-slate-500 uppercase tracking-[0.2em] mb-1">{item.label}</span>
          <span className="text-xl font-bold text-white mb-1">{item.value}</span>
          <span className="text-[9px] text-slate-600 font-mono uppercase">{item.sub}</span>
        </motion.div>
      ))}
    </div>
  );
};
