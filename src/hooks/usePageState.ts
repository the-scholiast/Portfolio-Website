import { useState, useCallback } from 'react';
import type { Card } from '../types/types';

/**
 * Custom hook for managing pagination state and page navigation
 * Handles the logic for splitting cards into pages and navigating between them
 */
export const usePageState = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const CARDS_PER_PAGE = 6;

  // Reset to first page when cards change (e.g., switching categories)
  const resetPage = useCallback(() => {
    setCurrentPage(0);
  }, []);

  // Get the cards for the current page
  const getCurrentPageCards = useCallback((allCards: Card[]) => {
    const startIndex = currentPage * CARDS_PER_PAGE;
    const endIndex = startIndex + CARDS_PER_PAGE;
    return allCards.slice(startIndex, endIndex);
  }, [currentPage, CARDS_PER_PAGE]);

  // Calculate total number of pages needed
  const getTotalPages = useCallback((totalCards: number) => {
    return Math.max(1, Math.ceil(totalCards / CARDS_PER_PAGE));
  }, [CARDS_PER_PAGE]);

  // Navigation handlers
  const handleNextPage = useCallback(() => {
    setCurrentPage(prev => prev + 1);
  }, []);

  const handlePrevPage = useCallback(() => {
    setCurrentPage(prev => Math.max(0, prev - 1));
  }, []);

  return {
    currentPage,
    resetPage,
    getCurrentPageCards,
    getTotalPages,
    handleNextPage,
    handlePrevPage,
  };
};