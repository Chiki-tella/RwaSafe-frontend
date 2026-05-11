"use client";

import React, { useState, useEffect } from "react";
import { Shield, Clock, Bell, User, Search, Activity } from "lucide-react";
import { motion } from "framer-motion";

export const Navbar = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 glass z-50 px-6 flex items-center justify-between border-b border-white/10">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30 glow-cyan">
          <Shield className="text-cyan-400 w-6 h-6" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-wider text-white">RWASAFE</h1>
          <p className="text-[10px] text-cyan-400 uppercase tracking-[0.2em] font-medium">Landslide Intelligence</p>
        </div>
      </div>

      <div className="hidden md:flex items-center gap-8 px-8 flex-1 max-w-2xl">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search sectors, alerts, or satellite data..."
            className="w-full bg-slate-800/40 border border-white/5 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500/50 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
          <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span className="text-xs font-medium text-emerald-400">SYSTEM ONLINE</span>
        </div>

        <div className="flex items-center gap-2 text-slate-300 border-x border-white/10 px-6">
          <Clock className="w-4 h-4 text-cyan-400" />
          <span className="text-sm font-mono">{time.toLocaleTimeString()}</span>
        </div>

        <div className="flex items-center gap-4">
          <button className="relative p-2 rounded-full hover:bg-white/5 transition-colors">
            <Bell className="w-5 h-5 text-slate-300" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-slate-900"></span>
          </button>
          <div className="flex items-center gap-2 pl-4 border-l border-white/10">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-medium text-white">Operations Comm.</p>
              <p className="text-[10px] text-slate-400">Government Admin</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-slate-700 border border-white/20 flex items-center justify-center">
              <User className="w-4 h-4 text-slate-300" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
