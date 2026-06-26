import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Trophy, X, Star } from 'lucide-react';

const colors = [
  'bg-orange-500',
  'bg-emerald-500',
  'bg-yellow-400',
  'bg-pink-500',
  'bg-purple-500'
];

export default function MilestoneNotification({ 
  isVisible, 
  onClose,
  points = 2500,
  rank = "Neighborhood Leader"
}: { 
  isVisible: boolean; 
  onClose: () => void;
  points?: number;
  rank?: string;
}) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 6000); // Auto close after 6 seconds
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  // Generate confetti pieces
  const confettiPieces = Array.from({ length: 40 }).map((_, i) => ({
    id: i,
    color: colors[Math.floor(Math.random() * colors.length)],
    left: `${Math.random() * 100}%`,
    delay: Math.random() * 0.5,
    duration: 1.5 + Math.random() * 2,
    shape: Math.random() > 0.5 ? 'rounded-full' : 'rounded-sm',
    size: Math.random() * 6 + 4 // 4px to 10px
  }));

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed bottom-4 sm:bottom-8 right-4 sm:right-8 z-[100] w-full max-w-sm"
        >
          <div className="relative overflow-hidden bg-slate-900/95 backdrop-blur-xl border-2 border-orange-500/50 rounded-2xl shadow-[0_0_40px_rgba(249,115,22,0.3)] p-6">
            
            {/* Confetti Effects */}
            {confettiPieces.map((piece) => (
              <motion.div
                key={piece.id}
                initial={{ y: -20, opacity: 1, rotate: 0 }}
                animate={{ 
                  y: 300, 
                  x: Math.random() * 100 - 50,
                  opacity: [1, 1, 0],
                  rotate: Math.random() * 360 + 180 
                }}
                transition={{ 
                  duration: piece.duration, 
                  delay: piece.delay, 
                  ease: "easeOut" 
                }}
                className={`absolute ${piece.color} ${piece.shape} z-0 pointer-events-none`}
                style={{ 
                  left: piece.left, 
                  width: piece.size, 
                  height: piece.size 
                }}
              />
            ))}

            {/* Festive Background Elements */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-500/20 blur-[30px] rounded-full pointer-events-none z-0" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-emerald-500/20 blur-[30px] rounded-full pointer-events-none z-0" />
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-orange-500 via-yellow-400 to-emerald-500 z-10" />
            
            <button 
              onClick={onClose}
              className="absolute top-3 right-3 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 p-1.5 rounded-full transition-colors z-20"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-start gap-4 relative z-10">
              <div className="relative shrink-0 mt-1">
                <motion.div 
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                  className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-yellow-500 flex items-center justify-center shadow-[0_0_20px_rgba(250,204,21,0.5)] border-2 border-white/20 relative z-10"
                >
                  <Trophy className="w-6 h-6 text-orange-950" />
                </motion.div>
                <motion.div 
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="absolute inset-0 rounded-full border-2 border-orange-400/60 z-0"
                />
              </div>

              <div>
                <div className="flex items-center gap-1.5 mb-1">
                  <Sparkles className="w-4 h-4 text-yellow-400" />
                  <h3 className="text-xs font-bold text-yellow-400 uppercase tracking-widest">Shabash! Milestone</h3>
                </div>
                <h4 className="text-xl font-black text-white leading-tight mb-2">
                  {points.toLocaleString()} Karma Points
                </h4>
                <p className="text-slate-300 text-sm leading-relaxed">
                  You've unlocked the <strong className="text-orange-400">{rank}</strong> rank. The community salutes you! 🙏
                </p>
              </div>
            </div>

            {/* Sparkle animations */}
            <motion.div 
              animate={{ y: [-10, -25], opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5], rotate: [0, 90] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
              className="absolute top-6 left-6 pointer-events-none z-10"
            >
              <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
            </motion.div>
            <motion.div 
              animate={{ y: [-10, -35], opacity: [0, 1, 0], scale: [0.5, 1, 0.5], rotate: [0, -90] }}
              transition={{ duration: 1.8, repeat: Infinity, delay: 0.8 }}
              className="absolute top-10 right-14 pointer-events-none z-10"
            >
              <Star className="w-2 h-2 text-emerald-400 fill-emerald-400" />
            </motion.div>
             <motion.div 
              animate={{ y: [-10, -20], opacity: [0, 1, 0], scale: [0.5, 1.5, 0.5], rotate: [0, 45] }}
              transition={{ duration: 2.2, repeat: Infinity, delay: 1.5 }}
              className="absolute bottom-6 left-1/2 pointer-events-none z-10"
            >
              <Star className="w-2 h-2 text-orange-400 fill-orange-400" />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
