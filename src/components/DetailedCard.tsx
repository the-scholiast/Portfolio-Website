import React from 'react';
import type { Card, Category } from '../types/types';

interface DetailedCardProps {
  card: Card | null;
  currentCategory: Category | null;
  index: number;
}

const DetailedCard: React.FC<DetailedCardProps> = ({
  card,
  currentCategory,
  index
}) => {
  // Render card back if no card
  if (!card) {
    return (
      <div className="relative h-full min-h-[300px]">
        {/* Card Slot */}
        <div className="w-full h-full bg-gray-200 rounded-xl border-2 border-gray-300 shadow-inner relative overflow-hidden">
          {/* Inner slot shadow effect */}
          <div className="absolute inset-1 border border-gray-400 rounded-md opacity-30"></div>

          {/* Card Back */}
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
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-yellow-100 to-yellow-50 rounded-xl border-4 border-yellow-600 shadow-lg overflow-hidden flex flex-col h-full min-h-[300px] animate-cardSlideIn">
      {/* Card Header */}
      <div className="bg-gradient-to-r from-yellow-600 to-yellow-500 p-2 border-b-2 border-yellow-700 flex-shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-lg">{card.icon}</span>
          <h2 className="text-white font-bold text-sm leading-tight truncate flex-1">{card.title}</h2>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-3 flex flex-col h-full flex-1 min-h-0">


        {/* Card Type/Level Bar */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-2 py-1 rounded mb-2 text-center flex-shrink-0">
          <span className="font-bold text-xs">
            {currentCategory === 'projects' ? 'PROJECT' :
              currentCategory === 'about me' ? 'PROFILE' :
                currentCategory === 'skills' ? 'SKILL' :
                  'CONTACT'}
          </span>
        </div>

        {/* Skills-specific stats */}
        {currentCategory === 'skills' && card.proficiency && (
          <div className="bg-gradient-to-r from-purple-600 to-purple-500 text-white p-1 rounded mb-2 flex-shrink-0">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold">LEVEL:</span>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`text-xs ${star <= (card.proficiency || 0) ?
                      'text-yellow-300' : 'text-gray-400'}`}
                  >
                    ⭐
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Description/Content - Scrollable and flexible */}
        <div className="flex-1 overflow-y-auto bg-white border border-gray-200 rounded p-2 mb-2 min-h-0">
          <p className="text-gray-700 text-xs leading-relaxed">
            {card.content}
          </p>
        </div>

        {/* Technologies */}
        {card.technologies && card.technologies.length > 0 && (
          <div className="mb-2 flex-shrink-0">
            <div className="text-xs font-bold text-gray-600 mb-1">TECH:</div>
            <div className="flex flex-wrap gap-1">
              {card.technologies.map((tech, techIndex) => (
                <span key={techIndex} className="px-1 py-0.5 bg-blue-100 text-blue-800 rounded text-xs font-medium">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Action buttons for projects */}
        {currentCategory === 'projects' && (card.githubUrl || card.liveUrl) && (
          <div className="flex gap-1 mt-auto flex-shrink-0">
            {card.githubUrl && (
              <a
                href={card.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-gray-800 hover:bg-gray-900 text-white py-1 px-2 rounded text-center text-xs font-bold transition-colors no-underline"
              >
                📁 Code
              </a>
            )}
            {card.liveUrl && (
              <a
                href={card.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-1 px-2 rounded text-center text-xs font-bold transition-colors no-underline"
              >
                🚀 Demo
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailedCard;