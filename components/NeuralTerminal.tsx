import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Terminal, ChevronRight, Minimize2 } from 'lucide-react';
import { PROJECTS } from '../constants';

interface NeuralTerminalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface LogEntry {
  type: 'command' | 'response' | 'error' | 'success';
  content: React.ReactNode;
}

const HELP_MESSAGE = (
  <div className="space-y-1">
    <p>Available commands:</p>
    <div className="grid grid-cols-[100px_1fr] gap-2 text-sm">
      <span className="text-blue-400">about</span> <span>Professional summary</span>
      <span className="text-blue-400">education</span> <span>Academic background</span>
      <span className="text-blue-400">skills</span> <span>Technical capabilities</span>
      <span className="text-blue-400">projects</span> <span>View project history</span>
      <span className="text-blue-400">certs</span> <span>View certifications</span>
      <span className="text-blue-400">contact</span> <span>Contact details</span>
      <span className="text-blue-400">clear</span> <span>Clear terminal history</span>
      <span className="text-blue-400">exit</span> <span>Close the terminal</span>
    </div>
  </div>
);

const NeuralTerminal: React.FC<NeuralTerminalProps> = ({ isOpen, onClose }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<LogEntry[]>([
    { type: 'success', content: 'Thato Msina Portfolio Shell v2.0 initialized...' },
    { type: 'response', content: 'Type "help" to view available commands.' }
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    const newHistory = [...history, { type: 'command' as const, content: cmd }];

    switch (trimmedCmd) {
      case 'help':
        newHistory.push({ type: 'response', content: HELP_MESSAGE });
        break;
      
      case 'clear':
        setHistory([]);
        setInput('');
        return;

      case 'about':
        newHistory.push({ 
          type: 'response', 
          content: (
            <div className="leading-relaxed">
              Recent IT Software Development graduate with specialized training in Artificial Intelligence through CAPACITI × FNB Academy's AI Bootcamp. Experienced in developing AI-driven applications including chatbots, recruitment analysis tools, and creative AI systems. Combines full-stack development expertise with practical AI/ML implementation skills.
            </div>
          )
        });
        break;

      case 'education':
        newHistory.push({
          type: 'response',
          content: (
            <div className="space-y-4">
              <div>
                <div className="text-blue-400 font-bold">CAPACITI × FNB Academy Programme</div>
                <div className="text-white text-sm">Artificial Intelligence (AI) Bootcamp | Current</div>
                <div className="text-gray-500 text-xs italic mt-1">Intensive 2-month AI training focusing on applied AI development.</div>
              </div>
              <div>
                <div className="text-blue-400 font-bold">Rosebank College (IIE)</div>
                <div className="text-white text-sm">Diploma in IT in Software Development | Graduated Jun 2023</div>
                <div className="text-gray-500 text-xs italic mt-1">Specialization: Software Development & Full-Stack Web Development.</div>
              </div>
            </div>
          )
        });
        break;

      case 'skills':
        newHistory.push({ 
          type: 'response', 
          content: (
            <div className="space-y-2 text-sm">
              <div><span className="text-blue-400 font-bold">AI/ML:</span> Generative AI, Prompt Engineering, NLP, Bias Analysis, AI Ethics, Google Gemini, Azure AI</div>
              <div><span className="text-blue-400 font-bold">Languages:</span> Python, Java, C#, Kotlin, JavaScript, TypeScript, SQL</div>
              <div><span className="text-blue-400 font-bold">Frameworks:</span> ASP.NET Core MVC, Django, Bootstrap 5, Android SDK, Entity Framework</div>
              <div><span className="text-blue-400 font-bold">Tools:</span> Git, Azure, Firebase, Android Studio, VS Code, Google Colab</div>
              <div><span className="text-blue-400 font-bold">Concepts:</span> RESTful APIs, MVC Architecture, MVVM, Agile Development</div>
            </div>
          )
        });
        break;

      case 'projects':
        newHistory.push({ 
          type: 'response', 
          content: (
            <div className="space-y-3">
              {PROJECTS.map(p => (
                <div key={p.id}>
                  <div className="flex items-center gap-2">
                     <span className="text-emerald-400 font-bold">{p.title}</span>
                     <span className="text-[10px] px-1 bg-white/10 rounded text-gray-400 uppercase">{p.category}</span>
                  </div>
                  <div className="text-gray-400 text-xs leading-relaxed pl-2 border-l border-gray-700 mt-1">
                    {p.description.substring(0, 140)}...
                  </div>
                </div>
              ))}
            </div>
          )
        });
        break;

      case 'certs':
        newHistory.push({
          type: 'response',
          content: (
             <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-xs text-gray-300">
                <div>• Intro to Artificial Intelligence (IBM)</div>
                <div>• Intro to Generative AI (Google)</div>
                <div>• AI Essentials (Google)</div>
                <div>• Python for Data Science (IBM)</div>
                <div>• Building AI Powered Chatbots (IBM)</div>
                <div>• Generative AI for Everyone (DeepLearning.AI)</div>
                <div>• Trustworthy AI & Ethics (DeepLearning.AI)</div>
                <div>• AI on Microsoft Azure (Microsoft)</div>
                <div>• Prompt Engineering with ChatGPT</div>
             </div>
          )
        });
        break;

      case 'contact':
        newHistory.push({ 
            type: 'response', 
            content: (
                <div className="space-y-1 text-sm">
                    <div><span className="text-blue-400 w-20 inline-block">Email:</span> Thatomsina@gmail.com</div>
                    <div><span className="text-blue-400 w-20 inline-block">Phone:</span> 069 212 2826</div>
                    <div><span className="text-blue-400 w-20 inline-block">LinkedIn:</span> linkedin.com/in/thato-msina</div>
                    <div><span className="text-blue-400 w-20 inline-block">GitHub:</span> github.com/St10245564</div>
                    <div className="text-green-500 text-xs mt-2 italic">Initiating mail protocol...</div>
                </div>
            )
        });
        setTimeout(() => {
            window.location.href = 'mailto:Thatomsina@gmail.com';
        }, 1000);
        break;

      case 'whoami':
         newHistory.push({ type: 'response', content: 'root@thato-msina-portfolio:~# AI_FullStack_Engineer' });
         break;
      
      case 'sudo':
        newHistory.push({ type: 'error', content: 'Permission denied: User is already authenticated as guest.' });
        break;
      
      case 'exit':
        onClose();
        return;
      
      default:
        if (trimmedCmd !== '') {
            newHistory.push({ type: 'error', content: `Command not found: ${trimmedCmd}. Type 'help' for assistance.` });
        }
    }

    setHistory(newHistory);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    }
    if (e.key === 'ArrowUp') {
       // Optional: History traversal could be added here
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm cursor-pointer"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-full max-w-3xl h-[600px] bg-[#0c0c0e]/95 border border-white/10 rounded-lg shadow-2xl flex flex-col overflow-hidden ring-1 ring-white/10 cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/5">
              <div className="flex items-center gap-2 text-gray-400">
                <Terminal size={16} />
                <span className="text-xs font-mono font-medium">user@thato-msina:~/portfolio</span>
              </div>
              <div className="flex items-center gap-3">
                 <button className="text-gray-500 hover:text-white transition-colors"><Minimize2 size={14} /></button>
                 <button onClick={onClose} className="text-gray-500 hover:text-red-400 transition-colors"><X size={14} /></button>
              </div>
            </div>

            {/* Terminal Body */}
            <div 
              ref={scrollRef}
              className="flex-1 p-6 font-mono text-sm overflow-y-auto custom-scrollbar"
              onClick={() => inputRef.current?.focus()}
            >
              <div className="space-y-2">
                {history.map((entry, i) => (
                  <div key={i} className="leading-relaxed">
                    {entry.type === 'command' && (
                      <div className="flex items-center gap-2 text-gray-400 mt-4 mb-1">
                         <ChevronRight size={14} />
                         <span className="text-white">{entry.content}</span>
                      </div>
                    )}
                    {entry.type === 'response' && (
                      <div className="text-gray-300 ml-5">{entry.content}</div>
                    )}
                    {entry.type === 'error' && (
                      <div className="text-red-400 ml-5">{entry.content}</div>
                    )}
                    {entry.type === 'success' && (
                      <div className="text-green-400 ml-5">{entry.content}</div>
                    )}
                  </div>
                ))}
              </div>

              {/* Input Line */}
              <div className="flex items-center gap-2 mt-4 text-white">
                <span className="text-green-500">➜</span>
                <span className="text-blue-400">~</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent border-none outline-none text-white placeholder-gray-600"
                  autoComplete="off"
                  autoFocus
                />
              </div>
            </div>
            
            <div className="px-4 py-2 bg-white/5 border-t border-white/5 text-[10px] text-gray-500 font-mono text-center">
               Neural Interface Active • Press 'ESC', click outside, or type 'exit' to close
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default NeuralTerminal;