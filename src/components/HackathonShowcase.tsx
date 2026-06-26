import React from 'react';
import LiveIssueTracker from './LiveIssueTracker';
import MicroTendering from './MicroTendering';
import ButterflyEffect from './ButterflyEffect';
import ARXRayMockup from './ARXRayMockup';
import { Sparkles, Activity } from 'lucide-react';

export default function HackathonShowcase({ onOpenScanner }: { onOpenScanner?: () => void }) {
  return (
    <div className="py-6 sm:py-8 h-full flex flex-col relative z-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-6 mb-8 gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-amber-400 to-rose-400 tracking-tight">
            Community Hero Nexus
          </h1>
          <p className="text-slate-400 mt-2 font-medium flex items-center gap-2">
            <Activity className="w-4 h-4 text-orange-500" /> Next-Generation Civic Tech Innovations
          </p>
        </div>
        <div className="inline-flex items-center gap-2 bg-slate-900/80 border border-slate-700/50 px-4 py-2.5 rounded-xl shadow-[0_0_15px_rgba(249,115,22,0.15)] self-start sm:self-auto">
          <Sparkles className="w-4 h-4 text-orange-400" />
          <span className="text-xs font-bold tracking-widest uppercase text-orange-400">Agentic Core Active</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 flex-1">
        <div className="flex flex-col gap-6 lg:gap-8">
          <div className="h-[350px] lg:h-[400px]">
             <ARXRayMockup onOpenScanner={onOpenScanner} />
          </div>
          <div className="flex-1 min-h-[350px]">
             <MicroTendering />
          </div>
        </div>
        <div className="flex flex-col gap-6 lg:gap-8">
          <div className="flex-1 min-h-[400px]">
             <LiveIssueTracker />
          </div>
          <div className="h-[300px] lg:h-[350px]">
             <ButterflyEffect />
          </div>
        </div>
      </div>
    </div>
  );
}
