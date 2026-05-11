"use client";

import React, { useState, useEffect } from "react";
import { apiService } from "@/services/api";
import { Sector, EnvironmentalData } from "@/types";
import { motion } from "framer-motion";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, PieChart, Pie, Cell 
} from "recharts";
import { BarChart4, Filter, Calendar, Download } from "lucide-react";

export default function AnalyticsPage() {
  const [sectors, setSectors] = useState<Sector[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiService.getSectors().then(data => {
      setSectors(data);
      setLoading(false);
    });
  }, []);

  const pieData = [
    { name: 'Critical', value: sectors.filter(s => s.current_risk_level === 'CRITICAL').length, color: '#ef4444' },
    { name: 'High', value: sectors.filter(s => s.current_risk_level === 'HIGH').length, color: '#f97316' },
    { name: 'Moderate', value: sectors.filter(s => s.current_risk_level === 'MODERATE').length, color: '#eab308' },
    { name: 'Low', value: sectors.filter(s => s.current_risk_level === 'LOW').length, color: '#06b6d4' },
  ].filter(d => d.value > 0);

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight text-glow-cyan">National Risk Analytics</h1>
          <p className="text-slate-400 text-sm mt-1">Aggregated environmental trends and risk distribution across all monitored sectors.</p>
        </div>
        
        <div className="flex gap-3">
          <div className="glass px-4 py-2 rounded-xl flex items-center gap-2 text-xs text-slate-400">
            <Calendar className="w-4 h-4" /> LAST 24 HOURS
          </div>
          <button className="bg-cyan-500 text-slate-900 px-6 py-2 rounded-xl text-xs font-bold hover:bg-cyan-400 transition-colors">
            GENERATE REPORT
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Risk Distribution Pie */}
        <div className="glass-card p-6 flex flex-col items-center">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-8 w-full">Risk Distribution</h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: "#0f172a", border: "1px solid #ffffff10", borderRadius: "8px", fontSize: "12px" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4 w-full">
            {pieData.map(d => (
              <div key={d.name} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }} />
                <span className="text-[10px] text-slate-400 uppercase font-bold">{d.name} ({d.value})</span>
              </div>
            ))}
          </div>
        </div>

        {/* Risk Score Comparison */}
        <div className="lg:col-span-2 glass-card p-6">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-8">Regional Risk Score Comparison</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sectors}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis dataKey="name" stroke="#ffffff30" fontSize={10} axisLine={false} tickLine={false} />
                <YAxis stroke="#ffffff30" fontSize={10} axisLine={false} tickLine={false} />
                <Tooltip 
                  cursor={{ fill: '#ffffff05' }}
                  contentStyle={{ backgroundColor: "#0f172a", border: "1px solid #ffffff10", borderRadius: "8px", fontSize: "12px" }}
                />
                <Bar dataKey="current_risk_score" fill="#06b6d4" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="glass-card p-6">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Environmental Correlation Analysis</h3>
          <div className="flex gap-4 text-[10px] font-bold">
            <span className="text-cyan-400">RAINFALL (MM)</span>
            <span className="text-orange-400">SLOPE FACTOR</span>
          </div>
        </div>
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={sectors}>
              <defs>
                <linearGradient id="rainGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
              <XAxis dataKey="name" stroke="#ffffff30" fontSize={10} />
              <YAxis stroke="#ffffff30" fontSize={10} />
              <Tooltip 
                contentStyle={{ backgroundColor: "#0f172a", border: "1px solid #ffffff10", borderRadius: "8px", fontSize: "12px" }}
              />
              <Area type="monotone" dataKey="slope_factor" stroke="#f97316" fill="transparent" strokeWidth={2} />
              <Area type="monotone" dataKey="current_risk_score" stroke="#06b6d4" fill="url(#rainGrad)" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
