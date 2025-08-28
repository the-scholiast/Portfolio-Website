import { Card, PersonalInfo, Project } from "../types/types";

const personalInfo: PersonalInfo = {
  name: "Woojin Song",
  title: "Junior Developer",
  email: "your.email@example.com",
  phone: "(555) 123-4567",
  location: "Your City, State",
  linkedin: "linkedin.com/in/yourname",
  github: "github.com/yourname"
};

const projects: Project[] = [
  {
    id: "1",
    title: "E-commerce Platform",
    description: "A full-featured e-commerce platform with cart functionality, user authentication, and payment processing.",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    githubUrl: "https://github.com/yourname/ecommerce",
    liveUrl: "https://your-ecommerce.com"
  },
  {
    id: "2",
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates and team features.",
    technologies: ["React", "TypeScript", "Firebase", "Material-UI"],
    githubUrl: "https://github.com/yourname/taskapp",
    liveUrl: "https://your-taskapp.com"
  },
  {
    id: "3",
    title: "Weather Dashboard",
    description: "A responsive weather dashboard with location-based forecasts and historical data visualization.",
    technologies: ["React", "D3.js", "OpenWeather API", "Tailwind"],
    githubUrl: "https://github.com/yourname/weather",
    liveUrl: "https://your-weather.com"
  },
  {
    id: "4",
    title: "Portfolio Website",
    description: "A creative portfolio website with card-based navigation and smooth animations.",
    technologies: ["React", "TypeScript", "CSS3", "Framer Motion"],
    githubUrl: "https://github.com/yourname/portfolio"
  }
];

const aboutCards: Card[] = [
  {
    id: "about-1",
    title: "About Me",
    content: "Passionate full-stack developer with 3+ years of experience creating engaging web applications.",
    icon: "👨‍💻"
  },
  {
    id: "about-2",
    title: "Skills",
    content: "Frontend: React, TypeScript, HTML/CSS, JavaScript\nBackend: Node.js, Python, MongoDB, PostgreSQL",
    icon: "⚡"
  },
  {
    id: "about-3",
    title: "Experience",
    content: "Currently working as a Full Stack Developer at Tech Company, previously interned at Startup Inc.",
    icon: "🎯"
  },
  {
    id: "about-4",
    title: "Education",
    content: "Computer Science degree with focus on web technologies. Always learning new skills.",
    icon: "🎓"
  }
];

const contactCards: Card[] = [
  {
    id: "contact-1",
    title: "Email",
    content: personalInfo.email,
    icon: "📧"
  },
  {
    id: "contact-2",
    title: "Phone",
    content: personalInfo.phone,
    icon: "📱"
  },
  {
    id: "contact-3",
    title: "Location",
    content: personalInfo.location,
    icon: "📍"
  },
  {
    id: "contact-4",
    title: "LinkedIn",
    content: personalInfo.linkedin,
    icon: "💼"
  }
];

const skillsCards: Card[] = [
  {
    id: "skill-1",
    title: "React",
    content: "Advanced proficiency in React development with hooks, context, and modern patterns. Built numerous production applications.",
    icon: "⚛️",
    proficiency: 5,
    yearsOfExperience: 3,
    status: "mastered"
  },
  {
    id: "skill-2", 
    title: "TypeScript",
    content: "Strong typing skills with advanced TypeScript features. Experience with complex type definitions and generic programming.",
    icon: "🔷",
    proficiency: 4,
    yearsOfExperience: 2.5,
    status: "mastered"
  },
  {
    id: "skill-3",
    title: "Node.js",
    content: "Backend development with Node.js, Express, and various frameworks. API design and server-side application architecture.",
    icon: "🟢",
    proficiency: 4,
    yearsOfExperience: 3,
    status: "mastered"
  },
  {
    id: "skill-4",
    title: "Python",
    content: "Versatile Python programming for web development, automation, and data processing. Django and Flask experience.",
    icon: "🐍",
    proficiency: 4,
    yearsOfExperience: 4,
    status: "mastered"
  },
  {
    id: "skill-5",
    title: "MongoDB",
    content: "NoSQL database design and optimization. Aggregation pipelines, indexing strategies, and schema design.",
    icon: "🍃",
    proficiency: 3,
    yearsOfExperience: 2,
    status: "learning"
  },
  {
    id: "skill-6",
    title: "PostgreSQL",
    content: "Relational database design, complex queries, and performance optimization. Advanced SQL and database administration.",
    icon: "🐘",
    proficiency: 3,
    yearsOfExperience: 2.5,
    status: "learning"
  },
  {
    id: "skill-7",
    title: "Docker",
    content: "Containerization and deployment strategies. Docker Compose, multi-stage builds, and orchestration basics.",
    icon: "🐳",
    proficiency: 3,
    yearsOfExperience: 1.5,
    status: "learning"
  },
  {
    id: "skill-8",
    title: "AWS",
    content: "Cloud infrastructure and services. EC2, S3, Lambda, and basic DevOps practices with AWS ecosystem.",
    icon: "☁️",
    proficiency: 2,
    yearsOfExperience: 1,
    status: "exploring"
  },
  {
    id: "skill-9",
    title: "GraphQL",
    content: "Modern API development with GraphQL. Schema design, resolvers, and integration with various frontend frameworks.",
    icon: "🔗",
    proficiency: 2,
    yearsOfExperience: 0.5,
    status: "exploring"
  }
];