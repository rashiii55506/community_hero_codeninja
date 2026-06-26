import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Droplets, Clock, Coins, Trophy, MapPin, 
  Flame, CheckCircle2, Bot, ArrowRight, Zap 
} from 'lucide-react';
import { cn } from '../utils';
import LiveCityGridMap from './LiveCityGridMap';

// --- MOCK DATA ---

const IMPACT_METRICS = [
  {
    id: 1,
    icon: Droplets,
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/30',
    shadow: 'shadow-[0_0_20px_rgba(34,211,238,0.2)]',
    title: '12,500 Liters of Water Saved',
    subtitle: 'via AI early leak detection',
    animationType: 'wave'
  },
  {
    id: 2,
    icon: Clock,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/30',
    shadow: 'shadow-[0_0_20px_rgba(16,185,129,0.2)]',
    title: '45 Commute Hours Saved',
    subtitle: 'via rapid pothole dispatch',
    animationType: 'pulse'
  },
  {
    id: 3,
    icon: Coins,
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/30',
    shadow: 'shadow-[0_0_20px_rgba(251,191,36,0.2)]',
    title: '₹2.5 Lakhs Civic Funds Optimized',
    subtitle: 'via Micro-tendering',
    animationType: 'sparkle'
  }
];

const MOCK_FEED = [
  { id: 1, type: 'user', text: "🔥 @Rahul_D just verified a Broken Streetlight in Koramangala." },
  { id: 2, type: 'authority', text: "✅ Nagar Nigam fixed 'Deep Pothole' in Sector 4 (Resolution time: 48h)." },
  { id: 3, type: 'ai', text: "🤖 AI just auto-dispatched a Plumber to MG Road." },
  { id: 4, type: 'user', text: "🔥 @Priya_S reported a blocked drain in HSR Layout." },
  { id: 5, type: 'authority', text: "✅ Traffic Police cleared an abandoned vehicle in Indiranagar." }
];

const LEADERBOARD = [
  { id: 1, ward: 'Ward 4: Koramangala', rate: '98%', citizens: '500+', rank: 1, color: 'text-yellow-400', glow: 'shadow-[0_0_20px_rgba(250,204,21,0.3)]', bg: 'bg-yellow-500/10', border: 'border-yellow-500/50' },
  { id: 2, ward: 'Ward 12: Indiranagar', rate: '85%', citizens: '320', rank: 2, color: 'text-slate-300', glow: 'shadow-[0_0_15px_rgba(203,213,225,0.2)]', bg: 'bg-slate-300/10', border: 'border-slate-400/50' },
  { id: 3, ward: 'Ward 8: Whitefield', rate: '72%', citizens: '190', rank: 3, color: 'text-orange-400', glow: 'shadow-[0_0_15px_rgba(249,115,22,0.2)]', bg: 'bg-orange-500/10', border: 'border-orange-500/50' }
];

const MAP_POINTS = [
  { id: 1, top: '30%', left: '40%', status: 'fixed', label: 'Pothole Fixed!' },
  { id: 2, top: '60%', left: '70%', status: 'progress', label: 'AI Triaged' },
  { id: 3, top: '45%', left: '25%', status: 'fixed', label: 'Streetlight Fixed!' },
  { id: 4, top: '75%', left: '45%', status: 'progress', label: 'Crew Dispatched' },
  { id: 5, top: '20%', left: '60%', status: 'progress', label: 'AI Triaged' },
];

export default function ImpactMap() {
  const [liveFeed, setLiveFeed] = useState(MOCK_FEED.slice(0, 3));
  const [feedIndex, setFeedIndex] = useState(3);
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

  // Rotate feed items to simulate live activity
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveFeed(prev => {
        const nextItem = MOCK_FEED[feedIndex % MOCK_FEED.length];
        setFeedIndex(prevIdx => prevIdx + 1);
        return [nextItem, ...prev.slice(0, 3)]; // Keep top 4 items
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [feedIndex]);

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500 pb-12 pt-4 px-4 sm:px-6">
      
      {/* 1. Hero Section: The Real-World Impact */}
      <section>
        <div className="mb-6 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-2">The Real-World Impact</h1>
          <p className="text-slate-400 font-medium">Data translated to actual civic value. You are making a difference.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {IMPACT_METRICS.map((metric) => {
            const Icon = metric.icon;
            return (
              <motion.div 
                key={metric.id}
                whileHover={{ y: -5 }}
                className={cn(
                  "relative bg-slate-900/60 backdrop-blur-xl border rounded-[2rem] p-6 sm:p-8 overflow-hidden group transition-all",
                  metric.border, metric.shadow
                )}
              >
                {/* Glow Background */}
                <div className={cn("absolute -top-20 -right-20 w-40 h-40 blur-[50px] rounded-full pointer-events-none transition-opacity opacity-50 group-hover:opacity-100", metric.bg)} />
                
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6", metric.bg, metric.border, "border")}>
                    {metric.animationType === 'wave' && (
                      <motion.div animate={{ y: [0, -3, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
                        <Icon className={cn("w-7 h-7", metric.color)} />
                      </motion.div>
                    )}
                    {metric.animationType === 'pulse' && (
                      <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
                        <Icon className={cn("w-7 h-7", metric.color)} />
                      </motion.div>
                    )}
                    {metric.animationType === 'sparkle' && (
                      <motion.div animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}>
                        <Icon className={cn("w-7 h-7", metric.color)} />
                      </motion.div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white leading-tight mb-2">{metric.title}</h3>
                    <p className={cn("text-sm font-bold uppercase tracking-wider", metric.color)}>
                      {metric.subtitle}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 2 & 4. Map and Live Feed Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        
        {/* The Stylized City Activity Map */}
        <section className="lg:col-span-2 relative flex flex-col">
          <div className="flex items-center gap-3 mb-6">
            <Zap className="w-6 h-6 text-indigo-400" />
            <h2 className="text-2xl font-black text-white tracking-tight">Live City Grid</h2>
          </div>
          
          <LiveCityGridMap />
        </section>

        {/* Pulse of the City Feed */}
        <section className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-[2rem] p-6 shadow-2xl flex flex-col h-[500px] lg:h-auto overflow-hidden relative">
          <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-slate-900/90 to-transparent pointer-events-none z-10" />
          <div className="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-slate-900/90 to-transparent pointer-events-none z-10" />
          
          <div className="flex items-center gap-3 mb-6 relative z-20">
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
            </div>
            <h2 className="text-xl font-black text-white tracking-tight uppercase">Live Pulse</h2>
          </div>

          <div className="flex-1 overflow-hidden relative pt-2">
            <AnimatePresence initial={false}>
              {liveFeed.map((item, idx) => (
                <motion.div
                  key={`${item.id}-${idx}`}
                  initial={{ opacity: 0, y: -20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="mb-4"
                >
                  <div className="bg-slate-950/50 border border-slate-800/50 rounded-2xl p-4 flex gap-3 text-sm">
                     {item.text}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>
      </div>

      {/* 3. Neighborhood Leaderboard */}
      <section className="bg-slate-900/60 backdrop-blur-md rounded-[2rem] p-6 sm:p-8">
        <h2 className="text-2xl font-black text-white tracking-tight mb-8 text-center sm:text-left">Top Active Neighborhoods This Week 🏆</h2>

        <div className="space-y-4 mb-8">
          <div className="bg-slate-800/50 rounded-xl p-4 text-white text-lg font-bold border border-slate-700 flex items-center shadow-sm">
            🥇 Downtown District - 98% Resolution Rate
          </div>
          <div className="bg-slate-800/50 rounded-xl p-4 text-white text-lg font-bold border border-slate-700 flex items-center shadow-sm">
            🥈 North Avenue - 85% Resolution Rate
          </div>
          <div className="bg-slate-800/50 rounded-xl p-4 text-white text-lg font-bold border border-slate-700 flex items-center shadow-sm">
            🥉 Westside Suburbs - 72% Resolution Rate
          </div>
        </div>

        <button className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-6 py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] active:scale-95 text-lg flex items-center justify-center gap-2">
          Boost Your Neighborhood's Rank 🚀
        </button>
      </section>

    </div>
  );
}
