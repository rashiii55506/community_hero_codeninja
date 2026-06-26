import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, X, Check, Flame, Trophy, CheckCircle2 } from 'lucide-react';
import { cn } from '../utils';
import { useHapticFeedback } from '../hooks/useHapticFeedback';

const mockCards = [
  {
    id: 1,
    title: 'Pothole on 5th Ave',
    distance: '50m away',
    size: 'Large',
    image: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=400&h=500',
    confidence: '85%'
  },
  {
    id: 2,
    title: 'Graffiti on Library Wall',
    distance: '200m away',
    size: 'Medium',
    image: 'https://images.unsplash.com/photo-1518331539958-94488806283b?auto=format&fit=crop&q=80&w=400&h=500',
    confidence: '92%'
  },
  {
    id: 3,
    title: 'Broken Traffic Light',
    distance: '1.2km away',
    size: 'Critical',
    image: 'https://images.unsplash.com/photo-1563299796-17596ed6b05a?auto=format&fit=crop&q=80&w=400&h=500',
    confidence: '99%'
  }
];

export default function SwipeVerify() {
  const [cards, setCards] = useState(mockCards);
  const [karma, setKarma] = useState(450);
  const [showReward, setShowReward] = useState(false);
  const { trigger } = useHapticFeedback();

  const handleSwipe = (direction: 'left' | 'right', id: number) => {
    setCards((prev) => prev.filter((c) => c.id !== id));
    
    if (direction === 'right') {
      trigger([30, 50, 40]);
      setKarma((prev) => prev + 10);
      setShowReward(true);
      setTimeout(() => setShowReward(false), 1500);
    } else {
      trigger(20);
    }
  };

  return (
    <div className="max-w-md mx-auto w-full">
      <div className="flex items-center justify-between mb-8 px-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Community Validation</h2>
          <p className="text-slate-500 text-sm">Swipe right to verify, left to reject.</p>
        </div>
        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-2xl">
          <Trophy className="w-5 h-5 text-emerald-600" />
          <span className="font-bold text-emerald-800 text-lg">{karma}</span>
        </div>
      </div>

      <div className="relative h-[500px] w-full perspective-1000">
        <AnimatePresence>
          {cards.map((card, index) => {
            const isTop = index === cards.length - 1;
            return (
              <motion.div
                key={card.id}
                initial={{ scale: 0.95, y: -20, opacity: 0 }}
                animate={{ 
                  scale: isTop ? 1 : 0.95 - (cards.length - 1 - index) * 0.05,
                  y: isTop ? 0 : (cards.length - 1 - index) * 15,
                  opacity: 1,
                  zIndex: index 
                }}
                exit={{ scale: 0.8, opacity: 0 }}
                drag={isTop ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = offset.x;
                  if (swipe > 100) {
                    handleSwipe('right', card.id);
                  } else if (swipe < -100) {
                    handleSwipe('left', card.id);
                  }
                }}
                className={cn(
                  "absolute inset-0 bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden cursor-grab active:cursor-grabbing",
                  !isTop && "pointer-events-none"
                )}
              >
                <div className="relative h-[65%] w-full bg-slate-100">
                  <img src={card.image} alt={card.title} className="w-full h-full object-cover" />
                  <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1.5 text-white text-xs font-medium border border-white/10">
                    <MapPin className="w-3 h-3" />
                    {card.distance}
                  </div>
                  <div className="absolute top-4 right-4 bg-indigo-600/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1.5 text-white text-xs font-medium shadow-[0_0_15px_rgba(79,70,229,0.5)] border border-indigo-400">
                    <Flame className="w-3 h-3" />
                    {card.confidence} AI Match
                  </div>
                  
                  {/* Overlay hints */}
                  <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-red-500/20 to-transparent opacity-0 transition-opacity flex items-center p-6" id={`reject-${card.id}`}>
                     <div className="bg-red-500 text-white p-3 rounded-full shadow-lg border-2 border-white transform -rotate-12 font-bold text-xl opacity-0">REJECT</div>
                  </div>
                  <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-emerald-500/20 to-transparent opacity-0 transition-opacity flex items-center justify-end p-6" id={`verify-${card.id}`}>
                     <div className="bg-emerald-500 text-white p-3 rounded-full shadow-lg border-2 border-white transform rotate-12 font-bold text-xl opacity-0">VERIFY</div>
                  </div>
                </div>
                
                <div className="p-6 h-[35%] bg-white flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-1">{card.title}</h3>
                    <p className="text-slate-500 text-sm">AI Estimated Size: <span className="font-semibold text-slate-700">{card.size}</span></p>
                  </div>
                  
                  <div className="flex justify-center gap-6 mt-4">
                    <button 
                      onClick={() => handleSwipe('left', card.id)}
                      className="w-14 h-14 rounded-full bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-100 hover:scale-110 transition-all shadow-sm border border-red-100"
                    >
                      <X className="w-6 h-6" />
                    </button>
                    <button 
                      onClick={() => handleSwipe('right', card.id)}
                      className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center hover:bg-emerald-100 hover:scale-110 transition-all shadow-sm border border-emerald-100"
                    >
                      <Check className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {cards.length === 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 bg-slate-50 rounded-3xl border border-slate-200">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8 text-emerald-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">You're all caught up!</h3>
            <p className="text-slate-500 text-sm">Thanks for helping keep the community clean and safe.</p>
          </div>
        )}

        {/* Floating Reward Animation */}
        <AnimatePresence>
          {showReward && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.5 }}
              animate={{ opacity: 1, y: -50, scale: 1 }}
              exit={{ opacity: 0, y: -100 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none flex flex-col items-center"
            >
              <div className="text-4xl font-black text-emerald-500 drop-shadow-[0_0_10px_rgba(16,185,129,0.8)]">
                +10
              </div>
              <div className="text-emerald-600 font-bold text-sm bg-white/90 px-3 py-1 rounded-full shadow-lg mt-1 border border-emerald-200">
                Karma Earned!
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="mt-8 text-center text-slate-400 text-xs flex items-center justify-center gap-1">
        <MapPin className="w-3 h-3" /> Showing issues within 2km radius
      </div>
    </div>
  );
}
