import Banner from './components/Banner';
import InterestsAndCategories from './components/Categories';
import QuizBox from './components/QuizBox';
import SearchSection from '../../components/SearchBar/SearchSection';
import TipsSection from './components/TipsSection';
import { useQuizStore } from '@store/quizStore';
import ChatBotIcon from '@assets/icons/chatbot.svg?react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '@store/userStore';
import { useEffect } from 'react';

const MainPage: React.FC = () => {
  const { isQuizVisible } = useQuizStore();
  const { user, fetchUser } = useUserStore();
  const navigate = useNavigate();
  const handleClickBot = () => {
    navigate(`/chat`);
    window.scroll(0, 0);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (!user?.hashtags) {
    return null; // 또는 로딩 컴포넌트 표시
  }

  return (
    <>
      <>
        <Banner />
        {isQuizVisible && <QuizBox />}
        <SearchSection frontText="궁금한" highlight="키워드" backText="를 검색해보세요!" marginTop="60px" />
        <InterestsAndCategories userHashtags={user?.hashtags} />
        <FixedChatbotWrapper>
          <ChatBotIcon onClick={handleClickBot} />
        </FixedChatbotWrapper>
        <TipsSection title="이 주의 꿀팁 BEST 5" showLikes defaultSort="likes" timeFilter="7days" />
        <TipsSection title="실시간 꿀팁" showArrows showLikes={false} defaultSort="latest" timeFilter="24h" />
        <TipsSection
          tags={user?.hashtags}
          title={`${user?.nickname} 님의 관심사`}
          showArrows
          defaultSort="likes"
          isSearchSection
        />
      </>
    </>
  );
};

export default MainPage;

const FixedChatbotWrapper = styled.div`
  position: fixed;
  right: 80px;
  bottom: 40px;
  cursor: pointer;
`;
