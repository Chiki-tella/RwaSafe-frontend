"use client";

import React, { useEffect, useState, useRef } from "react";
import { Terminal, Send, CheckCircle2, AlertCircle, RefreshCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SMSLog {
  id: number;
  recipient: string;
  provider: string;
  status: "SENT" | "FAILED" | "RETRYING";
  timestamp: string;
}

export const SMSMonitor = () => {
  const [logs, setLogs] = useState<SMSLog[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Mock initial data
  useEffect(() => {
    const initialLogs: SMSLog[] = [
      { id: 1, recipient: "+25078****01", provider: "Africa's Talking", status: "SENT", timestamp: new Date().toISOString() },
      { id: 2, recipient: "+25078****02", provider: "Africa's Talking", status: "SENT", timestamp: new Date().toISOString() },
      { id: 3, recipient: "+25078****03", provider: "Africa's Talking", status: "FAILED", timestamp: new Date().toISOString() },
      { id: 4, recipient: "+25078****03", provider: "Twilio (Failover)", status: "RETRYING", timestamp: new Date().toISOString() },
    ];
    setLogs(initialLogs);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="glass-card flex flex-col h-full font-mono">
      <div className="p-3 border-b border-white/10 flex items-center gap-2 bg-slate-900/40">
        <Terminal className="w-4 h-4 text-cyan-400" />
        <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">Emergency SMS Gateway</span>
        <div className="flex gap-1 ml-auto">
          <div className="w-2 h-2 rounded-full bg-red-500/50" />
          <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
          <div className="w-2 h-2 rounded-full bg-green-500/50" />
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-2 bg-black/40 text-[11px]">
        <div className="text-slate-500 mb-4">[SYSTEM] Initializing SMS dispatch pipeline...</div>
        
        <AnimatePresence>
          {logs.map((log) => (
            <motion.div 
              key={log.id}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-start gap-3 border-l-2 border-white/5 pl-3 py-1"
            >
              <span className="text-slate-600">[{new Date(log.timestamp).toLocaleTimeString()}]</span>
              <span className="text-cyan-500">DISPATCH</span>
              <span className="text-slate-300">TO: {log.recipient}</span>
              <span className="text-slate-500">via {log.provider}</span>
              
              <div className="ml-auto flex items-center gap-1.5">
                {log.status === "SENT" && (
                  <>
                    <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                    <span className="text-emerald-500">OK</span>
                  </>
                )}
                {log.status === "FAILED" && (
                  <>
                    <AlertCircle className="w-3 h-3 text-red-500" />
                    <span className="text-red-500">ERR</span>
                  </>
                )}
                {log.status === "RETRYING" && (
                  <>
                    <RefreshCcw className="w-3 h-3 text-orange-500 animate-spin" />
                    <span className="text-orange-500">RETRY</span>
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        <div className="animate-pulse inline-block w-2 h-4 bg-cyan-500/50 ml-1 translate-y-1" />
      </div>

      <div className="p-2 border-t border-white/5 bg-slate-900/20 text-[9px] text-slate-500 flex justify-between">
        <span>GATEWAY_STATUS: ACTIVE</span>
        <span>LATENCY: 42ms</span>
      </div>
    </div>
  );
};
