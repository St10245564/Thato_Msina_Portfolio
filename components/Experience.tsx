import React from 'react';
import { motion } from 'framer-motion';
import { EXPERIENCES, TECH_ICONS } from '../constants';

const Experience: React.FC = () => {
  return (
    <section id="experience" className="relative py-32 z-10 bg-gradient-to-b from-transparent to-white/50 dark:to-[#030305]/50">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* Skills Column */}
        <div>
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-8"
          >
            Technical Arsenal
          </motion.h2>
          
          <div className="grid grid-cols-2 gap-4">
            {TECH_ICONS.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-white/60 dark:bg-white/5 border border-gray-200 dark:border-white/5 rounded-xl hover:bg-white dark:hover:bg-white/10 hover:shadow-lg dark:hover:shadow-none transition-all group cursor-default"
              >
                <item.icon className="w-8 h-8 text-blue-600 dark:text-blue-500 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-gray-900 dark:text-white font-medium">{item.label}</h3>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 space-y-6">
             <h3 className="text-xl font-semibold text-gray-900 dark:text-white">AI Bootcamp Specialization</h3>
             <div className="flex flex-wrap gap-3">
               {['Generative AI', 'NLP & LLMs', 'Prompt Engineering', 'AI Ethics & Bias', 'Machine Learning', 'Google Gemini API', 'Azure AI', 'Deep Learning'].map(tag => (
                 <span key={tag} className="px-4 py-2 rounded-full bg-purple-50 dark:bg-purple-500/10 border border-purple-100 dark:border-purple-500/20 text-purple-700 dark:text-purple-300 text-sm hover:border-purple-300 dark:hover:border-purple-500/50 transition-colors">
                   {tag}
                 </span>
               ))}
             </div>

             <h3 className="text-xl font-semibold text-gray-900 dark:text-white pt-4">Core Technologies</h3>
             <div className="flex flex-wrap gap-3">
               {['Java', 'C#', 'Kotlin', 'Python', 'JavaScript', 'HTML5/CSS3', 'SQL', 'PHP', 'Node.js'].map(tag => (
                 <span key={tag} className="px-4 py-2 rounded-full bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 text-sm hover:border-blue-300 dark:hover:border-white/30 transition-colors">
                   {tag}
                 </span>
               ))}
             </div>
             
             <h3 className="text-xl font-semibold text-gray-900 dark:text-white pt-4">Tools & Frameworks</h3>
             <div className="flex flex-wrap gap-3">
               {['ASP.NET Core MVC', 'Bootstrap 5', 'Android Studio', 'Visual Studio', 'Git', 'Azure', 'Firebase', 'MySQL', 'SQLite'].map(tag => (
                 <span key={tag} className="px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 text-blue-700 dark:text-blue-300 text-sm hover:border-blue-300 dark:hover:border-blue-500/50 transition-colors">
                   {tag}
                 </span>
               ))}
             </div>
          </div>
        </div>

        {/* Experience Timeline */}
        <div>
           <motion.h2 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-8"
          >
            Experience
          </motion.h2>

          <div className="space-y-12 border-l border-gray-200 dark:border-white/10 pl-8 ml-4">
            {EXPERIENCES.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative"
              >
                <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-gray-50 dark:bg-[#030305] border-2 border-blue-600 dark:border-blue-500" />
                
                <span className="text-sm font-mono text-blue-600 dark:text-blue-400 mb-2 block">{exp.period}</span>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{exp.role}</h3>
                <h4 className="text-lg text-gray-600 dark:text-gray-400 mb-4">{exp.company}</h4>
                
                <ul className="space-y-2">
                  {exp.description.map((item, i) => (
                    <li key={i} className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-gray-400 dark:bg-gray-600 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Experience;