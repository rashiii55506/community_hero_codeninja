import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coffee, Car, Train, TreePine, Shield, Percent, CheckCircle2, Share2, Copy, Loader2, Star } from 'lucide-react';
import { cn } from '../utils';

const VOUCHERS = [
  { id: 'v1', title: 'Free Premium Coffee at Downtown Cafe', cost: 500, icon: Coffee, theme: 'text-amber-400 bg-amber-500/20 border-amber-500/50' },
  { id: 'v2', title: '1-Day Free City Parking', cost: 800, icon: Car, theme: 'text-blue-400 bg-blue-500/20 border-blue-500/50' },
  { id: 'v3', title: 'VIP City Transit Pass - 1 Week', cost: 1500, icon: Train, theme: 'text-indigo-400 bg-indigo-500/20 border-indigo-500/50' },
  { id: 'v4', title: '"Plant a Tree in Your Name" Certificate', cost: 2000, icon: TreePine, theme: 'text-emerald-400 bg-emerald-500/20 border-emerald-500/50' },
  { id: 'v5', title: 'Exclusive "Civic Legend" Digital Avatar', cost: 300, icon: Shield, theme: 'text-purple-400 bg-purple-500/20 border-purple-500/50' },
  { id: 'v6', title: '5% Property Tax Rebate', cost: 5000, icon: Percent, theme: 'text-rose-400 bg-rose-500/20 border-rose-500/50' }
];

export default function ImpactVouchers() {
  const [redeemedVouchers, setRedeemedVouchers] = useState<Record<string, string>>({});
  const [processingId, setProcessingId] = useState<string | null>(null);
  const currentXP = 2500;

  const handleRedeem = (id: string) => {
    setProcessingId(id);
    setTimeout(() => {
      const generateCode = () => `HERO-2026-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
      setRedeemedVouchers(prev => ({ ...prev, [id]: generateCode() }));
      setProcessingId(null);
    }, 500);
  };

  return (
    <section>
      <div className="flex items-center gap-3 mb-8">
        <Star className="w-8 h-8 text-emerald-400 fill-emerald-400" />
        <div>
          <h2 className="text-3xl font-black text-white tracking-tight">Impact Vouchers & Rewards</h2>
          <p className="text-slate-400 font-medium">Redeem your hard-earned XP for real-world city perks.</p>
        </div>
        <div className="ml-auto bg-slate-800 border border-slate-700 px-4 py-2 rounded-xl flex items-center gap-2">
          <span className="text-sm text-slate-400 font-bold uppercase tracking-widest">Available Balance</span>
          <span className="text-xl font-black text-emerald-400">{currentXP.toLocaleString()} XP</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {VOUCHERS.map((item) => {
          const isRedeemed = !!redeemedVouchers[item.id];
          const canAfford = currentXP >= item.cost;
          const Icon = item.icon;

          return (
            <div 
              key={item.id} 
              className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-[2rem] p-6 relative overflow-hidden transition-all group hover:border-slate-700 flex flex-col min-h-[320px]"
            >
              <AnimatePresence mode="wait">
                {isRedeemed ? (
                  <motion.div
                    key="redeemed"
                    initial={{ opacity: 0, rotateY: -90 }}
                    animate={{ opacity: 1, rotateY: 0 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col h-full w-full absolute inset-0 bg-slate-900/90 backdrop-blur-xl p-6 z-20 items-center justify-center text-center border border-emerald-500/30 rounded-[2rem] shadow-[0_0_30px_rgba(16,185,129,0.15)]"
                  >
                    <CheckCircle2 className="w-16 h-16 text-emerald-400 mb-4 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
                    <h3 className="text-2xl font-black text-white mb-2">🎉 Successfully Redeemed!</h3>
                    <p className="text-sm text-slate-400 mb-6">{item.title}</p>
                    
                    <div className="bg-slate-950 border-2 border-dashed border-emerald-500/50 rounded-xl px-6 py-3 mb-6 w-full flex items-center justify-center">
                      <span className="font-mono text-emerald-400 font-bold tracking-widest text-lg">
                        CODE: {redeemedVouchers[item.id]}
                      </span>
                    </div>

                    <div className="flex w-full gap-3 mt-auto">
                      <button className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black py-3 rounded-xl transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2">
                        <Share2 className="w-4 h-4" /> Share
                      </button>
                      <button className="flex-1 bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2">
                        <Copy className="w-4 h-4 text-slate-400" /> Copy
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="buy"
                    initial={{ opacity: 0, rotateY: 90 }}
                    animate={{ opacity: 1, rotateY: 0 }}
                    exit={{ opacity: 0, rotateY: -90 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col h-full z-10"
                  >
                    <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center mb-6 border", item.theme)}>
                      <Icon className="w-8 h-8" />
                    </div>
                    
                    <h3 className="text-xl font-black text-white mb-3 tracking-tight">{item.title}</h3>
                    
                    <div className="mt-auto mb-6">
                      <div className="flex items-center gap-2 font-black text-2xl">
                        <span className={cn(canAfford ? "text-emerald-400" : "text-rose-400 drop-shadow-[0_0_10px_rgba(244,63,94,0.3)]")}>
                          {item.cost.toLocaleString()}
                        </span>
                        <span className="text-slate-500 text-lg uppercase tracking-widest">XP</span>
                      </div>
                    </div>

                    <button 
                      onClick={() => handleRedeem(item.id)}
                      disabled={!canAfford || processingId === item.id}
                      className={cn(
                        "w-full font-black py-4 px-4 rounded-xl transition-all flex items-center justify-center gap-2 text-lg active:scale-95",
                        !canAfford 
                          ? "bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700" 
                          : processingId === item.id
                            ? "bg-emerald-900/50 text-emerald-400 border border-emerald-500/50 cursor-wait"
                            : "bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)]"
                      )}
                    >
                      {processingId === item.id ? (
                        <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</>
                      ) : !canAfford ? (
                        "Not Enough XP"
                      ) : (
                        "Redeem Reward"
                      )}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
