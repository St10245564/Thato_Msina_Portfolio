import React, { useEffect, useRef } from 'react';

interface LuminaBackgroundProps {
  theme: 'dark' | 'light';
}

const LuminaBackground: React.FC<LuminaBackgroundProps> = ({ theme }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let animationFrameId: number;
    let mouseX = width / 2;
    let targetMouseX = width / 2;

    const particles: { x: number; y: number; size: number; speed: number; opacity: number }[] = [];

    const initParticles = () => {
      particles.length = 0;
      for (let i = 0; i < 60; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 2,
          speed: Math.random() * 0.5 + 0.1,
          opacity: Math.random() * 0.5 + 0.1,
        });
      }
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initParticles();
    };

    const onMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouseMove);
    resize();

    // Configuration for themes
    const config = {
      dark: {
        bg: '#030305',
        beamPrimary: 'rgba(59, 130, 246, 0.4)', // Blue-500 low opacity
        beamSecondary: 'rgba(139, 92, 246, 0.1)', // Violet
        beamAmbient: 'rgba(59, 130, 246, 0.05)',
        particleColor: '255, 255, 255',
        floorGlow: 'rgba(59, 130, 246, 0.15)'
      },
      light: {
        bg: '#f9fafb',
        beamPrimary: 'rgba(79, 70, 229, 0.6)', // Indigo
        beamSecondary: 'rgba(99, 102, 241, 0.05)',
        beamAmbient: 'rgba(56, 189, 248, 0.02)',
        particleColor: '75, 85, 99', // Gray-600
        floorGlow: 'rgba(124, 58, 237, 0.05)'
      }
    };

    const render = (time: number) => {
      const currentConfig = theme === 'dark' ? config.dark : config.light;

      // Clear
      ctx.fillStyle = currentConfig.bg;
      ctx.fillRect(0, 0, width, height);

      // Smooth mouse movement lerp
      mouseX += (targetMouseX - mouseX) * 0.05;

      // --- The "Beam" Effect ---
      const beamCenter = mouseX;
      
      // 1. Base ambient glow
      const ambientGradient = ctx.createRadialGradient(
        beamCenter, height * 0.5, 0,
        beamCenter, height * 0.5, width * 0.8
      );
      ambientGradient.addColorStop(0, currentConfig.beamAmbient);
      ambientGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      ctx.fillStyle = ambientGradient;
      ctx.fillRect(0, 0, width, height);

      // 2. The Main Beam (Vertical)
      const beamWidth = 200 + Math.sin(time * 0.001) * 50;
      const beamGradient = ctx.createLinearGradient(beamCenter - beamWidth, 0, beamCenter + beamWidth, 0);
      
      // Gradient construction logic depends on theme slightly
      if (theme === 'dark') {
          beamGradient.addColorStop(0, 'rgba(0,0,0,0)');
          beamGradient.addColorStop(0.4, 'rgba(2, 6, 23, 0)');
          beamGradient.addColorStop(0.45, currentConfig.beamSecondary);
          beamGradient.addColorStop(0.49, 'rgba(100, 200, 255, 0.2)');
          beamGradient.addColorStop(0.5, currentConfig.beamPrimary);
          beamGradient.addColorStop(0.51, 'rgba(100, 200, 255, 0.2)');
          beamGradient.addColorStop(0.55, currentConfig.beamSecondary);
          beamGradient.addColorStop(0.6, 'rgba(2, 6, 23, 0)');
          beamGradient.addColorStop(1, 'rgba(0,0,0,0)');
      } else {
          // Softer beam for light mode
          beamGradient.addColorStop(0, 'rgba(255,255,255,0)');
          beamGradient.addColorStop(0.4, 'rgba(255, 255, 255, 0)'); 
          beamGradient.addColorStop(0.45, currentConfig.beamSecondary);
          beamGradient.addColorStop(0.5, currentConfig.beamPrimary);
          beamGradient.addColorStop(0.55, currentConfig.beamSecondary);
          beamGradient.addColorStop(0.6, 'rgba(255, 255, 255, 0)');
          beamGradient.addColorStop(1, 'rgba(255,255,255,0)');
      }

      ctx.fillStyle = beamGradient;
      ctx.fillRect(0, 0, width, height);

      // 3. Floor reflection
      const floorGradient = ctx.createRadialGradient(
        beamCenter, height, 0,
        beamCenter, height, 400
      );
      floorGradient.addColorStop(0, theme === 'dark' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(79, 70, 229, 0.1)');
      floorGradient.addColorStop(0.5, currentConfig.floorGlow);
      floorGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      ctx.fillStyle = floorGradient;
      ctx.fillRect(0, height - 300, width, 300);

      // 4. Particles
      particles.forEach((p) => {
        p.y -= p.speed;
        if (p.y < 0) p.y = height;
        
        const drift = (mouseX - width/2) * 0.001;
        p.x += drift;
        if (p.x > width) p.x = 0;
        if (p.x < 0) p.x = width;

        const distanceToBeam = Math.abs(p.x - beamCenter);
        const visibility = Math.max(0, 1 - distanceToBeam / 400);

        if (visibility > 0) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${currentConfig.particleColor}, ${p.opacity * visibility})`;
            ctx.fill();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render(0);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]); // Re-init when theme changes

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0 transition-opacity duration-1000"
    />
  );
};

export default LuminaBackground;