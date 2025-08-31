import React from 'react';
import type { DetailedCardProps } from '../types/types';
import SkillsDetail from './SkillsDetail';
import AboutDetail from './aboutDetail';

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
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full min-h-[300px]">
      <div className="w-full h-full bg-gray-200 rounded-xl border-2 border-gray-300 shadow-inner relative overflow-hidden">
        {/* Inner slot shadow effect */}
        <div className="absolute inset-1 border border-gray-400 rounded-md opacity-30"></div>
        {/* Actual Card Content */}
        <div className="absolute inset-2 bg-gradient-to-b from-yellow-100 to-yellow-50 rounded-md shadow-lg border-2 border-yellow-600 overflow-hidden flex flex-col animate-cardSlideIn">

          {/* Card Header */}
          <div className="bg-gradient-to-r from-yellow-600 to-yellow-500 p-2 border-b-2 border-yellow-700 flex-shrink-0">
            <div className="flex items-center gap-2 text-lg">
              <span className="">{card.icon}</span>
              <h2 className="text-white font-bold leading-tight truncate flex-1">{card.title}</h2>
            </div>
          </div>

          {/* Card Body */}
          <div className="p-2 flex flex-col flex-1 min-h-0">

            {/* Card Type/Level Bar */}
            {card.type && (
              <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-2 py-1 rounded mb-2 text-center flex-shrink-0">
                <span className="font-bold text-xs">
                  {card.type}
                </span>
              </div>
            )}

            {/* Skills-specific stats */}
            {currentCategory === 'skills' && (
              <SkillsDetail card={card} />
            )}

            {/* About me-specific stats */}
            {currentCategory === 'about me' && (
              <AboutDetail card={card} />
            )}

            {/* Description/Content - FLEXIBLE AND SCROLLABLE */}
            {card.content && (
              <div className="flex-1 overflow-y-auto bg-white border border-gray-200 rounded p-2 mb-2 min-h-0">
                <p className="text-gray-700 text-xs leading-relaxed">
                  {card.content}
                </p>
              </div>
            )}

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

            {/* Action buttons */}
            {currentCategory === 'projects' && (card.githubUrl || card.liveUrl) && (
              <div className="flex gap-1 flex-shrink-0">
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
      </div>
    </div>
  );
};

export default DetailedCard;