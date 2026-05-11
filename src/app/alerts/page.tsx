"use client";

import React, { useState, useEffect } from "react";
import { apiService } from "@/services/api";
import { Alert } from "@/types";
import { motion } from "framer-motion";
import { ShieldAlert, Download, Filter, Search, Clock } from "lucide-react";

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiService.getAlerts().then(data => {
      setAlerts(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Alert Archive</h1>
          <p className="text-slate-400 text-sm mt-1">Full audit trail of all landslide warnings and emergency dispatches.</p>
        </div>

        <div className="flex gap-3">
          <button className="glass px-4 py-2 rounded-xl text-xs font-bold text-slate-300 hover:text-white flex items-center gap-2">
            <Filter className="w-4 h-4" /> FILTER
          </button>
          <button className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-colors">
            <Download className="w-4 h-4" /> EXPORT REPORT
          </button>
        </div>
      </div>

      <div className="glass-card overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-900/50 border-b border-white/10">
              <th className="p-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Timestamp</th>
              <th className="p-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Sector</th>
              <th className="p-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Level</th>
              <th className="p-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Alert Message (EN)</th>
              <th className="p-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">SMS Status</th>
            </tr>
          </thead>
          <tbody>
            {alerts.map((alert, i) => (
              <motion.tr 
                key={alert.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.02 }}
                className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group"
              >
                <td className="p-4 text-xs font-mono text-slate-400">
                  {new Date(alert.timestamp).toLocaleString()}
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                    <span className="text-sm font-bold text-white">{alert.sector?.name || `Sector ${alert.sector_id}`}</span>
                  </div>
                </td>
                <td className="p-4">
                  <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                    alert.risk_level === 'CRITICAL' ? 'bg-red-500 text-white' : 'bg-orange-500 text-white'
                  }`}>
                    {alert.risk_level}
                  </span>
                </td>
                <td className="p-4 text-xs text-slate-300 max-w-md">
                  {alert.message_en}
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                    <span className="text-[10px] font-bold text-emerald-400">SUCCESS</span>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
        
        {alerts.length === 0 && !loading && (
          <div className="p-12 text-center text-slate-500 italic">
            No historical alerts found in the database.
          </div>
        )}
      </div>
    </div>
  );
}
