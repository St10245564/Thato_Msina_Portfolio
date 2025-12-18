import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, MotionValue, useMotionValue } from 'framer-motion';
import { ArrowRight, ChevronDown, Globe, Wifi } from 'lucide-react';

// --- Types & Interfaces ---
interface BotProps {
  index: number;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}

// --- Bot Component ---
const Bot: React.FC<BotProps> = ({ index, mouseX, mouseY }) => {
  const [isBlinking, setIsBlinking] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  // Random blink logic
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    const triggerBlink = () => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
      // Random interval between 2s and 6s
      const nextBlink = Math.random() * 4000 + 2000;
      timeoutId = setTimeout(triggerBlink, nextBlink);
    };
    
    // Initial staggering
    timeoutId = setTimeout(triggerBlink, Math.random() * 2000);
    return () => clearTimeout(timeoutId);
  }, []);

  // Motion transforms for 3D parallax effect
  // We use the mouse position to rotate the bot slightly
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [15, -15]); // Up/Down tilt
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-15, 15]); // Left/Right pan
  const rotateZ = useTransform(mouseX, [-0.5, 0.5], [-10, 10]); // Banking tilt (Left/Right)
  
  // Parallax for internal elements (face screen moves faster than body)
  const faceX = useTransform(mouseX, [-0.5, 0.5], [-5, 5]);
  const faceY = useTransform(mouseY, [-0.5, 0.5], [-5, 5]);

  // Floating animation varies by index to prevent sync
  const floatDuration = 4 + index; 
  const yOffset = index * -90; // Stack them vertically

  // Scale based on index (top one slightly smaller for perspective)
  const baseScale = 1 - (index * 0.05);
  const zIndex = 30 - index * 10;

  return (
    <motion.div
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.2}
      onMouseEnter={() => {
        setIsHovered(true);
        setIsBlinking(true); // Blink on hover enter
      }}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        zIndex,
        y: yOffset,
        scale: baseScale, // We use whileHover to animate scale relative to this
        rotateX,
        rotateY,
        rotateZ, // Adds the requested "tilt"
        transformStyle: "preserve-3d",
        perspective: 1000
      }}
      initial={{ y: yOffset + 100, opacity: 0 }}
      animate={{ 
        y: [yOffset, yOffset - 15, yOffset],
        opacity: 1 
      }}
      whileHover={{ scale: baseScale * 1.1 }}
      whileTap={{ scale: baseScale * 0.95 }}
      transition={{ 
        y: {
          duration: floatDuration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.5
        },
        opacity: { duration: 1, delay: index * 0.2 },
        scale: { duration: 0.2 }
      }}
      className="absolute flex items-center justify-center pointer-events-auto cursor-grab active:cursor-grabbing"
    >
      {/* 
        Bot Body Structure 
        Using a container with distinct borders/shadows to simulate 3D volume
      */}
      <div className={`relative w-48 h-40 bg-gradient-to-br from-slate-700 via-slate-800 to-black rounded-[2.5rem] border transition-colors duration-300 ${isHovered ? 'border-blue-400/50' : 'border-white/10'} shadow-[0_30px_60px_-10px_rgba(0,0,0,0.6)] overflow-hidden`}>
        
        {/* Metallic Sheen/Highlight */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
        
        {/* Inner Shadow for volume */}
        <div className="absolute inset-0 shadow-[inset_0_-10px_30px_rgba(0,0,0,0.8)] rounded-[2.5rem] pointer-events-none" />

        {/* The Face Screen - Moves slightly for parallax depth */}
        <motion.div 
          style={{ x: faceX, y: faceY }}
          className="absolute inset-3 bg-black rounded-[2rem] border border-white/5 shadow-inner flex items-center justify-center overflow-hidden"
        >
          {/* Screen reflection */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/5 to-transparent rounded-full blur-xl transform translate-x-10 -translate-y-10" />
          
          {/* Hover Glow on Screen */}
          <motion.div 
            animate={{ opacity: isHovered ? 0.3 : 0 }}
            className="absolute inset-0 bg-blue-500/20 mix-blend-screen"
          />

          {/* Eyes Container */}
          <div className="flex gap-6 items-center z-10">
             {/* Left Eye */}
             <motion.div 
               animate={{ 
                 scaleY: isBlinking ? 0.05 : 1,
                 opacity: isBlinking ? 0.5 : 1,
                 backgroundColor: isHovered ? '#34d399' : '#0077b6', // Change color to Emerald on hover
                 boxShadow: isHovered ? '0 0 35px rgba(52, 211, 153, 0.8)' : '0 0 25px rgba(0,119,182,0.8)'
               }}
               transition={{ duration: 0.1 }}
               className="relative w-10 h-6 rounded-full"
             >
                <div className="absolute top-1 left-2 w-3 h-1.5 bg-white/60 rounded-full blur-[1px]" />
             </motion.div>

             {/* Right Eye */}
             <motion.div 
               animate={{ 
                 scaleY: isBlinking ? 0.05 : 1,
                 opacity: isBlinking ? 0.5 : 1,
                 backgroundColor: isHovered ? '#34d399' : '#0077b6',
                 boxShadow: isHovered ? '0 0 35px rgba(52, 211, 153, 0.8)' : '0 0 25px rgba(0,119,182,0.8)'
               }}
               transition={{ duration: 0.1 }}
               className="relative w-10 h-6 rounded-full"
             >
                <div className="absolute top-1 left-2 w-3 h-1.5 bg-white/60 rounded-full blur-[1px]" />
             </motion.div>
          </div>
        </motion.div>

        {/* Mechanical Details (Bolts/Seams) */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-16 h-1.5 bg-slate-900 rounded-full border border-white/5" />
      </div>

      {/* External "Ears" / Antennae Connectors */}
      <div className={`absolute left-[-10px] w-6 h-16 bg-slate-800 rounded-l-lg border-l border-t border-b transition-colors duration-300 ${isHovered ? 'border-blue-400/30' : 'border-white/10'} z-[-1]`} />
      <div className={`absolute right-[-10px] w-6 h-16 bg-slate-800 rounded-r-lg border-r border-t border-b transition-colors duration-300 ${isHovered ? 'border-blue-400/30' : 'border-white/10'} z-[-1]`} />
    </motion.div>
  );
};

// --- Main Hero Component ---
const Hero: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  
  // Motion values for mouse tracking (normalized -0.5 to 0.5)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for the rotation values so they don't jitter
  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    
    // Calculate normalized position (-0.5 to 0.5)
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    // Reset to center on leave
    mouseX.set(0);
    mouseY.set(0);
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section 
      id="hero" 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10">
        
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8 text-center lg:text-left relative z-20"
        >
          {/* DECORATIVE HUD PILL */}
          <div className="flex justify-center lg:justify-start">
             <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="group relative inline-flex items-center gap-4 pl-4 pr-5 py-2 rounded-full bg-white/40 dark:bg-[#0A101F]/40 border border-gray-200 dark:border-white/10 backdrop-blur-xl shadow-lg ring-1 ring-black/5 dark:ring-white/5 cursor-default overflow-hidden"
              >
                  {/* Subtle Shimmer Effect on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out" />

                  {/* Status Indicator */}
                  <div className="flex items-center gap-2">
                      <div className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 border border-white dark:border-transparent"></span>
                      </div>
                      <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest group-hover:text-emerald-500 transition-colors">
                        Online
                      </span>
                  </div>

                  <div className="w-px h-3 bg-gray-300 dark:bg-white/10" />

                  {/* Text Ticker - Cycles on hover group */}
                  <div className="relative h-4 w-32 overflow-hidden">
                      <div className="absolute top-0 left-0 w-full flex flex-col transition-transform duration-500 group-hover:-translate-y-4">
                          <span className="text-xs font-semibold text-gray-700 dark:text-gray-200 flex items-center gap-2 h-4">
                             <Globe size={10} className="text-blue-500" /> Global Freelancer
                          </span>
                          <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-2 h-4">
                             <Wifi size={10} /> Open to Work
                          </span>
                      </div>
                  </div>
             </motion.div>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl md:text-3xl font-medium text-gray-600 dark:text-gray-300">
              Hi, I'm Thato Kenny Msina
            </h2>
            <h1 className="text-5xl md:text-7xl font-display font-bold leading-[1.1] tracking-tight text-gray-900 dark:text-white">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400">
                Building Intelligent AI Systems
              </span>
            </h1>
          </div>

          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-lg mx-auto lg:mx-0 leading-relaxed">
            AI Developer with expertise in Machine Learning, Generative AI, and cloud-native AI deployment. 
            Recently trained in CAPACITI × FNB AI Bootcamp. <br className="hidden md:block" />
            <span className="font-semibold text-blue-600 dark:text-blue-400">Generative AI | Machine Learning | NLP | Computer Vision | Deep Learning</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start">
            <a
              href="#work"
              onClick={(e) => scrollToSection(e, 'work')}
              className="px-8 py-3.5 bg-gray-900 dark:bg-white text-white dark:text-black rounded-full font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors flex items-center gap-2 group shadow-lg shadow-blue-500/20 dark:shadow-none cursor-pointer"
            >
              View Projects
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, 'contact')}
              className="px-8 py-3.5 bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white rounded-full font-semibold hover:bg-gray-100 dark:hover:bg-white/10 transition-colors backdrop-blur-sm cursor-pointer"
            >
              Contact Me
            </a>
          </div>
        </motion.div>

        {/* Right Visual (Interactive 3D Bots) */}
        <div className="relative hidden lg:flex h-[600px] w-full items-center justify-center perspective-[1200px] group">
           
           {/* Ambient Glows behind bots */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[100px] animate-pulse-slow pointer-events-none" />
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#0077b6]/10 rounded-full blur-[60px] pointer-events-none" />

           {/* The Bot Stack - Positioned absolutely in center */}
           {/* We render 3 bots with different indices */}
           <div className="relative w-full h-full flex items-center justify-center transform translate-y-20">
              <Bot index={2} mouseX={smoothMouseX} mouseY={smoothMouseY} /> {/* Bottom */}
              <Bot index={1} mouseX={smoothMouseX} mouseY={smoothMouseY} /> {/* Middle */}
              <Bot index={0} mouseX={smoothMouseX} mouseY={smoothMouseY} /> {/* Top */}
           </div>

           {/* Floating HUD Elements */}
           <motion.div 
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 1 }}
             className="absolute top-[20%] right-[5%] flex flex-col items-end gap-2 pointer-events-none"
           >
             <div className="px-3 py-1.5 bg-black/60 backdrop-blur-md rounded-lg border border-[#0077b6]/30 text-[#0077b6] text-[10px] font-mono uppercase tracking-widest shadow-lg">
               System: ONLINE
             </div>
             <div className="w-px h-8 bg-gradient-to-b from-[#0077b6]/50 to-transparent mr-4" />
           </motion.div>

           <motion.div 
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 1.2 }}
             className="absolute bottom-[25%] left-[5%] flex flex-col items-start gap-2 pointer-events-none"
           >
             <div className="w-px h-8 bg-gradient-to-t from-blue-500/50 to-transparent ml-4" />
             <div className="px-3 py-1.5 bg-black/60 backdrop-blur-md rounded-lg border border-blue-500/30 text-blue-400 text-[10px] font-mono uppercase tracking-widest shadow-lg">
               AI Agents: ACTIVE
             </div>
           </motion.div>

        </div>
      </div>

      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-400 dark:text-gray-500 animate-bounce cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        onClick={(e: any) => scrollToSection(e, 'work')}
      >
        <ChevronDown size={24} />
      </motion.div>
    </section>
  );
};

export default Hero;