import { useState } from 'react';
import type { Category } from '../types/types';

/**
 * Custom hook for managing navigation state and category switching
 * Handles the logic for switching between different portfolio categories
 */
export const useNavigation = () => {
  const [currentCategory, setCurrentCategory] = useState<Category | null>('home');
  const [isFlipping, setIsFlipping] = useState(false);

  const navigationItems = [
    { category: 'home' as const, label: 'Home' },
    { category: 'projects' as const, label: 'Projects' },
    { category: 'skills' as const, label: 'Skills' },
    { category: 'about me' as const, label: 'About Me' },
  ];

  const handleCategoryClick = (category: Category) => {
    if (currentCategory === category) return;

    setIsFlipping(true);
    setTimeout(() => {
      setCurrentCategory(category);
      setIsFlipping(false);
    }, 500);
  };

  const handleBackToCover = () => {
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentCategory('home');
      setIsFlipping(false);
    }, 500);
  };

  return {
    currentCategory,
    isFlipping,
    navigationItems,
    handleCategoryClick,
    handleBackToCover,
  };
};