import React, { useState } from 'react';
import './App.css';

// Types
interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
}

interface Card {
  id: string;
  title: string;
  content: string;
  technologies?: string[];
  githubUrl?: string;
  liveUrl?: string;
}

interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
}

// Sample Data
const personalInfo: PersonalInfo = {
  name: "Your Name",
  title: "Full Stack Developer",
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

const aboutCards = [
  {
    id: "about-1",
    title: "About Me",
    content: "Passionate full-stack developer with 3+ years of experience creating engaging web applications. I love turning complex problems into simple, beautiful solutions."
  },
  {
    id: "about-2",
    title: "Skills",
    content: "Frontend: React, TypeScript, HTML/CSS, JavaScript\nBackend: Node.js, Python, MongoDB, PostgreSQL\nTools: Git, Docker, AWS, Figma"
  },
  {
    id: "about-3",
    title: "Experience",
    content: "Currently working as a Full Stack Developer at Tech Company, previously interned at Startup Inc. Always eager to learn new technologies and take on challenging projects."
  }
];

type Category = 'about' | 'projects' | 'contact';

const App: React.FC = () => {
  const [isBinderOpen, setIsBinderOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [currentPage, setCurrentPage] = useState(0);

  const handleCategoryClick = (category: Category) => {
    setCurrentCategory(category);
    setCurrentPage(0);
    setIsBinderOpen(true);
  };

  const handleCloseBinder = () => {
    setIsBinderOpen(false);
    setCurrentCategory(null);
    setCurrentPage(0);
  };

  const getCurrentCards = (): Card[] => {
    switch (currentCategory) {
      case 'about':
        return aboutCards;
      case 'projects':
        return projects.map(project => ({
          id: project.id,
          title: project.title,
          content: project.description,
          technologies: project.technologies,
          githubUrl: project.githubUrl,
          liveUrl: project.liveUrl
        }));
      case 'contact':
        return [{
          id: 'contact',
          title: 'Get In Touch',
          content: `Email: ${personalInfo.email}\nPhone: ${personalInfo.phone}\nLocation: ${personalInfo.location}\nLinkedIn: ${personalInfo.linkedin}\nGitHub: ${personalInfo.github}`
        }];
      default:
        return [];
    }
  };

  const cards = getCurrentCards();
  const cardsPerPage = 6;
  const totalPages = Math.ceil(cards.length / cardsPerPage);
  const currentCards = cards.slice(currentPage * cardsPerPage, (currentPage + 1) * cardsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 font-sans">
      {!isBinderOpen ? (
        <div className="flex flex-col justify-center items-center min-h-screen p-8 bg-gradient-to-br from-amber-800 to-amber-700 rounded-3xl m-8 shadow-2xl relative overflow-hidden">
          {/* Binder holes effect */}
          <div className="absolute top-0 left-12 w-2.5 h-full bg-gradient-to-b from-gray-600 via-gray-600 to-transparent" 
               style={{
                 background: 'repeating-linear-gradient(to bottom, #444 0px, #444 20px, transparent 20px, transparent 40px)'
               }}>
          </div>

          <div className="text-center text-white z-10">
            <h1 className="text-5xl mb-2 drop-shadow-lg">{personalInfo.name}</h1>
            <h2 className="text-2xl mb-8 text-gray-200 font-light">{personalInfo.title}</h2>
            
            <div className="mb-8">
              <p className="my-2 text-lg">{personalInfo.email}</p>
              <p className="my-2 text-lg">{personalInfo.phone}</p>
              <p className="my-2 text-lg">{personalInfo.location}</p>
            </div>

            <div className="my-8 flex gap-4 flex-wrap justify-center">
              <a href={`mailto:${personalInfo.email}`} 
                 className="px-6 py-3 bg-green-500 text-white rounded-full text-base cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg no-underline inline-block">
                Email
              </a>
              <button className="px-6 py-3 bg-blue-500 text-white rounded-full text-base cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg">
                Download Resume
              </button>
            </div>

            <div className="absolute bottom-8 flex gap-4 flex-wrap justify-center">
              <button 
                onClick={() => handleCategoryClick('about')}
                className="px-6 py-3 bg-white bg-opacity-20 border-2 border-white border-opacity-30 rounded-full text-white text-base cursor-pointer transition-all duration-300 backdrop-blur-sm hover:bg-white hover:bg-opacity-30 hover:-translate-y-0.5"
              >
                About Me
              </button>
              <button 
                onClick={() => handleCategoryClick('projects')}
                className="px-6 py-3 bg-white bg-opacity-20 border-2 border-white border-opacity-30 rounded-full text-white text-base cursor-pointer transition-all duration-300 backdrop-blur-sm hover:bg-white hover:bg-opacity-30 hover:-translate-y-0.5"
              >
                Projects
              </button>
              <button 
                onClick={() => handleCategoryClick('contact')}
                className="px-6 py-3 bg-white bg-opacity-20 border-2 border-white border-opacity-30 rounded-full text-white text-base cursor-pointer transition-all duration-300 backdrop-blur-sm hover:bg-white hover:bg-opacity-30 hover:-translate-y-0.5"
              >
                Contact
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-screen p-8 bg-gray-100 animate-binderOpen">
          <div className="flex justify-between items-center mb-8 p-4 bg-white rounded-xl shadow-lg">
            <h2 className="m-0 text-gray-800 text-3xl capitalize">{currentCategory}</h2>
            <button 
              onClick={handleCloseBinder}
              className="bg-red-500 border-none text-white w-10 h-10 rounded-full text-xl cursor-pointer flex items-center justify-center transition-all duration-200 hover:bg-red-600 hover:scale-110"
            >
              ×
            </button>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-xl min-h-[60vh]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
              {currentCards.map((card, index) => (
                <div 
                  key={card.id} 
                  className="bg-gradient-to-br from-white to-gray-100 rounded-2xl p-6 shadow-lg transition-all duration-300 opacity-0 translate-y-5 animate-cardSlideIn hover:-translate-y-1 hover:shadow-xl"
                  style={{
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  <div className="h-full flex flex-col">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">{card.title}</h3>
                    <p className="text-gray-600 flex-grow leading-relaxed whitespace-pre-line mb-4">
                      {card.content}
                    </p>
                    
                    {card.technologies && (
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Technologies:</h4>
                        <div className="flex flex-wrap gap-2">
                          {card.technologies.map((tech, techIndex) => (
                            <span key={techIndex} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {(card.githubUrl || card.liveUrl) && (
                      <div className="flex gap-3 mt-auto">
                        {card.githubUrl && (
                          <a 
                            href={card.githubUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-gray-800 text-white rounded-lg text-sm transition-all duration-200 hover:bg-gray-700 hover:-translate-y-0.5 no-underline"
                          >
                            GitHub
                          </a>
                        )}
                        {card.liveUrl && (
                          <a 
                            href={card.liveUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm transition-all duration-200 hover:bg-blue-600 hover:-translate-y-0.5 no-underline"
                          >
                            Live Demo
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-8">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 0}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg transition-all duration-200 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                ← Previous
              </button>
              <span className="text-gray-700 font-medium">
                Page {currentPage + 1} of {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages - 1}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg transition-all duration-200 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Next →
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;