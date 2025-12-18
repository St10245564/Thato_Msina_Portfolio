import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Github, Linkedin, Moon, Sun, Terminal, FileText } from 'lucide-react';
import { NAVIGATION_LINKS } from '../constants';

interface NavbarProps {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  toggleTerminal: () => void;
  toggleResume: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ theme, toggleTheme, toggleTerminal, toggleResume }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset - 100;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
      setIsOpen(false);
      
      try {
        window.history.pushState(null, '', href);
      } catch (err) {
        console.debug('Navigation state update skipped:', err);
      }
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 px-4 pt-6 pointer-events-none">
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`relative mx-auto max-w-6xl pointer-events-auto transition-all duration-700 ease-in-out ${
          scrolled 
            ? 'bg-white/80 dark:bg-black/90 backdrop-blur-2xl py-2.5 shadow-xl' 
            : 'bg-white/40 dark:bg-black/50 backdrop-blur-xl py-4 shadow-lg'
        } rounded-full border border-black/5 dark:border-white/10 flex items-center justify-between px-6 md:px-10 overflow-hidden ring-1 ring-black/5 dark:ring-white/5`}
      >
        {/* ENHANCED Border Beam Animation - Now clearly visible on Light/White mode */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-full">
           {/* Top Beam with Glow */}
           <motion.div 
             animate={{ x: ['-100%', '200%'] }}
             transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
             className="absolute top-0 left-0 w-1/4 h-[2px] z-20"
           >
              <div className="w-full h-full bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
              <div className="absolute inset-0 bg-blue-400 blur-[2px] opacity-60" /> {/* Outer Glow */}
           </motion.div>

           {/* Bottom Beam with Glow */}
           <motion.div 
             animate={{ x: ['200%', '-100%'] }}
             transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
             className="absolute bottom-0 left-0 w-1/4 h-[2px] z-20"
           >
              <div className="w-full h-full bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
              <div className="absolute inset-0 bg-purple-400 blur-[2px] opacity-60" /> {/* Outer Glow */}
           </motion.div>
        </div>

        {/* Brand / Name */}
        <a 
          href="#hero" 
          onClick={(e) => handleNavClick(e, '#hero')}
          className="flex items-center gap-2 group relative z-10 md:mr-12"
        >
          <span className="font-display font-bold text-lg md:text-xl tracking-tight text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-all duration-300 whitespace-nowrap">
            Thato Msina<span className="text-blue-600 dark:text-blue-500">.</span>
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex flex-1 items-center gap-8 lg:gap-12">
          {NAVIGATION_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-[11px] font-bold text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all duration-300 relative group uppercase tracking-[0.15em] whitespace-nowrap"
            >
              {link.name}
              <motion.span 
                className="absolute -bottom-1.5 left-0 w-0 h-px bg-blue-600 dark:bg-blue-500 group-hover:w-full transition-all duration-300 shadow-[0_0_8px_rgba(59,130,246,0.5)]"
                layoutId="navUnderline"
              />
            </a>
          ))}
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-3 md:gap-5 relative z-10 ml-4">
          <div className="hidden lg:flex items-center gap-3 border-r border-black/10 dark:border-white/10 pr-5">
             <button
                onClick={toggleTerminal}
                className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-black/5 dark:hover:bg-white/5 transition-all"
                title="Neural Shell"
              >
                 <Terminal size={18} />
              </button>
              <button 
                onClick={toggleTheme}
                className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:text-amber-500 dark:hover:text-amber-400 hover:bg-black/5 dark:hover:bg-white/5 transition-all"
                title="Toggle Theme"
              >
                 {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>
          </div>

          <button 
            onClick={toggleResume}
            className="group relative px-6 py-2 bg-gray-900 dark:bg-white rounded-full text-[10px] font-black text-white dark:text-black uppercase tracking-[0.1em] hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white transition-all duration-500 shadow-xl active:scale-95 flex items-center gap-2 whitespace-nowrap"
          >
            <FileText size={12} className="group-hover:rotate-12 transition-transform" />
            Resume
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="absolute top-24 left-4 right-4 bg-white/95 dark:bg-black/95 backdrop-blur-3xl border border-black/10 dark:border-white/10 rounded-[2.5rem] p-8 md:hidden flex flex-col gap-6 shadow-2xl pointer-events-auto ring-1 ring-black/5 dark:ring-white/5"
          >
            <div className="flex flex-col gap-6">
              {NAVIGATION_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-xl font-bold text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white py-2 border-b border-black/5 dark:border-white/5 transition-colors tracking-tight"
                  onClick={(e) => handleNavClick(e, link.href)}
                >
                  {link.name}
                </a>
              ))}
              <div className="flex items-center justify-between pt-6">
                <div className="flex gap-6">
                  <button onClick={toggleTerminal} className="p-3 bg-black/5 dark:bg-white/5 rounded-full text-gray-500 dark:text-gray-400"><Terminal size={22}/></button>
                  <button onClick={toggleTheme} className="p-3 bg-black/5 dark:bg-white/5 rounded-full text-gray-500 dark:text-gray-400">{theme === 'dark' ? <Sun size={22}/> : <Moon size={22}/>}</button>
                </div>
                <div className="flex gap-4">
                   <a href="https://github.com/St10245564" target="_blank" className="text-gray-500 dark:text-gray-400 hover:text-blue-600"><Github size={22}/></a>
                   <a href="https://www.linkedin.com/in/thato-msina/" target="_blank" className="text-gray-500 dark:text-gray-400 hover:text-blue-600"><Linkedin size={22}/></a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;