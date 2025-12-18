import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AIBot: React.FC = () => {
  const [isWavingFast, setIsWavingFast] = useState(false);
  const [thought, setThought] = useState<string | null>("Systems Active");

  const thoughts = [
    "Ready to build?",
    "Let's innovate!",
    "Neural links stable.",
    "Awaiting input...",
    "Designing the future.",
    "AI + Human = Future."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setThought(thoughts[Math.floor(Math.random() * thoughts.length)]);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center cursor-pointer group select-none"
      onMouseEnter={() => setIsWavingFast(true)}
      onMouseLeave={() => setIsWavingFast(false)}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
    >
      {/* Neural Background Pulse */}
      <div className="absolute inset-0 flex items-center justify-center">
         <motion.div 
           animate={{ 
             scale: [1, 1.2, 1],
             opacity: [0.1, 0.2, 0.1]
           }}
           transition={{ duration: 4, repeat: Infinity }}
           className="w-48 h-48 bg-blue-500 rounded-full blur-[60px] pointer-events-none"
         />
      </div>

      {/* Modern Floating Thought Bubble */}
      <AnimatePresence mode="wait">
        <motion.div
          key={thought}
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -5, scale: 0.95 }}
          className="absolute -top-4 md:-top-8 left-1/2 -translate-x-1/2 px-5 py-2.5 bg-white/80 dark:bg-black/40 backdrop-blur-xl rounded-full border border-blue-500/20 shadow-[0_8px_32px_rgba(0,0,0,0.1)] text-[10px] md:text-xs font-bold text-blue-600 dark:text-blue-400 whitespace-nowrap z-30 flex items-center gap-2"
        >
          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
          {thought}
        </motion.div>
      </AnimatePresence>

      <motion.svg
        viewBox="0 0 200 240"
        className="w-full h-full drop-shadow-[0_20px_50px_rgba(0,0,0,0.2)]"
        animate={{
          y: [0, -12, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <defs>
          <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#e2e8f0" />
          </linearGradient>
          <linearGradient id="visorGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>
          <radialGradient id="eyeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#0ea5e9" />
          </radialGradient>
        </defs>

        {/* Dynamic Shadow */}
        <motion.ellipse 
          cx="100" cy="225" rx="35" ry="10" 
          fill="rgba(0,0,0,0.15)"
          animate={{
            rx: [35, 45, 35],
            opacity: [0.15, 0.05, 0.15],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Arms - Left (Stabilizer) */}
        <path 
          d="M55 125 Q 35 140, 45 170 Q 55 200, 70 190" 
          fill="none" 
          stroke="url(#bodyGrad)" 
          strokeWidth="22" 
          strokeLinecap="round" 
        />

        {/* Arms - Right (Persistent Wave) */}
        <motion.g 
          style={{ transformOrigin: '145px 125px' }}
          animate={{
            rotate: isWavingFast ? [0, -35, 0, -35, 0] : [0, -20, 0]
          }}
          transition={{
            duration: isWavingFast ? 0.5 : 2.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <path 
            d="M145 125 Q 175 115, 170 80 Q 165 45, 145 55" 
            fill="none" 
            stroke="url(#bodyGrad)" 
            strokeWidth="22" 
            strokeLinecap="round" 
          />
          {/* Mitten Hand */}
          <circle cx="145" cy="50" r="12" fill="url(#bodyGrad)" />
          <motion.circle 
            cx="145" cy="50" r="14" 
            fill="none" 
            stroke="#38bdf8" 
            strokeWidth="1" 
            animate={{ scale: [1, 1.3], opacity: [0.5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.g>

        {/* Body Chassis */}
        <path 
          d="M60 110 C 60 70, 140 70, 140 110 L 145 190 C 145 220, 55 220, 55 190 Z" 
          fill="url(#bodyGrad)" 
          stroke="#cbd5e1" 
          strokeWidth="0.5"
        />
        
        {/* Detail Panel on Chest */}
        <path d="M75 165 Q 100 150, 125 165" fill="none" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" />
        
        {/* Core Reactor */}
        <g transform="translate(100, 195)">
          <circle r="10" fill="#38bdf8" opacity="0.2" className="animate-pulse" />
          <circle r="7" fill="url(#eyeGlow)" />
          <circle r="3" fill="#ffffff" opacity="0.8" />
        </g>

        {/* Head Assembly */}
        <g transform="translate(0, -5)">
          {/* Main Helmet Shell */}
          <rect x="52" y="45" width="96" height="75" rx="38" fill="url(#bodyGrad)" stroke="#cbd5e1" strokeWidth="0.5" />
          
          {/* Top Tech Piece */}
          <path d="M78 52 Q 100 42, 122 52 L 118 64 Q 100 56, 82 64 Z" fill="#38bdf8" opacity="0.7" />

          {/* Visor Display */}
          <rect x="62" y="62" width="76" height="42" rx="20" fill="url(#visorGrad)" />
          
          {/* Animated Digital Eyes */}
          <motion.g
            animate={{
              scaleY: [1, 1, 1, 0.05, 1, 1, 1, 1], 
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              times: [0, 0.5, 0.52, 0.54, 0.56, 0.6, 0.8, 1]
            }}
          >
            {/* Left Eye Segmented */}
            <rect x="78" y="78" width="16" height="7" rx="3.5" fill="url(#eyeGlow)" className="shadow-[0_0_15px_#38bdf8]" />
            <rect x="80" y="80" width="4" height="2" rx="1" fill="white" opacity="0.6" />
            
            {/* Right Eye Segmented */}
            <rect x="106" y="78" width="16" height="7" rx="3.5" fill="url(#eyeGlow)" className="shadow-[0_0_15px_#38bdf8]" />
            <rect x="108" y="80" width="4" height="2" rx="1" fill="white" opacity="0.6" />
          </motion.g>

          {/* Data Processing Glow */}
          <motion.rect 
            x="90" y="94" width="20" height="2" rx="1" 
            fill="#38bdf8" 
            animate={{ opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </g>

        {/* Side Comms Knobs */}
        <circle cx="52" cy="85" r="7" fill="#cbd5e1" />
        <circle cx="148" cy="85" r="7" fill="#cbd5e1" />
      </motion.svg>
    </motion.div>
  );
};

export default AIBot;