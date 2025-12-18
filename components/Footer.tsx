import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ExternalLink, MessageCircle } from 'lucide-react';
import AIBot from './AIBot';

const Footer: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <footer 
      id="contact" 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full py-40 overflow-hidden bg-white dark:bg-[#030305] transition-colors duration-500"
    >
      {/* Premium Ambient Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-white/10 to-transparent" />
        <div 
          className="absolute inset-0 opacity-[0.02] dark:opacity-[0.1]"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #808080 1px, transparent 0)`,
            backgroundSize: '32px 32px',
          }}
        />
        {/* Dynamic Spotlight */}
        <div 
          className="absolute inset-0 z-0 transition-opacity duration-1000"
          style={{
            opacity,
            background: `radial-gradient(800px circle at ${position.x}px ${position.y}px, rgba(59, 130, 246, 0.08), transparent 40%)`,
          }}
        />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-64 bg-blue-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 flex flex-col items-center text-center">
        
        {/* CENTERALIZED AI BOT */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <AIBot />
        </motion.div>

        {/* Elegant Status Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 inline-flex items-center gap-3 px-4 py-2 rounded-full bg-blue-50/50 dark:bg-white/5 border border-blue-100 dark:border-white/10 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest backdrop-blur-xl shadow-sm"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
          </span>
          Synchronizing Neural Interface
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-display font-bold text-gray-900 dark:text-white tracking-tight mb-8 leading-[1.1]"
        >
          Ready to Architect <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400">
            Intelligent Systems?
          </span>
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mb-12 leading-relaxed"
        >
          I combine full-stack engineering with specialized AI expertise to build 
          solutions that aren't just powerful, but responsible and future-proof.
        </motion.p>

        {/* Main Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 mb-20"
        >
          <a 
            href="mailto:Thatomsina@gmail.com"
            className="group px-10 py-4 bg-gray-900 dark:bg-white text-white dark:text-black rounded-full font-bold text-sm uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-blue-500/20 flex items-center gap-2"
          >
            Initiate Contact
            <Mail size={16} className="group-hover:rotate-12 transition-transform" />
          </a>
          <a 
            href="mailto:Thatomsina@gmail.com?subject=Briefing%20Request%3A%20AI%20System%20Architecture"
            className="px-10 py-4 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white rounded-full font-bold text-sm uppercase tracking-widest hover:bg-gray-50 dark:hover:bg-white/10 transition-all flex items-center gap-2 group hover:scale-105 active:scale-95"
          >
            Schedule Briefing
            <MessageCircle size={16} className="group-hover:scale-110 transition-transform" />
          </a>
        </motion.div>

        {/* Social Dock */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex items-center gap-2 p-2 rounded-full bg-gray-100/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 backdrop-blur-xl mb-12"
        >
          {[
            { icon: Github, href: "https://github.com/St10245564", label: "GitHub" },
            { icon: Linkedin, href: "https://www.linkedin.com/in/thato-msina/", label: "LinkedIn" },
            { icon: Mail, href: "mailto:Thatomsina@gmail.com", label: "Email" }
          ].map((item, i) => (
            <a 
              key={i}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-full text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-white hover:bg-white dark:hover:bg-white/10 transition-all group"
              title={item.label}
            >
              <item.icon size={22} className="group-hover:scale-110 transition-transform" />
            </a>
          ))}
        </motion.div>

        {/* Footer Meta */}
        <div className="w-full pt-12 border-t border-gray-100 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-mono uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500">
           <div className="flex items-center gap-4">
              <span>© {new Date().getFullYear()} THATO MSINA</span>
              <span className="hidden md:inline text-gray-200 dark:text-white/10">|</span>
              <span>ENGINEERED FOR INTELLIGENCE</span>
           </div>
           <div className="flex items-center gap-4">
              <span className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                ALL SYSTEMS OPERATIONAL
              </span>
              <a href="#" className="hover:text-blue-400 transition-colors flex items-center gap-1">
                TOP <ExternalLink size={10} />
              </a>
           </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;