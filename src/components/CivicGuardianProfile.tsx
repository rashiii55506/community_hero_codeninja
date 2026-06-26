import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion';
import { Camera, Shield, Target, CheckCircle2, Medal, Lock, X, Edit2, Zap, Crown, User, Star } from 'lucide-react';
import { cn } from '../utils';

const AVATAR_OPTIONS = [
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200',
  'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=200',
  'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&q=80&w=200',
  'https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=80&w=200',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200'
];

const ACHIEVEMENTS = [
  { id: 1, title: 'First Report', description: 'Submitted your first civic hazard report.', unlocked: true, icon: Zap, color: 'text-yellow-400', shadow: 'shadow-[0_0_15px_rgba(250,204,21,0.4)]' },
  { id: 2, title: 'Eagle Eye', description: 'Verified 50 community reports accurately.', unlocked: true, icon: Target, color: 'text-cyan-400', shadow: 'shadow-[0_0_15px_rgba(34,211,238,0.4)]' },
  { id: 3, title: 'Neighborhood Hero', description: 'Resolved 100 civic issues in your district.', unlocked: false, icon: Crown, color: 'text-slate-500', shadow: '' },
  { id: 4, title: 'City Legend', description: 'Reach Level 50 Civic Guardian Rank.', unlocked: false, icon: Star, color: 'text-slate-500', shadow: '' }
];

// Animated Counter Component
const AnimatedCounter = ({ value, suffix = "" }: { value: number, suffix?: string }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const animation = animate(0, value, { 
      duration: 2, 
      ease: "easeOut",
      onUpdate: (latest) => setDisplayValue(Math.round(latest))
    });
    return animation.stop;
  }, [value]);

  return (
    <span>
      {displayValue.toLocaleString()}{suffix}
    </span>
  );
};

export default function CivicGuardianProfile() {
  const [isEditingAvatar, setIsEditingAvatar] = useState(false);
  const [currentAvatar, setCurrentAvatar] = useState(AVATAR_OPTIONS[0]);
  const [username, setUsername] = useState('Rahul_S_Civic');
  const [isEditingName, setIsEditingName] = useState(false);

  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-20 pt-4 px-4 sm:px-6 relative min-h-screen">
      
      {/* Background Geometrics */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <motion.div 
          animate={{ rotate: 360 }} 
          transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/4 -right-1/4 w-[800px] h-[800px] border-[1px] border-emerald-500/10 rounded-full opacity-50"
        />
        <motion.div 
          animate={{ rotate: -360 }} 
          transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] border-[1px] border-cyan-500/10 rounded-full opacity-50"
        />
      </div>

      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 tracking-tight">
          Civic Guardian Profile
        </h1>
        <p className="text-slate-400 font-medium mt-2">Manage your identity and track your impact</p>
      </div>

      {/* 1. The Avatar & Identity Editor */}
      <section className="bg-slate-900/40 backdrop-blur-xl border border-slate-800 rounded-[2.5rem] p-8 sm:p-12 shadow-2xl relative overflow-hidden flex flex-col items-center max-w-2xl mx-auto">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-emerald-500/10 to-transparent pointer-events-none" />
        
        {/* Avatar Container */}
        <div 
          className="relative group cursor-pointer mb-6"
          onClick={() => setIsEditingAvatar(true)}
        >
          <div className="absolute inset-0 bg-emerald-500/20 blur-2xl rounded-full" />
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-slate-800 overflow-hidden relative shadow-[0_0_30px_rgba(16,185,129,0.3)] z-10"
          >
            <img src={currentAvatar} alt="Guardian Avatar" className="w-full h-full object-cover" />
            
            {/* Edit Overlay */}
            <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 backdrop-blur-sm">
              <Camera className="w-8 h-8 text-white" />
              <span className="text-xs font-bold text-white uppercase tracking-wider">Change</span>
            </div>
          </motion.div>
          
          <div className="absolute -bottom-2 -right-2 bg-slate-900 border border-emerald-500 p-2 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.5)] z-20 group-hover:bg-emerald-500 transition-colors">
            <Edit2 className="w-4 h-4 text-emerald-400 group-hover:text-slate-950" />
          </div>
        </div>

        {/* Username Editor */}
        <div className="flex flex-col items-center w-full max-w-sm relative z-10">
          {isEditingName ? (
            <div className="flex w-full items-center gap-2">
              <input 
                autoFocus
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onBlur={() => setIsEditingName(false)}
                onKeyDown={(e) => e.key === 'Enter' && setIsEditingName(false)}
                className="w-full bg-slate-950/80 border-2 border-emerald-500/50 rounded-xl px-4 py-3 text-center text-xl font-bold text-white focus:outline-none focus:border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                placeholder="Enter your Call-sign"
              />
            </div>
          ) : (
            <div 
              className="flex items-center gap-3 cursor-pointer group px-6 py-2 rounded-xl hover:bg-slate-800/50 transition-colors"
              onClick={() => setIsEditingName(true)}
            >
              <h2 className="text-2xl sm:text-3xl font-black text-white group-hover:text-emerald-400 transition-colors">
                {username}
              </h2>
              <Edit2 className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors" />
            </div>
          )}
          <p className="text-emerald-400/80 font-semibold mt-2 text-sm uppercase tracking-widest">Level 14 Guardian</p>
        </div>
      </section>

      {/* 2. The "Civic Stats" Dashboard */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-3xl p-6 flex flex-col justify-center relative overflow-hidden group hover:border-emerald-500/30 transition-colors">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Star className="w-24 h-24 text-emerald-500" />
          </div>
          <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center mb-4">
            <Shield className="w-6 h-6 text-emerald-400" />
          </div>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Total Impact</p>
          <h3 className="text-3xl font-black text-white">
            <AnimatedCounter value={12450} suffix=" XP" />
          </h3>
        </div>

        <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-3xl p-6 flex flex-col justify-center relative overflow-hidden group hover:border-cyan-500/30 transition-colors">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Target className="w-24 h-24 text-cyan-500" />
          </div>
          <div className="w-12 h-12 bg-cyan-500/10 border border-cyan-500/20 rounded-xl flex items-center justify-center mb-4">
            <Target className="w-6 h-6 text-cyan-400" />
          </div>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Accuracy</p>
          <h3 className="text-3xl font-black text-white">
            <AnimatedCounter value={98} suffix="% Verification" />
          </h3>
        </div>

        <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-3xl p-6 flex flex-col justify-center relative overflow-hidden group hover:border-indigo-500/30 transition-colors">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <CheckCircle2 className="w-24 h-24 text-indigo-500" />
          </div>
          <div className="w-12 h-12 bg-indigo-500/10 border border-indigo-500/20 rounded-xl flex items-center justify-center mb-4">
            <CheckCircle2 className="w-6 h-6 text-indigo-400" />
          </div>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Issues Resolved</p>
          <h3 className="text-3xl font-black text-white">
            <AnimatedCounter value={42} suffix=" Reports Solved" />
          </h3>
        </div>

        <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-3xl p-6 flex flex-col justify-center relative overflow-hidden group hover:border-amber-500/30 transition-colors">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Medal className="w-24 h-24 text-amber-500" />
          </div>
          <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-center mb-4">
            <Medal className="w-6 h-6 text-amber-400" />
          </div>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Neighborhood Rank</p>
          <h3 className="text-3xl font-black text-white">
            District Top 5%
          </h3>
        </div>
      </section>

      {/* 3. The Achievement Trophy Case */}
      <section className="bg-slate-900/40 backdrop-blur-xl border border-slate-800 rounded-[2.5rem] p-8 sm:p-12 relative overflow-hidden">
        <h3 className="text-xl sm:text-2xl font-black text-white mb-8 tracking-tight flex items-center gap-3">
          <Crown className="w-6 h-6 text-amber-400" /> Civic Achievements
        </h3>
        
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-6 sm:gap-8">
          {ACHIEVEMENTS.map((achievement) => (
            <div key={achievement.id} className="relative group cursor-pointer flex flex-col items-center gap-3">
              <div className={cn(
                "w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 flex items-center justify-center transition-all duration-300 relative bg-slate-950",
                achievement.unlocked 
                  ? `border-slate-700 ${achievement.shadow}` 
                  : "border-slate-800 grayscale opacity-50"
              )}>
                {/* Inner Glow for unlocked */}
                {achievement.unlocked && <div className="absolute inset-2 rounded-full border border-white/5" />}
                
                <achievement.icon className={cn("w-8 h-8 sm:w-10 sm:h-10", achievement.color)} />
                
                {!achievement.unlocked && (
                  <div className="absolute -bottom-2 -right-2 bg-slate-800 border border-slate-700 w-8 h-8 rounded-full flex items-center justify-center z-10">
                    <Lock className="w-4 h-4 text-slate-400" />
                  </div>
                )}
              </div>
              
              {/* Achievement Tooltip */}
              <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-slate-800 border border-slate-700 px-4 py-2 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-30">
                <p className="text-sm font-bold text-white">{achievement.title}</p>
                <p className="text-xs text-slate-400">
                  {achievement.unlocked ? achievement.description : `Unlock Requirement: ${achievement.description}`}
                </p>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-slate-800 border-r border-b border-slate-700 rotate-45" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Avatar Selection Modal */}
      <AnimatePresence>
        {isEditingAvatar && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-900 border border-slate-700 rounded-[2.5rem] p-8 max-w-2xl w-full shadow-2xl relative"
            >
              <button 
                onClick={() => setIsEditingAvatar(false)}
                className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              
              <h3 className="text-2xl font-black text-white mb-6">Select Your Identity</h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                {AVATAR_OPTIONS.map((avatar, idx) => (
                  <button 
                    key={idx}
                    onClick={() => {
                      setCurrentAvatar(avatar);
                      setIsEditingAvatar(false);
                    }}
                    className={cn(
                      "aspect-square rounded-2xl overflow-hidden border-4 transition-all duration-300 relative group",
                      currentAvatar === avatar ? "border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.3)] scale-105" : "border-slate-800 hover:border-slate-600"
                    )}
                  >
                    <img src={avatar} alt={`Avatar option ${idx + 1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    {currentAvatar === avatar && (
                      <div className="absolute inset-0 bg-emerald-500/20" />
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
