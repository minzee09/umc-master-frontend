import Banner from './components/Banner';
import InterestsAndCategories from './components/Categories';
import QuizBox from './components/QuizBox';
import SearchSection from '../../components/SearchBar/SearchSection';
import TipsSection from './components/TipsSection';
import { useQuizStore } from '@store/quizStore';

const MainPage: React.FC = () => {
  const { isQuizVisible } = useQuizStore();

  return (
    <>
      <>
        <Banner />
        {isQuizVisible && <QuizBox />}
        <SearchSection frontText="궁금한" highlight="키워드" backText="를 검색해보세요!" marginTop="60px" />
        <InterestsAndCategories />
        <TipsSection title="이 주의 꿀팁 BEST 5" showLikes defaultSort="likes" />
        <TipsSection title="실시간 꿀팁" showArrows showLikes={false} defaultSort="latest" />
        <TipsSection title="오늘의 꿀팁" showArrows defaultSort="likes" />
      </>
    </>
  );
};

export default MainPage;
