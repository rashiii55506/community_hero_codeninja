import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Clock, GitCommit, Bot, Send, AlertCircle } from 'lucide-react';
import { cn } from '../utils';

export default function EscalationTimeline() {
  const [activeStep, setActiveStep] = useState(2); // 0, 1, 2, 3

  const steps = [
    {
      id: 0,
      title: 'Triage & Auto-Routing',
      description: 'AI analyzed issue, identified "Public Works", and assigned Level 4 Severity.',
      time: 'Day 1 (Completed)',
      icon: Bot,
      status: 'completed',
    },
    {
      id: 1,
      title: 'Auto-Emailed Municipality',
      description: 'Official dispatch draft sent to local ward supervisor.',
      time: 'Day 1 (Completed)',
      icon: Send,
      status: 'completed',
    },
    {
      id: 2,
      title: 'Auto-Drafted Follow-Up',
      description: 'No resolution detected. AI drafted and sent a firm follow-up email.',
      time: 'Day 5 (Completed)',
      icon: Mail,
      status: 'completed',
    },
    {
      id: 3,
      title: 'Escalation to Regional Director',
      description: 'Auto-escalating via Twitter API & Direct Email to Regional Director.',
      time: 'Day 10 (Pending countdown: 2 days left)',
      icon: AlertCircle,
      status: 'pending',
    }
  ];

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-indigo-100 p-2 rounded-lg border border-indigo-200">
          <GitCommit className="w-5 h-5 text-indigo-700" />
        </div>
        <div>
          <h3 className="font-bold text-slate-900">AI Agent Escalation Timeline</h3>
          <p className="text-slate-500 text-xs font-medium">Autonomous CI/CD-style workflow tracking</p>
        </div>
      </div>

      <div className="relative pl-4 space-y-6 before:absolute before:inset-y-2 before:left-[27px] before:w-[2px] before:bg-slate-200">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isCompleted = step.status === 'completed';
          const isPending = step.status === 'pending';
          const isActive = index === activeStep;

          return (
            <motion.div 
              key={step.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.15 }}
              className="relative pl-10"
            >
              {/* Node Point */}
              <div className={cn(
                "absolute left-[-11px] top-1 w-7 h-7 rounded-full border-2 flex items-center justify-center bg-white z-10 transition-colors",
                isCompleted ? "border-emerald-500 text-emerald-500" : 
                isPending ? "border-amber-400 text-amber-500 shadow-[0_0_10px_rgba(251,191,36,0.3)]" : "border-slate-300 text-slate-300"
              )}>
                {isCompleted ? <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> : 
                 isPending ? <div className="w-2 h-2 rounded-full bg-amber-400 animate-ping" /> : null}
              </div>

              <div className={cn(
                "bg-white border rounded-xl p-4 shadow-sm transition-all",
                isCompleted ? "border-slate-200 opacity-80" : 
                isPending ? "border-indigo-300 bg-indigo-50/30 shadow-[0_4px_20px_-5px_rgba(99,102,241,0.15)]" : "border-slate-200"
              )}>
                <div className="flex items-start justify-between mb-1">
                  <h4 className={cn("font-bold text-sm flex items-center gap-2", 
                    isPending ? "text-indigo-900" : "text-slate-800"
                  )}>
                    <Icon className={cn("w-4 h-4", isPending ? "text-indigo-600" : "text-slate-400")} />
                    {step.title}
                  </h4>
                  <span className={cn(
                    "text-[10px] font-bold px-2 py-0.5 rounded-full uppercase",
                    isCompleted ? "bg-slate-100 text-slate-500" : "bg-amber-100 text-amber-700"
                  )}>
                    {isCompleted ? 'Done' : 'Pending'}
                  </span>
                </div>
                <p className="text-slate-600 text-xs mb-2 leading-relaxed">{step.description}</p>
                <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                  <Clock className="w-3 h-3" /> {step.time}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
