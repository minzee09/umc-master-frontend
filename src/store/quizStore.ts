import { create } from 'zustand';

interface QuizStore {
  isQuizVisible: boolean;
  showQuiz: () => void;
  hideQuiz: () => void;
}

export const useQuizStore = create<QuizStore>((set) => ({
  isQuizVisible: true,
  showQuiz: () => set({ isQuizVisible: true }),
  hideQuiz: () => set({ isQuizVisible: false }),
}));
