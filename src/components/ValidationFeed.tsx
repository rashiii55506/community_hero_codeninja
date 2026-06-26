import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import { MapPin, Clock, Bot, ShieldCheck, X, Check, ThumbsDown, ThumbsUp, Star } from 'lucide-react';
import { cn } from '../utils';
import { useHapticFeedback } from '../hooks/useHapticFeedback';

const MOCK_ISSUES = [
  {
    id: 1,
    title: "Deep Pothole near Metro Station",
    location: "Downtown District",
    distance: "1.2 miles away",
    time: "Reported 2 hours ago",
    image: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=800",
    aiConfidence: 85,
    category: "Road Hazard",
    verifications: 2,
    requiredVerifications: 5,
    reporter: "Community Member"
  },
  {
    id: 2,
    title: "Overflowing Garbage Dump",
    location: "Westside Suburbs",
    distance: "2.4 miles away",
    time: "Reported 5 hours ago",
    image: "https://images.unsplash.com/photo-1605600659908-0ef719419d41?auto=format&fit=crop&q=80&w=800",
    aiConfidence: 92,
    category: "Sanitation",
    verifications: 4,
    requiredVerifications: 5,
    reporter: "Community Member"
  },
  {
    id: 3,
    title: "Broken Streetlight",
    location: "North Park Avenue",
    distance: "3.1 miles away",
    time: "Reported 1 day ago",
    image: "https://images.unsplash.com/photo-1518015340636-6ec41a27e7eb?auto=format&fit=crop&q=80&w=800",
    aiConfidence: 78,
    category: "Infrastructure",
    verifications: 1,
    requiredVerifications: 3,
    reporter: "Community Member"
  }
];

const COLORS = ['bg-emerald-500', 'bg-teal-400', 'bg-yellow-400', 'bg-orange-500', 'bg-pink-500'];

export default function ValidationFeed() {
  const [issues, setIssues] = useState(MOCK_ISSUES);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const { trigger } = useHapticFeedback();

  const handleAction = (id: number, action: 'verify' | 'reject') => {
    if (action === 'verify') {
      trigger([30, 50, 40]);
      setToastMessage("Awesome! You just helped secure your neighborhood. +10 XP added!");
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
    } else {
      trigger(20);
      setToastMessage("Issue marked as Spam. Thank you for keeping the feed clean! 🛡️");
    }

    setTimeout(() => setToastMessage(null), 3000);

    setIssues(prev => prev.filter(issue => issue.id !== id));
  };

  const confettiPieces = Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    left: `${50 + (Math.random() * 20 - 10)}%`,
    top: `${50 + (Math.random() * 20 - 10)}%`,
    angle: Math.random() * Math.PI * 2,
    velocity: 200 + Math.random() * 300,
    duration: 1 + Math.random(),
    size: Math.random() * 6 + 4,
    shape: Math.random() > 0.5 ? 'rounded-full' : 'rounded-sm'
  }));

  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[600px] py-8 overflow-hidden relative">
      
      {/* Confetti Explosion */}
      <AnimatePresence>
        {showConfetti && confettiPieces.map((piece) => (
          <motion.div
            key={`confetti-${piece.id}`}
            initial={{ 
              x: '-50%', 
              y: '-50%', 
              left: piece.left, 
              top: piece.top,
              scale: 0,
              opacity: 1
            }}
            animate={{ 
              x: `calc(-50% + ${Math.cos(piece.angle) * piece.velocity}px)`,
              y: `calc(-50% + ${Math.sin(piece.angle) * piece.velocity + 200}px)`,
              scale: [0, 1, 0.5],
              opacity: [1, 1, 0],
              rotate: Math.random() * 720 - 360
            }}
            transition={{ 
              duration: piece.duration, 
              ease: "easeOut" 
            }}
            className={`absolute ${piece.color} ${piece.shape} z-[200] pointer-events-none`}
            style={{ width: piece.size, height: piece.size }}
          />
        ))}
      </AnimatePresence>

      {/* Background Motif */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-0 flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="w-[800px] h-[800px] fill-current text-white animate-[spin_120s_linear_infinite]">
          <path d="M50 0 C60 40, 90 40, 100 50 C90 60, 60 60, 50 100 C40 60, 10 60, 0 50 C10 40, 40 40, 50 0 Z" />
          <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>

      <div className="text-center mb-8 relative z-10">
        <h2 className="text-3xl font-black text-white tracking-tight mb-2">Community Verification</h2>
        <p className="text-slate-400 font-medium">Swipe to verify community reports</p>
      </div>

      <div className="relative w-full max-w-sm h-[520px] flex items-center justify-center z-10 perspective-1000">
        <AnimatePresence mode="popLayout">
          {issues.length > 0 ? (
            issues.map((issue, index) => {
              const isTop = index === 0;
              return (
                <SwipeableCard 
                  key={issue.id} 
                  issue={issue} 
                  isTop={isTop}
                  index={index}
                  onAction={(action) => handleAction(issue.id, action)} 
                />
              );
            })
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 text-center shadow-2xl"
            >
              <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/30">
                <ShieldCheck className="w-10 h-10 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">All Caught Up!</h3>
              <p className="text-slate-400">There are no pending reports in your neighborhood right now. Great job!</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-8 sm:bottom-12 z-50 px-6 py-4 bg-emerald-600 text-white font-bold rounded-2xl shadow-[0_0_30px_rgba(16,185,129,0.4)] border border-emerald-400 max-w-md text-center"
          >
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

function SwipeableCard({ issue, isTop, index, onAction }: { 
  issue: typeof MOCK_ISSUES[0], 
  isTop: boolean, 
  index: number,
  onAction: (action: 'verify' | 'reject') => void 
}) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);
  
  // Overlay opacities for swipe feedback
  const verifyOpacity = useTransform(x, [0, 100], [0, 1]);
  const rejectOpacity = useTransform(x, [0, -100], [0, 1]);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 100;
    if (info.offset.x > threshold) {
      onAction('verify');
    } else if (info.offset.x < -threshold) {
      onAction('reject');
    }
  };

  return (
    <motion.div
      className={cn(
        "absolute w-full h-full will-change-transform",
        !isTop && "pointer-events-none"
      )}
      style={{
        x: isTop ? x : 0,
        rotate: isTop ? rotate : 0,
        opacity: isTop ? opacity : 1,
        zIndex: 10 - index,
      }}
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      initial={false}
      animate={{
        scale: isTop ? 1 : 1 - index * 0.05,
        y: isTop ? 0 : index * 20,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      exit={{ x: x.get() > 0 ? 300 : -300, opacity: 0, transition: { duration: 0.2 } }}
    >
      <div className="w-full h-full bg-slate-900 border border-slate-700/50 rounded-[2rem] shadow-2xl overflow-hidden relative flex flex-col cursor-grab active:cursor-grabbing">
        
        {/* Swipe Feedback Overlays */}
        <motion.div style={{ opacity: verifyOpacity }} className="absolute inset-0 bg-emerald-500/20 z-20 pointer-events-none border-4 border-emerald-500 rounded-[2rem] flex items-center justify-center">
          <div className="bg-emerald-500 text-white font-black text-4xl px-8 py-4 rounded-2xl border-4 border-emerald-400 rotate-[-15deg] shadow-2xl uppercase tracking-widest">
            Verify
          </div>
        </motion.div>
        <motion.div style={{ opacity: rejectOpacity }} className="absolute inset-0 bg-rose-500/20 z-20 pointer-events-none border-4 border-rose-500 rounded-[2rem] flex items-center justify-center">
          <div className="bg-rose-500 text-white font-black text-4xl px-8 py-4 rounded-2xl border-4 border-rose-400 rotate-[15deg] shadow-2xl uppercase tracking-widest">
            Spam
          </div>
        </motion.div>

        {/* Media Thumbnail */}
        <div className="relative h-[45%] w-full bg-slate-800 shrink-0">
          <img src={issue.image} alt="Issue" className="w-full h-full object-cover" draggable="false" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-slate-900" />
          
          <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
            <div className="bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700 flex items-center gap-1.5 shadow-lg max-w-[60%]">
              <MapPin className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
              <span className="text-xs font-bold text-slate-200 truncate">{issue.distance} in {issue.location}</span>
            </div>
            <div className="bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700 flex items-center gap-1.5 shadow-lg">
              <Clock className="w-3.5 h-3.5 text-orange-400" />
              <span className="text-xs font-bold text-slate-200 text-right">{issue.time.split(' ').slice(1).join(' ')}</span>
            </div>
          </div>
        </div>

        {/* Details Box */}
        <div className="p-6 flex-1 flex flex-col">
          <div className="mb-4">
            <h3 className="text-xl font-bold text-white leading-tight mb-2">{issue.title}</h3>
            <p className="text-sm text-slate-400 flex items-center gap-2 mb-3">
              <span className="inline-block w-2 h-2 rounded-full bg-slate-600" />
              Reported by a {issue.reporter} <span className="text-xs opacity-60">(Hidden for privacy)</span>
            </p>
            <div className="inline-flex items-center gap-1.5 bg-indigo-500/10 border border-indigo-500/30 px-3 py-1.5 rounded-lg">
              <Bot className="w-4 h-4 text-indigo-400" />
              <span className="text-xs font-bold text-indigo-300">AI Confidence: {issue.aiConfidence}% | {issue.category}</span>
            </div>
          </div>

          <div className="mt-auto mb-6">
            <div className="flex justify-between text-xs font-bold mb-2">
              <span className="text-slate-400">Verifications</span>
              <span className="text-slate-300">{issue.verifications} / {issue.requiredVerifications}</span>
            </div>
            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden border border-slate-700">
              <div 
                className="h-full bg-gradient-to-r from-orange-400 to-amber-500 rounded-full"
                style={{ width: `${(issue.verifications / issue.requiredVerifications) * 100}%` }}
              />
            </div>
            <p className="text-[10px] text-slate-500 mt-2 font-medium">
              {issue.requiredVerifications - issue.verifications} more needed for Auto-Dispatch!
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button 
              onClick={() => onAction('reject')}
              className="flex-1 bg-slate-800 hover:bg-slate-700 text-rose-400 border border-slate-700 hover:border-rose-500/50 py-3 rounded-2xl font-bold flex flex-col items-center justify-center gap-1 transition-colors shadow-lg active:scale-95"
            >
              <X className="w-6 h-6 mb-1" />
              <span className="text-xs uppercase tracking-wider">Flag as Spam</span>
            </button>
            <div className="flex-1 relative">
              <div className="absolute -top-3 inset-x-0 flex justify-center z-20 pointer-events-none">
                <div className="bg-yellow-500 text-yellow-950 text-[10px] font-black uppercase tracking-widest px-3 py-0.5 rounded-full shadow-[0_0_15px_rgba(234,179,8,0.5)] border border-yellow-400 flex items-center gap-1">
                  <Star className="w-3 h-3 fill-yellow-950" /> Earn +10 Impact Points 🪙
                </div>
              </div>
              <button 
                onClick={() => onAction('verify')}
                className="w-full h-full bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white border border-emerald-400/50 py-3 rounded-2xl font-bold flex flex-col items-center justify-center gap-1 transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] active:scale-95"
              >
                <Check className="w-6 h-6 mb-1" />
                <span className="text-xs uppercase tracking-wider">Verify Issue</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
