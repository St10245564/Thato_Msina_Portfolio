import React, { useEffect, useState, useRef } from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
  speed?: number;
}

const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';

const GlitchText: React.FC<GlitchTextProps> = ({ text, className = "", speed = 50 }) => {
  // Start with the full text visible to prevent layout shift or invisibility if JS delays.
  const [displayText, setDisplayText] = useState(text); 
  const intervalRef = useRef<number | null>(null);
  const isAnimatingRef = useRef(false);

  const animate = () => {
    // Prevent overlapping animations which causes the "infinite glitch" loop
    if (isAnimatingRef.current) return;
    
    isAnimatingRef.current = true;
    let iteration = 0;
    
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = window.setInterval(() => {
      setDisplayText(prev => 
        text
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        isAnimatingRef.current = false;
        setDisplayText(text); // Ensure clean final state
      }

      iteration += 1 / 3; // Controls how fast the real letters reveal
    }, 30);
  };

  useEffect(() => {
    // Initial animation
    animate();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  return (
    <span 
      className={`inline-block cursor-default ${className}`}
      onMouseEnter={animate}
    >
      {displayText}
    </span>
  );
};

export default GlitchText;