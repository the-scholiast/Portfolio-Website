import React from 'react';
import './App.css';
import { personalInfo } from './data';
import NavigationButton from './components/NavigationButton';
import CardModal from './components/CardModal';
import BinderPage from './components/BinderPage';
import { useNavigation } from './hooks/useNavigation';
import { useModal } from './hooks/useModal';
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
    selectedCard, 
    isModalOpen, 
    handleCardClick, 
    handleCloseModal 
  } = useModal();

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
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 p-8">
      {/* Navigation - Always visible above binder */}
      <div className="flex gap-4 flex-wrap justify-center mb-8">
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
            className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-full font-semibold transition-all duration-200 hover:-translate-y-1"
          >
            📖 Cover
          </button>
        )}
      </div>

      {/* Main Content Container */}
      <div className="relative">

        {/* Binder */}
        <div className="bg-gradient-to-br from-amber-800 to-amber-900 p-8 rounded-3xl shadow-2xl relative border-4 border-amber-700">
          {/* Binder rings */}
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 space-y-8">
            {[1, 2, 3, 4].map((ring) => (
              <div key={ring} className="w-6 h-12 bg-gray-600 rounded-full shadow-inner border-2 border-gray-500"></div>
            ))}
          </div>

          {/* Page Container */}
          <div className="ml-8 relative" style={{ width: '800px', height: '600px' }}>
            {/* 3D Page with flip effect */}
            <div className={`
              relative w-full h-full transition-transform duration-700 transform-style-preserve-3d
              ${isFlipping ? 'animate-pageFlip' : ''}
            `}>

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
                  <BinderPage
                    cards={currentPageCards}
                    onCardClick={handleCardClick}
                    isFlipping={isFlipping}
                  />
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

          {/* Page Navigation */}
          {currentCategory && totalPages > 1 && (
            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex items-center gap-3 bg-amber-100 bg-opacity-95 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg z-10 border border-amber-300">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 0 || isFlipping}
                className="px-3 py-1 bg-amber-600 hover:bg-amber-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-full font-semibold transition-colors text-xs"
              >
                ← Prev
              </button>
              
              <span className="text-amber-800 font-bold text-xs">
                Page {currentPage + 1} of {totalPages}
              </span>
              
              <button
                onClick={handleNextPage}
                disabled={currentPage >= totalPages - 1 || isFlipping}
                className="px-3 py-1 bg-amber-600 hover:bg-amber-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-full font-semibold transition-colors text-xs"
              >
                Next →
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Card Detail Modal */}
      <CardModal
        isOpen={isModalOpen}
        card={selectedCard}
        currentCategory={currentCategory}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default App;