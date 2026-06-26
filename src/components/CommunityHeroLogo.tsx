import React from 'react';
import { cn } from '../utils';

interface CommunityHeroLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showText?: boolean;
}

export default function CommunityHeroLogo({ size = 'md', className, showText = true }: CommunityHeroLogoProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-3xl',
    xl: 'text-5xl'
  };

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className={cn("relative shrink-0 flex items-center justify-center", sizeClasses[size])}>
        {/* Glow effect behind the SVG */}
        <div className="absolute inset-0 bg-emerald-500/30 blur-xl rounded-full pointer-events-none" />
        
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_0_10px_rgba(16,185,129,0.5)] relative z-10"
        >
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" />   {/* Emerald 500 */}
              <stop offset="100%" stopColor="#06b6d4" />  {/* Cyan 500 */}
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Outer Shield Outline */}
          <path
            d="M50 10 L85 25 V50 C85 70 65 85 50 95 C35 85 15 70 15 50 V25 L50 10 Z"
            stroke="url(#logoGradient)"
            strokeWidth="8"
            strokeLinejoin="round"
            strokeLinecap="round"
            fill="transparent"
            filter="url(#glow)"
          />

          {/* Digital Pulse / Node Interweave */}
          <path
            d="M30 50 L45 65 L70 35"
            stroke="url(#logoGradient)"
            strokeWidth="8"
            strokeLinejoin="round"
            strokeLinecap="round"
            fill="transparent"
          />
          
          <circle cx="30" cy="50" r="6" fill="#06b6d4" />
          <circle cx="45" cy="65" r="6" fill="#10b981" />
          <circle cx="70" cy="35" r="6" fill="#06b6d4" />
        </svg>
      </div>

      {showText && (
        <div className={cn("font-black tracking-tight leading-none flex items-center", textSizeClasses[size])}>
          <span className="text-slate-100">Community</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500 ml-1.5 drop-shadow-[0_0_10px_rgba(16,185,129,0.3)]">Hero</span>
        </div>
      )}
    </div>
  );
}
