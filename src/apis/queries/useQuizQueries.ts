import { fetchQuizData, QuizResponse } from '@apis/quizApi';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

export const useQuizList = (): UseQueryResult<QuizResponse, Error> => {
  return useQuery<QuizResponse, Error>({
    queryKey: ['quiz'],
    queryFn: fetchQuizData,
    refetchOnWindowFocus: false,
  });
};
