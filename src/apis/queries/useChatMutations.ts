import { useMutation } from '@tanstack/react-query';
import { sendChatMessage } from '@apis/chatApi';

export const updateChat = (updateChatHistory: (answer: string) => void) => {
  const mutation = useMutation({
    mutationFn: sendChatMessage,
    onSuccess: (data) => simulateTypingEffect(data.answer),
    onError: () => {
      updateChatHistory('죄송합니다. 오류가 발생했습니다.');
    },
  });

  const simulateTypingEffect = (text: string) => {
    let index = 0;
    const interval = setInterval(() => {
      updateChatHistory(text.slice(0, index + 1));
      index++;
      if (index >= text.length) {
        clearInterval(interval);
      }
    }, 50);
  };

  const askQuestion = (question: string) => mutation.mutate(question);

  return { askQuestion };
};
