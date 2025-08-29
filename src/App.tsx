import React from 'react';
import './App.css';
import { personalInfo } from './data';
import NavigationButton from './components/NavigationButton';
import BinderPage from './components/BinderPage';
import { useNavigation } from './hooks/useNavigation';
import { usePageState } from './hooks/usePageState';
import { useCardData } from './hooks/useCardData';

const App: React.FC = () => {
  const { 
    currentCategory, 
    isFlipping, 
    navigationItems, 
    handleCategoryClick, 
    handleBackToCover 
  } = useNavigation();

  const { 
    currentPage, 
    resetPage, 
    getCurrentPageCards, 
    getTotalPages, 
    handleNextPage, 
    handlePrevPage 
  } = usePageState();

  const { getCurrentCards } = useCardData(currentCategory, resetPage);

  // Get cards for current page
  const allCards = getCurrentCards;
  const currentPageCards = getCurrentPageCards(allCards);
  const totalPages = getTotalPages(allCards.length);

  return (
    <div className="min-h-screen flex flex-col wooden-desk-bg p-8">
      {/* Navigation */}
      <div className="flex gap-3 md:gap-4 lg:gap-6 flex-wrap justify-center mb-6 md:mb-8">
        {navigationItems.map(item => (
          <NavigationButton
            key={item.category}
            category={item.category}
            label={item.label}
            isActive={currentCategory === item.category}
            onClick={handleCategoryClick}
          />
        ))}
        
        {currentCategory && (
          <button
            onClick={handleBackToCover}
            className="px-5 py-2 md:px-6 md:py-3 lg:px-8 lg:py-4 bg-gray-600 hover:bg-gray-700 text-white rounded-full font-semibold transition-all duration-200 hover:-translate-y-1 text-sm md:text-base lg:text-lg"
          >
            📖 Cover
          </button>
        )}
      </div>

      {/* Main Content Container */}
      <div className="flex-1 flex items-center justify-center">
        {/* Binder */}
        <div className="bg-gradient-to-br from-gray-900 via-black to-gray-800 p-6 md:p-8 lg:p-10 rounded-3xl shadow-2xl relative border-4 border-gray-700 binder-shadow">
          {/* Binder rings */}
          <div className="absolute left-3 md:left-4 lg:left-6 top-1/2 transform -translate-y-1/2 space-y-6 md:space-y-8 lg:space-y-10">
            {[1, 2, 3, 4, 5, 6, 7].map((ring) => (
              <div key={ring} className="w-5 h-10 md:w-6 md:h-12 lg:w-7 lg:h-14 bg-gray-700 rounded-full shadow-inner border-2 border-gray-300"></div>
            ))}
          </div>

          {/* Page Container */}
          <div className="ml-6 md:ml-8 lg:ml-12 relative binder-page">
            {/* 3D Page with flip effect */}
            <div className={`
              relative w-full h-full transition-transform duration-700 transform-style-preserve-3d
              ${isFlipping ? 'animate-pageFlip' : ''}
            `}>

              {/* Front Page (Cover or Current Content) */}
              <div className="absolute inset-0 backface-hidden bg-gray-300 rounded-2xl shadow-xl p-1">

                {currentCategory === null ? (
                  /* Cover Page */
                  <div className="flex flex-col justify-center items-center h-full text-center p-4">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-gray-800 mb-4">{personalInfo.name}</h1>
                    <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-gray-600 mb-6 md:mb-8">{personalInfo.title}</h2>
                    <div className="space-y-2 md:space-y-3 text-gray-700 text-lg md:text-xl lg:text-2xl xl:text-3xl mb-6 md:mb-8">
                      <p>{personalInfo.email}</p>
                      <p>{personalInfo.phone}</p>
                      <p>{personalInfo.location}</p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
                      <a href={`mailto:${personalInfo.email}`}
                        className="px-6 py-3 md:px-8 md:py-4 lg:px-10 lg:py-5 bg-green-600 hover:bg-green-700 text-white rounded-full font-semibold transition-all duration-200 hover:-translate-y-1 no-underline text-base md:text-lg lg:text-xl">
                        Email Me
                      </a>
                      <button className="px-6 py-3 md:px-8 md:py-4 lg:px-10 lg:py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold transition-all duration-200 hover:-translate-y-1 text-base md:text-lg lg:text-xl">
                        Download Resume
                      </button>
                    </div>
                    <p className="mt-6 md:mt-8 text-gray-500 text-base md:text-lg lg:text-xl">👆 Select a category above to flip through pages</p>
                  </div>
                ) : (
                  /* Category Content Page - Now with detailed cards */
                  <BinderPage
                    cards={currentPageCards}
                    currentCategory={currentCategory}
                    isFlipping={isFlipping}
                  />
                )}
              </div>

              {/* Back Page (for flip effect) */}
              <div className="absolute inset-0 backface-hidden rotate-y-180 bg-gray-200 rounded-2xl shadow-xl p-8">
                <div className="flex items-center justify-center h-full">
                  <div className="text-center text-gray-400">
                    <div className="text-6xl mb-4">📖</div>
                    <p className="text-xl">Flipping page...</p>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Page Navigation */}
          {currentCategory && totalPages > 1 && (
            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex items-center gap-3 bg-gray-800 bg-opacity-95 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg z-10 border border-gray-600">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 0 || isFlipping}
                className="px-3 py-1 bg-gray-600 hover:bg-gray-500 disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded-full font-semibold transition-colors text-xs"
              >
                ← Prev
              </button>
              
              <span className="text-gray-200 font-bold text-xs">
                Page {currentPage + 1} of {totalPages}
              </span>
              
              <button
                onClick={handleNextPage}
                disabled={currentPage >= totalPages - 1 || isFlipping}
                className="px-3 py-1 bg-gray-600 hover:bg-gray-500 disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded-full font-semibold transition-colors text-xs"
              >
                Next →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;