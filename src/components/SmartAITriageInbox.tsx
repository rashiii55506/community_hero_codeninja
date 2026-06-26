import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, MapPin, ShieldCheck, Check, Edit2, Zap, Clock, ShieldAlert, Droplets, AlertTriangle, Loader2 } from 'lucide-react';
import { cn } from '../utils';

const INITIAL_INBOX_ITEMS = [
  {
    id: 'ISS-001',
    title: 'Critical Pipeline Burst in Downtown District',
    location: 'Ward 4, Downtown Neighborhood',
    severity: '[Level 5 - Red] Critical',
    severityColor: 'text-red-400 bg-red-500/10 border-red-500/30',
    confidence: '94% Match',
    department: 'Water Department',
    summary: 'AI detects high water pressure leak. Estimated fix requires 2 plumbers and 1 excavator.',
    thumbnail: 'https://images.unsplash.com/photo-1621252179027-94459d278660?auto=format&fit=crop&q=80&w=300',
    timeElapsed: 'Reported 18 mins ago',
    icon: Droplets
  },
  {
    id: 'ISS-002',
    title: 'Severe Road Hazard',
    location: 'Ward 8, Central Business District',
    severity: '[Level 5 - Red] Critical',
    severityColor: 'text-red-400 bg-red-500/10 border-red-500/30',
    confidence: '96% Match',
    department: 'Roads & Infrastructure',
    summary: 'AI detects a massive 3-foot pothole causing severe traffic disruption. Immediate patch required.',
    thumbnail: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=300',
    timeElapsed: 'Reported 12 mins ago',
    icon: ShieldAlert
  },
  {
    id: 'ISS-003',
    title: 'Fallen Tree Blocking Road',
    location: 'Ward 12, Westside Suburbs',
    severity: '[Level 4 - Orange] High Priority',
    severityColor: 'text-orange-400 bg-orange-500/10 border-orange-500/30',
    confidence: '89% Match',
    department: 'Forestry & Parks',
    summary: 'AI classifies as High Priority. Branches completely obstructing two lanes of traffic.',
    thumbnail: 'https://images.unsplash.com/photo-1596700712711-2092120db550?auto=format&fit=crop&q=80&w=300',
    timeElapsed: 'Reported 35 mins ago',
    icon: AlertTriangle
  }
];

const containerVariants: any = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants: any = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15
    }
  }
};

export default function SmartAITriageInbox() {
  const [issues, setIssues] = useState(INITIAL_INBOX_ITEMS);
  const [processingId, setProcessingId] = useState<string | null>(null);

  const handleApprove = (id: string) => {
    setProcessingId(id);
    setTimeout(() => {
      setIssues(prev => prev.filter(issue => issue.id !== id));
      setProcessingId(null);
    }, 1500);
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-500/20 border border-emerald-500/30 rounded-xl">
            <Bot className="w-6 h-6 text-emerald-400" />
          </div>
          <div>
            <h3 className="text-2xl font-black text-white tracking-tight">City Council Command Center</h3>
            <p className="text-sm font-medium text-slate-400">Pending Approvals: {issues.length}</p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-800/50 rounded-full border border-slate-700/50">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-bold text-slate-300">Live Feed Active</span>
        </div>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-4"
      >
        <AnimatePresence mode="popLayout">
          {issues.length > 0 ? (
            issues.map((item) => (
            <motion.div
              key={item.id}
              layout
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, scale: 0.9, height: 0, marginBottom: 0, padding: 0, overflow: 'hidden' }}
              whileHover={{ scale: processingId === item.id ? 1 : 1.01, y: processingId === item.id ? 0 : -2 }}
              className={cn(
                "bg-slate-900/50 backdrop-blur-md rounded-2xl p-4 sm:p-5 flex flex-col xl:flex-row gap-5 lg:gap-6 shadow-lg transition-all duration-300 group",
                processingId === item.id ? "border-2 border-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.3)]" : "border border-slate-800 hover:border-emerald-500/30 hover:shadow-[0_8px_30px_rgba(16,185,129,0.1)]"
              )}
            >
              {/* Left Section: Rich Media */}
              <div className="relative w-full xl:w-[120px] h-[160px] xl:h-[120px] shrink-0 rounded-xl overflow-hidden border border-slate-700/50 shadow-inner group-hover:border-emerald-500/50 transition-colors">
                <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* AI Scanning Overlay Effect */}
                <div className="absolute inset-0 pointer-events-none">
                   {/* Scanning line */}
                   <motion.div 
                     animate={{ y: ['0%', '100%', '0%'] }}
                     transition={{ duration: 4, ease: "linear", repeat: Infinity }}
                     className="w-full h-0.5 bg-cyan-400/50 shadow-[0_0_8px_rgba(34,211,238,0.8)]"
                   />
                   {/* Bounding Box Corner Marks */}
                   <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-cyan-400/80 rounded-tl-sm"></div>
                   <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-cyan-400/80 rounded-tr-sm"></div>
                   <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-cyan-400/80 rounded-bl-sm"></div>
                   <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-cyan-400/80 rounded-br-sm"></div>
                </div>

                {/* AI Badge */}
                <div className="absolute bottom-2 right-2 bg-slate-950/80 backdrop-blur-md border border-cyan-500/30 px-2 py-0.5 rounded-md flex items-center gap-1 shadow-lg">
                  <Zap className="w-3 h-3 text-cyan-400" />
                  <span className="text-[10px] font-bold text-cyan-400">AI Analyzed</span>
                </div>
              </div>

              {/* Middle Section: Issue Details & AI Analysis */}
              <div className="flex-1 min-w-0 flex flex-col justify-center">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div>
                    <h4 className="text-lg sm:text-xl font-bold text-white mb-1 group-hover:text-emerald-400 transition-colors">{item.title}</h4>
                    <p className="text-sm font-medium text-slate-400 flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-slate-500" /> {item.location}
                    </p>
                  </div>
                </div>

                {/* Badges Row */}
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className={cn("text-xs font-bold px-2.5 py-1 rounded-md border", item.severityColor)}>
                    {item.severity}
                  </span>
                  <span className="text-xs font-bold bg-slate-800 text-slate-300 border border-slate-700 px-2.5 py-1 rounded-md flex items-center gap-1.5">
                    <Bot className="w-3.5 h-3.5 text-cyan-400" /> {item.confidence}
                  </span>
                  <span className="text-xs font-bold bg-slate-800 text-slate-300 border border-slate-700 px-2.5 py-1 rounded-md flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" /> {item.department}
                  </span>
                </div>

                {/* AI Summary Text */}
                <div className="bg-slate-950/50 border border-slate-800/50 rounded-lg p-3">
                  <p className="text-sm text-slate-300 leading-relaxed font-medium">
                    <span className="text-emerald-400 font-bold mr-2">↳ AI Summary:</span>
                    {item.summary}
                  </p>
                </div>
              </div>

              {/* Right Section: Action Zone */}
              <div className="w-full xl:w-48 shrink-0 flex flex-col justify-center gap-3 border-t xl:border-t-0 xl:border-l border-slate-800/50 pt-4 xl:pt-0 xl:pl-6">
                <div className="flex items-center gap-1.5 text-slate-400 mb-1 justify-center xl:justify-start">
                  <Clock className="w-3.5 h-3.5" />
                  <span className="text-[11px] font-bold uppercase tracking-wider">{item.timeElapsed}</span>
                </div>
                
                <button 
                  onClick={() => handleApprove(item.id)}
                  disabled={processingId === item.id}
                  className={cn(
                    "w-full font-black py-2.5 px-4 rounded-xl shadow-[0_0_15px_rgba(16,185,129,0.2)] transition-all flex items-center justify-center gap-2",
                    processingId === item.id 
                      ? "bg-slate-800 text-emerald-400 border border-emerald-500/50 cursor-not-allowed" 
                      : "bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 hover:shadow-[0_0_25px_rgba(16,185,129,0.4)] active:scale-95"
                  )}
                >
                  {processingId === item.id ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Dispatching...
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4" /> Approve Dispatch
                    </>
                  )}
                </button>
                
                <button className="w-full bg-transparent hover:bg-slate-800 border border-slate-700 text-slate-300 font-bold py-2.5 px-4 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2">
                  <Edit2 className="w-4 h-4" /> Reroute / Edit
                </button>
              </div>

            </motion.div>
            ))
          ) : (
            <motion.div
               layout
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               className="bg-slate-900/50 backdrop-blur-md border border-emerald-500/30 rounded-2xl p-12 flex flex-col items-center justify-center text-center shadow-[0_0_30px_rgba(16,185,129,0.1)] mt-8"
            >
              <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                <ShieldCheck className="w-10 h-10 text-emerald-400" />
              </div>
              <h3 className="text-2xl font-black text-white mb-2">🎉 All clear! The city is safe.</h3>
              <p className="text-slate-400">0 pending tasks. Excellent work, Council Member.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
