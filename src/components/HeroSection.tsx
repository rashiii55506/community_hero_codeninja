import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Camera, Mic, ArrowRight, ShieldCheck, MapPin, Zap } from 'lucide-react';
import { cn } from '../utils';

import CommunityHeroLogo from './CommunityHeroLogo';

export default function HeroSection({ setActiveTab }: { setActiveTab?: (tab: string) => void }) {
  // Staggered animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const floatVariants: Variants = {
    animate: {
      y: [0, -15, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  const floatVariantsDelayed: Variants = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 7,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: 1,
      },
    },
  };

  return (
    <div className="relative min-h-[90vh] flex items-center overflow-hidden bg-slate-950 text-slate-50 pt-20 pb-20 lg:pt-0 lg:pb-0">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-emerald-500/20 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-500/20 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Typography & CTAs */}
          <motion.div 
            className="flex flex-col items-start"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Huge Hero Logo */}
            <motion.div variants={itemVariants} className="mb-6">
              <CommunityHeroLogo size="xl" showText={true} />
            </motion.div>

            {/* Pre-heading Glass Pill */}
            <motion.div 
              variants={itemVariants}
              className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md bg-white/5 border border-white/10 shadow-2xl"
            >
              <span className="text-sm font-medium tracking-wide text-slate-200 flex items-center gap-2">
                ✨ Powered by Gemini 1.5 AI & Google Maps
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1 
              variants={itemVariants}
              className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight mb-6 leading-[1.1]"
            >
              Empowering Citizens. <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                Upgrading Cities.
              </span>
            </motion.h1>

            {/* Sub-headline */}
            <motion.p 
              variants={itemVariants}
              className="text-lg sm:text-xl text-slate-400 max-w-xl mb-10 leading-relaxed font-medium"
            >
              Report infrastructure issues in seconds using AI voice and video. Watch the community and government fix it in real-time.
            </motion.p>

            {/* CTA Cluster */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto mb-16"
            >
              <button 
                onClick={() => setActiveTab?.('report')}
                className="w-full sm:w-auto group relative flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl font-bold text-white shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:shadow-[0_0_30px_rgba(16,185,129,0.6)] transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <div className="flex -space-x-1">
                  <Camera className="w-5 h-5 text-emerald-100" />
                  <Mic className="w-5 h-5 text-emerald-100 relative top-1 left-1" />
                </div>
                Report an Issue Now
              </button>

              <button 
                onClick={() => setActiveTab?.('map')}
                className="w-full sm:w-auto group flex items-center justify-center gap-3 px-8 py-4 bg-transparent border border-white/20 hover:bg-white/5 rounded-2xl font-bold text-slate-200 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                View Live Impact Map
                <ArrowRight className="w-5 h-5 text-slate-400 group-hover:translate-x-1 group-hover:text-white transition-all" />
              </button>
            </motion.div>

            {/* Live Social Proof */}
            <motion.div 
              variants={itemVariants}
              className="backdrop-blur-xl bg-slate-900/40 rounded-2xl p-4 border border-white/10 flex items-center gap-5 sm:gap-6 w-full sm:w-auto shadow-2xl"
            >
              <div className="flex -space-x-3">
                <img className="w-10 h-10 rounded-full border-2 border-slate-900 object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="User 1" />
                <img className="w-10 h-10 rounded-full border-2 border-slate-900 object-cover" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80" alt="User 2" />
                <img className="w-10 h-10 rounded-full border-2 border-slate-900 object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" alt="User 3" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                  <span className="text-sm font-bold text-white">Live</span>
                </div>
                <p className="text-sm font-medium text-slate-300">
                  <strong className="text-white">1,420</strong> Civic Issues Resolved This Month
                </p>
              </div>
            </motion.div>

          </motion.div>

          {/* Right Column: 3D Illusion / Floating Graphic */}
          <div className="relative hidden lg:block h-[600px] w-full perspective-1000">
             
             {/* Card 1: AI Triage Output */}
             <motion.div 
                variants={floatVariants}
                animate="animate"
                className="absolute top-1/4 right-0 z-20 w-80 backdrop-blur-2xl bg-slate-900/60 border border-slate-700/50 rounded-3xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform -rotate-y-12 rotate-x-12 translate-x-10 hover:translate-x-5 transition-transform duration-500"
             >
                <div className="flex items-center gap-3 mb-4">
                   <div className="w-10 h-10 bg-indigo-500/20 rounded-full flex items-center justify-center border border-indigo-500/50">
                     <Zap className="w-5 h-5 text-indigo-400" />
                   </div>
                   <div>
                     <p className="text-xs text-indigo-300 font-bold uppercase tracking-wider">AI Triage</p>
                     <p className="text-sm font-bold text-white">Severity Level 4</p>
                   </div>
                </div>
                <div className="h-24 bg-slate-800/80 rounded-xl mb-4 overflow-hidden relative border border-slate-700/50">
                   <img src="https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=400&h=200" alt="Pothole" className="w-full h-full object-cover mix-blend-luminosity opacity-60" />
                   <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
                </div>
                <div className="space-y-2">
                   <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                     <div className="h-full bg-emerald-500 w-[85%]" />
                   </div>
                   <p className="text-xs font-medium text-slate-400 flex justify-between">
                     <span>Confidence: 85%</span>
                     <span className="text-emerald-400">Verified</span>
                   </p>
                </div>
             </motion.div>

             {/* Card 2: Live Map Pins */}
             <motion.div 
                variants={floatVariantsDelayed}
                animate="animate"
                className="absolute bottom-1/4 left-0 z-10 w-72 backdrop-blur-2xl bg-slate-900/50 border border-slate-700/50 rounded-3xl p-5 shadow-[0_30px_60px_rgba(0,0,0,0.6)] transform rotate-y-12 -rotate-x-12 -translate-x-4"
             >
               <div className="flex justify-between items-center mb-5">
                 <h4 className="font-bold text-white text-sm flex items-center gap-2">
                   <MapPin className="w-4 h-4 text-emerald-400" /> Nearby Action
                 </h4>
                 <div className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-[10px] font-bold rounded border border-emerald-500/30">
                   LIVE
                 </div>
               </div>
               
               <div className="space-y-4">
                  {[
                    { title: 'Waterlogging Cleared', time: '2m ago', color: 'emerald' },
                    { title: 'Streetlight Fixed', time: '15m ago', color: 'emerald' },
                    { title: 'New Alert: Sector 4', time: 'Just now', color: 'orange' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className={cn(
                        "mt-0.5 w-2 h-2 rounded-full shadow-[0_0_8px_currentColor]",
                        item.color === 'emerald' ? 'bg-emerald-500 text-emerald-500' : 'bg-orange-500 text-orange-500'
                      )} />
                      <div>
                        <p className="text-xs font-bold text-slate-200">{item.title}</p>
                        <p className="text-[10px] text-slate-500 font-medium">{item.time}</p>
                      </div>
                    </div>
                  ))}
               </div>
             </motion.div>

             {/* Decorative Elements */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl z-0 pointer-events-none" />
          </div>

        </div>
      </div>
    </div>
  );
}
