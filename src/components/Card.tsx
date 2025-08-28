import React from 'react';
import type { Card as CardType } from '../types/types';

interface CardProps {
  card: CardType | null; // Can be null for empty slots
  index: number; // For animation delay
  onClick: (card: CardType) => void; // Function to call when card is clicked
}

const Card: React.FC<CardProps> = ({ card, index, onClick }) => {
  return (
    <div className="relative">
      {/* Card Slot (always present) */}
      <div className="w-full h-full bg-gray-200 rounded-lg border-2 border-gray-300 shadow-inner relative overflow-hidden">
        {/* Inner slot shadow effect */}
        <div className="absolute inset-1 border border-gray-400 rounded-md opacity-30"></div>

        {card ? (
          /* Actual Card Content */
          <div
            onClick={() => onClick(card)}
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
};

export default Card;