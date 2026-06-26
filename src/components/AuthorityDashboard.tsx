import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AlertOctagon, CheckCircle2, Clock, MapPin, Search, Bell, Menu, User, 
  Bot, AlertTriangle, ShieldCheck, TrendingUp, ChevronDown, Check, X, FileText, Zap
} from 'lucide-react';
import { cn } from '../utils';
import SmartAITriageInbox from './SmartAITriageInbox';

// Mock Data
const KPI_STATS = [
  { id: 1, label: 'Active Emergencies', value: '12 Critical', icon: AlertOctagon, color: 'text-orange-500', glow: 'shadow-[0_0_15px_rgba(249,115,22,0.5)]', isCritical: true },
  { id: 2, label: 'AI Auto-Triaged', value: '145 Tickets today', icon: Zap, color: 'text-emerald-400', glow: 'shadow-[0_0_15px_rgba(52,211,153,0.3)]', isCritical: false },
  { id: 3, label: 'Community Verified', value: '89% Accuracy', icon: ShieldCheck, color: 'text-cyan-400', glow: 'shadow-[0_0_15px_rgba(34,211,238,0.3)]', isCritical: false },
];

const ISSUES = [
  {
    id: 'ISS-001',
    title: 'Main Water Pipeline Burst',
    location: 'Ward 4: Koramangala',
    severity: 5,
    severityLabel: 'Level 5 - Red',
    confidence: 96,
    department: 'Jal Board',
    thumbnail: 'https://images.unsplash.com/photo-1541888001694-0f2c423ba215?auto=format&fit=crop&q=80&w=200',
    actionDraft: 'Dispatch Excavator & Plumber',
    aiTimeline: [
      { day: 'Day 1', text: 'AI generated JSON & drafted email to Public Works Dept.', status: 'completed' },
      { day: 'Day 2', text: 'Waiting for crew assignment.', status: 'completed' },
      { day: 'Day 4', text: 'AI will auto-escalate to Regional Director if no action is taken.', status: 'pending' },
    ],
    aiJson: {
      "incidentId": "ISS-001",
      "type": "infrastructure_failure",
      "subType": "water_pipeline_burst",
      "location": { "lat": 12.9279, "lng": 77.6271, "ward": 4, "zone": "South" },
      "severity": 5,
      "aiConfidenceScore": 0.96,
      "recommendedAction": "immediate_dispatch",
      "requiredAssets": ["Heavy Excavator", "Plumbing Crew", "Traffic Control"]
    }
  },
  {
    id: 'ISS-002',
    title: 'Fallen Tree Blocking Major Arterial Road',
    location: 'Ward 12: Indiranagar',
    severity: 4,
    severityLabel: 'Level 4 - Orange',
    confidence: 88,
    department: 'Forestry & Parks',
    thumbnail: 'https://images.unsplash.com/photo-1596700712711-2092120db550?auto=format&fit=crop&q=80&w=200',
    actionDraft: 'Dispatch Chainsaw Crew & Truck',
    aiTimeline: [
      { day: 'Day 1', text: 'AI auto-classified as High Priority due to traffic impact.', status: 'completed' },
      { day: 'Day 2', text: 'Forestry dept notified via automated API.', status: 'pending' },
    ],
    aiJson: {
      "incidentId": "ISS-002",
      "type": "natural_hazard",
      "subType": "fallen_tree",
      "location": { "lat": 12.9719, "lng": 77.6412, "ward": 12 },
      "severity": 4,
      "aiConfidenceScore": 0.88,
      "recommendedAction": "clear_roadway"
    }
  }
];

export default function AuthorityDashboard() {
  const [selectedIssue, setSelectedIssue] = useState<typeof ISSUES[0] | null>(null);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-slate-950 text-slate-50 font-sans mt-4">
      
      {/* Sidebar (Mock) */}
      <aside className="w-full lg:w-64 bg-slate-900/50 border-r border-slate-800 p-6 flex flex-col hidden lg:flex rounded-3xl lg:rounded-none lg:rounded-l-3xl shadow-xl z-20 shrink-0">
        <div className="flex items-center gap-3 mb-10">
          <div className="bg-emerald-500/20 p-2 rounded-xl border border-emerald-500/30">
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
          </div>
          <h1 className="font-black text-xl tracking-tight text-white leading-tight">Nagar Nigam<br/><span className="text-emerald-400">Command</span></h1>
        </div>

        <nav className="space-y-2 flex-1">
          <SidebarItem icon={AlertOctagon} label="Smart Triage" active />
          <SidebarItem icon={MapPin} label="Live City Map" />
          <SidebarItem icon={TrendingUp} label="Analytics" />
          <SidebarItem icon={User} label="Field Crews" />
        </nav>

        <div className="mt-auto pt-6 border-t border-slate-800 flex items-center gap-3">
          <img src="https://i.pravatar.cc/150?img=11" className="w-10 h-10 rounded-full border-2 border-slate-700" alt="Admin" />
          <div>
            <p className="font-bold text-sm text-slate-200">Director Singh</p>
            <p className="text-xs text-slate-500">Central Command</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8 overflow-y-auto w-full max-w-full">
        
        {/* Top Header */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">AI Command Center</h2>
            <p className="text-slate-400 font-medium mt-1">Autonomous civic issue routing & prediction</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-5 h-5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input type="text" placeholder="Search Incident ID..." className="bg-slate-900 border border-slate-800 text-sm rounded-xl pl-10 pr-4 py-2 text-slate-300 focus:outline-none focus:border-emerald-500/50 w-full sm:w-auto" />
            </div>
            <button className="bg-slate-900 border border-slate-800 p-2 rounded-xl text-slate-400 hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* 1. AI Performance KPIs */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {KPI_STATS.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.id} className="bg-slate-900/50 backdrop-blur-md border border-slate-800 p-5 rounded-2xl flex items-center gap-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-[50px] rounded-full pointer-events-none" />
                <div className={cn("p-3 rounded-xl bg-slate-950 border border-slate-800 shrink-0", stat.isCritical && "animate-pulse")}>
                  <Icon className={cn("w-6 h-6", stat.color)} />
                </div>
                <div>
                  <p className="text-slate-400 text-sm font-bold mb-0.5">{stat.label}</p>
                  <p className={cn("text-xl font-black tracking-tight", stat.color)}>{stat.value}</p>
                </div>
              </div>
            );
          })}
        </section>

        {/* 2. Predictive Butterfly Effect Panel */}
        <section className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-3xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 blur-[80px] rounded-full pointer-events-none" />
          
          <h3 className="text-xl font-black text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-indigo-400" /> AI Predictive Insights & Heatmap
          </h3>
          
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1 bg-slate-950 border border-slate-800 rounded-2xl h-48 sm:h-64 relative overflow-hidden flex items-center justify-center shadow-inner">
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                   <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }} transition={{ duration: 2, repeat: Infinity }} className="absolute inset-0 bg-red-500 rounded-full blur-xl" />
                   <MapPin className="w-10 h-10 text-red-500 relative z-10 drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
                </div>
              </div>
              <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur border border-slate-700 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-300">
                Ward 4: Koramangala
              </div>
            </div>

            <div className="w-full lg:w-80 flex flex-col justify-center space-y-4 shrink-0">
              <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-orange-500" />
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-orange-200 font-medium leading-relaxed">
                      <strong className="text-orange-400 block mb-1">⚠️ AI Warning: Heavy rain predicted.</strong>
                      3 blocked drains in Ward 4 pose a 90% risk of severe waterlogging in 48 hours.
                    </p>
                  </div>
                </div>
              </div>
              <button className="w-full bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white font-bold py-3 rounded-xl transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2">
                <ShieldCheck className="w-4 h-4" /> Pre-emptively Dispatch Crew
              </button>
            </div>
          </div>
        </section>

        {/* 3. Smart Triage Inbox */}
        <section>
          <SmartAITriageInbox />
        </section>
      </main>

      {/* 4. Autonomous Escalation Slide-out */}
      <AnimatePresence>
        {selectedIssue && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedIssue(null)}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40"
            />
            <motion.div 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-lg bg-slate-900 border-l border-slate-800 z-50 flex flex-col shadow-2xl"
            >
              <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
                <div className="flex items-center gap-3">
                  <div className="bg-indigo-500/20 p-2 rounded-lg border border-indigo-500/30">
                    <Bot className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="font-black text-white text-lg">AI Triage Details</h3>
                    <p className="text-xs text-slate-400 font-mono">{selectedIssue.id}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedIssue(null)}
                  className="p-2 text-slate-500 hover:text-white bg-slate-800 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto flex-1 space-y-8">
                {/* JSON Data Extraction */}
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-2 mb-3">
                    <FileText className="w-4 h-4 text-slate-400" /> Raw AI Extraction Data
                  </h4>
                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 overflow-x-auto relative group">
                    <div className="absolute top-2 right-2 bg-slate-800 text-[10px] font-bold px-2 py-1 rounded text-slate-400">JSON</div>
                    <pre className="text-xs font-mono text-emerald-400 leading-relaxed">
                      {JSON.stringify(selectedIssue.aiJson, null, 2)}
                    </pre>
                  </div>
                </div>

                {/* Agentic Timeline */}
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-2 mb-4">
                    <Clock className="w-4 h-4 text-slate-400" /> Autonomous Agent Timeline
                  </h4>
                  <div className="space-y-0 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-slate-800">
                    {selectedIssue.aiTimeline.map((item, idx) => (
                      <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active py-3">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-slate-900 bg-slate-800 text-slate-500 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 shadow-[0_0_0_2px_rgba(30,41,59,1)]">
                          {item.status === 'completed' ? (
                            <Check className="w-4 h-4 text-emerald-500" />
                          ) : (
                            <Clock className="w-4 h-4 text-orange-400" />
                          )}
                        </div>
                        <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-slate-800 bg-slate-950/50 shadow-sm">
                          <div className="flex items-center justify-between mb-1">
                            <span className={cn(
                              "text-xs font-bold uppercase", 
                              item.status === 'completed' ? "text-emerald-500" : "text-orange-400"
                            )}>
                              {item.day}
                            </span>
                          </div>
                          <p className="text-sm text-slate-300 leading-snug">{item.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="p-6 border-t border-slate-800 bg-slate-950">
                <button className="w-full bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-black py-3 rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                  Override & Send Manual Dispatch
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function SidebarItem({ icon: Icon, label, active }: { icon: any, label: string, active?: boolean }) {
  return (
    <button className={cn(
      "w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all",
      active ? "bg-slate-800 text-white shadow-inner border border-slate-700" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
    )}>
      <Icon className={cn("w-5 h-5", active ? "text-emerald-400" : "text-slate-500")} />
      {label}
    </button>
  );
}
