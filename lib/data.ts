export const personalInfo = {
  name: "Jainam Shah",
  title: "CS Undergraduate",
  bio: "CS student at TMU. Into cybersecurity and machine learning.",
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
    description: "ML-powered malware detection system using BERT for static analysis of executable files.",
    features: [
      "BERT-based static analysis of PE files",
      "Real-time threat classification",
      "Web interface for file scanning",
    ],
    tech: ["Python", "Flask", "PyTorch", "BERT", "JavaScript"],
    github: "https://github.com/j9shah/algoware",
    demo: null,
    devpost: null,
  },
  {
    id: "citco",
    name: "Citco",
    description: "Research analysis tool examining the relationship between researcher citation counts and NSERC Discovery Grant funding.",
    features: [
      "Data scraping from NSERC + Google Scholar",
      "Interactive dashboards and visualizations",
      "Statistical analysis (Pearson correlation ~0.3)",
    ],
    tech: ["Python", "Flask", "Pandas", "NumPy", "Matplotlib", "BeautifulSoup"],
    github: "https://github.com/j9shah/citco",
    demo: null,
    devpost: null,
  },
  {
    id: "lumina",
    name: "Lumina",
    description: "AI-powered study assistant that generates flashcards and quizzes from uploaded documents.",
    features: [
      "Document parsing and content extraction",
      "AI-generated flashcards and quizzes",
      "Progress tracking and spaced repetition",
    ],
    tech: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS"],
    github: "https://github.com/j9shah/lumina",
    demo: "https://lumina.vercel.app",
    devpost: null,
  },
  {
    id: "skincare-recommender",
    name: "Skincare Recommender",
    description: "Graph-based recommendation system using custom algorithms to suggest products based on user preferences.",
    features: [
      "Graph-based recommendation engine",
      "Interactive GUI for filtering",
      "Dataset of 8000+ product reviews",
    ],
    tech: ["Python", "Tkinter", "NetworkX"],
    github: "https://github.com/j9shah/Skincare-Recommender",
    demo: null,
    devpost: null,
  },
  {
    id: "newsnest",
    name: "NewsNest",
    description: "News aggregation platform with personalized feeds and sentiment analysis.",
    features: [
      "Personalized news feed curation",
      "Sentiment analysis on articles",
      "Category-based filtering",
    ],
    tech: ["React", "Node.js", "Express", "MongoDB"],
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
