import { useState } from 'react';
import type { Category } from '../types/types';

/**
 * Custom hook for managing navigation state and category switching
 * Handles the logic for switching between different portfolio categories
 */
export const useNavigation = () => {
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [isFlipping, setIsFlipping] = useState(false);

  const navigationItems = [
    { category: 'about me' as const, label: 'About Me' },
    { category: 'projects' as const, label: 'Projects' },
    { category: 'skills' as const, label: 'Skills' },
    { category: 'contact' as const, label: 'Contact' },
  ];

  const handleCategoryClick = (category: Category) => {
    if (currentCategory === category) return;
    
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentCategory(category);
      setIsFlipping(false);
    }, 300);
  };

  const handleBackToCover = () => {
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentCategory(null);
      setIsFlipping(false);
    }, 300);
  };

  return {
    currentCategory,
    isFlipping,
    navigationItems,
    handleCategoryClick,
    handleBackToCover,
  };
};