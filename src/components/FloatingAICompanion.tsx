import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, X, Bot, Zap, BarChart3, Mail, MessageSquare } from 'lucide-react';
import { cn } from '../utils';

type AIState = 'idle' | 'listening' | 'processing' | 'responded';

const SMART_CHIPS = [
  { icon: Zap, label: 'Report Live Wire', color: 'text-orange-400' },
  { icon: BarChart3, label: 'Summarize My Ward', color: 'text-indigo-400' },
  { icon: Mail, label: 'Draft Email to City Council', color: 'text-emerald-400' }
];

export default function FloatingAICompanion() {
  const [aiState, setAiState] = useState<AIState>('idle');
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [chatMessage, setChatMessage] = useState('');

  // Handle Voice simulation
  const handleMicPress = () => {
    setAiState('listening');
  };

  const handleMicRelease = () => {
    if (aiState !== 'listening') return;
    setAiState('processing');
    
    // Simulate processing then response
    setTimeout(() => {
      setAiState('responded');
      setChatMessage("Got it. I've analyzed the photo of the pothole. The severity is Level 4. Should I auto-dispatch the PWD crew?");
    }, 2000);
  };

  // Reset when closed
  useEffect(() => {
    if (!isExpanded) {
      setTimeout(() => {
        setAiState('idle');
        setChatMessage('');
      }, 300);
    }
  }, [isExpanded]);

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end pointer-events-none">
      
      <AnimatePresence>
        {isExpanded ? (
          <motion.div
            layoutId="ai-container"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            className="pointer-events-auto bg-slate-950/70 backdrop-blur-2xl border border-white/10 w-[360px] rounded-[2rem] shadow-2xl overflow-hidden flex flex-col origin-bottom-right"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-500 to-cyan-500 p-[1px]">
                  <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 text-emerald-400" />
                  </div>
                </div>
                <span className="text-white font-semibold text-sm">City AI Agent</span>
              </div>
              <button 
                onClick={() => setIsExpanded(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 p-5 flex flex-col justify-end min-h-[300px]">
              
              {/* Chat Area */}
              <div className="flex-1 flex flex-col justify-end mb-6">
                <AnimatePresence>
                  {aiState === 'responded' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-slate-800/50 border border-slate-700/50 rounded-2xl rounded-bl-sm p-4 text-sm text-slate-200 leading-relaxed shadow-lg"
                    >
                      {/* Staggered text animation effect */}
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ staggerChildren: 0.05 }}
                      >
                        {chatMessage.split(' ').map((word, i) => (
                          <motion.span
                            key={i}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.2, delay: i * 0.05 }}
                          >
                            {word}{" "}
                          </motion.span>
                        ))}
                      </motion.span>
                      
                      {/* Action Buttons */}
                      <motion.div 
                        initial={{ opacity: 0, marginTop: 0 }}
                        animate={{ opacity: 1, marginTop: 16 }}
                        transition={{ delay: 1.5 }}
                        className="flex gap-2"
                      >
                        <button className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 px-4 rounded-xl text-xs transition-colors shadow-lg shadow-emerald-500/20">
                          Yes, Dispatch
                        </button>
                        <button className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2 px-4 rounded-xl text-xs transition-colors">
                          No, Edit Details
                        </button>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Active Listening / Mic Area */}
              <div className="flex flex-col items-center">
                <motion.button
                  onMouseDown={handleMicPress}
                  onMouseUp={handleMicRelease}
                  onMouseLeave={handleMicRelease}
                  onTouchStart={handleMicPress}
                  onTouchEnd={handleMicRelease}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={cn(
                    "relative w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 shadow-[0_0_40px_rgba(16,185,129,0.15)]",
                    aiState === 'listening' ? "bg-emerald-500" : aiState === 'processing' ? "bg-indigo-500" : "bg-slate-800 border border-white/10 hover:border-emerald-500/50 hover:bg-slate-800/80"
                  )}
                >
                  {aiState === 'idle' || aiState === 'responded' ? (
                    <Mic className={cn("w-8 h-8", "text-emerald-400")} />
                  ) : aiState === 'processing' ? (
                    <div className="flex gap-1.5">
                      <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1 }} className="w-2 h-2 bg-white rounded-full" />
                      <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-2 h-2 bg-white rounded-full" />
                      <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-2 h-2 bg-white rounded-full" />
                    </div>
                  ) : (
                    // Listening Waveform
                    <div className="flex items-center justify-center gap-1.5 h-8">
                      {[...Array(4)].map((_, i) => (
                        <motion.div
                          key={i}
                          animate={{ height: ['20%', '100%', '30%', '80%', '20%'] }}
                          transition={{ duration: 0.5 + Math.random() * 0.3, repeat: Infinity, ease: "easeInOut" }}
                          className="w-1.5 bg-white rounded-full"
                        />
                      ))}
                    </div>
                  )}
                </motion.button>
                
                <p className="mt-4 text-xs font-medium text-slate-400 text-center">
                  {aiState === 'listening' ? (
                    <span className="text-emerald-400">Listening to your voice...</span>
                  ) : aiState === 'processing' ? (
                    <span className="text-indigo-400">Analyzing request...</span>
                  ) : (
                    "Hold to speak"
                  )}
                </p>
              </div>

              {/* Context Aware Chips */}
              <div className="mt-6 w-full overflow-hidden">
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide snap-x">
                  {SMART_CHIPS.map((chip, idx) => {
                    const Icon = chip.icon;
                    return (
                      <button 
                        key={idx}
                        className="snap-start shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-full bg-slate-800/50 hover:bg-slate-700 border border-white/5 hover:border-white/10 transition-all group"
                      >
                        <Icon className={cn("w-4 h-4", chip.color, "group-hover:scale-110 transition-transform")} />
                        <span className="text-xs font-medium text-slate-300 whitespace-nowrap">{chip.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>
          </motion.div>
        ) : (
          <div 
            className="flex items-center gap-3 pointer-events-auto"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Hover Text Pill */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, x: 20, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 10, scale: 0.9 }}
                  className="px-4 py-3 bg-slate-900/90 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl max-w-[220px]"
                >
                  <p className="text-xs font-medium text-slate-200 leading-relaxed">
                    <span className="text-emerald-400 font-bold mb-1 block">🤖 City AI Agent</span>
                    Processing 3 new hazard reports in your Neighborhood... Tap here for hands-free voice reporting.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* The Floating Morphing Orb */}
            <motion.button
              layoutId="ai-container"
              onClick={() => setIsExpanded(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative w-16 h-16 rounded-full shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:shadow-[0_0_40px_rgba(16,185,129,0.5)] transition-shadow cursor-pointer border border-white/10"
            >
              {/* Gradient Mesh Background */}
              <div className="absolute inset-0 rounded-full overflow-hidden">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-1/2 w-[200%] h-[200%]"
                  style={{
                    background: 'conic-gradient(from 0deg, #10b981, #0ea5e9, #6366f1, #10b981)',
                    filter: 'blur(10px)',
                    opacity: 0.8
                  }}
                />
              </div>
              
              {/* Inner Dark Mask to create ring effect */}
              <div className="absolute inset-[2px] bg-slate-950 rounded-full flex items-center justify-center overflow-hidden">
                {/* Breathing Inner Glow */}
                <motion.div 
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 bg-gradient-to-tr from-emerald-500/30 to-cyan-500/30 blur-md"
                />
                <MessageSquare className="w-6 h-6 text-emerald-400 relative z-10" />
              </div>
            </motion.button>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

