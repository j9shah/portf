export const personalInfo = {
  name: "Jainam Shah",
  introduction: "Computer Science Co-op student at Toronto Metropolitan University.",
  interests: [
    "software engineering ...",
    "full-stack development ...",
    "cybersecurity ...",
    "machine learning ...",
    "building things that matter !!!",
  ] as const,
  location: "Toronto, Ontario",
  url: "https://j9shah.me",
};

export type Experience = {
  id: string;
  company: string;
  position: string;
  status: "incoming" | "current" | "past";
  period: string;
  location: string;
  highlights: string[];
  technologies: string[];
  link?: string;
};

export const experiences: Experience[] = [
  {
    id: "cgi",
    company: "CGI",
    position: "Junior Software Developer (Co-op)",
    status: "incoming",
    period: "Jan 2027",
    location: "Markham, Ontario",
    highlights: [],
    technologies: [],
  },
  {
    id: "beacon",
    company: "BEACON Research Group · Toronto Metropolitan University",
    position: "Software Engineer",
    status: "current",
    period: "May 2026 – Present",
    location: "Toronto, Ontario",
    highlights: [
      "Developed Python microservices for a Kafka-based smart-building platform, processing real-time sensor data for analytics and machine-learning workflows.",
      "Built Kafka-to-PostgreSQL ingestion services with SQLAlchemy, including automatic schema initialization and persistence for telemetry and analytics metadata.",
      "Containerized and integrated backend services with Docker Compose across an architecture of 11 microservices.",
    ],
    technologies: ["Python", "Kafka", "PostgreSQL", "SQLAlchemy", "Docker Compose"],
    link: "https://www.torontomu.ca/beacon/",
  },
  {
    id: "opg",
    company: "Ontario Power Generation",
    position: "Security Operations Center (SOC) Analyst",
    status: "past",
    period: "Sep 2025 – Apr 2026",
    location: "Toronto, Ontario",
    highlights: [
      "Investigated 50+ phishing reports weekly using Cofense Reporter, Microsoft Defender, Microsoft Sentinel, and KQL to assess incident scope and organizational risk.",
      "Correlated and enriched hundreds of indicators of compromise (IOCs) from threat intelligence feeds, integrated findings into Microsoft Defender Threat Intelligence, and maintained detailed case records.",
      "Built Python scripts to automate IOC parsing, normalization, and reputation lookups, reducing repetitive triage effort by approximately 30%.",
    ],
    technologies: ["Python", "Cofense Reporter", "Microsoft Defender", "Microsoft Sentinel", "Microsoft Defender Threat Intelligence", "KQL"],
  },
  {
    id: "crl",
    company: "Cybersecurity Research Lab · Toronto Metropolitan University",
    position: "Research Assistant",
    status: "past",
    period: "May 2024 – Aug 2025",
    location: "Toronto, Ontario",
    highlights: [
      "Built 8 Python web scrapers with Selenium, Pandas, and NumPy to collect, clean, and structure data from Twitter/X, GitHub, and Google News for research analysis.",
      "Automated internal workflows with JavaScript and Google Apps Script, reducing manual effort by 70% and improving data reliability.",
    ],
    technologies: ["Python", "Selenium", "Pandas", "NumPy", "JavaScript", "Google Apps Script"],
    link: "https://www.torontomu.ca/tedrogersschool/cybersecurity-research-lab/",
  },
];

export type Project = {
  id: string;
  display: "featured" | "archive";
  name: string;
  description: string;
  features: string[];
  tech: string[];
  github: string | null;
  demo: string | null;
  devpost: string | null;
};

export const projects: Project[] = [
  {
    id: "algoware",
    display: "featured",
    name: "Algoware",
    description: "A Chrome extension that makes YouTube recommendations easier to understand through topic and sentiment analysis.",
    features: [
      "Led a four-person team, using Manifest V3 content scripts and service workers to coordinate inference and visualize results.",
      "Built a Flask API with a fine-tuned BERT model for 26-class topic classification and Google Cloud Natural Language for sentiment analysis.",
    ],
    tech: ["Python", "Flask", "PyTorch", "BERT", "JavaScript", "HTML/CSS"],
    github: "https://github.com/e-laflamme/Algoware",
    demo: null,
    devpost: "https://devpost.com/software/algowhere",
  },
  {
    id: "lumina",
    display: "featured",
    name: "Lumina",
    description: "A real-time collaborative drawing application with shared strokes, live cursors, and presence awareness.",
    features: [
      "Synchronizes drawing events and user presence for up to 200 concurrent users.",
      "Built with Next.js, TypeScript, and Supabase Realtime and Auth.",
    ],
    tech: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS"],
    github: "https://github.com/j9shah/lumina",
    demo: "https://lumina-olive.vercel.app/",
    devpost: null,
  },
  {
    id: "skincare-recommender",
    display: "archive",
    name: "Skincare Recommender",
    description: "Python-based application helping users find skincare products tailored to their skin type, budget, and preferences using graph-based recommendations.",
    features: [
      "Graph data structure with users/products as nodes and 8000+ reviews as edges",
      "Interactive Tkinter GUI with real-time filtering by skin type, budget, and brand",
    ],
    tech: ["Python", "Pandas", "Tkinter"],
    github: "https://github.com/j9shah/Skincare-Recommender",
    demo: null,
    devpost: null,
  },
  {
    id: "citco",
    display: "archive",
    name: "Citco",
    description: "Web application investigating correlation between individual researchers' citation counts and NSERC Discovery Grant funding amounts.",
    features: [
      "Web-scraped dataset from NSERC grant database and Google Scholar citations",
      "Statistical analysis revealing Pearson correlation coefficient of ~0.3",
    ],
    tech: ["Python", "Pandas", "NumPy", "Matplotlib", "Flask"],
    github: "https://github.com/j9shah/citco",
    demo: null,
    devpost: null,
  },
  {
    id: "newsnest",
    display: "archive",
    name: "NewsNest",
    description: "MERN stack news aggregation platform allowing users to explore, save, and manage articles with JWT authentication and NewsAPI integration.",
    features: [
      "RESTful API with Express backend and MongoDB for user authentication",
      "Keyword search functionality with personalized article saving and management",
    ],
    tech: ["Node.js", "Express", "React", "MongoDB"],
    github: "https://github.com/j9shah/newsnest",
    demo: null,
    devpost: null,
  },
];

export const education = {
  institution: "Toronto Metropolitan University",
  degree: "B.Sc. (Hons) in Computer Science, Co-op",
  graduation: "Expected Apr 2028",
  gpa: "3.97 / 4.33",
  coursework: ["Data Structures & Algorithms", "Artificial Intelligence I", "Discrete Mathematics"],
};

export const skillGroups = [
  {
    label: "Languages",
    skills: ["Python", "Java", "JavaScript", "TypeScript", "SQL", "C/C++", "Bash", "HTML/CSS"],
  },
  {
    label: "Frameworks & libraries",
    skills: ["React", "Next.js", "Flask", "SQLAlchemy", "PyTorch", "Hugging Face Transformers", "scikit-learn", "Pandas", "NumPy", "spaCy", "NLTK", "Selenium"],
  },
  {
    label: "Tools & platforms",
    skills: ["Git", "GitHub", "Docker", "Kafka", "PostgreSQL", "Linux/Unix", "Supabase", "MySQL", "MongoDB", "AWS", "Jupyter Notebook", "Power BI", "Vercel"],
  },
];

export const socials = {
  email: "j9shah@torontomu.ca",
  linkedin: "https://linkedin.com/in/j9shah",
  github: "https://github.com/j9shah",
};
