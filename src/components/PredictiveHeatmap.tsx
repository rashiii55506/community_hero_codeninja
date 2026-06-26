import React from 'react';
import { motion } from 'framer-motion';
import { Brain, CloudRain, AlertTriangle, Info } from 'lucide-react';

export default function PredictiveHeatmap() {
  return (
    <div className="bg-slate-900 rounded-3xl border border-indigo-500/30 overflow-hidden relative shadow-2xl">
      <div className="p-6 border-b border-white/10 flex justify-between items-center relative z-10 bg-slate-900/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-500/20 p-2 rounded-xl border border-indigo-500/50">
            <Brain className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Predictive AI Insights</h2>
            <p className="text-indigo-200/60 text-sm">Powered by Vertex AI & Historical Data</p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm text-slate-400 font-medium">
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]"></span> High Risk</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)]"></span> Medium</span>
        </div>
      </div>

      <div className="relative h-[300px] w-full bg-slate-800 overflow-hidden">
        {/* Mock Map Background */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />

        {/* Heatmap Zones */}
        <div className="absolute inset-0">
          {/* Zone 1: High Risk */}
          <motion.div 
            className="absolute top-1/4 left-1/4 w-32 h-32 group"
            animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ repeat: Infinity, duration: 3 }}
          >
            <div className="absolute inset-0 bg-red-500/20 rounded-full blur-2xl" />
            <div className="absolute inset-4 bg-red-500/40 rounded-full blur-xl border border-red-500/50" />
            
            {/* Tooltip */}
            <div className="absolute -top-32 -left-16 w-64 bg-slate-900 border border-slate-700 p-4 rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-none">
              <h4 className="font-bold text-red-400 flex items-center gap-2 mb-2">
                <CloudRain className="w-4 h-4" /> Waterlogging Risk: High
              </h4>
              <p className="text-slate-300 text-xs leading-relaxed">
                <strong className="text-indigo-400">AI Reasoning:</strong> Based on heavy rainfall forecast (40mm expected) and 3 recent minor drainage complaints in Sector 4 over the last 48 hours.
              </p>
            </div>
            
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <AlertTriangle className="w-6 h-6 text-red-400 drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
            </div>
          </motion.div>

          {/* Zone 2: Medium Risk */}
          <motion.div 
            className="absolute bottom-1/4 right-1/3 w-40 h-40 group"
            animate={{ scale: [1, 1.02, 1], opacity: [0.6, 0.8, 0.6] }}
            transition={{ repeat: Infinity, duration: 4, delay: 1 }}
          >
            <div className="absolute inset-0 bg-amber-500/20 rounded-full blur-3xl" />
            <div className="absolute inset-8 bg-amber-500/30 rounded-full blur-xl border border-amber-500/30" />
            
            {/* Tooltip */}
            <div className="absolute -top-28 -right-16 w-60 bg-slate-900 border border-slate-700 p-4 rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-none">
              <h4 className="font-bold text-amber-400 flex items-center gap-2 mb-2">
                <Info className="w-4 h-4" /> Road Degradation
              </h4>
              <p className="text-slate-300 text-xs leading-relaxed">
                <strong className="text-indigo-400">AI Reasoning:</strong> High commercial traffic volume detected combined with aging asphalt base (Last paved: 2018). Potholes imminent.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
