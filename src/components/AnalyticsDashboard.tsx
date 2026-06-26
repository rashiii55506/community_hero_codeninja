import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, animate, Variants } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  Clock, 
  Users, 
  BrainCircuit, 
  Activity,
  AlertTriangle,
  Zap,
  CheckCircle2
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { cn } from '../utils';

const CHART_DATA = [
  { name: 'Mon', reported: 120, resolved: 90 },
  { name: 'Tue', reported: 150, resolved: 110 },
  { name: 'Wed', reported: 180, resolved: 160 },
  { name: 'Thu', reported: 140, resolved: 130 },
  { name: 'Fri', reported: 200, resolved: 180 },
  { name: 'Sat', reported: 250, resolved: 220 },
  { name: 'Sun', reported: 210, resolved: 240 },
];

const DEPARTMENTS = [
  { name: 'Water & Sanitation', progress: 92, color: 'bg-blue-500' },
  { name: 'Roads & Highways', progress: 78, color: 'bg-orange-500' },
  { name: 'Power & Electrical', progress: 85, color: 'bg-yellow-500' },
];

const AnimatedCounter = ({ from, to, duration = 2, format = (v: number) => v.toString() }: { from: number, to: number, duration?: number, format?: (v: number) => string }) => {
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const [displayValue, setDisplayValue] = useState(format(from));

  useEffect(() => {
    const controls = animate(count, to, { duration, ease: "easeOut" });
    const unsubscribe = rounded.on("change", (latest) => {
      setDisplayValue(format(latest));
    });
    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [count, to, duration, rounded, format]);

  return <>{displayValue}</>;
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export default function AnalyticsDashboard() {
  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-cyan-500/20 p-3 rounded-xl border border-cyan-500/30">
          <BarChart3 className="w-8 h-8 text-cyan-400" />
        </div>
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">City Analytics Center</h1>
          <p className="text-slate-400 font-medium">Real-time civic intelligence and infrastructure metrics.</p>
        </div>
      </div>

      {/* 1. KPI Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div variants={itemVariants} className="bg-slate-900/50 backdrop-blur-md border border-white/5 p-6 rounded-2xl relative overflow-hidden group hover:border-cyan-500/30 transition-colors">
          <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-40 transition-opacity">
            <Activity className="w-16 h-16 text-cyan-400" />
          </div>
          <div className="flex items-center gap-4 mb-4 relative z-10">
            <div className="bg-cyan-500/20 p-3 rounded-full border border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
              <Activity className="w-6 h-6 text-cyan-400" />
            </div>
            <h3 className="text-slate-400 font-bold uppercase tracking-wider text-xs">Total Issues Reported</h3>
          </div>
          <div className="relative z-10">
            <h2 className="text-4xl font-black text-white mb-2">
              <AnimatedCounter from={0} to={2450} format={(v) => v.toLocaleString()} />
            </h2>
            <div className="flex items-center gap-2 text-emerald-400 text-sm font-bold bg-emerald-500/10 w-fit px-2 py-1 rounded-md">
              <TrendingUp className="w-4 h-4" /> +12% this week
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-slate-900/50 backdrop-blur-md border border-white/5 p-6 rounded-2xl relative overflow-hidden group hover:border-emerald-500/30 transition-colors">
          <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-40 transition-opacity">
            <CheckCircle2 className="w-16 h-16 text-emerald-400" />
          </div>
          <div className="flex items-center gap-4 mb-4 relative z-10">
            <div className="bg-emerald-500/20 p-3 rounded-full border border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
              <CheckCircle2 className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-slate-400 font-bold uppercase tracking-wider text-xs">Resolution Rate</h3>
          </div>
          <div className="relative z-10">
            <h2 className="text-4xl font-black text-white mb-2">
              <AnimatedCounter from={0} to={88} format={(v) => `${v}%`} />
            </h2>
            <div className="flex items-center gap-2 text-emerald-400 text-sm font-bold bg-emerald-500/10 w-fit px-2 py-1 rounded-md">
              <TrendingUp className="w-4 h-4" /> +5% this week
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-slate-900/50 backdrop-blur-md border border-white/5 p-6 rounded-2xl relative overflow-hidden group hover:border-amber-500/30 transition-colors">
          <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-40 transition-opacity">
            <Clock className="w-16 h-16 text-amber-400" />
          </div>
          <div className="flex items-center gap-4 mb-4 relative z-10">
            <div className="bg-amber-500/20 p-3 rounded-full border border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.3)]">
              <Clock className="w-6 h-6 text-amber-400" />
            </div>
            <h3 className="text-slate-400 font-bold uppercase tracking-wider text-xs">Avg. Resolution Time</h3>
          </div>
          <div className="relative z-10">
            <h2 className="text-4xl font-black text-white mb-2">
              <AnimatedCounter from={0} to={14} format={(v) => `${v} Hours`} />
            </h2>
            <div className="flex items-center gap-2 text-emerald-400 text-sm font-bold bg-emerald-500/10 w-fit px-2 py-1 rounded-md">
              <TrendingUp className="w-4 h-4" /> -2 hrs
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-slate-900/50 backdrop-blur-md border border-white/5 p-6 rounded-2xl relative overflow-hidden group hover:border-purple-500/30 transition-colors">
          <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-40 transition-opacity">
            <Users className="w-16 h-16 text-purple-400" />
          </div>
          <div className="flex items-center gap-4 mb-4 relative z-10">
            <div className="bg-purple-500/20 p-3 rounded-full border border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.3)]">
              <Users className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-slate-400 font-bold uppercase tracking-wider text-xs">Active Citizens</h3>
          </div>
          <div className="relative z-10">
            <h2 className="text-4xl font-black text-white mb-2">
              <AnimatedCounter from={0} to={12800} format={(v) => v.toLocaleString()} />
            </h2>
            <div className="flex items-center gap-2 text-slate-400 text-sm font-bold w-fit py-1">
              Currently Engaged
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 2. Main Chart Area */}
        <motion.div variants={itemVariants} className="lg:col-span-2 bg-slate-900/50 backdrop-blur-md border border-white/5 p-6 rounded-2xl flex flex-col min-h-[400px]">
          <h3 className="text-xl font-black text-white mb-6">Issues Reported vs Resolved (Last 7 Days)</h3>
          <div className="flex-1 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={CHART_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorReported" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorResolved" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis stroke="#64748b" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '0.75rem', color: '#f8fafc', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)' }}
                  itemStyle={{ fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="reported" name="Reported" stroke="#06b6d4" strokeWidth={3} fillOpacity={1} fill="url(#colorReported)" />
                <Area type="monotone" dataKey="resolved" name="Resolved" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorResolved)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* 3. AI Insights Panel & Department Performance */}
        <div className="flex flex-col gap-6">
          <motion.div variants={itemVariants} className="bg-slate-900/50 backdrop-blur-md border border-white/5 p-6 rounded-2xl flex-1 border-t-4 border-t-cyan-500">
            <div className="flex items-center gap-3 mb-6">
              <BrainCircuit className="w-6 h-6 text-cyan-400" />
              <h3 className="text-lg font-black text-white">🤖 AI Infrastructure Insights</h3>
            </div>
            
            <div className="space-y-4">
              <div className="bg-slate-950/50 border border-rose-500/20 p-4 rounded-xl flex gap-3 shadow-[inset_4px_0_0_rgba(244,63,94,1)]">
                <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                <p className="text-sm font-medium text-slate-300">High probability of road degradation in Downtown due to recent heavy rains.</p>
              </div>
              
              <div className="bg-slate-950/50 border border-amber-500/20 p-4 rounded-xl flex gap-3 shadow-[inset_4px_0_0_rgba(245,158,11,1)]">
                <Zap className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <p className="text-sm font-medium text-slate-300">Water leak reports increased by 15% in Sector 4. Recommend dispatching inspection team.</p>
              </div>
              
              <div className="bg-slate-950/50 border border-emerald-500/20 p-4 rounded-xl flex gap-3 shadow-[inset_4px_0_0_rgba(16,185,129,1)]">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <p className="text-sm font-medium text-slate-300">Resolution speed for Electrical issues improved by 20% this month.</p>
              </div>
            </div>
          </motion.div>

          {/* 4. Department Performance */}
          <motion.div variants={itemVariants} className="bg-slate-900/50 backdrop-blur-md border border-white/5 p-6 rounded-2xl">
            <h3 className="text-lg font-black text-white mb-6">Department Performance</h3>
            <div className="space-y-6">
              {DEPARTMENTS.map((dept, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-bold text-slate-300">{dept.name}</span>
                    <span className="font-black text-white">{dept.progress}% Resolved</span>
                  </div>
                  <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden">
                    <motion.div 
                      className={cn("h-full rounded-full relative", dept.color)}
                      initial={{ width: 0 }}
                      animate={{ width: `${dept.progress}%` }}
                      transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                    >
                      <div className="absolute inset-0 bg-white/20 w-full h-full animate-[shimmer_2s_infinite]" />
                    </motion.div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
