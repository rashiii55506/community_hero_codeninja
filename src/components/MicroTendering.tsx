import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, ShieldCheck, Zap, AlertTriangle, Hammer } from 'lucide-react';

export default function MicroTendering() {
  const [gigs, setGigs] = useState([
    { id: 1, title: 'Pothole Repair in Koramangala', location: '100ft Road, Block 4', budget: '1,200', skills: ['Asphalt', 'Road Repair'], status: 'open', aiTag: 'Permanent Fix Needed', aiColor: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30' },
    { id: 2, title: 'Fix Broken Park Bench', location: 'Gandhi Park', budget: '800', skills: ['Carpentry'], status: 'open', aiTag: 'Local Jugaad Acceptable', aiColor: 'text-orange-400 bg-orange-500/10 border-orange-500/30' },
  ]);

  const acceptGig = (id: number) => {
    setGigs(gigs.map(g => g.id === id ? { ...g, status: 'accepted' } : g));
  };

  return (
    <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl relative overflow-hidden h-full shadow-xl flex flex-col">
      <div className="absolute bottom-0 left-0 w-full h-32 bg-indigo-500/5 blur-[80px] pointer-events-none" />
      
      <div className="flex justify-between items-center mb-6 relative z-10">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-indigo-400" /> Gig Tenders
        </h3>
        <span className="bg-indigo-500/10 text-indigo-400 text-xs font-bold px-2 py-1 rounded-lg border border-indigo-500/20 shadow-[0_0_10px_rgba(99,102,241,0.2)]">
          Local Economy
        </span>
      </div>

      <div className="space-y-4 flex-1 overflow-y-auto pr-2 relative z-10 hide-scrollbar">
        <AnimatePresence>
          {gigs.map((gig) => (
            <motion.div 
              key={gig.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-800/50 border border-slate-700 p-5 rounded-2xl relative overflow-hidden group"
            >
              {gig.status === 'accepted' && (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="absolute inset-0 bg-indigo-950/90 backdrop-blur-sm z-20 flex flex-col items-center justify-center border border-indigo-500/50 rounded-2xl"
                >
                  <ShieldCheck className="w-8 h-8 text-indigo-400 mb-2" />
                  <span className="text-indigo-300 font-bold text-sm tracking-wide drop-shadow-[0_0_8px_rgba(99,102,241,0.8)]">Smart Contract Executed</span>
                </motion.div>
              )}

              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-bold text-slate-100 text-lg group-hover:text-indigo-300 transition-colors">{gig.title}</h4>
                  <p className="text-slate-400 text-xs mt-1">{gig.location}</p>
                </div>
                <div className="bg-emerald-500/10 text-emerald-400 font-bold px-3 py-1.5 rounded-xl flex items-center gap-1 border border-emerald-500/30 shadow-inner">
                  ₹{gig.budget}
                </div>
              </div>
              
              <div className="flex items-center gap-2 mb-4">
                {gig.skills.map(s => (
                  <span key={s} className="text-[10px] uppercase font-bold tracking-wider bg-slate-900/50 text-slate-300 px-2 py-1 rounded border border-slate-600">
                    {s}
                  </span>
                ))}
              </div>

              <div className={`mb-5 text-[11px] font-bold px-2 py-1.5 rounded-lg border inline-flex items-center gap-1.5 ${gig.aiColor}`}>
                 <Hammer className="w-3.5 h-3.5" /> AI Suggestion: {gig.aiTag}
              </div>

              <button 
                onClick={() => acceptGig(gig.id)}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(99,102,241,0.3)] hover:shadow-[0_0_25px_rgba(99,102,241,0.5)] border border-indigo-400/50"
              >
                <Zap className="w-4 h-4" /> Accept Gig Contract
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
