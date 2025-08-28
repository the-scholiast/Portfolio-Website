import { Project } from '../types/types';

export const projects: Project[] = [
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