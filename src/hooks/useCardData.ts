import { useMemo, useEffect } from 'react';
import type { Category, Card } from '../types/types';
import { projects, aboutCards, contactCards, skillsCards } from '../data';

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
        return projects.map(project => ({
          id: project.id,
          title: project.title,
          content: project.description,
          technologies: project.technologies,
          githubUrl: project.githubUrl,
          liveUrl: project.liveUrl,
          icon: "🚀"
        }));
      case 'skills':
        return skillsCards;
      case 'contact':
        return contactCards;
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