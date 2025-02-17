import axiosInstance from './axios-instance';

export const sendChatMessage = async (question: string) => {
  try {
    console.log('Chat API 요청 전송:', question); // 요청 전 로그

    const response = await axiosInstance.post('/chat', { question });

    console.log('Chat API 응답 수신:', response.data); // 응답 로그
    return response.data;
  } catch (error) {
    console.error('API 호출 오류:', error); // 오류 로그
    return { answer: '죄송합니다. 오류가 발생했습니다. 다시 시도해주세요!' };
  }
};
