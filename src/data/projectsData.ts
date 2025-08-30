import { Card } from '../types/types';

export const projectsCards: Card[] = [
  {
    id: "project-1",
    title: "Scholiast",
    type: "Team Academic",
    content: "Scholiast is an AI-powered web application that transforms your study materials into interactive quizzes, flashcards, and concise summaries, enhancing your learning experience and tracking your progress.",
    technologies: ["React", "Next.js", "Express.js", "MongoDB", "Tailwind"],
    githubUrl: "https://github.com/the-scholiast/Scholiast",
    liveUrl: "https://scholiast.webios.link/",
    icon: "🚀",
  },
  {
    id: "project-2",
    title: "NoPlanNoFuture",
    type: "Duo Personal",
    content: "A full-stack application that combines task management, calendar planning, and workout tracking in one unified platform.",
    technologies: ["React", "TypeScript", "Next.js", "Express.js", "Supabase", "PostSQL", "Tailwind"],
    githubUrl: "https://github.com/the-scholiast/NoPlanNoFuture",
    liveUrl: "https://no-plan-no-future.vercel.app/",
    icon: "🚀",
  },
];