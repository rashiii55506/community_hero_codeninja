import React from 'react';
import { motion } from 'framer-motion';
import { Scan, Focus, Droplets, Camera } from 'lucide-react';

export default function ARXRayMockup({ onOpenScanner }: { onOpenScanner?: () => void }) {
  return (
    <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-5 backdrop-blur-xl h-full flex flex-col relative overflow-hidden shadow-xl">
      <div className="flex justify-between items-center mb-5 px-1 relative z-10">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Scan className="w-5 h-5 text-cyan-400" /> ARCore X-Ray Vision
        </h3>
        <span className="bg-cyan-500/20 text-cyan-400 text-xs font-bold px-2.5 py-1 rounded-lg border border-cyan-500/30 flex items-center gap-1.5 shadow-[0_0_10px_rgba(34,211,238,0.3)]">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" /> Active
        </span>
      </div>

      <div className="flex-1 rounded-2xl overflow-hidden relative border border-slate-700 bg-slate-950 group">
        {/* Placeholder Street Image */}
        <img 
          src="https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=800" 
          className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-luminosity grayscale group-hover:grayscale-[50%] transition-all duration-1000"
          alt="Street view"
        />

        {/* Viewfinder UI */}
        <div className="absolute inset-0 border-[1.5px] border-cyan-500/30 m-4 rounded-xl pointer-events-none z-10">
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-400 rounded-tl-xl shadow-[-2px_-2px_8px_rgba(34,211,238,0.5)]" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-400 rounded-tr-xl shadow-[2px_-2px_8px_rgba(34,211,238,0.5)]" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-400 rounded-bl-xl shadow-[-2px_2px_8px_rgba(34,211,238,0.5)]" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-400 rounded-br-xl shadow-[2px_2px_8px_rgba(34,211,238,0.5)]" />
          <div className="absolute inset-0 flex items-center justify-center opacity-40">
            <Focus className="w-16 h-16 text-cyan-400" />
          </div>
        </div>

        {/* Launch Button Overlay */}
        <div className="absolute inset-0 bg-black/40 z-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
          <button 
            onClick={onOpenScanner}
            className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-6 py-3 rounded-xl flex items-center gap-2 shadow-[0_0_20px_rgba(34,211,238,0.6)] transition-all transform hover:scale-105"
          >
            <Camera className="w-5 h-5" /> Launch Live AR Scanner
          </button>
        </div>

        {/* Scanning Laser */}
        <motion.div 
          className="absolute left-0 right-0 h-0.5 bg-cyan-500 shadow-[0_0_20px_4px_rgba(34,211,238,0.8)] pointer-events-none z-10"
          animate={{ top: ['0%', '100%', '0%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />

        {/* Holographic Pin */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute top-[55%] left-[45%] -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center"
        >
          <div className="bg-red-950/80 backdrop-blur-md px-3 py-2 rounded-xl border border-red-500/50 text-white shadow-[0_0_25px_rgba(239,68,68,0.5)] mb-2 flex flex-col items-center relative overflow-hidden">
             <div className="absolute inset-0 bg-red-500/10 animate-pulse pointer-events-none" />
            <span className="text-xs font-bold flex items-center gap-1.5">
              <Droplets className="w-3.5 h-3.5 text-red-400" /> Underground Leak
            </span>
            <span className="text-[9px] text-red-300/80 uppercase tracking-widest mt-1">Historical Data</span>
          </div>
          <div className="w-0.5 h-12 bg-gradient-to-b from-red-500 to-transparent shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
          <motion.div 
            animate={{ scale: [1, 1.8, 1], opacity: [0.8, 0, 0.8] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-16 h-4 border-2 border-red-500 rounded-[100%] shadow-[0_0_20px_rgba(239,68,68,0.8)]"
            style={{ transform: 'rotateX(60deg)' }}
          />
        </motion.div>
      </div>
    </div>
  );
}
