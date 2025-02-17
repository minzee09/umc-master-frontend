import { useState, useEffect } from 'react';
import styled from 'styled-components';
import theme from '@styles/theme';
import Typography from '@components/common/typography';
import SearchInput from './components/SearchInput';
import ButtonList from './components/ButtonList';
import Sidebar from './components/Sidebar';
import { updateChat } from '@apis/queries/useChatMutations';
import ChatbotIcon from '@assets/icons/chatbot.svg?react';

const buttonTexts = ['꿀팁 검색 관련', '정책 관련', '챌린지 관련', '서비스 이용 관련'];
const questions = [
  '홈마스터의 꿀팁 관련해서 알려줘.',
  '홈마스터의 정책 관련해서 알려줘.',
  '홈마스터의 챌린지 관련해서 알려줘.',
  '홈마스터의 전반적인 서비스 이용 관련해서 알려줘.',
];

const ChatPage: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [chatRooms, setChatRooms] = useState<{ id: number; history: { question: string; answer: string }[] }[]>([]);
  const [currentRoomId, setCurrentRoomId] = useState<number | null>(null);
  const [pendingQuestion, setPendingQuestion] = useState<string | null>(null);

  const createNewChatRoom = () => {
    const newRoomId = chatRooms.length + 1;
    setChatRooms((prevRooms) => [...prevRooms, { id: newRoomId, history: [] }]);
    setCurrentRoomId(newRoomId);
  };

  useEffect(() => {
    if (currentRoomId !== null && pendingQuestion !== null) {
      addQuestionToHistory(pendingQuestion);
      askQuestion(pendingQuestion);
      setPendingQuestion(null);
    }
  }, [currentRoomId]);

  const updateChatHistory = (answer: string) => {
    if (currentRoomId !== null) {
      setChatRooms((prevRooms) =>
        prevRooms.map((room) =>
          room.id === currentRoomId
            ? {
                ...room,
                history: [...room.history.slice(0, -1), { ...room.history[room.history.length - 1], answer }],
              }
            : room
        )
      );
    }
  };

  const { askQuestion } = updateChat(updateChatHistory);

  const handleStartChat = (index: number) => {
    const question = questions[index];

    if (currentRoomId === null) {
      createNewChatRoom();
      setPendingQuestion(question);
    } else {
      addQuestionToHistory(question);
      askQuestion(question);
    }
  };

  const addQuestionToHistory = (question: string) => {
    if (currentRoomId !== null) {
      setChatRooms((prevRooms) =>
        prevRooms.map((room) =>
          room.id === currentRoomId ? { ...room, history: [...room.history, { question, answer: '' }] } : room
        )
      );
    }
  };

  const handleSend = () => {
    if (inputValue.trim()) {
      if (currentRoomId === null) createNewChatRoom();
      addQuestionToHistory(inputValue);
      askQuestion(inputValue);
      setInputValue('');
    }
  };

  const currentChatHistory = chatRooms.find((room) => room.id === currentRoomId)?.history || [];

  return (
    <PageWrapper>
      <Sidebar
        onToggle={setIsSidebarOpen}
        chatRooms={chatRooms}
        setCurrentRoomId={setCurrentRoomId}
        createNewChatRoom={createNewChatRoom}
      />
      <ContentWrapper $isSidebarOpen={isSidebarOpen}>
        {currentRoomId === null || currentChatHistory.length === 0 ? (
          <WelcomeSection>
            <Typography variant="headingXSmall" style={{ color: theme.colors.primary[800] }}>
              무엇을 도와드릴까요?
            </Typography>
            <SearchInput inputValue={inputValue} setInputValue={setInputValue} onSend={handleSend} />
            <ButtonList buttonTexts={buttonTexts} onButtonClick={handleStartChat} />
          </WelcomeSection>
        ) : (
          <ChatSection>
            <ChatWindow>
              {currentChatHistory.map((chat, index) => (
                <ChatBubble key={index}>
                  <UserMessage>
                    <MessageText>{chat.question}</MessageText>
                  </UserMessage>
                  <BotMessage>
                    <ChatbotIconWrapper>
                      <ChatbotIcon width={60} height={60} />
                    </ChatbotIconWrapper>
                    <MessageText>{chat.answer || '...'}</MessageText>
                  </BotMessage>
                </ChatBubble>
              ))}
            </ChatWindow>
            <SearchInputWrapper>
              <SearchInput inputValue={inputValue} setInputValue={setInputValue} onSend={handleSend} />
            </SearchInputWrapper>
          </ChatSection>
        )}
      </ContentWrapper>
    </PageWrapper>
  );
};

export default ChatPage;

const PageWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 80vh;
  justify-content: center;
  background-color: #fff;
  overflow: hidden;
`;

const ContentWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== '$isSidebarOpen',
})<{ $isSidebarOpen: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  transition: margin-left 0.5s ease;
  margin-left: ${({ $isSidebarOpen }) => ($isSidebarOpen ? '250px' : '0')};
  max-width: 800px;
  box-sizing: border-box;
  padding: 20px;
`;

const WelcomeSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 20px;
`;

const ChatSection = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const ChatWindow = styled.div`
  flex: 1;
  padding: 20px;
  border-radius: 10px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const ChatBubble = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
`;

const UserMessage = styled.div`
  align-self: flex-end;
  background-color: ${({ theme }) => theme.colors.primary[600]};
  color: white;
  padding: 15px;
  border-radius: 20px 20px 0 20px;
  margin-bottom: 5px;
  max-width: 70%;
  display: inline-block;
`;

const ChatbotIconWrapper = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
`;

const BotMessage = styled.div`
  display: flex;
  align-items: flex-start;
  color: black;
  padding: 15px;
  max-width: 80%;
  gap: 10px;
`;

const MessageText = styled.div`
  font-size: 1rem;
  line-height: 1.4;
`;

const SearchInputWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0;
  background-color: white;
  position: relative;
`;
