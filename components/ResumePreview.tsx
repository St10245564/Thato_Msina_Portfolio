import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Loader2 } from 'lucide-react';

interface ResumePreviewProps {
  isOpen: boolean;
  onClose: () => void;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ isOpen, onClose }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    if (!contentRef.current) return;
    setIsGenerating(true);

    // Check window object for html2pdf
    // @ts-ignore
    if (typeof window.html2pdf === 'undefined') {
      alert("PDF generator resource is loading. Please try again in a few seconds.");
      setIsGenerating(false);
      return;
    }
    
    // Create a dedicated container for PDF generation
    // This ensures the element is isolated, fully visible (not clipped), and has the correct background.
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100vw';
    container.style.height = '100vh';
    container.style.zIndex = '99999'; // On top of everything
    container.style.backgroundColor = '#ffffff'; // White background
    container.style.overflow = 'auto'; // Allow scrolling if needed (though we capture full height)
    container.style.display = 'flex';
    container.style.justifyContent = 'center';
    container.style.alignItems = 'flex-start'; // Align top
    
    // Create a loading overlay inside this container so the user sees something happening
    const loadingOverlay = document.createElement('div');
    loadingOverlay.style.position = 'fixed';
    loadingOverlay.style.top = '20px';
    loadingOverlay.style.right = '20px';
    loadingOverlay.style.padding = '10px 20px';
    loadingOverlay.style.background = 'rgba(0,0,0,0.8)';
    loadingOverlay.style.color = 'white';
    loadingOverlay.style.borderRadius = '8px';
    loadingOverlay.style.zIndex = '100000';
    loadingOverlay.innerText = 'Generating PDF...';
    container.appendChild(loadingOverlay);

    // Clone the resume content
    const originalElement = contentRef.current;
    const element = originalElement.cloneNode(true) as HTMLElement;

    // Reset styles on the clone to ensure it renders as a flat, A4-width document
    element.style.width = '210mm';
    element.style.minHeight = '297mm';
    element.style.height = 'auto'; 
    element.style.boxShadow = 'none';
    element.style.margin = '0 auto';
    element.style.backgroundColor = 'white';
    element.style.color = 'black';
    element.style.overflow = 'visible';
    
    // Remove interfering classes that might constrain width or margins
    element.classList.remove('mx-auto', 'shadow-none', 'max-w-[210mm]'); 
    
    // Add clone to the container
    container.appendChild(element);
    
    // Add container to body
    document.body.appendChild(container);
    
    const opt = {
      margin:       0,
      filename:     'Thato_Kenny_Msina_Resume.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { 
        scale: 2, 
        useCORS: true, 
        letterRendering: true,
        scrollY: 0,
        windowWidth: 1024 
      },
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak:    { mode: ['avoid-all', 'css', 'legacy'] }
    };

    try {
      // @ts-ignore
      await window.html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error("PDF Generation failed", error);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      // Clean up
      if (document.body.contains(container)) {
        document.body.removeChild(container);
      }
      setIsGenerating(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white text-black w-full max-w-4xl max-h-[90vh] rounded-xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Toolbar */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50 shrink-0">
              <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                Resume Preview <span className="text-xs font-normal text-gray-500 bg-gray-200 px-2 py-0.5 rounded">ATS Optimized</span>
              </h2>
              <div className="flex items-center gap-3">
                <button 
                  onClick={handleDownload}
                  disabled={isGenerating}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isGenerating ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
                  {isGenerating ? 'Generating...' : 'Download PDF'}
                </button>
                <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-lg text-gray-600 transition-colors">
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-100/50">
              <div 
                ref={contentRef} 
                className="bg-white shadow-none mx-auto max-w-[210mm] p-[20mm] min-h-[297mm] text-left text-black"
                style={{ width: '210mm', minHeight: '297mm' }} // Enforce A4 dimensions for the capture
              >
                {/* Resume Content */}
                {/* Header */}
                <h1 className="text-center text-3xl font-bold uppercase mb-2 text-black">Thato Kenny Msina</h1>
                <div className="contact-info text-center text-sm mb-6 text-gray-700">
                  South Africa | Thatomsina@gmail.com | 069 212 2826 <br />
                  LinkedIn: linkedin.com/in/thato-msina | GitHub: github.com/St10245564 <br />
                  Portfolio: https://thatos-portfoloi.netlify.app/
                </div>

                {/* Professional Summary */}
                <h2 className="text-base uppercase font-bold border-b-2 border-black mb-3 mt-6 pb-1 text-black">Professional Summary</h2>
                <p className="text-sm leading-relaxed mb-4 text-black">
                  AI Developer with specialized training in machine learning and ethical AI implementation through CAPACITI × FNB Academy AI Bootcamp. Skilled in Python, generative AI, natural language processing, and bias mitigation techniques. Combines full-stack development expertise with practical AI applications to build responsible, effective solutions.
                </p>

                {/* Technical Skills */}
                <h2 className="text-base uppercase font-bold border-b-2 border-black mb-3 mt-6 pb-1 text-black">Technical Skills</h2>
                <div className="text-sm leading-relaxed skills-section text-black">
                    <p className="mb-1"><strong className="font-bold">Programming Languages:</strong> Python, Java, JavaScript, TypeScript, C#, Kotlin, SQL, HTML5, CSS3</p>
                    <p className="mb-1"><strong className="font-bold">AI & Machine Learning:</strong> Generative AI, NLP, Prompt Engineering, Deep Learning, Bias Analysis, Ethical AI, Google Gemini, Azure AI</p>
                    <p className="mb-1"><strong className="font-bold">Frameworks & Libraries:</strong> TensorFlow, PyTorch, scikit-learn, pandas, NumPy, ASP.NET Core, Django, React, Bootstrap</p>
                    <p className="mb-1"><strong className="font-bold">Tools & Platforms:</strong> Git, GitHub, Docker, Azure, Firebase, Android Studio, VS Code, Jupyter Notebook, Google Colab</p>
                    <p className="mb-1"><strong className="font-bold">Databases:</strong> MySQL, SQLite, Firebase, MongoDB</p>
                    <p className="mb-1"><strong className="font-bold">Methodologies:</strong> Agile, Scrum, TDD, MVC, MVVM, RESTful APIs</p>
                </div>

                {/* AI Projects */}
                <h2 className="text-base uppercase font-bold border-b-2 border-black mb-3 mt-6 pb-1 text-black">AI Projects</h2>
                
                <div className="mb-4 break-inside-avoid">
                    <div className="flex justify-between items-baseline mb-1">
                        <h3 className="font-bold text-sm text-black">CAPACITI Intelligent Talent Hub</h3>
                        <span className="text-sm text-gray-600">November 2025</span>
                    </div>
                    <div className="italic text-sm mb-2 text-gray-700">AI-Driven HR Platform</div>
                    <ul className="list-disc ml-5 text-sm space-y-1 text-black">
                        <li>Developed AI-powered talent management system using TypeScript and machine learning algorithms.</li>
                        <li>Implemented chatbot integration to automate candidate screening and engagement.</li>
                        <li>Applied natural language processing for resume parsing and skill matching.</li>
                        <li>Reduced manual HR workload by 40% through process automation.</li>
                    </ul>
                </div>

                <div className="mb-4 break-inside-avoid">
                    <div className="flex justify-between items-baseline mb-1">
                        <h3 className="font-bold text-sm text-black">Recruitment Bias Analysis System</h3>
                        <span className="text-sm text-gray-600">October 2025</span>
                    </div>
                    <div className="italic text-sm mb-2 text-gray-700">Fairness Evaluation Tool</div>
                    <ul className="list-disc ml-5 text-sm space-y-1 text-black">
                        <li>Built Python application to detect and mitigate gender bias in recruitment datasets.</li>
                        <li>Implemented statistical fairness metrics (demographic parity, equal opportunity).</li>
                        <li>Reduced algorithmic bias by 60% through preprocessing and post-processing techniques.</li>
                        <li>Created interactive visualization dashboard for bias analysis using Plotly.</li>
                    </ul>
                </div>

                <div className="mb-4 break-inside-avoid">
                    <div className="flex justify-between items-baseline mb-1">
                        <h3 className="font-bold text-sm text-black">PentaCore AI Educational Chatbot</h3>
                        <span className="text-sm text-gray-600">October 2025</span>
                    </div>
                    <div className="italic text-sm mb-2 text-gray-700">Interactive Learning Assistant</div>
                    <ul className="list-disc ml-5 text-sm space-y-1 text-black">
                        <li>Developed AI tutor using Google Gemini 2.5 Flash with Unsplash and YouTube API integration.</li>
                        <li>Implemented context-aware conversation system for personalized learning.</li>
                        <li>Achieved 85% user satisfaction rate in beta testing.</li>
                        <li>Built real-time UI updates using JavaScript and WebSocket connections.</li>
                    </ul>
                </div>

                <div className="mb-4 break-inside-avoid">
                    <div className="flex justify-between items-baseline mb-1">
                        <h3 className="font-bold text-sm text-black">Generative AI Creative Writing Tool</h3>
                        <span className="text-sm text-gray-600">October 2025</span>
                    </div>
                    <div className="italic text-sm mb-2 text-gray-700">AI-Powered Writing Assistant</div>
                    <ul className="list-disc ml-5 text-sm space-y-1 text-black">
                        <li>Fine-tuned language model for poetry and narrative generation.</li>
                        <li>Implemented advanced prompt engineering techniques for stylistic control.</li>
                        <li>Built user interface with React and integrated with OpenAI API.</li>
                        <li>Generated 500+ unique creative writing samples during testing.</li>
                    </ul>
                </div>

                {/* Software Development Experience */}
                <h2 className="text-base uppercase font-bold border-b-2 border-black mb-3 mt-6 pb-1 text-black">Software Development Experience</h2>
                
                <div className="mb-4 break-inside-avoid">
                    <div className="flex justify-between items-baseline mb-1">
                        <h3 className="font-bold text-sm text-black">Freelance Developer</h3>
                        <span className="text-sm text-gray-600">2019 – Present</span>
                    </div>
                    <ul className="list-disc ml-5 text-sm space-y-1 text-black">
                        <li>Developed full-stack web applications using ASP.NET Core MVC and JavaScript.</li>
                        <li>Created Android applications using Kotlin and SQLite with MVVM architecture.</li>
                        <li>Built Event Management System with Azure integration and real-time updates.</li>
                        <li>Designed responsive websites with Bootstrap 5 and custom CSS.</li>
                    </ul>
                </div>

                 <div className="mb-4 break-inside-avoid">
                    <div className="flex justify-between items-baseline mb-1">
                        <h3 className="font-bold text-sm text-black">The IIE's Rosebank College</h3>
                        <span className="text-sm text-gray-600">2022 – 2023</span>
                    </div>
                     <div className="italic text-sm mb-2 text-gray-700">Diploma Projects</div>
                    <ul className="list-disc ml-5 text-sm space-y-1 text-black">
                        <li>Collaborated in Agile teams to develop database-driven applications.</li>
                        <li>Implemented CRUD operations using Entity Framework Core and SQL Server.</li>
                        <li>Created portfolio website using HTML5, CSS3, and JavaScript.</li>
                    </ul>
                </div>

                {/* Education */}
                <h2 className="text-base uppercase font-bold border-b-2 border-black mb-3 mt-6 pb-1 text-black">Education</h2>
                <div className="mb-3 break-inside-avoid">
                    <div className="flex justify-between items-baseline mb-1">
                        <h3 className="font-bold text-sm text-black">Rosebank College (IIE)</h3>
                        <span className="text-sm text-gray-600">Graduated June 2023</span>
                    </div>
                    <div className="text-sm text-black">IIE Diploma in IT in Software Development</div>
                    <div className="text-sm italic text-gray-700">Specialization: Software Development and Full-Stack Web Development</div>
                </div>

                <div className="mb-3 break-inside-avoid">
                    <div className="flex justify-between items-baseline mb-1">
                        <h3 className="font-bold text-sm text-black">CAPACITI × FNB Academy</h3>
                        <span className="text-sm text-gray-600">2025</span>
                    </div>
                    <div className="text-sm text-black">Artificial Intelligence Bootcamp</div>
                    <div className="text-sm italic text-gray-700">Intensive 2-month AI training program focusing on practical AI implementation</div>
                </div>

                {/* Certifications */}
                <h2 className="text-base uppercase font-bold border-b-2 border-black mb-3 mt-6 pb-1 text-black">Certifications</h2>
                <ul className="list-disc ml-5 text-sm space-y-1 text-black">
                    <li>Introduction to Artificial Intelligence (AI) – Coursera</li>
                    <li>Generative AI for Everyone – Coursera</li>
                    <li>Python for Data Science – Coursera</li>
                    <li>Trustworthy AI: Managing Bias, Ethics, and Accountability – Coursera</li>
                    <li>AI Foundations: Prompt Engineering with ChatGPT – Coursera</li>
                    <li>Certificate in Full Stack Development – FNB App Academy</li>
                </ul>

                {/* Machine Learning Proficiency */}
                <h2 className="text-base uppercase font-bold border-b-2 border-black mb-3 mt-6 pb-1 text-black">Machine Learning Proficiency</h2>
                <ul className="list-disc ml-5 text-sm space-y-1 text-black">
                    <li><strong className="font-bold">Supervised & Unsupervised Learning:</strong> Regression, Classification, Clustering, Dimensionality Reduction</li>
                    <li><strong className="font-bold">Model Evaluation:</strong> Cross-validation, Metrics (Accuracy, Precision, Recall, F1)</li>
                    <li><strong className="font-bold">Pipeline:</strong> Feature Engineering, Selection, Model Deployment and Monitoring</li>
                    <li><strong className="font-bold">API Integration:</strong> OpenAI, Google Gemini, Hugging Face, Model Fine-tuning</li>
                    <li><strong className="font-bold">AI Ethics:</strong> Implementation, Bias Testing, Responsible AI</li>
                </ul>

              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ResumePreview;