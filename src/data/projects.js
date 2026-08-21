export const projects = [
  {
    title: 'PrepForge AI',
    subtitle: 'AI-Powered Interview Preparation Platform',
    description: 'A full-stack platform that transforms a candidate’s resume, self-description, and target role into a focused interview-preparation report.',
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Google Gemini API', 'Zod', 'JWT', 'Puppeteer'],
    features: [
      'Personalized reports with match scores, technical and behavioral questions, skill-gap analysis, and preparation plans.',
      'Google Gemini API workflows with Zod structured outputs for consistent, useful AI responses.',
      'JWT authentication, secure cookie handling, resume uploads, and ATS-friendly PDF resume generation.',
      'Modular REST API architecture with React frontend on Vercel and backend on Render.',
    ],
    githubUrl: 'https://github.com/rounakbhardwaj01/PrepForge-AI',
    liveUrl: 'https://prepforge-ai-six.vercel.app/',
    image: '',
    featured: true,
  },
  {
    title: 'CodeLens AI',
    subtitle: 'AI-Powered Code Review Platform',
    description: 'A developer-focused platform that analyzes code and provides structured, context-aware reviews with clear paths to improvement.',
    technologies: ['React.js', 'Node.js', 'Express.js', 'Google Gemini API', 'Axios', 'Prism.js', 'Markdown'],
    features: [
      'Automated feedback on code quality, bugs, security, performance, and best practices.',
      'Actionable recommendations and optimized-code suggestions powered by Google Gemini API.',
      'Modular API backend with dedicated routes, controllers, and AI service layers.',
      'Responsive animated interface with Prism.js syntax highlighting and Markdown rendering; deployed via Vercel and Render.',
    ],
    githubUrl: 'https://github.com/rounakbhardwaj01/CodeLens-AI',
    liveUrl: 'https://code-lens-ai-mu.vercel.app/',
    image: '',
    featured: false,
  },
]
