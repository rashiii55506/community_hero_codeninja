import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crown, Star, Shield, Leaf, Moon, Gift, Coffee, PhoneCall, CheckCircle2, Lock, Flame, Info, Check, Sparkles, UserCircle2 } from 'lucide-react';
import { cn } from '../utils';
import MilestoneNotification from './MilestoneNotification';
import XPProgressionDashboard from './XPProgressionDashboard';
import ImpactVouchers from './ImpactVouchers';
import { useHapticFeedback } from '../hooks/useHapticFeedback';

// Mock Data
const MOCK_BADGES = [
  { id: 1, title: 'Pothole Punisher', desc: 'Reported 10 potholes that got fixed.', icon: Shield, unlocked: true, color: 'text-orange-400', bg: 'bg-orange-500/20', border: 'border-orange-500/50' },
  { id: 2, title: 'Green Guardian', desc: 'Planted 5 trees or reported 5 illegal dumps.', icon: Leaf, unlocked: true, color: 'text-emerald-400', bg: 'bg-emerald-500/20', border: 'border-emerald-500/50' },
  { id: 3, title: 'Night Watch', desc: 'Report 5 broken streetlights.', icon: Moon, unlocked: false, unlockHint: 'Validate 5 more issues to unlock', color: 'text-slate-500', bg: 'bg-slate-800', border: 'border-slate-700' },
  { id: 4, title: 'Civic Validator', desc: 'Validated 50 issues correctly.', icon: CheckCircle2, unlocked: false, unlockHint: 'Validate 20 more issues to unlock', color: 'text-slate-500', bg: 'bg-slate-800', border: 'border-slate-700' },
];

export default function RewardsDashboard() {
  const [showMilestone, setShowMilestone] = useState(false);
  const currentXP = 12450;
  const maxXP = 15000;
  const xpPercentage = (currentXP / maxXP) * 100;
  const { trigger } = useHapticFeedback();

  return (
    <div className="max-w-7xl mx-auto space-y-10 animate-in fade-in duration-500 pb-12 pt-4 px-4 sm:px-6">
      
      <XPProgressionDashboard />

      {/* 2. The Daily "Civic Streak" */}
      <section className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-3xl p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-6">
          <Flame className="w-6 h-6 text-orange-500" />
          <h2 className="text-2xl font-black text-white tracking-tight">Civic Streak</h2>
        </div>
        
        <div className="flex flex-wrap sm:flex-nowrap justify-between gap-3 sm:gap-2">
          {[1, 2, 3, 4, 5, 6, 7].map((day) => {
            const isCompleted = day <= 3;
            const isToday = day === 4;
            const isLocked = day > 4 && day < 7;
            const isTreasure = day === 7;

            return (
              <div key={day} className="flex-1 min-w-[60px] flex flex-col items-center gap-2">
                <div className={cn(
                  "w-full aspect-square rounded-2xl flex flex-col items-center justify-center transition-all relative border",
                  isCompleted ? "bg-orange-500/20 border-orange-500/50 shadow-[0_0_15px_rgba(249,115,22,0.2)]" : 
                  isToday ? "bg-slate-800 border-orange-400 shadow-[0_0_20px_rgba(249,115,22,0.4)] animate-pulse" :
                  "bg-slate-900/50 border-slate-800"
                )}>
                  {isCompleted && (
                    <>
                      <Flame className="w-6 h-6 text-orange-500 mb-1" />
                      <Check className="w-4 h-4 text-orange-400 absolute bottom-2 right-2" />
                    </>
                  )}
                  {isToday && <Sparkles className="w-6 h-6 text-orange-400" />}
                  {isLocked && <div className="w-3 h-3 rounded-full bg-slate-700" />}
                  {isTreasure && <Gift className="w-6 h-6 text-purple-400 opacity-50" />}
                </div>
                <span className={cn(
                  "text-xs font-bold uppercase tracking-wider",
                  isToday ? "text-orange-400" : "text-slate-500"
                )}>
                  Day {day}
                </span>
              </div>
            );
          })}
        </div>
        <p className="text-center text-sm font-medium text-orange-300 mt-6 bg-orange-500/10 py-2 rounded-xl border border-orange-500/20">
          🔥 Report an issue today to keep the streak alive!
        </p>
      </section>

      {/* 3. The Achievement Arsenal */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-6 h-6 text-indigo-400" />
          <h2 className="text-2xl font-black text-white tracking-tight">Your Civic Badges <span className="text-slate-500 text-lg font-medium">(Collect 'em all!)</span></h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {MOCK_BADGES.map((badge) => {
            const Icon = badge.icon;
            return (
              <motion.div 
                key={badge.id}
                whileHover={badge.unlocked ? { scale: 1.05 } : {}}
                className={cn(
                  "relative group bg-slate-900/40 border rounded-[2rem] p-6 flex flex-col items-center text-center transition-all",
                  badge.unlocked ? "border-slate-700 hover:border-slate-500 hover:shadow-xl" : "border-slate-800"
                )}
              >
                {!badge.unlocked && (
                  <div className="absolute top-4 right-4 text-slate-600">
                    <Lock className="w-4 h-4" />
                  </div>
                )}
                
                <div className={cn(
                  "w-20 h-20 rounded-full flex items-center justify-center mb-4 transition-all relative border-4",
                  badge.unlocked 
                    ? `bg-slate-900 ${badge.border} shadow-[0_0_20px_currentColor] text-${badge.color.split('-')[1]}-400` 
                    : "bg-slate-900 border-slate-800 text-slate-700"
                )} style={badge.unlocked ? { color: 'currentColor' } : {}}>
                  <Icon className="w-8 h-8" />
                </div>
                
                <h4 className={cn("font-black mb-1", badge.unlocked ? "text-slate-200" : "text-slate-600")}>
                  {badge.title}
                </h4>
                
                {badge.unlocked ? (
                  <p className="text-xs text-slate-400 font-medium leading-relaxed">{badge.desc}</p>
                ) : (
                  <div className="absolute inset-0 bg-slate-900/90 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4 backdrop-blur-sm z-10">
                    <p className="text-xs font-bold text-slate-300">{badge.unlockHint}</p>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 4. The "Impact Vouchers" */}
      <ImpactVouchers />

      {/* Floating test button for Milestone */}
      <div className="fixed bottom-24 right-8 z-50">
        <button 
          onClick={() => setShowMilestone(true)}
          className="bg-slate-800 border border-slate-600 hover:bg-slate-700 text-slate-300 p-3 rounded-full shadow-xl transition-colors"
          title="Test Milestone Notification"
        >
          <Star className="w-5 h-5" />
        </button>
      </div>

      <MilestoneNotification 
        isVisible={showMilestone} 
        onClose={() => setShowMilestone(false)} 
        points={currentXP}
        rank="Neighborhood Mayor"
      />
    </div>
  );
}
