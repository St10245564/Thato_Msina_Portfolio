import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, ExternalLink, ShieldCheck, Sparkles, BookOpen, MousePointer2 } from 'lucide-react';
import { CERTIFICATES } from '../constants';

const Certificates: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Carousel Math
  const cardWidth = 320; // Width of a card
  const count = CERTIFICATES.length;
  // Calculate radius to form a perfect circle based on card width and count
  const radius = Math.round((cardWidth / 2) / Math.tan(Math.PI / count)) + 150; 

  const handleCardClick = (id: string) => {
    if (selectedId === id) {
      // Deselect if clicking the same one, and resume
      setSelectedId(null);
      setIsPaused(false);
    } else {
      // Select new one and pause
      setSelectedId(id);
      setIsPaused(true);
    }
  };

  const handleResume = () => {
    setSelectedId(null);
    setIsPaused(false);
  };

  return (
    <section id="certificates" className="relative py-32 z-10 overflow-hidden min-h-[900px]">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[100px] -z-10" />

      <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-2 mb-4"
        >
          <Sparkles className="text-blue-500" size={20} />
          <span className="text-blue-500 font-mono text-sm tracking-widest uppercase">3D Carousel</span>
        </motion.div>
        
        <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-6">
          Verified Credentials
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto mb-8">
          Click on any certificate to pause the rotation and view details.
        </p>

        {isPaused && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={handleResume}
            className="px-6 py-2 bg-blue-600 text-white rounded-full text-sm font-medium hover:bg-blue-700 transition-colors shadow-lg"
          >
            Resume Rotation
          </motion.button>
        )}
      </div>

      {/* 
        3D Scene Container 
        perspective-[1000px] gives the 3D depth.
      */}
      <div className="relative w-full h-[500px] flex justify-center items-center perspective-[2000px] overflow-visible">
        
        {/* 
          Rotating Cylinder 
          animate-spin-slow is defined in global CSS/Tailwind config.
          We override animationPlayState style.
        */}
        <div 
          className="relative w-[320px] h-[400px] preserve-3d transition-transform duration-1000"
          style={{ 
            transformStyle: 'preserve-3d',
            animation: 'spin 30s linear infinite',
            animationPlayState: isPaused ? 'paused' : 'running'
          }}
        >
          {CERTIFICATES.map((cert, index) => {
            const angle = (360 / count) * index;
            const isSelected = selectedId === cert.id;

            return (
              <div
                key={cert.id}
                onClick={() => handleCardClick(cert.id)}
                className={`absolute inset-0 cursor-pointer transition-all duration-300 ${isSelected ? 'z-50' : 'z-0'}`}
                style={{
                  transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                  // Backface visibility visible ensures we see them as they rotate
                  backfaceVisibility: 'visible' 
                }}
              >
                {/* Card Content */}
                <div 
                  className={`
                    w-full h-full rounded-2xl p-6 flex flex-col justify-between
                    border transition-all duration-300 backdrop-blur-md select-none
                    ${isSelected 
                      ? 'bg-blue-600/10 border-blue-500 shadow-[0_0_50px_rgba(59,130,246,0.5)] scale-105' 
                      : 'bg-white/80 dark:bg-[#0c0c0e]/80 border-gray-200 dark:border-white/10 hover:border-blue-400/50 hover:bg-blue-50/50 dark:hover:bg-blue-900/10'}
                  `}
                >
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <div className={`p-3 rounded-xl ${isSelected ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-white/5 text-blue-600 dark:text-blue-400'}`}>
                        <Award size={24} />
                      </div>
                      {isSelected && (
                         <div className="bg-green-500/20 text-green-400 p-1 rounded-full animate-pulse">
                           <MousePointer2 size={16} />
                         </div>
                      )}
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-tight mb-2">
                      {cert.title}
                    </h3>
                    <div className="flex items-center gap-2 mb-4">
                      <BookOpen size={14} className="text-gray-400" />
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{cert.issuer}</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                       {cert.skills.slice(0, 3).map(skill => (
                         <span key={skill} className="text-[10px] px-2 py-1 rounded bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-white/5">
                           {skill}
                         </span>
                       ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200 dark:border-white/10">
                    <div className="flex justify-between items-center">
                       <span className="text-xs font-mono text-gray-400">{cert.date}</span>
                       
                       {/* The Reveal Button */}
                       <AnimatePresence>
                         {isSelected && (
                           <motion.a 
                             initial={{ opacity: 0, x: 10 }}
                             animate={{ opacity: 1, x: 0 }}
                             exit={{ opacity: 0, x: 10 }}
                             href={cert.url}
                             target="_blank"
                             rel="noopener noreferrer"
                             onClick={(e) => e.stopPropagation()} // Prevent card click from toggling state
                             className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-full transition-colors shadow-lg"
                           >
                             View Certificate <ExternalLink size={12} />
                           </motion.a>
                         )}
                       </AnimatePresence>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Mobile-Only Message (Because 3D can be tricky on very small screens) */}
      <div className="md:hidden text-center mt-8 text-xs text-gray-500">
        Tip: Swipe or wait for rotation.
      </div>
      
      {/* Inject Keyframes for Spin */}
      <style>{`
        @keyframes spin {
          from { transform: rotateY(0deg); }
          to { transform: rotateY(360deg); }
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .perspective-[2000px] {
          perspective: 2000px;
        }
      `}</style>
    </section>
  );
};

export default Certificates;