import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CloudRain, AlertTriangle, TrendingUp, Droplets } from 'lucide-react';

export default function ButterflyEffect({ issueTitle = "Blocked Storm Drain" }: { issueTitle?: string }) {
  const [urgency, setUrgency] = useState(0);

  useEffect(() => {
    const int = setInterval(() => {
      setUrgency(prev => {
        if (prev >= 100) return 0; // Loop for demo purposes
        return prev + 1;
      });
    }, 150);
    return () => clearInterval(int);
  }, []);

  return (
    <div className="bg-slate-900/40 border border-rose-500/30 rounded-3xl p-6 backdrop-blur-xl relative overflow-hidden h-full flex flex-col shadow-[0_0_30px_-5px_rgba(244,63,94,0.2)]">
      <div className="absolute top-0 right-0 w-full h-full bg-rose-500/5 pointer-events-none" />
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-rose-500/20 blur-[60px] pointer-events-none" />
      
      <div className="flex justify-between items-center mb-6 relative z-10">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-rose-400" /> Butterfly Effect
        </h3>
        <span className="bg-rose-500/20 text-rose-400 p-1.5 rounded-lg border border-rose-500/30 animate-pulse shadow-[0_0_10px_rgba(244,63,94,0.5)]">
          <AlertTriangle className="w-4 h-4" />
        </span>
      </div>

      <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 mb-4 relative z-10 shadow-inner">
        <h4 className="text-slate-400 text-xs uppercase tracking-wider font-bold mb-1">Target Issue</h4>
        <div className="text-white font-bold text-lg flex items-center gap-2">
          <Droplets className="w-5 h-5 text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" /> {issueTitle}
        </div>
      </div>

      <div className="flex-1 bg-gradient-to-b from-rose-950/60 to-slate-900 border border-rose-900/50 rounded-2xl p-5 relative z-10 overflow-hidden flex flex-col">
        {/* Subtle grid background */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.2) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
        
        <h4 className="font-bold text-rose-400 mb-3 flex items-center gap-2">
          <CloudRain className="w-4 h-4" /> Future Impact Warning
        </h4>
        
        <p className="text-slate-300 text-sm leading-relaxed mb-6 relative z-10 flex-1">
          Heavy rain forecast in <strong className="text-white">48 hours</strong>. If left unfixed, this will cause <strong className="text-rose-300">Level 3 waterlogging</strong>, affecting <strong className="text-white">50+ households</strong> and causing estimated <strong className="text-rose-400 border-b border-rose-400/50 border-dashed pb-0.5">$5,000</strong> in road damage.
        </p>

        <div className="space-y-2 relative z-10 mt-auto">
          <div className="flex justify-between text-xs font-bold text-slate-400">
            <span className="uppercase tracking-wider">Urgency Score</span>
            <span className="text-rose-400">{urgency}% Critical</span>
          </div>
          <div className="h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800 p-[1px]">
            <motion.div 
              className="h-full bg-gradient-to-r from-amber-500 via-rose-500 to-red-600 rounded-full shadow-[0_0_10px_rgba(244,63,94,0.8)] relative"
              style={{ width: `${urgency}%` }}
              layout
            >
               <div className="absolute inset-0 bg-white/20 w-full animate-[shimmer_2s_infinite]" style={{ backgroundImage: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)' }} />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
