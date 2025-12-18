import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import LuminaBackground from './components/LuminaBackground';
import Projects from './components/Projects';
import SystemArchitecture from './components/SystemArchitecture';
import Experience from './components/Experience';
import Certificates from './components/Certificates';
import Footer from './components/Footer';
import NeuralTerminal from './components/NeuralTerminal';
import WelcomeScreen from './components/WelcomeScreen';
import ResumePreview from './components/ResumePreview';

const App: React.FC = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    // Check local storage or system preference on mount
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null;
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    } else {
      setTheme('light'); // Default to dark if preferred
    }
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Keyboard shortcut for terminal (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsTerminalOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        if (isTerminalOpen) setIsTerminalOpen(false);
        if (isResumeOpen) setIsResumeOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isTerminalOpen, isResumeOpen]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleTerminal = () => {
    setIsTerminalOpen(prev => !prev);
  };
  
  const toggleResume = () => {
    setIsResumeOpen(prev => !prev);
  };

  return (
    <div className="relative min-h-screen bg-gray-50 dark:bg-[#030305] text-gray-900 dark:text-white selection:bg-blue-500/30 selection:text-blue-900 dark:selection:text-blue-100 transition-colors duration-500 overflow-x-hidden">
      
      {/* Welcome Screen / Splash Page */}
      <AnimatePresence mode="wait">
        {showWelcome && (
          <WelcomeScreen onStart={() => setShowWelcome(false)} />
        )}
      </AnimatePresence>

      {/* Main Application Content */}
      {!showWelcome && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* 
            The LuminaBackground contains the canvas animation.
            It is positioned fixed at z-0.
          */}
          <LuminaBackground theme={theme} />
          
          {/* 
            Content is positioned relatively at z-10 or higher 
            to sit on top of the canvas.
          */}
          <div className="relative z-10">
            <Navbar 
              theme={theme} 
              toggleTheme={toggleTheme} 
              toggleTerminal={toggleTerminal} 
              toggleResume={toggleResume}
            />
            
            <main>
              <Hero />
              <Projects />
              <SystemArchitecture />
              <Experience />
              <Certificates />
            </main>
            
            <Footer />
          </div>
          
          {/* Neural Interface Overlay */}
          <NeuralTerminal isOpen={isTerminalOpen} onClose={() => setIsTerminalOpen(false)} />
          
          {/* Resume Preview Overlay */}
          <ResumePreview isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
          
          {/* Decorative overlay for grain/noise texture */}
          <div className={`fixed inset-0 pointer-events-none z-50 mix-blend-overlay transition-opacity duration-500 ${theme === 'dark' ? 'opacity-[0.03]' : 'opacity-[0.015]'}`}
               style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
          />
        </motion.div>
      )}
    </div>
  );
};

export default App;