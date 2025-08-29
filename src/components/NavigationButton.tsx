import React from 'react';
import type { Category } from '../types/types';

interface NavigationButtonProps {
  category: Category;
  label: string;
  isActive: boolean;
  onClick: (category: Category) => void;
}

const NavigationButton: React.FC<NavigationButtonProps> = ({
  category,
  label,
  isActive,
  onClick
}) => {
  return (
    <button
      onClick={() => onClick(category)}
      className={`px-6 py-3 border-2 rounded-full text-white text-base cursor-pointer transition-all duration-300 backdrop-blur-sm hover:-translate-y-0.5 hover:shadow-lg ${
        isActive
          ? 'bg-white bg-opacity-40 border-white border-opacity-60'
          : 'bg-white bg-opacity-20 border-white border-opacity-30 hover:bg-white hover:bg-opacity-30'
      }`}
    >
      {label}
    </button>
  );
};

export default NavigationButton;