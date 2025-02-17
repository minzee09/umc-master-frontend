import axiosInstance from './axios-instance';

export interface QuizData {
  id: number;
  question: string;
  answer: number;
  description: string;
}

export interface QuizResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    response: {
      number_of_quiz: number;
      quiz_list: QuizData[];
    };
  };
}

export interface SubmitQuizResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    message: string;
  };
}

export const fetchQuizData = async (): Promise<QuizResponse> => {
  const response = await axiosInstance.get<QuizResponse>('/quizzes');

  if (!response?.data || !response.data.result) {
    throw new Error('퀴즈 데이터가 없습니다.');
  }

  return response.data;
};

export const submitQuizAnswer = async (quizId: number, isCorrect: boolean): Promise<SubmitQuizResponse> => {
  const response = await axiosInstance.post<SubmitQuizResponse>(`/quizzes/${quizId}`, {
    isCorrect,
  });

  return response.data;
};
