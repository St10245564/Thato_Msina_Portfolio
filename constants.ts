import { Experience, Project, Certificate, DemoVideo } from './types';
import { Brain, Code, Database, Globe, Layers, Server, Sparkles, Terminal, Smartphone, Monitor } from 'lucide-react';

export const NAVIGATION_LINKS = [
  { name: 'Work', href: '#work' },
  { name: 'Experience', href: '#experience' },
  { name: 'Architecture', href: '#architecture' }, // Updated from Demos
  { name: 'Education', href: '#certificates' },
  { name: 'Contact', href: '#contact' },
];

export const PROJECTS: Project[] = [
  {
    id: 'senticore',
    title: 'SentiCoreX Pro',
    category: 'Full Stack',
    description: 'A professional AI Sentiment Analysis dashboard unlocking emotional insights with multi-modal input (Text, File, Batch, Voice), comparison tools, and detailed analysis history. Powered by Google Gemini API.',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Google Gemini API', 'Vercel'],
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000&auto=format&fit=crop',
    repoUrl: 'https://github.com/PentaCore-AI/SentiCoreX',
    demoUrl: 'https://senticore-x.vercel.app/',
    featured: true,
  },
  {
    id: 'pentacore-mentor',
    title: 'PentaCore AI Mentor',
    category: 'Full Stack',
    description: 'An AI-powered learning assistant that helps users understand AI concepts such as Machine Learning, NLP, Neural Networks, and AI Ethics. The chatbot uses a no-code / low-code architecture and integrates Gemini API for conversational AI.',
    techStack: ['Google Gemini API', 'No-Code/Low-Code', 'React', 'Vercel'],
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2000&auto=format&fit=crop',
    repoUrl: 'https://github.com/PentaCore-AI/PentaCore-AI-Mentor',
    demoUrl: 'https://pentacoreaimentor.vercel.app/',
    featured: true,
  },
  {
    id: 'event-management',
    title: 'Event Management System',
    category: 'Full Stack',
    description: 'A modern ASP.NET Core MVC web application that simplifies managing venues, events, and bookings. Features include Azure Blob Storage for image uploads, seeded event types, venue availability validation to prevent double-bookings, and a real-time dashboard.',
    techStack: ['ASP.NET Core MVC', 'C#', 'Azure Blob Storage', 'SQL Server', 'Entity Framework'],
    imageUrl: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2000&auto=format&fit=crop',
    repoUrl: 'https://github.com/St10245564/Event-Management-System',
    demoUrl: 'https://youtu.be/aRDidmcfLWE',
    featured: true,
  },
  {
    id: 'resume-builder',
    title: 'AI Resume Builder',
    category: 'Full Stack',
    description: 'An intelligent resume creation platform helping users generate professional resumes with AI-driven content suggestions, formatting optimizations, and real-time previews. Built to streamline the job application process.',
    techStack: ['React', 'TypeScript', 'Google Gemini API', 'Tailwind CSS', 'Vercel'],
    imageUrl: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=2000&auto=format&fit=crop',
    repoUrl: 'https://github.com/PentaCore-AI/Resume_Builder',
    demoUrl: 'https://ai-resume-builder-one-phi.vercel.app/',
    featured: true,
  },
  {
    id: 'bias-analysis',
    title: 'Bias Analysis in Recruitment',
    category: 'Full Stack',
    description: 'A comprehensive fairness analysis of a hiring dataset using Python and Google Colab. Implemented quantitative metrics to identify gender disparities, applied mitigation algorithms to reduce bias, and developed an ethical framework for equitable recruitment.',
    techStack: ['Python', 'Google Colab', 'Pandas', 'AI Ethics', 'Bias Mitigation'],
    imageUrl: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=2000&auto=format&fit=crop',
    repoUrl: 'https://github.com/PentaCore-AI/RecruitmentAI_Notebook',
    demoUrl: 'https://bias-in-hiring.vercel.app/',
    featured: true,
  },
  {
    id: '1',
    title: 'CAPACITI Intelligent Talent Hub',
    category: 'Full Stack',
    description: 'A unified Employee Self-Service (ESS) platform designed to centralize critical operations (HR, IT, Policy) and optimize candidate readiness. The solution features a 3-API AI integration suite (RAG Policy Navigator, OCR Certification Verification, and Predictive Analytics) to automate compliance.',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Firebase', 'Google Gemini API'],
    imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2000&auto=format&fit=crop',
    repoUrl: 'https://github.com/PentaCore-AI/CAPACITI-HUB-PROD',
    demoUrl: 'https://capacitihub.vercel.app/',
    featured: true,
  },
  {
    id: '2',
    title: 'BudgetSmart',
    category: 'Mobile',
    description: 'A feature-rich personal finance Android application helping users track income and expenses. Includes a gamified interface with XP tracking and badges, spending insights with visual charts, and category-specific budgeting tools.',
    techStack: ['Android', 'Kotlin', 'SQLite', 'MVVM', 'Material Design'],
    imageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2000&auto=format&fit=crop',
    repoUrl: 'https://github.com/St10245564/Buddget_App',
    demoUrl: 'https://www.youtube.com/watch?v=P_bNtbB1Whk',
    featured: true,
  },
  {
    id: 'creative-writing',
    title: 'Creative Writing Tool',
    category: 'Full Stack',
    description: 'Developed a Generative AI–powered creative writing system fine-tuned for literary expression. The tool generates high-quality poetry and coherent narrative stories with distinct stylistic tones, demonstrating advanced prompt design, model tuning, and creative AI capabilities.',
    techStack: ['Generative AI', 'Python', 'LLM', 'Google Cloud Run', 'Streamlit'],
    imageUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=2000&auto=format&fit=crop',
    repoUrl: 'https://github.com/PentaCore-AI/Creative_Writing_Tool',
    demoUrl: 'https://pentacore-189473728151.us-west1.run.app/',
    featured: true,
  }
];

export const EXPERIENCES: Experience[] = [
  {
    id: 'capaciti-intern',
    role: 'AI & Software Development Intern',
    company: 'CAPACITI × FNB Academy Programme — App of the Year',
    period: 'Current',
    description: [
      'Participating in a 2-month Artificial Intelligence (AI) Bootcamp, focusing on applied AI development, ethics, and deployment.',
      'Developing and deploying AI-driven applications using modern frameworks and cloud platforms.'
    ]
  },
  {
    id: '1',
    role: 'Freelance & Self-Taught Developer',
    company: 'Independent',
    period: '2019 - Present',
    description: [
      'Designed and developed personal and academic projects including Event Management System and BudgetSmart Android app.',
      'Applied full-stack and mobile development skills to real-world scenarios.',
      'Continuously learning and implementing modern software architecture patterns.'
    ]
  },
  {
    id: '2',
    role: 'Trainee - Full Stack Development',
    company: 'FNB App Academy',
    period: 'May 2024 - April 2025',
    description: [
      'Completed an intensive practical program focused on real-world application development.',
      'Gained hands-on experience in HTML, CSS, JavaScript, Django, Python, RESTful APIs, Git, and deployment.',
      'Collaborated on team-based software delivery projects.'
    ]
  },
  {
    id: '3',
    role: 'Volunteer Developer',
    company: 'Community Tech Enthusiast',
    period: '2023 - Present',
    description: [
      'Provide informal tech support to local community members in Orange Farm.',
      'Assist with app installations, troubleshooting, and improving digital literacy.',
      'Bridge the digital divide through community engagement.'
    ]
  }
];

export const CERTIFICATES: Certificate[] = [
  {
    id: '1',
    title: 'Diploma in IT (Software Development)',
    issuer: 'Rosebank College (IIE)',
    date: 'Jun 2023',
    url: '#',
    skills: ['Software Engineering', 'System Analysis', 'Java', 'C#', 'SQL']
  },
  {
    id: '2',
    title: 'Certificate in Full Stack Development',
    issuer: 'FNB App Academy',
    date: 'Apr 2025',
    url: '#',
    skills: ['Full Stack Dev', 'Python', 'Django', 'REST APIs', 'Git']
  },
  {
    id: '3',
    title: 'AI For Everyone',
    issuer: 'DeepLearning.AI',
    date: 'Oct 2025',
    url: 'https://coursera.org/share/26faecfb3685f34cc3ec74bf377270a1',
    skills: ['Artificial Intelligence', 'Machine Learning', 'AI Strategy', 'Data Science']
  },
  {
    id: '4',
    title: 'Introduction to Artificial Intelligence (AI)',
    issuer: 'IBM',
    date: 'Nov 2025',
    url: 'https://coursera.org/share/556dfb0bba7016434de062c7f7136cc4',
    skills: ['Artificial Intelligence', 'AI Concepts', 'IBM Watson', 'Ethics in AI']
  },
  {
    id: '5',
    title: 'Artificial Intelligence on Microsoft Azure',
    issuer: 'Microsoft',
    date: 'Nov 2025',
    url: 'https://coursera.org/share/900bf3bb58a2cb74e1dd51d6900d3dd9',
    skills: ['Azure AI', 'Cognitive Services', 'Machine Learning', 'Cloud Solutions']
  },
  {
    id: '6',
    title: 'Introduction to Generative AI',
    issuer: 'Google Cloud',
    date: 'Nov 2025',
    url: 'https://coursera.org/share/c40792aa4e5223c2d7d52b797713c48a',
    skills: ['Generative AI', 'Large Language Models', 'Google Cloud AI', 'Responsible AI']
  },
  {
    id: '7',
    title: 'AI Essentials',
    issuer: 'Google',
    date: 'Nov 2025',
    url: 'https://coursera.org/share/14788052acd08ad2bae118a8af2470bc',
    skills: ['AI Productivity', 'Generative AI', 'Large Language Models', 'Prompt Engineering']
  },
  {
    id: '8',
    title: 'Python for Data Science, AI & Development',
    issuer: 'IBM',
    date: 'Nov 2025',
    url: 'https://coursera.org/share/8a7e8f12a3b1c79e2c994bff720e7c33',
    skills: ['Python', 'Data Science', 'Data Analysis', 'Pandas', 'Numpy']
  },
  {
    id: '9',
    title: 'Building AI Powered Chatbots Without Programming',
    issuer: 'IBM',
    date: 'Nov 2025',
    url: 'https://coursera.org/share/787c91a9a6a53be2da79714b4bb3429e',
    skills: ['Chatbots', 'IBM Watson Assistant', 'Conversational AI', 'No-Code AI']
  },
  {
    id: '10',
    title: 'Generative AI with Large Language Models',
    issuer: 'DeepLearning.AI',
    date: 'Nov 2025',
    url: 'https://coursera.org/share/806b3083d9ac7e3f208246eaebc1bdf3',
    skills: ['Generative AI', 'LLMs', 'Transformer Architecture', 'RLHF', 'Fine-tuning']
  },
  {
    id: '11',
    title: 'Generative AI for Everyone',
    issuer: 'DeepLearning.AI',
    date: 'Nov 2025',
    url: 'https://coursera.org/share/b444c450393d283e41b338f3e812b591',
    skills: ['Generative AI', 'AI Strategy', 'Prompt Engineering', 'LLMs']
  },
  {
    id: '12',
    title: 'Trustworthy AI: Managing Bias, Ethics, and Accountability',
    issuer: 'DeepLearning.AI',
    date: 'Nov 2025',
    url: 'https://coursera.org/share/3402cc4e8ca2ac0e0a5455139e3838a0',
    skills: ['AI Ethics', 'Bias Mitigation', 'Accountability', 'Responsible AI']
  },
  {
    id: '13',
    title: 'AI Foundations: Prompt Engineering with ChatGPT',
    issuer: 'Vanderbilt University',
    date: 'Nov 2025',
    url: 'https://coursera.org/share/2f432f8c3925f85d45ed1fc428b77671',
    skills: ['Prompt Engineering', 'ChatGPT', 'LLMs', 'Generative AI']
  }
];

export const TECH_ICONS = [
  { icon: Monitor, label: 'Full Stack' },
  { icon: Smartphone, label: 'Mobile Dev' },
  { icon: Database, label: 'Backend' },
  { icon: Layers, label: 'Systems' },
];

export const DEMO_VIDEOS: DemoVideo[] = [
  {
    id: '1',
    title: 'AI Policy Navigator',
    category: 'Computer Vision',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 
    posterUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1000&auto=format&fit=crop',
    stats: {
      views: '1.2k',
      likes: '85'
    }
  },
  {
    id: '2',
    title: 'Real-time Talent Risk Analysis',
    category: 'Predictive Analytics',
    videoUrl: 'https://www.youtube.com/watch?v=LXb3EKWsInQ',
    posterUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop',
    stats: {
      views: '2.4k',
      likes: '142'
    }
  },
  {
    id: '3',
    title: 'Automated Certificate Verification',
    category: 'Machine Learning',
    videoUrl: 'https://www.youtube.com/watch?v=9xwazD5SyVg',
    posterUrl: 'https://images.unsplash.com/photo-1516110833967-0b5716ca1387?q=80&w=1000&auto=format&fit=crop',
    stats: {
      views: '980',
      likes: '64'
    }
  }
];