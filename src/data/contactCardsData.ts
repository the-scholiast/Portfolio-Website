import { Card } from '../types/types';
import { personalInfo } from './personalData';

export const contactCards: Card[] = [
  {
    id: "contact-1",
    title: "Email",
    content: personalInfo.email,
    icon: "📧"
  },
  {
    id: "contact-2",
    title: "Phone",
    content: personalInfo.phone,
    icon: "📱"
  },
  {
    id: "contact-3",
    title: "Location",
    content: personalInfo.location,
    icon: "📍"
  },
  {
    id: "contact-4",
    title: "LinkedIn",
    content: personalInfo.linkedin,
    icon: "💼"
  }
];