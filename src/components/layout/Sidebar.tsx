"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Map, 
  BellRing, 
  Settings, 
  Activity, 
  ShieldAlert,
  Database,
  BarChart4
} from "lucide-react";
import { cn } from "@/utils/cn";
import { motion } from "framer-motion";

const navItems = [
  { name: "Overview", icon: LayoutDashboard, href: "/" },
  { name: "Sectors", icon: Map, href: "/sectors" },
  { name: "Alert Archive", icon: ShieldAlert, href: "/alerts" },
  { name: "Analytics", icon: BarChart4, href: "/analytics" },
  { name: "Operations", icon: Activity, href: "/ops" },
  { name: "Settings", icon: Settings, href: "/admin" },
];

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-16 bottom-0 w-64 glass border-r border-white/10 z-40 hidden lg:flex flex-col p-4">
      <div className="flex-1 space-y-2">
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] px-3 mb-4">Command Menu</p>
        
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.name} 
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all group relative",
                isActive 
                  ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20" 
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon className={cn(
                "w-5 h-5 transition-transform group-hover:scale-110",
                isActive ? "text-cyan-400" : "text-slate-500"
              )} />
              <span className="text-sm font-medium">{item.name}</span>
              
              {isActive && (
                <motion.div 
                  layoutId="active-pill"
                  className="absolute left-0 w-1 h-6 bg-cyan-500 rounded-r-full"
                />
              )}
            </Link>
          );
        })}
      </div>

      <div className="mt-auto pt-6 border-t border-white/5 space-y-4">
        <div className="glass-card p-3 bg-cyan-500/5">
          <div className="flex items-center gap-2 mb-2">
            <Database className="w-3 h-3 text-cyan-400" />
            <span className="text-[10px] font-bold text-white">DB NODE: RW-01</span>
          </div>
          <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
            <div className="bg-cyan-500 h-full w-[85%]" />
          </div>
          <p className="text-[9px] text-slate-500 mt-2">Storage: 1.2GB / 5.0GB</p>
        </div>
        
        <p className="text-[9px] text-slate-600 text-center uppercase tracking-widest">
          Version 1.0.4-Stable
        </p>
      </div>
    </aside>
  );
};
