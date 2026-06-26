import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Globe2, Sparkles, ArrowRight } from 'lucide-react';
import { cn } from '../utils';

const LANGUAGES = ["Hindi", "Bengali", "Tamil", "Marathi", "English"];

const MOCK_TRANSCRIPTS: Record<string, string> = {
  Hindi: "Yahan main road par bohot bada gaddha hai aur paani bhara hai.",
  Bengali: "Ekhane main rastay ekta boro gorto ache ebong jol jome ache.",
  Tamil: "Inge main roadil oru periya pallam ullathu matrum neer thengiyullathu.",
  Marathi: "Ithe main road var ek motha khadda aahe aani paani bharla aahe.",
  English: "There is a massive pothole on the main road causing severe waterlogging."
};

const MOCK_TRANSLATION = "There is a massive pothole on the main road causing severe waterlogging.";

export default function SmartVoiceInput() {
  const [selectedLanguage, setSelectedLanguage] = useState<string>("Hindi");
  const [isRecording, setIsRecording] = useState(false);
  const [rawTranscript, setRawTranscript] = useState<string>("");
  const [translatedText, setTranslatedText] = useState<string>("");
  const [isTranslating, setIsTranslating] = useState(false);

  const handleMicClick = () => {
    if (!isRecording) {
      // Start recording
      setIsRecording(true);
      setRawTranscript("");
      setTranslatedText("");
      setIsTranslating(false);
    } else {
      // Stop recording and process
      setIsRecording(false);
      setRawTranscript(MOCK_TRANSCRIPTS[selectedLanguage] || MOCK_TRANSCRIPTS["Hindi"]);
      setIsTranslating(true);
      
      setTimeout(() => {
        setTranslatedText(MOCK_TRANSLATION);
        setIsTranslating(false);
      }, 1500);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-[600px] w-full max-w-4xl mx-auto bg-slate-950 p-6 md:p-8 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden flex flex-col items-center">
      {/* Background ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-64 bg-cyan-500/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="text-center mb-8 relative z-10 w-full">
        <h2 className="text-3xl font-black text-white tracking-tight mb-2 flex items-center justify-center gap-3">
          <Globe2 className="w-8 h-8 text-cyan-400" />
          Smart Voice & Multilingual Input
        </h2>
        <p className="text-slate-400 font-medium">Speak in your local language. AI will auto-translate for the City Council.</p>
      </div>

      {/* Language Selector */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-12 relative z-10 w-full">
        {LANGUAGES.map((lang) => (
          <button
            key={lang}
            onClick={() => setSelectedLanguage(lang)}
            disabled={isRecording || isTranslating}
            className={cn(
              "px-5 py-2.5 rounded-full font-bold text-sm transition-all border duration-300 backdrop-blur-md",
              selectedLanguage === lang
                ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                : "bg-slate-900/50 text-slate-400 border-slate-700 hover:bg-slate-800 hover:text-slate-200",
              (isRecording || isTranslating) && selectedLanguage !== lang ? "opacity-50 cursor-not-allowed" : ""
            )}
          >
            {lang}
          </button>
        ))}
      </div>

      {/* The Mic Interface */}
      <div className="flex flex-col items-center justify-center mb-12 relative z-10">
        <div className="relative flex items-center justify-center">
          {/* Animated Waveform (Only visible when recording) */}
          <AnimatePresence>
            {isRecording && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute flex items-center gap-1.5 -z-10"
                style={{ width: "200px", justifyContent: "space-between" }}
              >
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ height: ["16px", "64px", "16px"] }}
                    transition={{
                      repeat: Infinity,
                      duration: 0.8,
                      delay: i * 0.15,
                      ease: "easeInOut"
                    }}
                    className="w-2 bg-rose-500/50 rounded-full shadow-[0_0_10px_rgba(244,63,94,0.5)]"
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mic Button */}
          <motion.button
            onClick={handleMicClick}
            animate={isRecording ? { scale: [1, 1.1, 1] } : { scale: 1 }}
            transition={isRecording ? { repeat: Infinity, duration: 2, ease: "easeInOut" } : { duration: 0.2 }}
            className={cn(
              "w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 relative group z-10",
              isRecording 
                ? "bg-rose-500/20 border-2 border-rose-500 shadow-[0_0_40px_rgba(244,63,94,0.4)]" 
                : "bg-emerald-500/10 border-2 border-emerald-500/50 hover:bg-emerald-500/20 hover:border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.2)]"
            )}
          >
            <Mic className={cn(
              "w-10 h-10 transition-colors",
              isRecording ? "text-rose-400" : "text-emerald-400 group-hover:text-emerald-300"
            )} />
          </motion.button>
        </div>

        <p className={cn(
          "mt-6 font-bold tracking-widest uppercase text-sm transition-colors duration-300",
          isRecording ? "text-rose-400 animate-pulse" : "text-slate-400"
        )}>
          {isRecording ? "Listening..." : "Tap to speak your issue..."}
        </p>
      </div>

      {/* Output Display Area */}
      <AnimatePresence>
        {(rawTranscript || isTranslating) && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full flex flex-col gap-6 relative z-10"
          >
            {/* Original Transcript */}
            <motion.div variants={itemVariants} className="bg-slate-900/40 border border-slate-700/50 rounded-2xl p-6 shadow-inner">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Original Transcript ({selectedLanguage})</h3>
              <p className="text-slate-200 text-lg leading-relaxed font-medium">
                "{rawTranscript}"
              </p>
            </motion.div>

            {/* Translated Report */}
            <motion.div variants={itemVariants} className="bg-slate-800 border-l-4 border-emerald-500 rounded-2xl p-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                <Sparkles className="w-24 h-24 text-emerald-500" />
              </div>
              <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Translated Official Report (English)
              </h3>
              
              {isTranslating ? (
                <div className="space-y-3 mt-2">
                  <div className="h-4 bg-slate-700 rounded w-3/4 animate-pulse" />
                  <div className="h-4 bg-slate-700 rounded w-1/2 animate-pulse" />
                </div>
              ) : (
                <p className="text-white text-xl font-bold leading-relaxed relative z-10">
                  "{translatedText}"
                </p>
              )}
            </motion.div>

            {/* Next Step Button */}
            <motion.div variants={itemVariants} className="flex justify-end mt-4">
              <button 
                disabled={isTranslating}
                className={cn(
                  "px-8 py-4 rounded-xl font-black text-lg transition-all flex items-center gap-3",
                  isTranslating 
                    ? "bg-slate-800 text-slate-500 cursor-not-allowed" 
                    : "bg-gradient-to-r from-cyan-600 to-cyan-400 hover:from-cyan-500 hover:to-cyan-300 text-slate-950 shadow-[0_0_30px_rgba(6,182,212,0.3)] hover:shadow-[0_0_40px_rgba(6,182,212,0.5)] active:scale-95"
                )}
              >
                Analyze with AI Vision <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
