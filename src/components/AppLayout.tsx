import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, Coins, Map as MapIcon, Layers, Trophy, AlertOctagon, Building2, User } from 'lucide-react';
import { cn } from '../utils';
import { useHapticFeedback } from '../hooks/useHapticFeedback';
import FloatingAICompanion from './FloatingAICompanion';

import CommunityHeroLogo from './CommunityHeroLogo';

interface AppLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: any) => void;
}

export default function AppLayout({ children, activeTab, setActiveTab }: AppLayoutProps) {
  const { trigger } = useHapticFeedback();

  const handleTabChange = (tabId: string) => {
    if (tabId !== activeTab) {
      trigger(15);
    }
    setActiveTab(tabId);
  };

  const navItems = [
    { id: 'validation', label: 'Verify Feed', icon: Layers },
    { id: 'map', label: 'City Impact', icon: MapIcon },
    { id: 'report', label: 'Report Issue', icon: AlertOctagon },
    { id: 'rewards', label: 'Rewards', icon: Trophy },
    { id: 'dashboard', label: 'City Council', icon: Building2 },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-emerald-500/30 overflow-hidden flex flex-col md:flex-row relative">
      {/* 1. Dynamic "Living" Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center">
        {/* Emerald Orb */}
        <motion.div 
          animate={{ x: [-50, 50, -50], y: [-20, 20, -20] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] left-[20%] w-[40vw] h-[40vw] rounded-full bg-emerald-600/10 blur-[120px]"
        />
        {/* Amber Orb */}
        <motion.div 
          animate={{ x: [50, -50, 50], y: [30, -30, 30] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[20%] right-[10%] w-[35vw] h-[35vw] rounded-full bg-amber-600/10 blur-[120px]"
        />
        {/* Deep Indigo Orb */}
        <motion.div 
          animate={{ x: [-30, 30, -30], y: [40, -40, 40] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[50vw] h-[50vw] rounded-full bg-indigo-600/10 blur-[150px]"
        />
      </div>

      {/* Desktop Sidebar (Collapsed by default, expands on hover) */}
      <aside className="hidden md:flex flex-col w-20 hover:w-64 transition-all duration-300 bg-slate-900/50 backdrop-blur-xl border-r border-slate-800 z-40 relative group overflow-hidden shrink-0">
        <div className="h-16 flex items-center justify-center group-hover:justify-start group-hover:px-4 border-b border-slate-800 overflow-hidden">
           <CommunityHeroLogo size="sm" showText={true} className="[&>div:last-child]:opacity-0 [&>div:last-child]:group-hover:opacity-100 [&>div:last-child]:transition-opacity" />
        </div>
        <div className="flex-1 py-6 flex flex-col gap-2 px-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabChange(item.id)}
                className={cn(
                  "flex items-center p-3 rounded-xl transition-all relative overflow-hidden group/btn",
                  isActive ? "bg-slate-800 text-emerald-400" : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
                )}
              >
                {isActive && <motion.div layoutId="active-nav-bg" className="absolute inset-0 bg-emerald-500/10 border border-emerald-500/20 rounded-xl" />}
                <Icon className={cn("w-6 h-6 shrink-0 relative z-10", isActive ? "text-emerald-400" : "text-slate-500 group-hover/btn:text-slate-300")} />
                <span className="ml-4 font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity relative z-10">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </aside>

      <div className="flex-1 flex flex-col relative z-10 min-w-0">
        {/* 2. The "Omnipresent Gamification" Top Bar */}
        <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-900/50 border-b border-slate-800/50 h-16 sm:h-20 flex items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 md:hidden">
            <CommunityHeroLogo size="sm" />
          </div>
          
          <div className="hidden md:block">
            {/* Empty space to balance the header on desktop since logo is in sidebar */}
          </div>

          <div className="flex items-center gap-4">
            {/* Impact Wallet Pill */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-full py-1.5 px-3 sm:py-2 sm:px-4 flex items-center gap-3 shadow-lg backdrop-blur-md">
              <div className="relative flex items-center justify-center">
                {/* Circular Progress Ring (SVG) */}
                <svg className="w-8 h-8 sm:w-10 sm:h-10 -rotate-90 transform" viewBox="0 0 36 36">
                  <path className="text-slate-800" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                  <path className="text-amber-400" strokeDasharray="75, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <ShieldAlert className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
                </div>
              </div>
              <div>
                <p className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">Impact Wallet</p>
                <p className="text-sm sm:text-base font-black text-amber-400 leading-none">1,250 <span className="text-xs text-amber-500/70">XP</span></p>
              </div>
            </div>

            {/* Profile Avatar Button */}
            <button 
              onClick={() => handleTabChange('profile')}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-slate-700 hover:border-emerald-500 overflow-hidden transition-all shadow-lg active:scale-95 shrink-0 relative group"
            >
              <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200" alt="Profile" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <User className="w-5 h-5 text-emerald-400" />
              </div>
            </button>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6 lg:p-8 pb-24 md:pb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.98 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="h-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* 3. The Floating "City AI Agent" Companion */}
      <FloatingAICompanion />

      {/* 4. Immersive Mobile-First Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-50 px-4 pb-4 pt-2 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent pointer-events-none">
        <nav className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-2 flex items-center justify-between shadow-2xl pointer-events-auto relative">
          
          <MobileNavItem id="validation" icon={Layers} label="Verify Feed" activeTab={activeTab} setActiveTab={handleTabChange} />
          <MobileNavItem id="map" icon={MapIcon} label="City Impact" activeTab={activeTab} setActiveTab={handleTabChange} />
          
          {/* Center Prominent Report Button */}
          <div className="px-2 -mt-8 relative z-10">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => handleTabChange('report')}
              className={cn(
                "w-16 h-16 rounded-full flex items-center justify-center shadow-xl border-4 border-slate-900 transition-colors",
                activeTab === 'report' ? "bg-emerald-500 text-slate-950 shadow-[0_0_20px_rgba(16,185,129,0.5)]" : "bg-slate-800 text-emerald-400 hover:bg-slate-700"
              )}
            >
              <AlertOctagon className={cn("w-7 h-7", activeTab === 'report' ? "fill-slate-950/20" : "")} />
            </motion.button>
          </div>

          <MobileNavItem id="rewards" icon={Trophy} label="Rewards" activeTab={activeTab} setActiveTab={handleTabChange} />
          <MobileNavItem id="profile" icon={User} label="Profile" activeTab={activeTab} setActiveTab={handleTabChange} />
        </nav>
      </div>
    </div>
  );
}

function MobileNavItem({ id, icon: Icon, label, activeTab, setActiveTab }: any) {
  const isActive = activeTab === id;
  return (
    <button 
      onClick={() => setActiveTab(id)}
      className="flex-1 flex flex-col items-center justify-center gap-1 py-1 relative group"
    >
      <div className="relative">
        <Icon className={cn("w-6 h-6 transition-colors relative z-10", isActive ? "text-emerald-400" : "text-slate-500")} />
        {isActive && (
          <motion.div layoutId="mobile-active-glow" className="absolute inset-0 bg-emerald-400/20 blur-md rounded-full" />
        )}
      </div>
      <span className={cn("text-[10px] font-bold transition-colors", isActive ? "text-emerald-400" : "text-slate-500")}>
        {label}
      </span>
      {isActive && (
        <motion.div layoutId="mobile-active-underline" className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-emerald-400 rounded-t-full" />
      )}
    </button>
  );
}
