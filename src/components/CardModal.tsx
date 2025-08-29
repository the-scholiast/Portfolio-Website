import React from 'react';
import type { Card, Category } from '../types/types';

interface CardModalProps {
  isOpen: boolean;
  card: Card | null;
  currentCategory: Category | null;
  onClose: () => void;
}

const CardModal: React.FC<CardModalProps> = ({ 
  isOpen, 
  card, 
  currentCategory, 
  onClose 
}) => {
  // Don't render anything if modal is not open or no card is selected
  if (!isOpen || !card) return null;

  // Handle clicking outside modal to close it
  const handleOverlayClick = (e: React.MouseEvent) => {
    // Only close if clicking the overlay, not the modal content
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Stop propagation when clicking inside modal
  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fadeIn"
      onClick={handleOverlayClick}
    >
      <div
        className="bg-gradient-to-b from-yellow-100 to-yellow-50 rounded-2xl border-4 border-yellow-600 max-w-md w-full shadow-2xl animate-modalSlideIn overflow-hidden flex flex-col"
        style={{ height: 'min(90vh, 600px)', maxHeight: '600px' }}
        onClick={handleModalClick}
      >
        {/* Card Header */}
        <div className="bg-gradient-to-r from-yellow-600 to-yellow-500 p-3 border-b-2 border-yellow-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{card.icon}</span>
              <h2 className="text-white font-bold text-lg leading-tight">{card.title}</h2>
            </div>
            <button
              onClick={onClose}
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
            <div className="text-6xl opacity-80">{card.icon}</div>
          </div>

          {/* Card Type/Level Bar */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-3 py-1 rounded mb-3 text-center">
            <span className="font-bold text-sm">
              {currentCategory === 'projects' ? 'PROJECT CARD' :
                currentCategory === 'about me' ? 'PROFILE CARD' :
                  currentCategory === 'skills' ? 'SKILL CARD' :
                    'CONTACT CARD'}
            </span>
          </div>

          {/* Skills-specific stats */}
          {currentCategory === 'skills' && card.proficiency && (
            <div className="bg-gradient-to-r from-purple-600 to-purple-500 text-white p-2 rounded mb-3">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold">PROFICIENCY LEVEL:</span>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`text-lg ${star <= (card.proficiency || 0) ? 
                        'text-yellow-300' : 'text-gray-400'}`}
                    >
                      ⭐
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Description/Content - Scrollable */}
          <div className="flex-1 overflow-y-auto bg-white border border-gray-200 rounded p-3 mb-3">
            <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
              {card.content}
            </p>
          </div>

          {/* Technologies */}
          {card.technologies && card.technologies.length > 0 && (
            <div className="mb-3">
              <div className="text-xs font-bold text-gray-600 mb-1">TECHNOLOGIES:</div>
              <div className="flex flex-wrap gap-1">
                {card.technologies.map((tech, index) => (
                  <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action buttons for projects */}
          {currentCategory === 'projects' && (
            <div className="flex gap-2 mt-auto">
              {card.githubUrl && (
                <a
                  href={card.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-gray-800 hover:bg-gray-900 text-white py-2 px-3 rounded text-center text-xs font-bold transition-colors no-underline"
                >
                  📁 GitHub
                </a>
              )}
              {card.liveUrl && (
                <a
                  href={card.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-3 rounded text-center text-xs font-bold transition-colors no-underline"
                >
                  🚀 Live Demo
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardModal;