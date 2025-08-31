import React from 'react';
import DetailedCard from './DetailedCard';
import type { Card, Category } from '../types/types';

interface BinderPageProps {
  cards: Card[];
  currentCategory: Category | null;
  isFlipping: boolean;
}

const BinderPage: React.FC<BinderPageProps> = ({ 
  cards, 
  currentCategory,
  isFlipping 
}) => {
  return (
    <div className="h-full p-4">
      {/* Card Binder Page */}
      <div className="h-full bg-gray-50 rounded-xl p-6 shadow-inner border-2 border-gray-300">
        <div className={`grid grid-cols-3 grid-rows-2 gap-4 h-full ${isFlipping ? 'opacity-50' : ''}`}>
          {/* Render detailed cards and empty slots */}
          {Array.from({ length: 6 }).map((_, index) => {
            const card = cards[index] || null;
            return (
              <DetailedCard
                key={index}
                card={card}
                currentCategory={currentCategory}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BinderPage;