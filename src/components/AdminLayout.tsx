import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Inbox, Map, BarChart, Settings, Users } from 'lucide-react';
import { cn } from '../utils';
import AnalyticsDashboard from './AnalyticsDashboard';

// Mock Components
const SmartTriageMock = () => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }} 
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.3 }}
    className="h-full w-full"
  >
    <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-[2rem] p-12 h-full flex flex-col items-center justify-center shadow-2xl relative overflow-hidden group">
      <div className="absolute inset-0 bg-emerald-500/5 group-hover:bg-emerald-500/10 transition-colors pointer-events-none" />
      <Inbox className="w-20 h-20 text-emerald-500/50 mb-6" />
      <h2 className="text-3xl font-black text-white tracking-tight mb-2 relative z-10">Smart Triage Inbox Loaded</h2>
      <p className="text-slate-400 text-lg relative z-10">AI-powered civic issue routing is active.</p>
    </div>
  </motion.div>
);

const CityMapMock = () => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }} 
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.3 }}
    className="h-full w-full"
  >
    <div className="bg-slate-950 border border-slate-800 rounded-[2rem] p-12 h-full flex flex-col items-center justify-center shadow-inner relative overflow-hidden">
      {/* Mock Map Grid Background */}
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
      <Map className="w-24 h-24 text-indigo-500/50 mb-6 relative z-10" />
      <h2 className="text-3xl font-black text-white tracking-tight mb-2 relative z-10">Live City Map Loaded</h2>
      <p className="text-slate-400 text-lg relative z-10">Real-time geospatial hazard tracking is online.</p>
    </div>
  </motion.div>
);

export default function AdminLayout() {
  const [activeTab, setActiveTab] = useState("smart-triage");

  const navItems = [
    { id: "smart-triage", label: "Smart Triage", icon: Inbox },
    { id: "city-map", label: "Live City Map", icon: Map },
    { id: "analytics", label: "Analytics & Reports", icon: BarChart },
  ];

  return (
    <div className="flex h-screen w-full bg-slate-950 font-sans overflow-hidden text-slate-50">
      
      {/* Sidebar Navigation */}
      <aside className="w-72 bg-slate-900/50 border-r border-slate-800 flex flex-col shrink-0 relative z-20 shadow-2xl backdrop-blur-xl">
        {/* Top Brand Area */}
        <div className="h-24 flex items-center px-8 border-b border-slate-800/50">
          <div className="bg-emerald-500/20 p-2.5 rounded-xl border border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.3)] shrink-0">
            <Shield className="w-7 h-7 text-emerald-400" />
          </div>
          <h1 className="ml-4 font-black text-xl tracking-tight text-white leading-tight">
            City Council<br/><span className="text-emerald-400">Command</span>
          </h1>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 py-8 flex flex-col gap-2">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            const Icon = item.icon;
            
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  "flex items-center w-full px-8 py-4 text-left font-bold transition-all duration-300 relative group",
                  isActive 
                    ? "bg-emerald-900/40 border-r-4 border-emerald-500 text-emerald-400 shadow-inner" 
                    : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                )}
              >
                {/* Active indicator glow */}
                {isActive && (
                  <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-transparent to-emerald-500/10 pointer-events-none" />
                )}
                
                <Icon className={cn(
                  "w-5 h-5 mr-4 shrink-0 transition-transform duration-300",
                  isActive ? "scale-110" : "group-hover:scale-110 group-hover:text-emerald-400/50"
                )} />
                <span className="tracking-wide relative z-10">{item.label}</span>
              </button>
            );
          })}
        </nav>
        
        {/* Bottom Profile Area (Optional Polish) */}
        <div className="p-6 border-t border-slate-800/50">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
               <Shield className="w-5 h-5 text-slate-400" />
             </div>
             <div>
               <p className="text-sm font-bold text-slate-200">System Admin</p>
               <p className="text-xs text-slate-500">Secure Session</p>
             </div>
          </div>
        </div>
      </aside>

      {/* Dynamic Content Area */}
      <main className="flex-1 p-8 overflow-y-auto relative bg-slate-950">
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />
        
        <AnimatePresence mode="wait">
          {activeTab === 'smart-triage' && (
            <motion.div key="smart-triage" className="h-full">
              <SmartTriageMock />
            </motion.div>
          )}
          {activeTab === 'city-map' && (
            <motion.div key="city-map" className="h-full">
              <CityMapMock />
            </motion.div>
          )}
          {activeTab === 'analytics' && (
            <motion.div key="analytics" className="h-full">
              <AnalyticsDashboard />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

    </div>
  );
}
