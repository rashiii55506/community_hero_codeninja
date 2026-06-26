import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate, AnimatePresence } from 'framer-motion';
import { Shield, Crown, Lock, CheckCircle2, AlertTriangle, Flame, Sparkles } from 'lucide-react';
import { cn } from '../utils';

export default function XPProgressionDashboard() {
  const [level, setLevel] = useState(0);
  const [currentXP, setCurrentXP] = useState(0);
  const [nextLevelXP, setNextLevelXP] = useState(1000);
  const [showConfetti, setShowConfetti] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Animated counter using Framer Motion
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    const animation = animate(count, currentXP, { duration: 1.5, ease: "easeOut" });
    return animation.stop;
  }, [currentXP, count]);

  const progressPct = Math.min((currentXP / nextLevelXP) * 100, 100);
  const dashOffset = 283 - (283 * progressPct) / 100;

  const handleDemoAddXP = () => {
    const newXP = currentXP + 500;
    if (newXP >= nextLevelXP) {
      const nextLevel = level + 1;
      setLevel(nextLevel);
      setNextLevelXP((prev) => prev + 1000);
      setToastMessage(`🎉 Level Up! You reached Level ${nextLevel}!`);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
    setCurrentXP(newXP);
  };

  const rankTitle = level === 0 ? "Civic Rookie" : "Civic Guardian";

  return (
    <div className="w-full max-w-4xl mx-auto space-y-12 relative pt-12">
      {/* Demo Action Button - Rendered Exactly Once at the top */}
      <div className="absolute top-0 right-0 z-50">
        <button
          onClick={handleDemoAddXP}
          className="bg-transparent hover:bg-slate-800 border border-slate-700 text-slate-400 px-3 py-1.5 rounded-md text-xs font-medium transition-colors flex items-center gap-1.5 hover:text-slate-200"
        >
          <Sparkles className="w-3 h-3" />
          Demo: Earn +500 XP
        </button>
      </div>

      {/* Screen Flash on Level Up/Add XP */}
      <AnimatePresence>
        {showConfetti && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.15 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-emerald-500 pointer-events-none z-40 mix-blend-screen"
            />
            {toastMessage && (
              <motion.div
                initial={{ opacity: 0, y: -50, x: "-50%" }}
                animate={{ opacity: 1, y: 0, x: "-50%" }}
                exit={{ opacity: 0, y: -50, x: "-50%" }}
                className="fixed top-16 left-1/2 z-50 bg-slate-800/90 backdrop-blur-xl border border-emerald-500/50 text-emerald-400 px-6 py-3 rounded-full font-bold shadow-[0_0_30px_rgba(16,185,129,0.3)] flex items-center gap-3"
              >
                <Sparkles className="w-5 h-5" />
                {toastMessage}
              </motion.div>
            )}
          </>
        )}
      </AnimatePresence>

      <section className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/60 rounded-[2.5rem] p-8 sm:p-12 relative overflow-hidden flex flex-col items-center text-center shadow-2xl">
        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />
        
        {/* 1. The Glowing Rank Emblem (Centerpiece) */}
        <div className="relative w-48 h-48 sm:w-56 sm:h-56 mb-6 flex items-center justify-center">
          <motion.div
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 rounded-full shadow-[0_0_50px_rgba(16,185,129,0.2)]"
          />
          
          {/* SVG Progress Ring */}
          <svg className="w-full h-full -rotate-90 drop-shadow-[0_0_15px_rgba(34,211,238,0.4)]" viewBox="0 0 100 100">
            <defs>
              <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#22d3ee" /> {/* Cyan */}
                <stop offset="100%" stopColor="#10b981" /> {/* Emerald */}
              </linearGradient>
            </defs>
            <circle
              className="text-slate-800 stroke-current"
              strokeWidth="8"
              cx="50"
              cy="50"
              r="45"
              fill="transparent"
            />
            <motion.circle
              stroke="url(#ringGradient)"
              strokeWidth="8"
              strokeLinecap="round"
              cx="50"
              cy="50"
              r="45"
              fill="transparent"
              style={{ strokeDasharray: 283, strokeDashoffset: dashOffset }}
            />
          </svg>

          {/* Inner Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-900 border-2 border-slate-700/50 rounded-full flex items-center justify-center shadow-inner relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-emerald-500/20" />
               <Crown className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-400 drop-shadow-[0_0_10px_rgba(16,185,129,0.8)] relative z-10" />
            </div>
            <span className="text-xs sm:text-sm font-black text-slate-300 tracking-widest uppercase">LEVEL {level}</span>
          </div>
        </div>

        <h2 className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-emerald-300 to-emerald-500 mb-2 drop-shadow-[0_2px_10px_rgba(16,185,129,0.3)]">
          {rankTitle}
        </h2>

        {/* 2. The Animated XP Counter */}
        <div className="flex items-baseline gap-2 mb-3">
          <motion.span className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {rounded}
          </motion.span>
          <span className="text-lg font-bold text-slate-500">/ {nextLevelXP.toLocaleString()} XP</span>
        </div>
        <p className="text-sm font-medium text-slate-400 bg-slate-800/50 px-4 py-2 rounded-full border border-slate-700/50">
          <strong className="text-emerald-400">{(nextLevelXP - currentXP).toLocaleString()} XP</strong> needed to reach Level {level + 1}.
        </p>
      </section>

      {/* 3. The "Road to Next Level" Timeline */}
      <section className="bg-slate-900/60 backdrop-blur-md p-6 rounded-2xl sm:p-8">
        <h3 className="text-lg font-black text-white mb-8 tracking-tight">Road to Next Level</h3>
        
        <div className="relative flex justify-between items-center px-4 sm:px-12">
          {/* Track Line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-800 -translate-y-1/2" />
          <motion.div 
            className="absolute top-1/2 left-0 h-1 bg-emerald-500 -translate-y-1/2" 
            initial={{ width: '0%' }}
            animate={{ width: '15%' }}
            transition={{ duration: 1 }}
          />

          {/* Node 1: Current */}
          <div className="relative z-10 flex flex-col items-center gap-3">
            <motion.div layout className="w-12 h-12 bg-emerald-500/20 border-2 border-emerald-400 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.4)] relative">
               <Shield className="w-5 h-5 text-emerald-400" />
               <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center border-2 border-slate-900">
                 <CheckCircle2 className="w-2.5 h-2.5 text-slate-900" />
               </div>
            </motion.div>
            <div className="text-center">
              <motion.p layout className="text-xs font-black text-emerald-400 tracking-wider">LEVEL {level}</motion.p>
              <p className="text-[10px] font-medium text-slate-400 uppercase">Current Rank</p>
            </div>
          </div>

          {/* Node 2: Goal */}
          <div className="relative z-10 flex flex-col items-center gap-3">
             <motion.div layout className="w-12 h-12 bg-slate-800 border-2 border-slate-800 rounded-full flex items-center justify-center shadow-lg transition-colors">
               <Lock className="w-5 h-5 text-slate-500 transition-colors" />
             </motion.div>
             <div className="text-center max-w-[100px]">
              <motion.p layout className="text-xs font-black text-slate-500 tracking-wider">LEVEL {level + 1}</motion.p>
              <p className="text-[10px] font-medium text-slate-500 leading-tight mt-1">Unlocks Next Tier Rewards</p>
            </div>
          </div>

          {/* Node 3: Future */}
          <div className="relative z-10 flex flex-col items-center gap-3">
             <motion.div layout className="w-12 h-12 bg-slate-800 border-2 border-slate-800 rounded-full flex items-center justify-center shadow-lg">
               <Lock className="w-5 h-5 text-slate-500" />
             </motion.div>
             <div className="text-center max-w-[100px]">
              <motion.p layout className="text-xs font-black text-slate-500 tracking-wider">LEVEL {level + 5}</motion.p>
              <p className="text-[10px] font-medium text-slate-500 leading-tight mt-1">Unlocks Direct City Council Chat</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. The "Recent XP Gains" Mini-Feed */}
      <section>
        <h3 className="text-lg font-black text-white mb-4 tracking-tight px-2">Recent XP Gains</h3>
        <div className="space-y-3">
          <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl p-4 flex items-center justify-between gap-4 group hover:border-emerald-500/30 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 shrink-0">
                <CheckCircle2 className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-200">Verified 'Deep Pothole' on Main Street</p>
                <p className="text-xs text-slate-500">2 hours ago</p>
              </div>
            </div>
            <div className="bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-lg shrink-0 group-hover:bg-emerald-500/20 transition-colors">
              <span className="text-sm font-black text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]">+50 XP</span>
            </div>
          </div>

          <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl p-4 flex items-center justify-between gap-4 group hover:border-emerald-500/30 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center border border-orange-500/20 shrink-0">
                <AlertTriangle className="w-5 h-5 text-orange-400" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-200">Reported 'Fallen Tree' (AI Auto-Dispatched)</p>
                <p className="text-xs text-slate-500">Yesterday</p>
              </div>
            </div>
            <div className="bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-lg shrink-0 group-hover:bg-emerald-500/20 transition-colors">
              <span className="text-sm font-black text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]">+150 XP</span>
            </div>
          </div>

          <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl p-4 flex items-center justify-between gap-4 group hover:border-emerald-500/30 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20 shrink-0">
                <Flame className="w-5 h-5 text-amber-500" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-200">7-Day Active Streak Bonus</p>
                <p className="text-xs text-slate-500">2 days ago</p>
              </div>
            </div>
            <div className="bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-lg shrink-0 group-hover:bg-emerald-500/20 transition-colors">
              <span className="text-sm font-black text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]">+100 XP</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
