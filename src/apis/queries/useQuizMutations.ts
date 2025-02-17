import { useMutation } from '@tanstack/react-query';
import { submitQuizAnswer } from '@apis/quizApi';

// useMutation 훅 정의
export const usePostQuizAnswer = () => {
  return useMutation({
    mutationFn: ({ quizId, isCorrect }: { quizId: number; isCorrect: boolean }) => submitQuizAnswer(quizId, isCorrect),
    onError: (error) => {
      console.error('퀴즈 답변 제출 실패:', error);
    },
    onSuccess: (data) => {
      console.log('퀴즈 답변 제출 성공:', data);
    },
  });
};
