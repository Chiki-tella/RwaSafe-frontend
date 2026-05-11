"use client";

import React, { useState } from "react";
import { Settings, Shield, Bell, Save, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

export default function SettingsPage() {
  const [thresholds, setThresholds] = useState({
    rainfall: 100,
    moisture: 80,
    displacement: 5
  });

  return (
    <div className="p-8 max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">System Configuration</h1>
        <p className="text-slate-400 text-sm mt-1">Adjust risk classification thresholds and emergency dispatch sensitivity.</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="glass-card p-8 space-y-8">
          <div className="flex items-center gap-3 border-b border-white/5 pb-6">
            <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/20">
              <Shield className="w-6 h-6 text-orange-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Risk Engine Sensitivity</h2>
              <p className="text-xs text-slate-500">Define the environmental values that trigger HIGH and CRITICAL alerts.</p>
            </div>
          </div>

          <div className="space-y-10">
            {/* Rainfall Slider */}
            <div className="space-y-4">
              <div className="flex justify-between">
                <label className="text-sm font-bold text-slate-300">Rainfall Threshold (mm)</label>
                <span className="text-sm font-mono text-cyan-400">{thresholds.rainfall} mm</span>
              </div>
              <input 
                type="range" min="50" max="250" 
                value={thresholds.rainfall}
                onChange={(e) => setThresholds({...thresholds, rainfall: parseInt(e.target.value)})}
                className="w-full accent-cyan-500" 
              />
              <p className="text-[10px] text-slate-500">Triggers an alert if rainfall exceeds this value over a 24-hour period.</p>
            </div>

            {/* Moisture Slider */}
            <div className="space-y-4">
              <div className="flex justify-between">
                <label className="text-sm font-bold text-slate-300">Soil Moisture (%)</label>
                <span className="text-sm font-mono text-cyan-400">{thresholds.moisture}%</span>
              </div>
              <input 
                type="range" min="50" max="100" 
                value={thresholds.moisture}
                onChange={(e) => setThresholds({...thresholds, moisture: parseInt(e.target.value)})}
                className="w-full accent-cyan-500" 
              />
              <p className="text-[10px] text-slate-500">Critical saturation level detected by NASA SMAP satellites.</p>
            </div>

            {/* Displacement Slider */}
            <div className="space-y-4">
              <div className="flex justify-between">
                <label className="text-sm font-bold text-slate-300">Ground Displacement (Score)</label>
                <span className="text-sm font-mono text-cyan-400">{thresholds.displacement} pts</span>
              </div>
              <input 
                type="range" min="1" max="10" 
                value={thresholds.displacement}
                onChange={(e) => setThresholds({...thresholds, displacement: parseInt(e.target.value)})}
                className="w-full accent-cyan-500" 
              />
              <p className="text-[10px] text-slate-500">Abnormal slope movement detected via Sentinel-1 SAR interferometry.</p>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-6 border-t border-white/5">
            <button className="glass px-6 py-2.5 rounded-xl text-xs font-bold text-slate-400 hover:text-white flex items-center gap-2">
              <RefreshCw className="w-4 h-4" /> RESET TO DEFAULT
            </button>
            <button className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 px-8 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)]">
              <Save className="w-4 h-4" /> SAVE CONFIGURATION
            </button>
          </div>
        </div>

        <div className="glass-card p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
              <Bell className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Automated SMS Dispatch</h3>
              <p className="text-xs text-slate-500">Toggle automatic messaging to high-risk sector residents.</p>
            </div>
          </div>
          <div className="w-12 h-6 bg-cyan-500 rounded-full relative p-1 cursor-pointer">
            <div className="w-4 h-4 bg-white rounded-full ml-auto" />
          </div>
        </div>
      </div>
    </div>
  );
}
