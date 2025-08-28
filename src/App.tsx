import React, { useState } from 'react';
import './App.css';
import type { Category, Card } from './types/types';
import { personalInfo, projects, aboutCards, contactCards, skillsCards } from './data';

const App: React.FC = () => {
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [isFlipping, setIsFlipping] = useState(false);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

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
          liveUrl: project.liveUrl,
          icon: "🚀"
        }));
      case 'skills':
        return skillsCards;
      case 'contact':
        return contactCards;
      default:
        return [];
    }
  };

  const getCurrentPageCards = (): Card[] => {
    const allCards = getCurrentCards();
    const cardsPerPage = 6; // 3x2 grid
    const startIndex = currentPage * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;
    return allCards.slice(startIndex, endIndex);
  };

  const getTotalPages = (): number => {
    const totalCards = getCurrentCards().length;
    return Math.ceil(totalCards / 6);
  };

  const handleCategoryClick = (category: Category) => {
    if (category === currentCategory) return;

    setCurrentPage(0); // Reset to first page when switching categories
    setIsFlipping(true);

    // After flip animation completes, show new content
    setTimeout(() => {
      setCurrentCategory(category);
      setIsFlipping(false);
    }, 600); // Match the CSS animation duration
  };

  const handleBackToCover = () => {
    setCurrentPage(0);
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentCategory(null);
      setIsFlipping(false);
    }, 600);
  };

  const handleNextPage = () => {
    const totalPages = getTotalPages();
    if (currentPage < totalPages - 1) {
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage(currentPage + 1);
        setIsFlipping(false);
      }, 600);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage(currentPage - 1);
        setIsFlipping(false);
      }, 600);
    }
  };

  const handleCardClick = (card: Card) => {
    setSelectedCard(card);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCard(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 font-sans flex flex-col items-center justify-center p-8">

      {/* Navigation - Always visible above binder */}
      <div className="flex gap-4 flex-wrap justify-center mb-8">
        {/* Category Navigation */}
        <button
          onClick={() => handleCategoryClick('about')}
          className={`px-6 py-3 border-2 rounded-full text-white text-base cursor-pointer transition-all duration-300 backdrop-blur-sm hover:-translate-y-0.5 hover:shadow-lg ${currentCategory === 'about'
              ? 'bg-white bg-opacity-40 border-white border-opacity-60'
              : 'bg-white bg-opacity-20 border-white border-opacity-30 hover:bg-white hover:bg-opacity-30'
            }`}
        >
          About Me
        </button>
        <button
          onClick={() => handleCategoryClick('projects')}
          className={`px-6 py-3 border-2 rounded-full text-white text-base cursor-pointer transition-all duration-300 backdrop-blur-sm hover:-translate-y-0.5 hover:shadow-lg ${currentCategory === 'projects'
              ? 'bg-white bg-opacity-40 border-white border-opacity-60'
              : 'bg-white bg-opacity-20 border-white border-opacity-30 hover:bg-white hover:bg-opacity-30'
            }`}
        >
          Projects
        </button>
        <button
          onClick={() => handleCategoryClick('skills')}
          className={`px-6 py-3 border-2 rounded-full text-white text-base cursor-pointer transition-all duration-300 backdrop-blur-sm hover:-translate-y-0.5 hover:shadow-lg ${currentCategory === 'skills'
              ? 'bg-white bg-opacity-40 border-white border-opacity-60'
              : 'bg-white bg-opacity-20 border-white border-opacity-30 hover:bg-white hover:bg-opacity-30'
            }`}
        >
          Skills
        </button>
        <button
          onClick={() => handleCategoryClick('contact')}
          className={`px-6 py-3 border-2 rounded-full text-white text-base cursor-pointer transition-all duration-300 backdrop-blur-sm hover:-translate-y-0.5 hover:shadow-lg ${currentCategory === 'contact'
              ? 'bg-white bg-opacity-40 border-white border-opacity-60'
              : 'bg-white bg-opacity-20 border-white border-opacity-30 hover:bg-white hover:bg-opacity-30'
            }`}
        >
          Contact
        </button>

        {/* Back to Cover Button - Only show when inside a category */}
        {currentCategory && (
          <>
            <div className="w-px bg-white bg-opacity-30 mx-2"></div>
            <button
              onClick={handleBackToCover}
              className="px-6 py-3 bg-amber-600 hover:bg-amber-700 border-2 border-amber-500 rounded-full text-white text-base cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            >
              ← Back to Cover
            </button>
          </>
        )}

        {/* Page Navigation - Only show when there are multiple pages */}
        {currentCategory && getTotalPages() > 1 && (
          <>
            <div className="w-px bg-white bg-opacity-30 mx-2"></div>
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 0}
              className="px-4 py-3 bg-white bg-opacity-20 border-2 border-white border-opacity-30 rounded-full text-white text-base cursor-pointer transition-all duration-300 backdrop-blur-sm hover:bg-white hover:bg-opacity-30 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none"
            >
              ← Prev
            </button>
            <span className="px-4 py-3 bg-white bg-opacity-30 border-2 border-white border-opacity-50 rounded-full text-white text-base backdrop-blur-sm">
              {currentPage + 1} / {getTotalPages()}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === getTotalPages() - 1}
              className="px-4 py-3 bg-white bg-opacity-20 border-2 border-white border-opacity-30 rounded-full text-white text-base cursor-pointer transition-all duration-300 backdrop-blur-sm hover:bg-white hover:bg-opacity-30 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none"
            >
              Next →
            </button>
          </>
        )}
      </div>

      {/* Binder Container - Fixed size */}
      <div className="relative w-full max-w-5xl h-[800px] perspective-1000">

        {/* Binder Base */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900 via-amber-800 to-amber-700 rounded-3xl shadow-2xl">

          {/* Binder rings on the left */}
          <div className="absolute top-0 left-8 w-4 h-full flex flex-col justify-evenly py-12">
            <div className="w-8 h-12 bg-gray-600 rounded-full shadow-inner border-2 border-gray-700"></div>
            <div className="w-8 h-12 bg-gray-600 rounded-full shadow-inner border-2 border-gray-700"></div>
            <div className="w-8 h-12 bg-gray-600 rounded-full shadow-inner border-2 border-gray-700"></div>
            <div className="w-8 h-12 bg-gray-600 rounded-full shadow-inner border-2 border-gray-700"></div>
          </div>

          {/* Page Content Container */}
          <div className="absolute inset-0 ml-20 mr-8 my-8">

            {/* Page Flip Animation Container */}
            <div className={`relative w-full h-full transition-transform duration-600 transform-style-preserve-3d ${isFlipping ? 'animate-pageFlip' : ''
              }`}>

              {/* Front Page (Cover or Current Content) */}
              <div className="absolute inset-0 backface-hidden bg-white rounded-2xl shadow-xl p-1">

                {currentCategory === null ? (
                  /* Cover Page */
                  <div className="flex flex-col justify-center items-center h-full text-center">
                    <h1 className="text-6xl font-bold text-gray-800 mb-4">{personalInfo.name}</h1>
                    <h2 className="text-3xl text-gray-600 mb-8">{personalInfo.title}</h2>
                    <div className="space-y-3 text-gray-700 text-xl mb-8">
                      <p>{personalInfo.email}</p>
                      <p>{personalInfo.phone}</p>
                      <p>{personalInfo.location}</p>
                    </div>
                    <div className="flex gap-6">
                      <a href={`mailto:${personalInfo.email}`}
                        className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-full font-semibold transition-all duration-200 hover:-translate-y-1 no-underline">
                        Email Me
                      </a>
                      <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold transition-all duration-200 hover:-translate-y-1">
                        Download Resume
                      </button>
                    </div>
                    <p className="mt-8 text-gray-500 text-lg">👆 Select a category above to flip through pages</p>
                  </div>
                ) : (
                  /* Category Content Page */
                  <div className="h-full p-4">
                    {/* Card Binder Page - 3x2 grid with card slots */}
                    <div className="h-full bg-gray-50 rounded-xl p-6 shadow-inner border-2 border-gray-300">
                      <div className="grid grid-cols-3 grid-rows-2 gap-6 h-full">
                        {/* Render cards and empty slots */}
                        {Array.from({ length: 6 }).map((_, index) => {
                          const card = getCurrentPageCards()[index];
                          return (
                            <div key={index} className="relative">
                              {/* Card Slot (always present) */}
                              <div className="w-full h-full bg-gray-200 rounded-lg border-2 border-gray-300 shadow-inner relative overflow-hidden">
                                {/* Inner slot shadow effect */}
                                <div className="absolute inset-1 border border-gray-400 rounded-md opacity-30"></div>

                                {card ? (
                                  /* Actual Card */
                                  <div
                                    onClick={() => handleCardClick(card)}
                                    className="absolute inset-2 bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-md shadow-lg border border-gray-300 cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 group opacity-0 animate-cardSlideIn"
                                    style={{
                                      animationDelay: `${index * 0.1}s`,
                                    }}
                                  >
                                    <div className="h-full p-3 flex flex-col items-center text-center justify-between">
                                      {/* Card Icon */}
                                      <div className="text-2xl mb-1 group-hover:scale-110 transition-transform duration-300">
                                        {card.icon}
                                      </div>

                                      {/* Card Title */}
                                      <h3 className="text-xs font-bold text-gray-800 mb-1 group-hover:text-blue-600 transition-colors leading-tight">
                                        {card.title}
                                      </h3>

                                      {/* Card Description */}
                                      <p className="text-xs text-gray-600 flex-1 leading-tight mb-1 overflow-hidden">
                                        {card.content.substring(0, 50)}...
                                      </p>

                                      {/* Technology Tags */}
                                      {card.technologies && card.technologies.length > 0 && (
                                        <div className="mb-1 flex flex-wrap gap-1 justify-center">
                                          {card.technologies.slice(0, 2).map((tech, techIndex) => (
                                            <span key={techIndex} className="px-1 py-0.5 bg-blue-100 text-blue-800 rounded text-xs font-medium">
                                              {tech}
                                            </span>
                                          ))}
                                          {card.technologies.length > 2 && (
                                            <span className="px-1 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                                              +{card.technologies.length - 2}
                                            </span>
                                          )}
                                        </div>
                                      )}

                                      {/* Click hint */}
                                      <div className="text-xs text-blue-500 font-medium group-hover:text-blue-700 transition-colors">
                                        Details
                                      </div>
                                    </div>
                                  </div>
                                ) : (
                                  /* Empty Card Slot - Back of Card */
                                  <div className="absolute inset-2 bg-gradient-to-br from-blue-800 to-blue-900 rounded-md shadow-lg border border-blue-700">
                                    <div className="h-full w-full relative overflow-hidden">
                                      {/* Card back pattern */}
                                      <div className="absolute inset-0 opacity-20">
                                        <div className="h-full w-full" style={{
                                          backgroundImage: `repeating-linear-gradient(
                                            45deg,
                                            transparent,
                                            transparent 10px,
                                            rgba(255,255,255,0.1) 10px,
                                            rgba(255,255,255,0.1) 20px
                                          )`
                                        }}></div>
                                      </div>

                                      {/* Center logo/text */}
                                      <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="text-center">
                                          <div className="text-white text-xs font-bold mb-1 opacity-80">PORTFOLIO</div>
                                          <div className="text-white text-xs opacity-60">COLLECTION</div>
                                        </div>
                                      </div>

                                      {/* Corner decorative elements */}
                                      <div className="absolute top-1 left-1 w-3 h-3 border-l-2 border-t-2 border-white opacity-30"></div>
                                      <div className="absolute top-1 right-1 w-3 h-3 border-r-2 border-t-2 border-white opacity-30"></div>
                                      <div className="absolute bottom-1 left-1 w-3 h-3 border-l-2 border-b-2 border-white opacity-30"></div>
                                      <div className="absolute bottom-1 right-1 w-3 h-3 border-r-2 border-b-2 border-white opacity-30"></div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Back Page (for flip effect) */}
              <div className="absolute inset-0 backface-hidden rotate-y-180 bg-gray-100 rounded-2xl shadow-xl p-8">
                <div className="flex items-center justify-center h-full">
                  <div className="text-center text-gray-400">
                    <div className="text-6xl mb-4">📖</div>
                    <p className="text-xl">Flipping page...</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Card Detail Modal - Yu-Gi-Oh Style */}
      {isModalOpen && selectedCard && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fadeIn"
          onClick={handleCloseModal}
        >
          <div
            className="bg-gradient-to-b from-yellow-100 to-yellow-50 rounded-2xl border-4 border-yellow-600 max-w-md w-full shadow-2xl animate-modalSlideIn overflow-hidden flex flex-col"
            style={{ height: 'min(90vh, 600px)', maxHeight: '600px' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Card Header */}
            <div className="bg-gradient-to-r from-yellow-600 to-yellow-500 p-3 border-b-2 border-yellow-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{selectedCard.icon}</span>
                  <h2 className="text-white font-bold text-lg leading-tight">{selectedCard.title}</h2>
                </div>
                <button
                  onClick={handleCloseModal}
                  className="text-white hover:text-yellow-200 text-xl font-bold transition-colors bg-yellow-700 hover:bg-yellow-800 w-6 h-6 rounded-full flex items-center justify-center"
                >
                  ×
                </button>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-4 flex flex-col h-full">
              {/* Card Image/Icon Section */}
              <div className="bg-white border-2 border-gray-300 rounded-lg p-6 mb-3 flex items-center justify-center shadow-inner">
                <div className="text-6xl opacity-80">{selectedCard.icon}</div>
              </div>

              {/* Card Type/Level Bar */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-3 py-1 rounded mb-3 text-center">
                <span className="font-bold text-sm">
                  {currentCategory === 'projects' ? 'PROJECT CARD' :
                    currentCategory === 'about' ? 'PROFILE CARD' :
                      currentCategory === 'skills' ? 'SKILL CARD' :
                        'CONTACT CARD'}
                </span>
              </div>

              {/* Skills-specific stats */}
              {currentCategory === 'skills' && selectedCard.proficiency && (
                <div className="bg-gradient-to-r from-purple-600 to-purple-500 text-white p-2 rounded mb-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold">PROFICIENCY LEVEL:</span>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          className={`text-lg ${star <= (selectedCard.proficiency || 0) ? 'text-yellow-300' : 'text-gray-400'}`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>EXPERIENCE: {selectedCard.yearsOfExperience}+ YEARS</span>
                    <span className={`font-bold px-2 py-1 rounded ${selectedCard.status === 'mastered' ? 'bg-green-600' :
                        selectedCard.status === 'learning' ? 'bg-yellow-600' :
                          'bg-blue-600'
                      }`}>
                      {selectedCard.status?.toUpperCase()}
                    </span>
                  </div>
                </div>
              )}

              {/* Description Box */}
              <div className="bg-white border-2 border-gray-400 rounded-lg p-3 mb-3 flex-grow">
                <div className="bg-gray-50 border border-gray-300 rounded p-2 h-full overflow-y-auto">
                  <p className="text-gray-800 text-sm leading-relaxed whitespace-pre-line">
                    {selectedCard.content}
                  </p>
                </div>
              </div>

              {/* Technology Stats */}
              {selectedCard.technologies && selectedCard.technologies.length > 0 && (
                <div className="bg-gradient-to-r from-red-600 to-red-500 text-white p-2 rounded mb-3">
                  <div className="text-xs font-bold mb-1">TECH STACK:</div>
                  <div className="flex flex-wrap gap-1">
                    {selectedCard.technologies.map((tech, index) => (
                      <span key={index} className="bg-white text-red-600 px-2 py-1 rounded text-xs font-bold">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              {(selectedCard.githubUrl || selectedCard.liveUrl) && (
                <div className="flex gap-2">
                  {selectedCard.githubUrl && (
                    <a
                      href={selectedCard.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-gray-800 text-white py-2 px-3 rounded text-center text-sm font-bold transition-all duration-200 hover:bg-gray-700 no-underline"
                    >
                      GitHub
                    </a>
                  )}
                  {selectedCard.liveUrl && (
                    <a
                      href={selectedCard.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-blue-600 text-white py-2 px-3 rounded text-center text-sm font-bold transition-all duration-200 hover:bg-blue-700 no-underline"
                    >
                      Live Demo
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* Card Footer */}
            <div className="bg-gradient-to-r from-yellow-600 to-yellow-500 p-2 text-center">
              <div className="text-white text-xs font-bold">
                © {new Date().getFullYear()} PORTFOLIO COLLECTION
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;