export const personalInfo = {
  name: "Jainam Shah",
  title: "CS Undergraduate",
  bio: "Cybersecurity operations specialist and machine learning enthusiast focused on threat intelligence, data science, and full-stack development. Currently interning at Ontario Power Generation's Security Operations Center.",
};

export const education = {
  school: "Toronto Metropolitan University",
  degree: "B.Sc. Honours in Computer Science (Co-op)",
  cgpa: "4.00 / 4.33",
  graduationYear: 2028,
  honors: [
    "Dean's List 2023-24",
    "Dean's List 2024-25",
  ],
};

export const skills = {
  languages: [
    "Python",
    "Java",
    "JavaScript",
    "TypeScript",
    "SQL",
    "C/C++",
    "Bash",
    "Rust",
    "KQL",
  ],
  frameworks: [
    "Next.js",
    "React",
    "Flask",
    "TensorFlow",
    "PyTorch",
    "Hugging Face",
    "LangChain",
  ],
  tools: [
    "Git",
    "Docker",
    "Linux",
    "AWS",
    "Supabase",
    "MongoDB",
    "Microsoft Sentinel",
    "Power BI",
  ],
};

export const experiences = [
  {
    id: "opg",
    company: "Ontario Power Generation",
    position: "Cybersecurity Operations Intern",
    period: "Sept 2025 – Present",
    description:
      "Investigating and triaging cybersecurity incidents in a high-stakes SOC environment protecting Canada's critical energy infrastructure.",
    highlights: [
      "Investigate 50+ phishing reports weekly using detailed triage workflows and threat assessment protocols",
      "Correlate hundreds of IOCs from threat intelligence feeds including DefDector Pro and industry intel sources",
      "Built Python automation scripts for data parsing, normalization, and reputation lookups — reducing manual effort by 40%",
      "Hunt for threats using Microsoft Sentinel with custom KQL queries and Colense Expanse for attack surface monitoring",
    ],
    technologies: ["Python", "KQL", "Microsoft Sentinel", "Threat Intel"],
  },
  {
    id: "crl",
    company: "TMU Cybersecurity Research Lab",
    position: "Research Assistant — Applied ML",
    period: "May 2024 – Aug 2025",
    description:
      "Applied machine learning and NLP techniques to cybersecurity research, developing intelligent systems for threat detection and analysis.",
    highlights: [
      "Automated intent detection workflows using JavaScript and Google Apps Script, improving efficiency by 70%",
      "Optimized data preprocessing pipelines achieving 10% accuracy improvement across 104+ datasets",
      "Implemented NLP models with SpaCy and NLTK reaching 90% accuracy in sentiment classification tasks",
      "Developed validation test suites using Selenium, NumPy, and Pandas for data integrity verification",
      "Contributed to research publications and mentored junior research assistants",
    ],
    technologies: ["Python", "SpaCy", "NLTK", "TensorFlow", "Selenium"],
  },
];

export const projects = [
  {
    id: "algoware",
    name: "Algoware",
    description:
      "Chrome extension that audits YouTube's recommendation algorithm using ML classification to expose filter bubbles.",
    fullDescription:
      "A privacy-focused Chrome extension that analyzes YouTube recommendations using a fine-tuned BERT model. The extension runs a client-side JavaScript scraper that automatically triggers on YouTube, analyzes the top 20 recommendations across 26 categories, and performs real-time sentiment analysis to reveal algorithmic bias patterns.",
    tech: ["Python", "Flask", "PyTorch", "BERT", "JavaScript", "Chrome APIs"],
    github: "https://github.com/j9shah/algoware",
    demo: null,
  },
  {
    id: "lumina",
    name: "Lumina",
    description:
      "Real-time collaborative drawing canvas with live cursor tracking and presence awareness.",
    fullDescription:
      "A full-featured collaborative drawing application built with Next.js and Supabase. Features real-time synchronization of drawing events via Supabase Realtime Channels, live cursor tracking showing other users' positions, and instant presence awareness.",
    tech: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS"],
    github: "https://github.com/j9shah/lumina",
    demo: "https://lumina.vercel.app",
  },
  {
    id: "newsnest",
    name: "NewsNest",
    description:
      "Full-stack news aggregator with personalized feeds from 150,000+ sources and smart filtering.",
    fullDescription:
      "A comprehensive news aggregation platform featuring a React frontend and Node.js/Express backend. Integrates with NewsAPI to provide personalized, keyword-filtered feeds from over 150,000 news sources. Includes user authentication, saved articles, and MongoDB persistence.",
    tech: ["React", "Node.js", "Express", "MongoDB", "NewsAPI"],
    github: "https://github.com/j9shah/newsnest",
    demo: null,
  },
];

export const socials = {
  email: "j9shah@torontomu.ca",
  phone: "647-636-3242",
  linkedin: "https://linkedin.com/in/j9shah",
  github: "https://github.com/j9shah",
};
