import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { APIProvider, Map, AdvancedMarker, InfoWindow, useMap } from '@vis.gl/react-google-maps';
import { AlertOctagon, CheckCircle2, Clock, Zap, Map as MapIcon, X, Bot } from 'lucide-react';
import { cn } from '../utils';

const API_KEY =
  process.env.GOOGLE_MAPS_PLATFORM_KEY ||
  (import.meta as any).env?.VITE_GOOGLE_MAPS_PLATFORM_KEY ||
  (globalThis as any).GOOGLE_MAPS_PLATFORM_KEY ||
  '';
const hasValidKey = Boolean(API_KEY) && API_KEY !== 'YOUR_API_KEY';

// --- MOCK DATA ---
const BENGALURU_CENTER = { lat: 12.9352, lng: 77.6245 }; // Koramangala roughly

const MOCK_PINS = [
  { id: 1, position: { lat: 12.9360, lng: 77.6250 }, type: 'critical', title: 'Massive Pothole', score: '5/5', desc: 'Live Wire Exposed' },
  { id: 2, position: { lat: 12.9340, lng: 77.6230 }, type: 'progress', title: 'Blocked Drain', score: '3/5', desc: 'AI Triaged' },
  { id: 3, position: { lat: 12.9370, lng: 77.6270 }, type: 'resolved', title: 'Streetlight Fixed', score: '1/5', desc: 'Verified by User' },
  { id: 4, position: { lat: 12.9320, lng: 77.6260 }, type: 'critical', title: 'Waterlogging', score: '4/5', desc: 'Severe Risk' },
  { id: 5, position: { lat: 12.9380, lng: 77.6220 }, type: 'progress', title: 'Abandoned Vehicle', score: '2/5', desc: 'Auto-Dispatched' },
];

const DARK_MAP_STYLES = [
  { "elementType": "geometry", "stylers": [{ "color": "#0f172a" }] },
  { "elementType": "labels.text.fill", "stylers": [{ "color": "#94a3b8" }] },
  { "elementType": "labels.text.stroke", "stylers": [{ "color": "#0f172a" }] },
  { "featureType": "administrative.locality", "elementType": "labels.text.fill", "stylers": [{ "color": "#e2e8f0" }] },
  { "featureType": "poi", "elementType": "labels.text.fill", "stylers": [{ "color": "#cbd5e1" }] },
  { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "color": "#064e3b" }] },
  { "featureType": "road", "elementType": "geometry", "stylers": [{ "color": "#1e293b" }] },
  { "featureType": "road", "elementType": "geometry.stroke", "stylers": [{ "color": "#334155" }] },
  { "featureType": "road.highway", "elementType": "geometry", "stylers": [{ "color": "#334155" }] },
  { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#172554" }] },
  { "featureType": "water", "elementType": "labels.text.fill", "stylers": [{ "color": "#60a5fa" }] }
];

function MarkerPin({ type }: { type: string }) {
  if (type === 'critical') {
    return (
      <div className="relative flex items-center justify-center w-10 h-10 -ml-5 -mt-5">
        <motion.div animate={{ scale: [1, 2, 1], opacity: [0.8, 0, 0.8] }} transition={{ duration: 1.5, repeat: Infinity }} className="absolute inset-0 bg-rose-500 rounded-full" />
        <div className="w-4 h-4 bg-rose-500 rounded-full shadow-[0_0_15px_rgba(244,63,94,1)] relative z-10 border-2 border-slate-950 flex items-center justify-center">
          <AlertOctagon className="w-2 h-2 text-white" />
        </div>
      </div>
    );
  }
  if (type === 'progress') {
    return (
      <div className="relative flex items-center justify-center w-10 h-10 -ml-5 -mt-5">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} className="absolute inset-1 border border-dashed border-amber-500 rounded-full opacity-50" />
        <div className="w-4 h-4 bg-amber-500 rounded-full shadow-[0_0_15px_rgba(245,158,11,1)] relative z-10 border-2 border-slate-950 flex items-center justify-center">
          <Clock className="w-2 h-2 text-white" />
        </div>
      </div>
    );
  }
  return (
    <div className="relative flex items-center justify-center w-10 h-10 -ml-5 -mt-5 cursor-default">
      <div className="w-4 h-4 bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.8)] relative z-10 border-2 border-slate-950 flex items-center justify-center">
         <CheckCircle2 className="w-2 h-2 text-white" />
      </div>
    </div>
  );
}

// Fallback Map when API Key is missing
function FallbackMap() {
  return (
    <div className="w-full h-[600px] bg-slate-950 rounded-[1.5rem] border border-slate-800 overflow-hidden relative flex items-center justify-center">
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div animate={{ scale: [1, 2], opacity: [0.5, 0] }} transition={{ duration: 2, repeat: Infinity }} className="w-32 h-32 border border-emerald-500 rounded-full absolute" />
        <MapIcon className="w-12 h-12 text-slate-600 mb-4" />
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/80 backdrop-blur-sm z-10 text-center px-4">
         <AlertOctagon className="w-10 h-10 text-rose-500 mb-4" />
         <h3 className="text-xl font-bold text-white mb-2">Google Maps Key Required</h3>
         <p className="text-slate-400 max-w-sm mb-4">Please add GOOGLE_MAPS_PLATFORM_KEY to your AI Studio secrets to enable the interactive Command Center map.</p>
         <div className="px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm font-mono text-slate-300">
           Settings &gt; Secrets &gt; GOOGLE_MAPS_PLATFORM_KEY
         </div>
      </div>
    </div>
  );
}

function HeatmapOverlay({ enabled }: { enabled: boolean }) {
  if (!enabled) return null;
  return (
    <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center mix-blend-screen">
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 0.6 }} 
        exit={{ opacity: 0 }}
        className="w-[300px] h-[300px] rounded-full bg-[radial-gradient(circle,rgba(225,29,72,0.8)_0%,rgba(147,51,234,0.4)_40%,transparent_70%)] blur-2xl"
      />
    </div>
  );
}

export default function LiveCityGridMap() {
  const [selectedPin, setSelectedPin] = useState<number | null>(null);
  const [heatmapEnabled, setHeatmapEnabled] = useState(false);

  if (!hasValidKey) {
    return <FallbackMap />;
  }

  return (
    <div className="w-full h-[600px] rounded-[1.5rem] overflow-hidden shadow-2xl relative border border-slate-800 bg-slate-950">
      <APIProvider apiKey={API_KEY} version="weekly">
        <Map
          defaultCenter={BENGALURU_CENTER}
          defaultZoom={15}
          disableDefaultUI={true}
          styles={DARK_MAP_STYLES}
          mapId={"DEMO_MAP_ID"} // AdvancedMarkers require a mapId, we use DEMO_MAP_ID as fallback
          internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
          style={{ width: '100%', height: '100%' }}
        >
          {MOCK_PINS.map((pin) => (
            <AdvancedMarker 
              key={pin.id} 
              position={pin.position} 
              onClick={() => setSelectedPin(pin.id)}
              zIndex={pin.type === 'critical' ? 100 : 1}
            >
              <MarkerPin type={pin.type} />
            </AdvancedMarker>
          ))}

          {selectedPin !== null && (
            <InfoWindow
              position={MOCK_PINS.find(p => p.id === selectedPin)?.position}
              onCloseClick={() => setSelectedPin(null)}
              headerDisabled={true}
            >
              {(() => {
                const pin = MOCK_PINS.find(p => p.id === selectedPin);
                if (!pin) return null;
                return (
                  <div className="bg-slate-900 text-slate-100 p-4 min-w-[200px] -m-[12px] border border-slate-700 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-base">{pin.title}</h4>
                      <button onClick={() => setSelectedPin(null)} className="text-slate-400 hover:text-white transition-colors">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="text-sm text-slate-400 mb-3">{pin.desc}</div>
                    
                    <div className="flex items-center gap-2 mb-4 bg-slate-950 p-2 rounded-md border border-slate-800">
                       <Zap className="w-4 h-4 text-indigo-400" />
                       <span className="text-xs font-semibold">AI Severity Score: <span className={cn(pin.score === '5/5' ? 'text-rose-400' : 'text-amber-400')}>{pin.score}</span></span>
                    </div>

                    {pin.type === 'critical' && (
                      <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-3 rounded-md text-sm transition-colors flex items-center justify-center gap-2">
                        <Bot className="w-4 h-4" /> Auto-Dispatch Crew
                      </button>
                    )}
                  </div>
                );
              })()}
            </InfoWindow>
          )}
          
          <HeatmapOverlay enabled={heatmapEnabled} />
        </Map>
      </APIProvider>

      {/* Floating UI Overlays */}
      
      {/* Top Left Stats */}
      <div className="absolute top-4 left-4 z-10">
        <div className="bg-slate-900/60 backdrop-blur-md border border-slate-700 p-4 rounded-xl shadow-lg flex flex-col gap-2">
          <div className="flex items-center gap-2 text-sm font-bold text-white">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Live Map Stats
          </div>
          <div className="text-xs text-slate-300">Active Pins: 42 | AI Auto-Dispatched: 18</div>
        </div>
      </div>

      {/* Top Right Toggle */}
      <div className="absolute top-4 right-4 z-10">
        <button 
          onClick={() => setHeatmapEnabled(!heatmapEnabled)}
          className={cn(
            "backdrop-blur-md border px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-lg flex items-center gap-2",
            heatmapEnabled 
              ? "bg-indigo-600/80 border-indigo-500 text-white shadow-[0_0_15px_rgba(79,70,229,0.5)]" 
              : "bg-slate-900/60 border-slate-700 text-slate-300 hover:bg-slate-800/80"
          )}
        >
          <Zap className={cn("w-4 h-4", heatmapEnabled ? "text-indigo-200" : "text-indigo-400")} />
          {heatmapEnabled ? "Predictive Heatmap: ON" : "Enable AI Heatmap"}
        </button>
      </div>

      {/* Bottom Right Legend */}
      <div className="absolute bottom-6 right-4 z-10">
        <div className="bg-slate-900/60 backdrop-blur-md border border-slate-700 p-3 rounded-xl shadow-lg flex flex-col gap-3">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Legend</div>
          <div className="flex items-center gap-3 text-xs font-semibold text-slate-200">
            <div className="w-3 h-3 bg-rose-500 rounded-full shadow-[0_0_8px_rgba(244,63,94,0.8)]" /> Critical Hazard
          </div>
          <div className="flex items-center gap-3 text-xs font-semibold text-slate-200">
            <div className="w-3 h-3 bg-amber-500 rounded-full shadow-[0_0_8px_rgba(245,158,11,0.8)]" /> In-Progress
          </div>
          <div className="flex items-center gap-3 text-xs font-semibold text-slate-200">
            <div className="w-3 h-3 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.8)]" /> Resolved
          </div>
        </div>
      </div>
      
    </div>
  );
}
