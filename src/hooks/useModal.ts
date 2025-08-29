import { useState } from 'react';
import type { Card } from '../types/types';

/**
 * Custom hook for managing modal state and card selection
 * Handles opening/closing modals and tracking which card is selected
 */
export const useModal = () => {
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (card: Card) => {
    setSelectedCard(card);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCard(null);
  };

  return {
    selectedCard,
    isModalOpen,
    handleCardClick,
    handleCloseModal,
  };
};