"use client";

import React from "react";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area 
} from "recharts";
import { EnvironmentalData } from "@/types";

interface AnalyticsChartsProps {
  data: EnvironmentalData[];
}

export const AnalyticsCharts = ({ data }: AnalyticsChartsProps) => {
  // Process data for charts
  const chartData = data.slice().reverse().map(d => ({
    time: new Date(d.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    rainfall: d.rainfall_mm,
    moisture: d.soil_moisture_percent,
    displacement: d.displacement_score * 10, // Scaled for visibility
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
      <div className="glass-card p-4">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
          Precipitation Trends (CHIRPS)
        </h3>
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorRain" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
              <XAxis dataKey="time" stroke="#ffffff30" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis stroke="#ffffff30" fontSize={10} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: "#0f172a", border: "1px solid #ffffff10", borderRadius: "8px", fontSize: "12px" }}
                itemStyle={{ color: "#06b6d4" }}
              />
              <Area type="monotone" dataKey="rainfall" stroke="#06b6d4" fillOpacity={1} fill="url(#colorRain)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="glass-card p-4">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
          Soil Saturation Evolution
        </h3>
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
              <XAxis dataKey="time" stroke="#ffffff30" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis stroke="#ffffff30" fontSize={10} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: "#0f172a", border: "1px solid #ffffff10", borderRadius: "8px", fontSize: "12px" }}
                itemStyle={{ color: "#f97316" }}
              />
              <Line type="monotone" dataKey="moisture" stroke="#f97316" strokeWidth={2} dot={false} activeDot={{ r: 4, fill: "#f97316" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
