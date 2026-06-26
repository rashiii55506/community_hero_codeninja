import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { 
  AlertTriangle, 
  UploadCloud,
  FileSearch,
  CheckCircle2,
  FolderOpen,
  FileText,
  BadgeCheck,
  Send,
  Loader2,
  Coins,
  User,
  PlusCircle,
  ShieldCheck,
  Landmark,
  Star,
  Map
} from 'lucide-react';
import { cn } from '../utils';

// Mock AI Data Object
const MOCK_AI_DATA = {
  category: "Road Infrastructure",
  severity: "Level 4 - Critical",
  description: "Deep pothole spanning 3 feet detected.",
  routing: {
    department: "Public Works Department",
    officerName: "Eng. Sarah Jenkins",
    officerId: "PWD-8842"
  }
};

const MOCK_IMAGE_URL = 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=800';

type Step = 'upload' | 'scanning' | 'result' | 'reward';

export default function ReportIssue() {
  const [step, setStep] = useState<Step>('upload');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [aiData, setAiData] = useState<typeof MOCK_AI_DATA | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDemoUpload = () => {
    setSelectedImage(MOCK_IMAGE_URL);
    setStep('scanning');

    setTimeout(() => {
      setAiData(MOCK_AI_DATA);
      setStep('result');
    }, 3000);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // Simulate file read and go to scanning
      const url = URL.createObjectURL(e.dataTransfer.files[0]);
      setSelectedImage(url);
      setStep('scanning');
      setTimeout(() => {
        setAiData(MOCK_AI_DATA);
        setStep('result');
      }, 3000);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setSelectedImage(url);
      setStep('scanning');
      setTimeout(() => {
        setAiData(MOCK_AI_DATA);
        setStep('result');
      }, 3000);
    }
  };

  const handleReset = () => {
    setStep('upload');
    setSelectedImage(null);
    setAiData(null);
    setIsSubmitting(false);
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep('reward');
    }, 1000);
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.15 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-3">
          AI Report Submission <span className="text-cyan-400">Engine</span>
        </h1>
        <p className="text-slate-400 text-lg">
          Intelligent structural integrity assessment and auto-routing system.
        </p>
      </div>

      <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-[2rem] p-6 sm:p-8 relative overflow-hidden shadow-2xl min-h-[500px]">
        {/* Glow Effects */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-cyan-500/5 blur-[100px] pointer-events-none rounded-full" />
        
        <AnimatePresence mode="wait">
          {/* STEP 1: UPLOAD */}
          {step === 'upload' && (
            <motion.div
              key="upload"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex flex-col items-center justify-center h-full min-h-[400px] w-full"
            >
              <div 
                className={cn(
                  "w-full border-2 border-dashed rounded-3xl p-12 flex flex-col items-center justify-center text-center transition-all relative overflow-hidden",
                  isDragging ? "border-cyan-500 bg-cyan-900/20" : "border-slate-700 bg-slate-900/50"
                )}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                {/* Demo Button - Top Right */}
                <button 
                  onClick={(e) => { e.stopPropagation(); handleDemoUpload(); }}
                  className="absolute top-4 right-4 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-cyan-400 border border-slate-700 px-3 py-1.5 rounded-lg font-medium transition-colors text-xs z-20 flex items-center gap-2"
                >
                  Demo: Auto-Upload
                </button>

                <div className={cn(
                  "p-4 rounded-full border mb-6 transition-all duration-300",
                  isDragging ? "bg-cyan-500/20 border-cyan-500/50 scale-110" : "bg-slate-800 border-slate-700"
                )}>
                  <UploadCloud className={cn("w-10 h-10 transition-colors duration-300", isDragging ? "text-cyan-400" : "text-slate-400")} />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2 transition-colors">Drag and drop your image/video here</h3>
                
                <p className="text-slate-500 my-6 font-bold tracking-widest">- OR -</p>
                
                <label className="cursor-pointer bg-transparent hover:bg-slate-800 text-slate-300 border-2 border-slate-700 px-8 py-3 rounded-xl font-bold transition-colors inline-block">
                  Choose File
                  <input type="file" accept="image/*,video/*" className="hidden" onChange={handleFileSelect} />
                </label>
              </div>
            </motion.div>
          )}

          {/* STEP 2: SCANNING */}
          {step === 'scanning' && selectedImage && (
            <motion.div
              key="scanning"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex flex-col items-center space-y-6"
            >
              <div className="w-full relative rounded-2xl overflow-hidden bg-slate-950 border-2 border-slate-700 aspect-video shadow-inner flex items-center justify-center">
                <img 
                  src={selectedImage} 
                  alt="Scanning target" 
                  className="w-full h-full object-cover grayscale opacity-70" 
                />
                <div className="absolute inset-0 bg-cyan-900/20 mix-blend-overlay" />
                
                {/* The Scanning Line */}
                <motion.div
                  initial={{ top: "0%" }}
                  animate={{ top: ["0%", "100%", "0%"] }}
                  transition={{ duration: 2, ease: "linear", repeat: Infinity }}
                  className="absolute left-0 w-full h-1 bg-cyan-400 shadow-[0_0_40px_10px_rgba(34,211,238,0.7)] z-20"
                />
                
                {/* Targeting Reticle overlay */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-50">
                  <div className="w-48 h-48 border border-cyan-500/50 rounded-lg relative">
                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400" />
                    <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-400" />
                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-400" />
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400" />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3 text-cyan-400 animate-pulse">
                <FileSearch className="w-5 h-5" />
                <p className="font-mono text-sm tracking-widest font-bold">🤖 AI Computer Vision analyzing structural integrity and hazard level...</p>
              </div>
            </motion.div>
          )}

          {/* STEP 3: RESULT */}
          {step === 'result' && selectedImage && aiData && (
            <motion.div
              key="result"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex flex-col space-y-8"
            >
              {/* Image Preview Small */}
              <div className="w-full h-48 relative rounded-xl overflow-hidden bg-slate-950 border border-slate-700">
                <img 
                  src={selectedImage} 
                  alt="Analyzed target" 
                  className="w-full h-full object-cover" 
                />
              </div>

              {/* Badges Section */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-rose-500/10 border border-rose-500/50 rounded-xl p-4 flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[10px] font-bold text-rose-400/80 uppercase tracking-widest mb-1">Severity</p>
                    <p className="font-bold text-rose-400">{aiData.severity}</p>
                  </div>
                </div>
                <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 flex items-start gap-3">
                  <FolderOpen className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Category</p>
                    <p className="font-bold text-slate-200">{aiData.category}</p>
                  </div>
                </div>
                <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 flex items-start gap-3 md:col-span-1">
                  <FileText className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">AI Notes</p>
                    <p className="text-sm text-slate-300 leading-tight">{aiData.description}</p>
                  </div>
                </div>
              </div>

              {/* Routing Card */}
              <div className="bg-slate-800 border-l-4 border-emerald-500 rounded-r-xl p-6 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                  <BadgeCheck className="w-32 h-32 text-emerald-500" />
                </div>
                <div className="flex items-center gap-2 text-emerald-400 font-black tracking-tight text-xl mb-6 relative z-10">
                  <CheckCircle2 className="w-6 h-6" />
                  Automatically Routed To Authority
                </div>
                
                <div className="grid grid-cols-1 gap-6 relative z-10">
                  <div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Department</p>
                    <p className="font-bold text-white text-lg">{aiData.routing.department}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Assigned Officer</p>
                    <p className="font-bold text-slate-300">
                      {aiData.routing.officerName} <span className="font-mono text-emerald-400">(ID: {aiData.routing.officerId})</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex gap-4 pt-4">
                <button 
                  onClick={handleReset}
                  className="px-6 py-4 rounded-xl font-bold text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex-1 bg-gradient-to-r from-emerald-600 to-emerald-400 hover:from-emerald-500 hover:to-emerald-300 text-slate-950 font-black text-lg py-4 rounded-xl shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:shadow-[0_0_40px_rgba(16,185,129,0.5)] transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                  {isSubmitting ? 'Filing Report...' : 'Confirm & File Official Report'}
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 4: REWARD */}
          {step === 'reward' && (
            <motion.div
              key="reward"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex flex-col items-center justify-center py-8 min-h-[400px] w-full max-w-2xl mx-auto"
            >
              <motion.div variants={itemVariants} className="mb-6 flex justify-center">
                <div className="bg-emerald-500/20 p-5 rounded-full border border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  >
                    <ShieldCheck className="w-16 h-16 text-emerald-400 drop-shadow-[0_0_15px_rgba(16,185,129,0.8)]" />
                  </motion.div>
                </div>
              </motion.div>

              <motion.h2 variants={itemVariants} className="text-3xl font-black text-white text-center mb-8 tracking-tight">
                Official Report Successfully Filed.
              </motion.h2>

              <motion.div variants={itemVariants} className="w-full bg-slate-900 border-l-4 border-emerald-500 rounded-r-xl p-6 shadow-xl relative overflow-hidden mb-6">
                <div className="absolute top-4 right-4 opacity-10">
                  <Landmark className="w-16 h-16 text-emerald-500" />
                </div>
                <p className="font-serif italic text-lg text-slate-300 leading-relaxed relative z-10">
                  "The City Council extends its deepest gratitude for your vigilance. Your prompt action in reporting this hazard directly contributes to a safer, stronger community. Because of citizens like you, our city thrives."
                </p>
                <p className="text-emerald-400 font-bold mt-4 text-sm tracking-widest uppercase relative z-10">
                  - Office of the Mayor & Civic Planning
                </p>
              </motion.div>

              <motion.div 
                variants={{
                  hidden: { opacity: 0, scale: 0.9 },
                  visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 200, damping: 20, delay: 0.2 } }
                }}
                className="w-full bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 mt-6 mb-8 flex items-center gap-4 shadow-[0_0_20px_rgba(245,158,11,0.15)] transition-all"
              >
                <div className="bg-amber-500/20 p-3 rounded-full border border-amber-500/50 shrink-0">
                  <Star className="w-8 h-8 text-amber-400 drop-shadow-[0_0_10px_rgba(245,158,11,0.6)]" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-white mb-1">You earned +50 Civic Impact Points!</h3>
                  <p className="text-slate-400 text-sm font-medium">
                    You are only <span className="text-amber-400 font-bold">150 points</span> away from unlocking the 'Neighborhood Legend' tier.
                  </p>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="flex flex-col w-full gap-4">
                <button className="w-full bg-gradient-to-r from-emerald-600 to-emerald-400 hover:from-emerald-500 hover:to-emerald-300 text-slate-950 font-black text-lg py-4 rounded-xl shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:shadow-[0_0_40px_rgba(16,185,129,0.5)] transition-all flex items-center justify-center gap-3 active:scale-95">
                  <User className="w-5 h-5" />
                  View My Civic Profile & Rewards
                </button>
                <button 
                  onClick={handleReset}
                  className="w-full bg-transparent border border-slate-700 hover:bg-slate-800 hover:border-slate-500 text-slate-300 hover:text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 active:scale-95"
                >
                  Return to Live City Map
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
