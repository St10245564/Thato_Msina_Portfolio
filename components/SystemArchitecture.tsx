import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Database, Shield, Cpu, Smartphone, ArrowRight, Server, Lock, Zap, Eye, FileJson,
  Layout, Bot, FileText, Scale, Building2, PenTool, Globe, Code, Layers, Hexagon, ExternalLink, Github
} from 'lucide-react';
import { PROJECTS } from '../constants';

// Map project IDs to specific icons
const ICON_MAP: Record<string, React.ElementType> = {
  'senticore': Layout,
  'pentacore-mentor': Bot,
  'resume-builder': FileText,
  'bias-analysis': Scale,
  '1': Building2, // CAPACITI
  '2': Smartphone, // BudgetSmart
  'creative-writing': PenTool
};

const COLORS = [
  'bg-blue-500', 'bg-violet-500', 'bg-indigo-500', 'bg-rose-500', 
  'bg-cyan-500', 'bg-emerald-500', 'bg-amber-500'
];

interface ArchNode {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  description: string;
  tech: string[];
  color: string;
  demoUrl?: string;
  repoUrl?: string;
  x: number; // percentage
  y: number; // percentage
}

const SystemArchitecture: React.FC = () => {
  const [activeNodeId, setActiveNodeId] = useState<string>('core');

  // Generate nodes from PROJECTS + Core Hub
  const nodes: ArchNode[] = useMemo(() => {
    const projectNodes = PROJECTS.map((project, index) => {
      // Calculate circular position
      // Start from -90deg (top)
      const angle = (index / PROJECTS.length) * 2 * Math.PI - (Math.PI / 2);
      const radius = 35; // % from center
      const x = 50 + radius * Math.cos(angle);
      const y = 50 + radius * Math.sin(angle);

      return {
        id: project.id,
        title: project.title,
        subtitle: project.category,
        icon: ICON_MAP[project.id] || Code,
        description: project.description,
        tech: project.techStack,
        color: COLORS[index % COLORS.length],
        demoUrl: project.demoUrl,
        repoUrl: project.repoUrl,
        x,
        y
      };
    });

    const coreNode: ArchNode = {
      id: 'core',
      title: 'Portfolio Core',
      subtitle: 'System Hub',
      icon: Hexagon,
      description: 'The central nexus of Thato Msina\'s engineering portfolio. This ecosystem demonstrates a mastery of Full-Stack Development, AI/ML Integration, and Mobile Solutions.',
      tech: ['Architecture', 'System Design', 'Integration'],
      color: 'bg-gray-900 dark:bg-white',
      x: 50,
      y: 50
    };

    return [coreNode, ...projectNodes];
  }, []);

  const activeNode = nodes.find(n => n.id === activeNodeId) || nodes[0];

  return (
    <section id="architecture" className="relative py-32 z-10 overflow-hidden bg-gray-50 dark:bg-[#030305]">
      {/* Technical Background Grid */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#4f46e5 1px, transparent 1px), linear-gradient(90deg, #4f46e5 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-4"
            >
              <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
              <span className="text-sm font-bold tracking-widest text-purple-500 uppercase">Project Ecosystem</span>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white leading-tight mb-4"
            >
              Engineering <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400">
                Architecture
              </span>
            </motion.h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              An interactive overview of the technical solutions I've architected. 
              Explore the constellation of projects spanning AI, Web, and Mobile domains.
            </p>
          </div>
        </div>

        {/* Main Diagram Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-auto lg:h-[650px]">
          
          {/* Left: Interactive Graph */}
          <div className="lg:col-span-7 relative h-[500px] lg:h-full bg-white/50 dark:bg-white/5 rounded-3xl border border-gray-200 dark:border-white/10 backdrop-blur-sm flex items-center justify-center overflow-hidden">
            
            {/* Connecting Lines (SVG Layer) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
               {nodes.filter(n => n.id !== 'core').map((node) => (
                 <motion.line
                   key={`line-${node.id}`}
                   x1="50%"
                   y1="50%"
                   x2={`${node.x}%`}
                   y2={`${node.y}%`}
                   stroke="currentColor"
                   strokeWidth="1.5"
                   strokeDasharray="4,4"
                   className="text-gray-300 dark:text-gray-700"
                   initial={{ pathLength: 0, opacity: 0 }}
                   whileInView={{ pathLength: 1, opacity: 1 }}
                   transition={{ duration: 1.5, ease: "easeInOut" }}
                 />
               ))}
               {/* Pulsing circle at core */}
               <circle cx="50%" cy="50%" r="15%" className="fill-blue-500/5 animate-pulse" />
            </svg>

            {/* Nodes Layout */}
            <div className="relative w-full h-full">
              {nodes.map((node) => (
                <ArchNodeItem 
                  key={node.id}
                  node={node} 
                  isActive={activeNodeId === node.id} 
                  onClick={() => setActiveNodeId(node.id)}
                />
              ))}
            </div>
            
            <div className="absolute bottom-4 left-6 text-xs text-gray-400 font-mono">
              System Status: ALL SYSTEMS OPERATIONAL
            </div>
          </div>

          {/* Right: Details Panel */}
          <div className="lg:col-span-5 flex flex-col h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeNode.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="h-full bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-white/10 p-8 shadow-xl flex flex-col"
              >
                <div className="flex justify-between items-start mb-6">
                    <div className={`w-14 h-14 rounded-2xl ${activeNode.color} flex items-center justify-center shadow-lg`}>
                      <activeNode.icon className={`w-7 h-7 ${activeNode.id === 'core' ? 'text-gray-900 dark:text-black' : 'text-white'}`} />
                    </div>
                    <div className="px-3 py-1 rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-xs font-mono text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      {activeNode.id === 'core' ? 'Hub' : 'Node'}
                    </div>
                </div>
                
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1 leading-tight">{activeNode.title}</h3>
                <p className="text-lg text-blue-600 dark:text-blue-400 font-medium mb-6">{activeNode.subtitle}</p>
                
                <div className="prose dark:prose-invert mb-8 flex-grow">
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm md:text-base">
                    {activeNode.description}
                  </p>
                </div>

                <div className="mt-auto">
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Technologies</h4>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {activeNode.tech.map((t) => (
                      <span key={t} className="px-3 py-1.5 rounded-md bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-sm font-mono text-gray-700 dark:text-gray-300">
                        {t}
                      </span>
                    ))}
                  </div>
                  
                  {/* Action Buttons for Projects */}
                  {activeNode.id !== 'core' && (
                    <div className="flex items-center gap-4 pt-6 border-t border-gray-100 dark:border-white/5">
                        {activeNode.demoUrl && (
                          <a 
                            href={activeNode.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20"
                          >
                            <ExternalLink size={16} /> Live Demo
                          </a>
                        )}
                        {activeNode.repoUrl && (
                          <a 
                            href={activeNode.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-white rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-white/10 transition-colors"
                          >
                            <Github size={16} /> Source Code
                          </a>
                        )}
                    </div>
                  )}
                  
                  {activeNode.id === 'core' && (
                     <div className="flex items-center gap-2 pt-6 border-t border-gray-100 dark:border-white/5">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-xs text-gray-500 font-mono">Central Neural Interface: ONLINE</span>
                     </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

// Sub-component for individual nodes
const ArchNodeItem: React.FC<{
  node: ArchNode;
  isActive: boolean;
  onClick: () => void;
}> = ({ node, isActive, onClick }) => {
  const isCore = node.id === 'core';
  
  return (
    <motion.button
      onClick={onClick}
      className="absolute group z-20 focus:outline-none"
      style={{ 
        left: `${node.x}%`, 
        top: `${node.y}%`,
        // Center the element on its coordinates
        transform: 'translate(-50%, -50%)' 
      }}
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: isCore ? 0 : 0.2, type: 'spring', stiffness: 200, damping: 20 }}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="relative">
        {/* Pulse effect for active state */}
        {isActive && (
          <div className={`absolute inset-0 rounded-full md:rounded-2xl ${node.color} opacity-30 animate-ping`} />
        )}
        
        {/* Node Body */}
        <div 
          className={`
            relative flex items-center justify-center border-2 shadow-xl transition-all duration-300
            ${isCore ? 'w-20 h-20 md:w-24 md:h-24 rounded-full' : 'w-12 h-12 md:w-16 md:h-16 rounded-full md:rounded-2xl'}
            ${isActive 
              ? `${node.color} border-white dark:border-white/20 text-white ring-4 ring-white/10` 
              : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-white/10 text-gray-500 hover:border-blue-400 dark:hover:border-blue-500'}
          `}
        >
          <node.icon size={isCore ? 32 : 20} className={isActive && node.id === 'core' ? 'text-gray-900 dark:text-black' : ''} />
        </div>

        {/* Hover Label (Only for non-active or core to avoid clutter) */}
        {!isActive && !isCore && (
            <div className={`
            absolute left-1/2 -translate-x-1/2 mt-3 whitespace-nowrap px-2 py-1 rounded text-[10px] font-bold backdrop-blur-md border transition-all duration-300 pointer-events-none
            bg-white/90 dark:bg-black/80 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-white/10 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0
            z-30
            `}>
            {node.title}
            </div>
        )}
      </div>
    </motion.button>
  );
};

export default SystemArchitecture;