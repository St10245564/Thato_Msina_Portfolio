import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Database, Globe, Smartphone, Shield, Cloud, Terminal, Cpu, Zap, Wifi, Battery, Command } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
}

// Particle Component for the background
const ParticleField = () => {
  const [particles, setParticles] = useState<{ x: number; y: number; size: number; duration: number; delay: number }[]>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 40 }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute bg-blue-400/20 rounded-full blur-[1px]"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -100],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  const [isExiting, setIsExiting] = useState(false);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleEnter = () => {
    setIsExiting(true);
    // Delay to allow the warp animation to complete before unmounting
    setTimeout(() => {
      onStart();
    }, 1000);
  };

  // Icons for the bottom dock
  const DOCK_ICONS = [
     { icon: Terminal, delay: 0 },
     { icon: Smartphone, delay: 0.1 },
     { icon: Database, delay: 0.2 },
     { icon: 'CORE', delay: 0.3 }, // Centerpiece
     { icon: Cloud, delay: 0.2 },
     { icon: Shield, delay: 0.1 },
     { icon: Globe, delay: 0 }
  ];

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-[#020204] flex flex-col items-center justify-center overflow-hidden font-sans selection:bg-blue-500/30"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
        {/* Background Atmosphere - Deep Space Cinematic */}
        <div className="absolute inset-0 z-0 pointer-events-none">
            {/* Top Light Source */}
            <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[80%] h-[60%] bg-blue-900/10 blur-[150px] rounded-full mix-blend-screen animate-pulse-slow" />
            
            {/* Center Depth Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-900/5 blur-[100px] rounded-full" />
            
            {/* Bottom Glow (Behind Dock) */}
            <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[100%] h-[400px] bg-blue-600/10 blur-[120px] rounded-full mix-blend-screen" />
        </div>

        <ParticleField />

        {/* 
            The Warp Transition Overlay 
            Instead of a simple white circle, this is a "Hyperdrive" effect.
            It expands from the center core to fill the screen with light.
        */}
        <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full z-50 pointer-events-none mix-blend-screen"
            initial={{ width: 0, height: 0, opacity: 0 }}
            animate={isExiting ? { width: '250vmax', height: '250vmax', opacity: 1 } : { width: 0, height: 0, opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.64, 0, 0.78, 0] }} // Exponential acceleration
        />

        {/* Main Center Content */}
        <div className="relative z-10 flex flex-col items-center text-center max-w-5xl px-6">
            
            {/* "System Ready" Badge */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={isExiting ? { opacity: 0, y: -20 } : { opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-8 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0A101F]/60 border border-blue-500/20 backdrop-blur-md shadow-[0_0_20px_rgba(59,130,246,0.1)] group cursor-default hover:bg-blue-900/20 transition-colors"
            >
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-blue-100/70">System Initialized</span>
            </motion.div>

            {/* Headline with Staggered Reveal */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={isExiting ? { opacity: 0, scale: 1.1, filter: "blur(10px)" } : { opacity: 1, scale: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.8 }}
                className="relative z-20"
            >
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white tracking-tighter mb-6 leading-[1.1]">
                    The <span className="text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-indigo-600">Architect</span> <br />
                    <span className="relative inline-block">
                        of Intelligence
                        {/* Decorative Underline */}
                        <motion.div 
                           initial={{ width: 0 }}
                           animate={{ width: "100%" }}
                           transition={{ delay: 0.8, duration: 0.8, ease: "circOut" }}
                           className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-blue-600 to-transparent"
                        />
                    </span>
                </h1>
            </motion.div>

            {/* Subhead */}
            <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={isExiting ? { opacity: 0, y: 10 } : { opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-lg md:text-xl text-blue-200/60 font-light max-w-xl mx-auto mb-12 leading-relaxed"
            >
                Designing high-performance cognitive systems for the next era of computing.
            </motion.p>

            {/* Main Interactive Trigger Button */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isExiting ? { opacity: 0, scale: 0 } : { opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, type: "spring" }}
                className="relative group z-30"
            >
                 <div className="absolute inset-0 bg-blue-500 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
                 <button
                    onClick={handleEnter}
                    className="relative flex items-center gap-3 px-8 py-4 bg-[#0A101F] border border-blue-500/30 rounded-full text-white font-medium tracking-wide hover:border-blue-400 transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_-5px_rgba(59,130,246,0.3)]"
                 >
                    <span>Initialize Portfolio</span>
                    <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center">
                        <Zap size={10} fill="currentColor" className="text-white" />
                    </div>
                 </button>
            </motion.div>
        </div>

        {/* 
            Bottom Tech Dock Animation 
            "The Engine Room" - Visualizing the stack powering the portfolio.
        */}
        <motion.div
            className="absolute bottom-12 left-0 right-0 z-10 flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0, y: 50 }}
            animate={isExiting ? { opacity: 0, y: 100 } : { opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
        >
            <div className="relative flex items-center gap-6 md:gap-10 px-8">
                {/* Connecting Line */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent w-[120%]" />
                
                {DOCK_ICONS.map((item, i) => {
                    const isCore = item.icon === 'CORE';
                    return (
                        <div key={i} className="relative group flex items-center justify-center">
                            {isCore ? (
                                // Center Core - The "Singularity"
                                <div className="relative z-20 w-16 h-16 flex items-center justify-center">
                                    {/* Rotating Outer Rings */}
                                    <div className="absolute inset-0 border border-blue-500/30 rounded-full animate-[spin_4s_linear_infinite]" style={{ borderStyle: 'dashed' }} />
                                    <div className="absolute inset-1 border border-indigo-400/20 rounded-full animate-[spin_6s_linear_infinite_reverse]" />
                                    
                                    {/* Inner Light */}
                                    <div className="relative w-8 h-8 bg-blue-100 rounded-full blur-md animate-pulse" />
                                    <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full" />
                                </div>
                            ) : (
                                // Standard Dock Icon
                                <motion.div 
                                    animate={{ 
                                        y: [0, -5, 0],
                                        opacity: [0.3, 0.7, 0.3]
                                    }}
                                    transition={{ 
                                        y: { duration: 3, delay: item.delay, repeat: Infinity, ease: "easeInOut" },
                                        opacity: { duration: 3, delay: item.delay, repeat: Infinity, ease: "easeInOut" }
                                    }}
                                    className="relative z-10 w-10 h-10 rounded-full flex items-center justify-center text-blue-300"
                                >
                                    {typeof item.icon !== 'string' && <item.icon size={16} />}
                                    {/* Icon Reflection */}
                                    <div className="absolute -bottom-4 left-0 right-0 h-4 bg-gradient-to-b from-blue-400/20 to-transparent blur-sm opacity-50 transform scale-y-[-1]" />
                                </motion.div>
                            )}
                        </div>
                    );
                })}
            </div>
        </motion.div>
    </motion.div>
  );
};

export default WelcomeScreen;