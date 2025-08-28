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
    <div className="app">
      {!isBinderOpen ? (
        <div className="binder-cover">
          <div className="cover-content">
            <h1>{personalInfo.name}</h1>
            <h2>{personalInfo.title}</h2>
            <div className="cover-info">
              <p>{personalInfo.email}</p>
              <p>{personalInfo.location}</p>
            </div>
            <div className="cover-actions">
              <a
                href={`mailto:${personalInfo.email}`}
                className="email-btn"
              >
                Email Me
              </a>
              <a
                href="/resume.pdf"
                download="Resume.pdf"
                className="download-btn"
              >
                Download Resume
              </a>
            </div>
          </div>
          <nav className="navigation">
            <button onClick={() => handleCategoryClick('about')}>About Me</button>
            <button onClick={() => handleCategoryClick('projects')}>Projects</button>
            <button onClick={() => handleCategoryClick('contact')}>Contact</button>
          </nav>
        </div>
      ) : (
        <div className="binder-open">
          <div className="binder-header">
            <h2>{currentCategory?.charAt(0).toUpperCase()}{currentCategory?.slice(1)}</h2>
            <button className="close-btn" onClick={handleCloseBinder}>×</button>
          </div>

          <div className="cards-container">
            <div className="cards-grid">
              {currentCards.map((card, index) => (
                <div key={card.id} className="card" style={{ animationDelay: `${index * 0.1}s` }}>
                  <h3>{card.title}</h3>
                  <div className="card-content">
                    {card.content.split('\n').map((line, i) => (
                      <p key={i}>{line}</p>
                    ))}
                    {card.technologies && (
                      <div className="technologies">
                        {card.technologies.map((tech: string) => (
                          <span key={tech} className="tech-tag">{tech}</span>
                        ))}
                      </div>
                    )}
                    {card.githubUrl && (
                      <div className="card-links">
                        {card.githubUrl && (
                          <a href={card.githubUrl} target="_blank" rel="noopener noreferrer">
                            GitHub
                          </a>
                        )}
                        {card.liveUrl && (
                          <a href={card.liveUrl} target="_blank" rel="noopener noreferrer">
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
            <div className="pagination">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 0}
                className="page-btn"
              >
                ← Previous
              </button>
              <span className="page-info">
                Page {currentPage + 1} of {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages - 1}
                className="page-btn"
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