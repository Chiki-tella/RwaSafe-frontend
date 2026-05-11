"use client";

import React from "react";
import { motion } from "framer-motion";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: number;
  label?: string;
  color?: string;
}

export const MetricCard = ({ title, value, icon: Icon, trend, label, color = "cyan" }: MetricCardProps) => {
  const colorMap: Record<string, string> = {
    cyan: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20 glow-cyan",
    red: "text-red-400 bg-red-500/10 border-red-500/20 glow-red",
    orange: "text-orange-400 bg-orange-500/10 border-orange-500/20",
    emerald: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      className="glass-card p-5 relative group"
    >
      <div className="flex justify-between items-start mb-4">
        <div className={`p-2.5 rounded-xl border ${colorMap[color]}`}>
          <Icon className="w-5 h-5" />
        </div>
        {trend !== undefined && (
          <div className={`flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full ${trend >= 0 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
            {trend >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {Math.abs(trend)}%
          </div>
        )}
      </div>

      <div>
        <h3 className="text-slate-400 text-xs font-medium uppercase tracking-widest mb-1">{title}</h3>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-white tracking-tight">{value}</span>
          {label && <span className="text-slate-500 text-xs">{label}</span>}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent w-full opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.div>
  );
};
