import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scan, Focus, Droplets, AlertTriangle, X, Zap, Camera, Image as ImageIcon } from 'lucide-react';
import { cn } from '../utils';

export default function ARXRayScanner({ onClose }: { onClose?: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [mockMode, setMockMode] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);

  useEffect(() => {
    let stream: MediaStream | null = null;

    const startCamera = async () => {
      if (mockMode) {
        if (stream) stream.getTracks().forEach(track => track.stop());
        return;
      }

      try {
        stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'environment' } 
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setHasCameraPermission(true);
      } catch (err) {
        console.error("Error accessing camera:", err);
        setHasCameraPermission(false);
        setMockMode(true);
      }
    };

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [mockMode]);

  const hotspots = [
    {
      id: 1,
      title: 'Critical: Underground Jal Board Pipe Leak Detected (80% probability)',
      top: '40%',
      left: '30%',
      color: 'red',
      icon: Droplets,
      details: {
        severity: 5,
        depth: '1.2 meters below surface',
        impact: 'Affecting water pressure in Sector 4. High risk of road cave-in.'
      }
    },
    {
      id: 2,
      title: 'Warning: Sub-surface soil erosion (Pothole risk)',
      top: '65%',
      left: '60%',
      color: 'amber',
      icon: AlertTriangle,
      details: {
        severity: 3,
        depth: '0.4 meters below surface',
        impact: 'Early signs of sinkhole. Monsoon rains will accelerate erosion.'
      }
    }
  ];

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col font-sans">
      {/* Top Bar HUD */}
      <div className="absolute top-0 inset-x-0 p-4 sm:p-6 z-20 flex justify-between items-start bg-gradient-to-b from-black/80 to-transparent">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
            <span className="text-red-500 font-bold tracking-widest text-sm uppercase shadow-black drop-shadow-md">
              REC | AR X-Ray Mode Active
            </span>
          </div>
          <button 
            onClick={() => setMockMode(!mockMode)}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-300 bg-white/10 hover:bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-lg transition-colors border border-white/10"
          >
            {mockMode ? <ImageIcon className="w-3.5 h-3.5" /> : <Camera className="w-3.5 h-3.5" />}
            {mockMode ? 'Switch to Live Camera' : 'Switch to Mock Mode'}
          </button>
        </div>
        
        {onClose && (
          <button 
            onClick={onClose}
            className="bg-black/50 hover:bg-rose-500/80 text-white p-3 rounded-full backdrop-blur-md transition-colors border border-white/20 hover:border-rose-400"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Main Viewfinder */}
      <div className="flex-1 relative overflow-hidden bg-slate-900 group">
        {!mockMode ? (
          <video 
            ref={videoRef}
            autoPlay 
            playsInline 
            muted 
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <img 
            src="https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=1200" 
            alt="Indian Street"
            className="absolute inset-0 w-full h-full object-cover grayscale-[30%] contrast-125"
          />
        )}

        {/* HUD Brackets */}
        <div className="absolute inset-0 border-2 border-cyan-500/20 m-6 sm:m-8 rounded-2xl pointer-events-none z-10 mix-blend-screen">
          <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-cyan-400 rounded-tl-2xl drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
          <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-cyan-400 rounded-tr-2xl drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
          <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-cyan-400 rounded-bl-2xl drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
          <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-cyan-400 rounded-br-2xl drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
          
          <div className="absolute inset-0 flex items-center justify-center opacity-30">
            <Focus className="w-24 h-24 text-cyan-400" />
          </div>
        </div>

        {/* Scanning Laser */}
        <motion.div 
          className="absolute left-0 right-0 h-[2px] bg-cyan-400 shadow-[0_0_20px_5px_rgba(34,211,238,0.7)] pointer-events-none z-10"
          animate={{ top: ['5%', '95%', '5%'] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        />

        {/* Hotspots */}
        {hotspots.map((spot) => {
          const isRed = spot.color === 'red';
          const Icon = spot.icon;
          
          return (
            <motion.div 
              key={spot.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: spot.id * 0.5 }}
              className="absolute z-20 flex flex-col items-center"
              style={{ top: spot.top, left: spot.left }}
              onClick={() => setActiveHotspot(spot.id)}
            >
              <div className="relative group cursor-pointer">
                {/* Pulse Ring */}
                <div className={cn(
                  "absolute -inset-4 rounded-full opacity-50 animate-ping",
                  isRed ? "bg-red-500" : "bg-amber-500"
                )} />
                
                {/* Pin Base */}
                <div className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center relative backdrop-blur-md border-2 shadow-[0_0_20px_rgba(0,0,0,0.5)] transition-transform group-hover:scale-110",
                  isRed ? "bg-red-950/80 border-red-500" : "bg-amber-950/80 border-amber-500"
                )}>
                  <Icon className={cn("w-6 h-6", isRed ? "text-red-400" : "text-amber-400")} />
                </div>
              </div>
              
              <div className={cn(
                "mt-3 px-3 py-1.5 rounded-lg text-xs font-bold backdrop-blur-md border max-w-[200px] text-center shadow-lg",
                isRed ? "bg-red-950/80 border-red-500/50 text-red-100" : "bg-amber-950/80 border-amber-500/50 text-amber-100"
              )}>
                {spot.title}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom Sheet / Modal */}
      <AnimatePresence>
        {activeHotspot && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center sm:p-4"
            onClick={() => setActiveHotspot(null)}
          >
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-900 border-t sm:border border-slate-700 w-full max-w-lg rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl relative overflow-hidden"
            >
              {(() => {
                const spot = hotspots.find(h => h.id === activeHotspot)!;
                const isRed = spot.color === 'red';
                
                return (
                  <>
                    <div className={cn(
                      "absolute top-0 inset-x-0 h-1.5",
                      isRed ? "bg-gradient-to-r from-red-500 to-rose-600" : "bg-gradient-to-r from-amber-400 to-orange-500"
                    )} />
                    
                    <div className="flex justify-between items-start mb-6">
                      <h3 className="text-xl font-bold text-white pr-8 leading-tight">
                        {spot.title.split(':')[1]}
                      </h3>
                      <button 
                        onClick={() => setActiveHotspot(null)}
                        className="bg-slate-800 hover:bg-slate-700 p-2 rounded-full transition-colors shrink-0"
                      >
                        <X className="w-5 h-5 text-slate-400" />
                      </button>
                    </div>

                    {/* Mock 3D Cross-section */}
                    <div className="h-32 bg-slate-950 rounded-xl mb-6 relative border border-slate-800 overflow-hidden group">
                      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.2) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                      
                      {/* Subsurface layers */}
                      <div className="absolute top-1/4 inset-x-0 h-px bg-slate-800" />
                      <div className="absolute top-2/4 inset-x-0 h-px bg-slate-800" />
                      <div className="absolute top-3/4 inset-x-0 h-px bg-slate-800" />
                      
                      {/* Pipe/Anomaly visual */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-8 bg-slate-800 rounded-full border-t-2 border-b-2 border-slate-700 overflow-hidden">
                        {isRed && (
                          <motion.div 
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-full bg-cyan-500 shadow-[0_0_20px_rgba(34,211,238,1)]"
                            animate={{ scaleX: [1, 1.5, 1], opacity: [0.8, 1, 0.8] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          />
                        )}
                        {!isRed && (
                          <div className="absolute top-1/2 left-1/3 w-12 h-6 -translate-y-1/2 bg-amber-900/50 rounded-full border border-amber-700" />
                        )}
                      </div>
                      
                      <div className="absolute bottom-2 left-3 text-[10px] uppercase font-bold text-slate-500 tracking-widest">
                        Depth Scan: {spot.details.depth}
                      </div>
                    </div>

                    <div className="space-y-4 mb-8">
                      <div className="flex justify-between items-center bg-slate-800/50 p-3 rounded-xl border border-slate-700/50">
                        <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">AI Severity Score</span>
                        <span className={cn(
                          "font-black text-lg px-3 py-1 rounded-lg bg-opacity-20",
                          isRed ? "text-red-400 bg-red-500" : "text-amber-400 bg-amber-500"
                        )}>
                          {spot.details.severity} / 5
                        </span>
                      </div>
                      <p className="text-slate-300 text-sm leading-relaxed">
                        <strong className="text-white">Predicted Impact:</strong> {spot.details.impact}
                      </p>
                    </div>

                    <button 
                      onClick={() => {
                        alert("Dispatched!");
                        setActiveHotspot(null);
                      }}
                      className={cn(
                        "w-full py-4 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all shadow-lg",
                        isRed 
                          ? "bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 border border-red-400/30" 
                          : "bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 border border-amber-400/30"
                      )}
                    >
                      <Zap className="w-5 h-5" /> Auto-Dispatch Crew
                    </button>
                  </>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
