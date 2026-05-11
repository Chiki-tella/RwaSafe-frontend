"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { RiskMap } from "@/components/dashboard/RiskMap";
import { AlertFeed } from "@/components/dashboard/AlertFeed";
import { EnvIndicators } from "@/components/dashboard/EnvIndicators";
import { AnalyticsCharts } from "@/components/dashboard/AnalyticsCharts";
import { SMSMonitor } from "@/components/dashboard/SMSMonitor";
import { apiService } from "@/services/api";
import { Sector, Alert, DashboardStats, EnvironmentalData } from "@/types";
import { Shield, AlertCircle, Map as MapIcon, Send, Wifi, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";

export default function Dashboard() {
  const [sectors, setSectors] = useState<Sector[]>([]);
  const [activeAlerts, setActiveAlerts] = useState<Alert[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [latestEnv, setLatestEnv] = useState<EnvironmentalData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [sectorsData, alertsData, statsData, envData] = await Promise.all([
          apiService.getSectors(),
          apiService.getActiveAlerts(),
          apiService.getDashboardStats(),
          apiService.getLatestEnvironment()
        ]);
        
        setSectors(sectorsData);
        setActiveAlerts(alertsData);
        setStats(statsData);
        setLatestEnv(envData);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000); // Poll every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const hasCriticalAlert = activeAlerts.some(a => a.risk_level === "CRITICAL");

  if (loading) {
    return (
      <div className="h-screen w-screen bg-background flex flex-col items-center justify-center gap-4">
        <div className="w-16 h-16 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin" />
        <p className="text-cyan-500 font-mono text-sm tracking-widest animate-pulse">INITIALIZING SATELLITE LINKS...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background pt-20 pb-10 px-6 relative">
      <Navbar />

      {/* Emergency Overlay */}
      {hasCriticalAlert && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.4, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="fixed inset-0 pointer-events-none z-[60] border-[10px] border-red-500/50"
        />
      )}

      <div className="max-w-[1600px] mx-auto space-y-6">
        {/* Top Hero Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <MetricCard 
            title="Monitored Sectors" 
            value={stats?.total_sectors || 0} 
            icon={MapIcon} 
            trend={0}
          />
          <MetricCard 
            title="Active Alerts" 
            value={stats?.active_alerts || 0} 
            icon={AlertCircle} 
            color="orange"
            trend={12}
          />
          <MetricCard 
            title="Critical Zones" 
            value={stats?.critical_sectors || 0} 
            icon={Shield} 
            color="red"
            trend={stats?.critical_sectors ? 5 : 0}
          />
          <MetricCard 
            title="SMS Dispatched" 
            value={stats?.sms_sent || 0} 
            icon={Send} 
            color="emerald"
            trend={8}
          />
          <MetricCard 
            title="Avg Rainfall" 
            value={stats?.average_rainfall || 0} 
            label="mm" 
            icon={BarChart3} 
            trend={-2}
          />
          <MetricCard 
            title="System Uptime" 
            value="99.9" 
            label="%" 
            icon={Wifi} 
            color="emerald"
          />
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 h-full">
          {/* Map Section */}
          <div className="xl:col-span-8 space-y-6">
            <div className="h-[600px]">
              <RiskMap sectors={sectors} />
            </div>
            
            <EnvIndicators data={latestEnv[0] || {} as EnvironmentalData} />
            
            <div className="h-[300px]">
              <AnalyticsCharts data={latestEnv} />
            </div>
          </div>

          {/* Sidebar Section */}
          <div className="xl:col-span-4 flex flex-col gap-6">
            <div className="flex-1 min-h-[400px]">
              <AlertFeed alerts={activeAlerts} />
            </div>
            
            <div className="h-[350px]">
              <SMSMonitor />
            </div>

            <div className="glass-card p-4">
              <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Satellite Ingestion Activity</h3>
              <div className="space-y-3">
                {['NASA SMAP', 'Sentinel-1', 'CHIRPS', 'Sentinel-2'].map((sat) => (
                  <div key={sat} className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-300">{sat}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-500 font-mono">STABLE</span>
                      <div className="w-24 h-1 bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-emerald-500" 
                          animate={{ width: ["20%", "80%", "40%", "100%", "20%"] }} 
                          transition={{ duration: 10, repeat: Infinity }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Branding */}
      <div className="mt-12 text-center">
        <p className="text-[10px] text-slate-600 uppercase tracking-[0.5em]">
          Republic of Rwanda — Disaster Intelligence Operations Command
        </p>
      </div>
    </main>
  );
}
