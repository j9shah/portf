export const personalInfo = {
  name: "Jainam Shah",
  title: "CS Undergraduate",
};

export type Experience = {
  id: string;
  company: string;
  position: string;
  type?: string;
  period: string;
  duration?: string;
  location?: string;
  workMode?: string;
  description?: string;
  technologies?: string[];
  featured?: boolean;
};

export const experiences: Experience[] = [
  {
    id: "opg",
    company: "Ontario Power Generation",
    position: "Cybersecurity Operations Intern",
    type: "Internship",
    period: "Sept 2025 – Present",
    location: "Toronto, Ontario, Canada",
    description: "Investigating and triaging cybersecurity incidents across critical infrastructure. Building automated threat detection workflows.",
    technologies: ["Python", "KQL", "Microsoft Sentinel", "Threat Intel"],
    featured: true,
  },
  {
    id: "crl",
    company: "TMU Cybersecurity Research Lab",
    position: "Research Assistant",
    type: "Research",
    period: "May 2024 – Aug 2025",
    duration: "1 yr 4 mos",
    location: "Toronto, Ontario, Canada",
    description: "Applied ML and NLP techniques to analyze phishing campaigns. Developed data collection pipelines for security research.",
    technologies: ["Python", "SpaCy", "NLTK", "TensorFlow", "Selenium"],
    featured: true,
  },
  {
    id: "tutorbright",
    company: "TutorBright",
    position: "Academic Tutor",
    type: "Contract Part-time",
    period: "Sep 2023 – Sep 2024",
    duration: "1 yr 1 mo",
    location: "Toronto, Ontario, Canada",
    description: "Provided personalized academic tutoring to students across various subjects, developing customized learning plans and tracking progress.",
  },
  {
    id: "tdsb",
    company: "Toronto District School Board",
    position: "Math Tutor",
    type: "Contract Part-time",
    period: "May 2022 – Jun 2022",
    duration: "2 mos",
    location: "Toronto, Ontario, Canada",
    workMode: "Hybrid",
    description: "Tutored high school students in mathematics, helping them prepare for exams and improve their problem-solving skills.",
  },
  {
    id: "banana-republic",
    company: "Banana Republic",
    position: "Retail Associate",
    type: "Permanent Part-time",
    period: "Aug 2021 – Jan 2023",
    duration: "1 yr 6 mos",
    location: "Toronto, Ontario, Canada",
    workMode: "On-site",
    description: "Delivered excellent customer service in a fast-paced retail environment, managing inventory and visual merchandising.",
  },
  {
    id: "regent-medical",
    company: "Regent Medical Clinic",
    position: "Office Administrator",
    type: "Permanent Part-time",
    period: "Aug 2018 – Feb 2022",
    duration: "3 yrs 7 mos",
    location: "Toronto, Ontario, Canada",
    workMode: "On-site",
    description: "Managed patient scheduling, medical records, and front desk operations. Handled administrative tasks and coordinated with healthcare staff.",
  },
];

export type Project = {
  id: string;
  name: string;
  description: string;
  features?: string[];
  tech: string[];
  github: string | null;
  demo: string | null;
  devpost: string | null;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    id: "algoware",
    name: "Algoware",
    description: "Chrome extension that audits YouTube recommendations by revealing topic and sentiment trends, promoting algorithmic transparency.",
    features: [
      "Fine-tuned BERT model for 26-category topic classification with Flask backend",
      "Client-side JavaScript scraper analyzing 20 recommendations in ~12 seconds",
    ],
    tech: ["Python", "PyTorch", "BERT", "Flask", "JavaScript"],
    github: "https://github.com/j9shah/algoware",
    demo: null,
    devpost: "https://devpost.com/software/algowhere",
  },
  {
    id: "citco",
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
    id: "lumina",
    name: "Lumina",
    description: "Real-time collaborative drawing app with live cursor tracking and presence awareness across ephemeral sessions.",
    features: [
      "Supabase Realtime Channels broadcasting drawing events with no database storage",
      "Interactive HTML5 Canvas editor with multiple tools, undo/redo, and export functionality",
    ],
    tech: ["TypeScript", "Next.js", "Supabase", "Tailwind CSS"],
    github: "https://github.com/j9shah/lumina",
    demo: "https://lumina.vercel.app",
    devpost: null,
  },
  {
    id: "skincare-recommender",
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
    id: "newsnest",
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

export const socials = {
  email: "j9shah@torontomu.ca",
  linkedin: "https://linkedin.com/in/j9shah",
  github: "https://github.com/j9shah",
};
