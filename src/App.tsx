import React, { useMemo, useState } from 'react';
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
  } = useNavigation();
  const {
    currentPage,
    resetPage,
    getCurrentPageCards,
    getTotalPages,
    handleNextPage,
    handlePrevPage
  } = usePageState();
  const [emailCopied, setEmailCopied] = useState(false);
  const { getCurrentCards } = useCardData(currentCategory, resetPage);

  // Get cards for current page
  const allCards = getCurrentCards;
  const currentPageCards = getCurrentPageCards(allCards);
  const totalPages = getTotalPages(allCards.length);

  const cachedProfileImage = useMemo(() => personalInfo.profilePicture, []);

  const handleEmailCopy = async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.email);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 3000);
    } catch (error) {
      console.error('Failed to copy email:', error);
      alert(`Email: ${personalInfo.email}`);
    }
  };

  const handleResumeDownload = () => {
    const link = document.createElement('a');
    link.href = '/assets/resume.pdf';
    link.download = 'Woojin_Song_resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen wooden-desk-bg main-app-container">
      <div className=" sticky top-0 z-50 py-4">
        <div className="flex gap-3 md:gap-6 lg:gap-6 flex-wrap justify-center items-center">
          {/* Poker chip inline with navigation */}
          <div className="flex-shrink-0">
            <img
              src={personalInfo.pokerChip}
              alt={`Poker chip rotating`}
              className="w-18 h-18 md:w-24 md:h-24 lg:w-32 lg:h-32 animate-spinHorizontal"
            />
          </div>

          {/* Navigation buttons */}
          <div className="flex gap-3 md:gap-4 lg:gap-6 flex-wrap justify-center">
            {navigationItems.map(item => (
              <NavigationButton
                key={item.category}
                category={item.category}
                label={item.label}
                isActive={currentCategory === item.category}
                onClick={handleCategoryClick}
              />
            ))}
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex justify-center pb-8">
        {/* Binder */}
        <div className="bg-gradient-to-br from-gray-900 via-black to-gray-800 p-6 md:p-8 lg:p-10 rounded-3xl shadow-2xl relative border-4 border-gray-700 binder-shadow binder-container">
          {/* Binder rings */}
          {currentCategory !== 'home' && (
            <div className="absolute left-2 md:left-3 lg:left-5 top-0 flex flex-col gap-8 py-8 md:py-12 lg:py-16 h-full justify-between">
              {[1, 2, 3].map((ring) => (
                <div
                  key={ring}
                  className="w-8 h-16 md:w-10 md:h-[130px] lg:w-12 lg:h-[160px] bg-gray-700 rounded-full shadow-inner border-2 border-gray-300 ring-shadow"
                ></div>
              ))}
            </div>
          )}

          {/* Page Container */}
          <div className="ml-6 md:ml-8 lg:ml-12 relative binder-page h-full">
            {/* 3D Page with flip effect */}
            <div className={`
              relative w-full h-full transition-transform duration-700 transform-style-preserve-3d
              ${isFlipping ? 'animate-pageFlip' : ''}
            `}>

              {/* Front Page */}
              <div className="backface-hidden bg-gray-300 rounded-2xl shadow-xl p-1 h-full">
                {currentCategory === 'home' ? (
                  /* Cover Page */
                  <div className="h-full text-center p-4 home-content-container flex flex-col justify-center">
                    {/* Header */}
                    <div className="text-white font-black text-2xl md:text-4xl lg:text-5xl xl:text-6xl tracking-wider drop-shadow-lg relative z-10 mb-8"
                      style={{
                        fontFamily: 'Impact, "Arial Black", sans-serif',
                        textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                        fontSize: 'clamp(2rem, 5.5vw, 6.5rem)'
                      }}>
                      {personalInfo.header}
                    </div>

                    {/* Profile and name section */}
                    <div className="flex flex-row justify-center items-center text-center p-6 gap-6 md:gap-8 mb-8">
                      {/* Profile Picture */}
                      <div>
                        <img
                          src={cachedProfileImage}
                          alt={`${personalInfo.name} profile`}
                          className="w-28 md:w-36 lg:w-[220px] rounded-xl border-4 border-gray-600 shadow-lg object-cover"
                          style={{ maxWidth: '100%', height: 'auto' }}
                        />
                      </div>

                      {/* Name and Title Cards */}
                      <div className="flex flex-col items-center gap-4">
                        {/* Name Card */}
                        <div className="bg-gradient-to-r from-yellow-600 to-yellow-500 p-4 rounded-xl border-4 border-yellow-700 shadow-2xl relative">
                          <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none"></div>
                          <h1 className="text-white font-black text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-wider drop-shadow-lg relative z-10"
                            style={{
                              fontFamily: 'Impact, "Arial Black", sans-serif',
                              textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                              fontSize: 'clamp(1.5rem, 3.5vw, 3rem)'
                            }}>
                            {personalInfo.name}
                          </h1>
                        </div>

                        {/* Title Card */}
                        <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-3 rounded-lg border-3 border-blue-700 shadow-xl relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-transparent pointer-events-none"></div>
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-300 opacity-60"></div>
                          <div className="absolute right-0 top-0 bottom-0 w-1 bg-blue-300 opacity-60"></div>
                          <h2 className="text-white font-bold text-xl md:text-2xl lg:text-3xl xl:text-4xl tracking-wide drop-shadow-md relative z-10"
                            style={{
                              fontFamily: 'Trebuchet MS, Arial, sans-serif',
                              textShadow: '1px 1px 3px rgba(0,0,0,0.4)',
                              fontSize: 'clamp(1rem, 2.5vw, 2.5rem)'
                            }}>
                            {personalInfo.title}
                          </h2>
                        </div>
                      </div>
                    </div>

                    {/* Personal Description */}
                    <div className="max-w-2xl mb-8 mx-auto">
                      <p className="text-gray-700 text-base md:text-lg lg:text-xl leading-relaxed"
                        style={{
                          fontSize: 'clamp(0.875rem, 3vw, 1.25rem)'
                        }}>
                        {personalInfo.description}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 md:gap-6 mb-8 justify-center">
                      <button
                        onClick={handleEmailCopy}
                        className="px-6 py-3 md:px-8 md:py-4 lg:px-10 lg:py-5 bg-green-600 hover:bg-green-700 text-white rounded-full font-semibold transition-all duration-200 hover:-translate-y-1 text-base md:text-lg lg:text-xl"
                        style={{
                          fontSize: 'clamp(0.75rem, 2.5vw, 1.25rem)'
                        }}
                      >
                        {emailCopied ? '✓ Copied!' : 'Copy Email'}
                      </button>
                      <button
                        onClick={handleResumeDownload}
                        className="px-6 py-3 md:px-8 md:py-4 lg:px-10 lg:py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold transition-all duration-200 hover:-translate-y-1 text-base md:text-lg lg:text-xl"
                        style={{
                          fontSize: 'clamp(0.75rem, 2.5vw, 1.25rem)'
                        }}
                      >
                        Download Resume
                      </button>
                    </div>

                    {/* Bottom text */}
                    <div className="pb-8">
                      <p className="text-gray-500 text-base md:text-lg lg:text-xl"
                        style={{
                          fontSize: 'clamp(0.75rem, 2.5vw, 1.25rem)'
                        }}>
                        👆 Select a category above to flip through pages
                      </p>
                    </div>
                  </div>
                ) : (
                  /* Category Content Pages */
                  <div className="h-full">
                    <BinderPage
                      cards={currentPageCards}
                      currentCategory={currentCategory}
                      isFlipping={isFlipping}
                    />
                  </div>
                )}
              </div>

              {/* Back Page */}
              <div className="absolute inset-0 backface-hidden rotate-y-180 bg-gray-200 rounded-2xl shadow-xl p-8 min-h-full">
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
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-3 bg-gray-800 bg-opacity-95 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg z-10 border border-gray-600">
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