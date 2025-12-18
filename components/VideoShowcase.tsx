import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Volume2, VolumeX, Maximize2, Users, Radio, Activity, MessageSquare, AlertCircle, ExternalLink } from 'lucide-react';
import { DEMO_VIDEOS } from '../constants';
import { DemoVideo } from '../types';

// Helper to extract YouTube ID from various URL formats
const getYouTubeId = (url: string) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  // Relaxed check: Trim whitespace and ensure we have an ID of reasonable length (10-12 chars usually)
  const id = match && match[2] ? match[2].trim() : null;
  return id && id.length >= 10 ? id : null;
};

interface VideoCardProps {
  video: DemoVideo;
  index: number;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, index }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showOverlay, setShowOverlay] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Determine if it's a YouTube video
  const youtubeId = React.useMemo(() => getYouTubeId(video.videoUrl), [video.videoUrl]);
  const isYouTube = !!youtubeId;

  // Simulated "Live" randomizer for participant count
  const participantCount = React.useMemo(() => Math.floor(Math.random() * 8) + 2, []);

  const handleMouseEnter = async () => {
    // If error, don't try to play
    if (hasError) return;

    if (isYouTube) {
        setIsPlaying(true);
        setShowOverlay(false);
    } else {
        // Native HTML5 Video
        if (videoRef.current) {
          try {
            videoRef.current.muted = true;
            setIsMuted(true);
            await videoRef.current.play();
            setIsPlaying(true);
            setShowOverlay(false);
          } catch (error) {
            console.warn("Autoplay prevented:", error);
            setIsPlaying(false);
          }
        }
    }
  };

  const handleMouseLeave = () => {
    if (isYouTube) {
        setIsPlaying(false);
        setShowOverlay(true);
    } else {
        if (videoRef.current) {
          videoRef.current.pause();
          videoRef.current.currentTime = 0; // Reset to start
          setIsPlaying(false);
          setShowOverlay(true);
        }
    }
  };

  const handleClick = () => {
    // Open full video on click since hover is preview-only
    if (video.videoUrl) {
      window.open(video.videoUrl, '_blank');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onClick={handleClick}
      className={`group relative overflow-hidden rounded-2xl bg-gray-900 border border-gray-200 dark:border-white/10 shadow-lg cursor-pointer ${
        index === 0 ? 'md:col-span-2 md:row-span-2' : ''
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="absolute inset-0 bg-gray-900 z-0" />
      
      {/* 
          MEDIA RENDERING LOGIC 
          - Supports both Native <video> and YouTube Iframe
      */}
      {isYouTube ? (
        <>
            {/* Poster Image for YouTube (Visible when not playing) */}
            <div className={`absolute inset-0 z-0 transition-opacity duration-300 ${isPlaying ? 'opacity-0' : 'opacity-100'}`}>
                <img 
                    src={video.posterUrl} 
                    alt={video.title} 
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100"
                />
            </div>
            
            {/* YouTube Iframe (Visible only on Hover) */}
            {isPlaying && (
                <iframe
                    // Simplified URL parameters to prevent "Error 153" (Configuration Error)
                    // Removed: origin, playlist, loop (loop requires playlist which can cause issues)
                    src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&controls=0&playsinline=1&rel=0&iv_load_policy=3`}
                    className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
                    title={video.title}
                    allow="autoplay; encrypted-media; gyroscope; picture-in-picture"
                    style={{ border: 'none' }}
                />
            )}
        </>
      ) : (
        /* Native Video Player */
        <video
            ref={videoRef}
            src={video.videoUrl}
            poster={video.posterUrl}
            className={`w-full h-full object-cover transition-opacity duration-500 ${hasError ? 'opacity-0' : 'opacity-90 group-hover:opacity-100'}`}
            muted={true}
            loop
            playsInline
            preload="auto"
            crossOrigin="anonymous"
            onError={(e) => {
              console.error("Video failed to load:", video.videoUrl);
              setHasError(true);
            }}
        />
      )}
      
      {/* Error Fallback */}
      {hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 z-20 text-gray-500">
           <AlertCircle className="w-8 h-8 mb-2 opacity-50" />
           <p className="text-xs font-medium">Video Unavailable</p>
        </div>
      )}

      {/* "Virtual Office" UI Overlay - Always visible but changes state */}
      <div className={`absolute inset-0 z-10 flex flex-col justify-between p-4 pointer-events-none transition-opacity duration-300 ${!showOverlay && !hasError ? 'opacity-0' : 'opacity-100'}`}>
        
        {/* Top Bar */}
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <div className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider backdrop-blur-md border border-white/10 ${isPlaying ? 'bg-emerald-500/80 text-white' : 'bg-black/40 text-gray-300'}`}>
               {isPlaying ? 'System Active' : 'Offline'}
            </div>
          </div>

          <div className="flex items-center gap-2">
             <div className="flex -space-x-2">
               {[...Array(3)].map((_, i) => (
                 <div key={i} className="w-6 h-6 rounded-full border border-gray-800 bg-gray-700 overflow-hidden relative">
                   <img 
                     src={`https://i.pravatar.cc/150?u=${video.id}${i}`} 
                     alt="User" 
                     className="w-full h-full object-cover opacity-80" 
                   />
                 </div>
               ))}
             </div>
             <div className="w-6 h-6 rounded-full bg-gray-800 border border-white/10 flex items-center justify-center text-[10px] text-white font-medium">
               +{participantCount}
             </div>
          </div>
        </div>

        {/* Center Play Button (Visible when paused) */}
        {!hasError && !isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center shadow-2xl transition-transform duration-300 group-hover:scale-110">
              <Play className="w-6 h-6 text-white fill-white ml-1" />
            </div>
          </div>
        )}

        {/* Bottom Bar Info */}
        <div className="transform translate-y-0 transition-transform duration-300">
           <div className="bg-black/60 backdrop-blur-md rounded-xl p-4 border border-white/5 shadow-lg">
             <div className="flex justify-between items-end">
               <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium text-blue-400">{video.category}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-500" />
                    <span className="text-[10px] text-gray-400 flex items-center gap-1">
                      <Activity size={10} /> {video.stats.views} views
                    </span>
                  </div>
                  <h3 className="text-white font-bold text-lg leading-tight">{video.title}</h3>
               </div>
               
               <div className="flex gap-2 pointer-events-auto">
                 {/* Mute Button - Only effective for native video currently (Youtube embed set to muted for autoplay) */}
                 {!isYouTube && (
                    <button 
                        onClick={(e) => { 
                          e.stopPropagation(); 
                          if (videoRef.current) {
                              videoRef.current.muted = !videoRef.current.muted;
                              setIsMuted(videoRef.current.muted);
                          }
                        }}
                        className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                    >
                    {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                    </button>
                 )}
                 <button className="p-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white transition-colors">
                   <ExternalLink size={16} />
                 </button>
               </div>
             </div>
           </div>
        </div>
      </div>
    </motion.div>
  );
};

const VideoShowcase: React.FC = () => {
  return (
    <section id="demos" className="relative py-32 z-10 overflow-hidden">
       {/* Background Glow */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-blue-600/10 dark:bg-blue-900/10 rounded-full blur-[120px] pointer-events-none -z-10" />

       <div className="max-w-7xl mx-auto px-6">
         <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 mb-4"
              >
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-sm font-bold tracking-widest text-emerald-500 uppercase">System Execution</span>
              </motion.div>
              
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white leading-tight mb-4"
              >
                Applied Intelligence <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                  In Action
                </span>
              </motion.h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Witness the convergence of robust software engineering and advanced AI. From computer vision inference to predictive risk modeling, observe these intelligent systems operating in real-time.
              </p>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-full bg-white dark:bg-white/10 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white font-medium shadow-sm hover:shadow-lg transition-all flex items-center gap-2"
            >
              <Radio size={18} className="text-emerald-500" />
              View Telemetry
            </motion.button>
         </div>

         {/* Bento Grid Layout */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px]">
            {DEMO_VIDEOS.map((video, index) => (
              <VideoCard key={video.id} video={video} index={index} />
            ))}
            
            {/* Interactive "Connect" Card Filler */}
            <motion.div 
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.5 }}
               className="relative rounded-2xl border-2 border-dashed border-gray-300 dark:border-white/10 flex flex-col items-center justify-center p-8 text-center group cursor-pointer hover:border-blue-500/50 hover:bg-blue-500/5 transition-all"
            >
               <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                 <MessageSquare className="w-8 h-8 text-gray-400 group-hover:text-blue-500 transition-colors" />
               </div>
               <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Request a Demo</h3>
               <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs">
                 Interested in a specific technology? Let's schedule a live walkthrough.
               </p>
            </motion.div>
         </div>
       </div>
    </section>
  );
};

export default VideoShowcase;