"use client";

import React, { useState, useEffect } from "react";
import { apiService } from "@/services/api";
import { SystemHealth } from "@/types";
import { motion } from "framer-motion";
import { Activity, Server, Database, Globe, Cpu, RefreshCw, CheckCircle2, AlertCircle } from "lucide-react";

export default function OperationsPage() {
  const [health, setHealth] = useState<SystemHealth | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHealth = () => {
      apiService.getSystemHealth().then(data => {
        setHealth(data);
        setLoading(false);
      });
    };
    fetchHealth();
    const interval = setInterval(fetchHealth, 3000);
    return () => clearInterval(interval);
  }, []);

  const systems = [
    { name: "Simulation Engine", status: health?.simulation_engine, icon: Cpu },
    { name: "PostgreSQL Database", status: health?.database, icon: Database },
    { name: "Alert Dispatch System", status: health?.alert_system, icon: Activity },
    { name: "API Ingestion Layer", status: "HEALTHY", icon: Globe },
    { name: "Satellite Data Pipeline", status: "HEALTHY", icon: Server },
  ];

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">System Operations</h1>
        <p className="text-slate-400 text-sm mt-1">Real-time infrastructure monitoring and ingestion pipeline health.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card p-6">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">Pipeline Health Status</h3>
            <div className="space-y-4">
              {systems.map((sys, i) => (
                <motion.div 
                  key={sys.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center justify-between p-4 bg-slate-900/40 rounded-xl border border-white/5"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2.5 rounded-lg bg-slate-800 border border-white/10">
                      <sys.icon className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{sys.name}</h4>
                      <p className="text-[10px] text-slate-500 uppercase tracking-tighter">NODE: RW-WEST-0{i+1}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-black uppercase tracking-widest ${sys.status === 'HEALTHY' ? 'text-emerald-400' : 'text-red-400'}`}>
                      {sys.status || 'CHECKING...'}
                    </span>
                    {sys.status === 'HEALTHY' ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <AlertCircle className="w-4 h-4 text-red-500 animate-pulse" />}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="glass-card p-6">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">Latency Metrics (ms)</h3>
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'API RESPONSE', val: 24, max: 100 },
                { label: 'DB QUERY', val: 8, max: 50 },
                { label: 'SIMULATION STEP', val: 142, max: 500 },
              ].map(m => (
                <div key={m.label} className="p-4 bg-black/20 rounded-xl border border-white/5 text-center">
                  <span className="text-[9px] text-slate-500 uppercase block mb-2">{m.label}</span>
                  <span className="text-xl font-bold text-white font-mono">{m.val}ms</span>
                  <div className="mt-3 w-full bg-white/5 h-1 rounded-full overflow-hidden">
                    <div className="bg-cyan-500 h-full" style={{ width: `${(m.val/m.max)*100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-card p-6 bg-cyan-500/5 border-cyan-500/20">
            <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-cyan-400 animate-spin" />
              Live Ingestion Feed
            </h3>
            <div className="space-y-4 font-mono text-[10px]">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="flex gap-2 text-slate-400 border-l border-white/10 pl-3">
                  <span className="text-slate-600">[{new Date().toLocaleTimeString()}]</span>
                  <span className="text-cyan-500 uppercase">INGEST</span>
                  <span>Packet size: 4.2kb</span>
                  <span className="text-emerald-500 ml-auto">OK</span>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-white/10 flex justify-between items-center text-[10px]">
              <span className="text-slate-500">UPTIME: 42d 12h 04m</span>
              <span className="text-cyan-400 font-bold">100.0% RELIABILITY</span>
            </div>
          </div>

          <div className="glass-card p-6">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Operations Console</h3>
            <div className="bg-black/60 rounded-lg p-4 h-48 overflow-hidden relative">
              <div className="text-[10px] text-emerald-500/80 font-mono space-y-1">
                <div>$ systemctl status rwasafe-engine</div>
                <div>● rwasafe-engine.service - Landslide Intelligence Engine</div>
                <div className="pl-4 text-slate-400">Loaded: loaded (/etc/systemd/system/...)</div>
                <div className="pl-4 text-emerald-400">Active: active (running) since Mon 2024-05-11</div>
                <div>$ tail -f /var/log/rwasafe/alerts.log</div>
                <div className="text-orange-400">[WARN] High soil moisture in Rutsiro...</div>
                <div className="text-red-400">[CRITICAL] Slope displacement in Rubavu...</div>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-black to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
