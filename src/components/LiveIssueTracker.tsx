import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Clock, Wrench } from 'lucide-react';
import { cn } from '../utils';

export default function LiveIssueTracker() {
  const stages = [
    { id: 1, title: 'Reported', subtitle: 'Citizen submitted media', status: 'completed' },
    { id: 2, title: 'AI Triaged', subtitle: 'Gemini AI analyzed severity & assigned tools', status: 'completed' },
    { id: 3, title: 'Dispatched', subtitle: 'Auto-email sent to Municipality', status: 'completed' },
    { id: 4, title: 'In Progress', subtitle: 'Ground crew on site', status: 'active' },
    { id: 5, title: 'Verified & Closed', subtitle: 'Community swipe-verified', status: 'pending' },
  ];

  return (
    <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl relative overflow-hidden h-full flex flex-col shadow-xl">
      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-[80px] rounded-full pointer-events-none" />
      
      <div className="flex justify-between items-center mb-6 relative z-10">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Clock className="w-5 h-5 text-orange-400" /> Live Issue Status
        </h3>
        <span className="bg-orange-500/20 text-orange-400 text-xs font-bold px-2 py-1 rounded-lg border border-orange-500/30">
          Real-time
        </span>
      </div>
      
      <div className="flex-1 relative pl-6 mt-2">
        <div className="absolute left-[35px] top-4 bottom-8 w-0.5 bg-slate-800" />
        
        <div className="space-y-8 relative z-10">
          {stages.map((stage, i) => {
            const isCompleted = stage.status === 'completed';
            const isActive = stage.status === 'active';
            const isPending = stage.status === 'pending';
            
            return (
              <motion.div 
                key={stage.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.15 }}
                className="flex items-start gap-5"
              >
                <div className="relative z-10 flex-shrink-0 bg-[#0B0F19] mt-1">
                  {isCompleted && (
                    <div className="w-6 h-6 rounded-full bg-indigo-500/20 border border-indigo-500 flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.3)]">
                      <CheckCircle2 className="w-4 h-4 text-indigo-400" />
                    </div>
                  )}
                  {isActive && (
                    <div className="w-6 h-6 rounded-full bg-orange-500/20 border border-orange-400 flex items-center justify-center relative shadow-[0_0_15px_rgba(249,115,22,0.5)]">
                      <div className="absolute inset-0 rounded-full border border-orange-400 animate-ping opacity-50" />
                      <Wrench className="w-3 h-3 text-orange-300 animate-pulse" />
                    </div>
                  )}
                  {isPending && (
                    <div className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-slate-600" />
                    </div>
                  )}
                </div>
                <div>
                  <h4 className={cn("font-bold text-base transition-colors", 
                    isCompleted ? "text-slate-200" : 
                    isActive ? "text-orange-400 text-lg shadow-orange-400" : "text-slate-500"
                  )}>{stage.title}</h4>
                  <p className={cn("text-xs mt-1 transition-colors",
                    isCompleted ? "text-slate-400" : 
                    isActive ? "text-orange-200/70" : "text-slate-600"
                  )}>{stage.subtitle}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  );
}
