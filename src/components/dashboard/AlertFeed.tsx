"use client";

import React from "react";
import { Alert } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Clock, MapPin, Send } from "lucide-react";

interface AlertFeedProps {
  alerts: Alert[];
}

export const AlertFeed = ({ alerts }: AlertFeedProps) => {
  return (
    <div className="glass-card flex flex-col h-full">
      <div className="p-4 border-b border-white/10 flex justify-between items-center">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-orange-400" />
          LIVE DISASTER FEED
        </h3>
        <span className="text-[10px] text-slate-400 uppercase tracking-widest">{alerts.length} ACTIVE</span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        <AnimatePresence mode="popLayout">
          {alerts.length === 0 ? (
            <div className="h-full flex items-center justify-center text-slate-500 text-sm italic">
              No active alerts detected.
            </div>
          ) : (
            alerts.map((alert) => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={`p-4 rounded-lg border relative overflow-hidden ${
                  alert.risk_level === "CRITICAL" 
                  ? "bg-red-500/10 border-red-500/30" 
                  : "bg-orange-500/10 border-orange-500/30"
                }`}
              >
                {alert.risk_level === "CRITICAL" && (
                  <div className="absolute top-0 right-0 w-16 h-16 -mr-8 -mt-8 bg-red-500/20 blur-2xl animate-pulse" />
                )}

                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <MapPin className={`w-3 h-3 ${alert.risk_level === "CRITICAL" ? "text-red-400" : "text-orange-400"}`} />
                    <span className="text-xs font-bold text-white uppercase tracking-wider">{alert.sector?.name || `Sector ${alert.sector_id}`}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-slate-400 font-mono">
                    <Clock className="w-3 h-3" />
                    {new Date(alert.timestamp).toLocaleTimeString()}
                  </div>
                </div>

                <p className="text-sm text-slate-100 font-medium leading-relaxed mb-3">
                  {alert.message_en}
                </p>

                <div className="flex justify-between items-center mt-4">
                  <div className="flex items-center gap-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-900/50 border border-white/10">
                    <Send className="w-3 h-3 text-cyan-400" />
                    <span className="text-slate-300">SMS DISPATCHED</span>
                  </div>
                  <span className={`text-[9px] font-black uppercase tracking-tighter px-2 py-0.5 rounded ${
                    alert.risk_level === "CRITICAL" ? "bg-red-500 text-white" : "bg-orange-500 text-white"
                  }`}>
                    {alert.risk_level}
                  </span>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
