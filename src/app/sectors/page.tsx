"use client";

import React, { useState, useEffect } from "react";
import { apiService } from "@/services/api";
import { Sector } from "@/types";
import { motion } from "framer-motion";
import { Search, MapPin, TrendingUp, Users, ChevronRight } from "lucide-react";

export default function SectorsPage() {
  const [sectors, setSectors] = useState<Sector[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiService.getSectors().then(data => {
      setSectors(data);
      setLoading(false);
    });
  }, []);

  const filteredSectors = sectors.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.province.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Sector Intelligence</h1>
          <p className="text-slate-400 text-sm mt-1">Detailed regional risk monitoring and slope stability analysis.</p>
        </div>

        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input 
            type="text"
            placeholder="Search by name or province..."
            className="w-full bg-slate-900/50 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500/50 transition-all"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSectors.map((sector, i) => (
          <motion.div
            key={sector.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass-card group cursor-pointer"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center group-hover:glow-cyan transition-all">
                  <MapPin className="w-6 h-6 text-cyan-400" />
                </div>
                <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                  sector.current_risk_level === 'CRITICAL' ? 'bg-red-500 text-white' :
                  sector.current_risk_level === 'HIGH' ? 'bg-orange-500 text-white' :
                  'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                }`}>
                  {sector.current_risk_level}
                </div>
              </div>

              <h3 className="text-xl font-bold text-white mb-1">{sector.name}</h3>
              <p className="text-slate-400 text-xs uppercase tracking-widest mb-6">{sector.province} Province</p>

              <div className="grid grid-cols-2 gap-4 py-4 border-y border-white/5">
                <div>
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-500 uppercase tracking-wider mb-1">
                    <TrendingUp className="w-3 h-3" />
                    Risk Score
                  </div>
                  <div className="text-lg font-mono font-bold text-white">{sector.current_risk_score}</div>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-500 uppercase tracking-wider mb-1">
                    <Users className="w-3 h-3" />
                    Population
                  </div>
                  <div className="text-lg font-mono font-bold text-white">{sector.population_estimate.toLocaleString()}</div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between text-xs font-medium text-cyan-400 group-hover:gap-2 transition-all">
                <span>VIEW DETAILED ANALYSIS</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
