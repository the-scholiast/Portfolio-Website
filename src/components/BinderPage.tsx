import React from 'react';
import CardComponent from './Card';
import type { Card } from '../types/types';

interface BinderPageProps {
  cards: Card[];
  onCardClick: (card: Card) => void;
  isFlipping: boolean;
}

const BinderPage: React.FC<BinderPageProps> = ({ 
  cards, 
  onCardClick, 
  isFlipping 
}) => {
  return (
    <div className="h-full p-4">
      {/* Card Binder Page - 3x2 grid with card slots */}
      <div className="h-full bg-gray-50 rounded-xl p-6 shadow-inner border-2 border-gray-300">
        <div className={`grid grid-cols-3 grid-rows-2 gap-6 h-full ${isFlipping ? 'opacity-50' : ''}`}>
          {/* Render cards and empty slots */}
          {Array.from({ length: 6 }).map((_, index) => {
            const card = cards[index] || null;
            return (
              <CardComponent
                key={index}
                card={card}
                index={index}
                onClick={onCardClick}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BinderPage;