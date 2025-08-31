import { useMemo, useEffect } from 'react';
import type { Category, Card } from '../types/types';
import { projectsCards, aboutCards, contactCards, skillsCards } from '../data';

/**
 * Custom hook for managing card data based on current category
 * Handles filtering and transforming data for display
 */
export const useCardData = (currentCategory: Category | null, resetPage: () => void) => {
  // Get all cards for the current category
  const getCurrentCards = useMemo((): Card[] => {
    switch (currentCategory) {
      case 'about me':
        return aboutCards;
      case 'projects':
        return projectsCards;
      case 'skills':
        return skillsCards;
      case 'home':
        return [];
      default:
        return [];
    }
  }, [currentCategory]);

  // Reset page when category changes
  useEffect(() => {
    resetPage();
  }, [currentCategory, resetPage]);

  return {
    getCurrentCards,
  };
};