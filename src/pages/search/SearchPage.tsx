import SearchSection from '@components/SearchBar/SearchSection';
import TipsSection from '@pages/main/components/TipsSection';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import RecommendTitle from './components/RecommendTitle';
import RecommendedTipsSection from './components/RecommendTipsSection';
import dummyImage from '@assets/dummyImage/dummy.jpeg';

const dummyData = [
  {
    image: dummyImage,
    text: '따뜻한 감성이 담긴 방꾸미기',
    likes: 1200,
    bookmarks: 800,
    date: '2025.01.20',
  },
  {
    image: dummyImage,
    text: '여행을 떠나는 방법',
    likes: 450,
    bookmarks: 300,
    date: '2025.01.15',
  },
  {
    image: dummyImage,
    text: '화사한 인테리어의 비밀',
    likes: 980,
    bookmarks: 670,
    date: '2025.01.18',
  },
  {
    image: dummyImage,
    text: '북유럽 감성으로 꾸민 침실',
    likes: 1300,
    bookmarks: 950,
    date: '2025.01.12',
  },
  {
    image: dummyImage,
    text: '오늘의 추천 인테리어 팁',
    likes: 890,
    bookmarks: 430,
    date: '2025.01.10',
  },
  {
    image: dummyImage,
    text: '화사한 인테리어의 비밀',
    likes: 980,
    bookmarks: 670,
    date: '2025.01.18',
  },
  {
    image: dummyImage,
    text: '북유럽 감성으로 꾸민 침실',
    likes: 1300,
    bookmarks: 950,
    date: '2025.01.12',
  },
  {
    image: dummyImage,
    text: '오늘의 추천 인테리어 팁',
    likes: 890,
    bookmarks: 430,
    date: '2025.01.10',
  },
];

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState<string>(searchParams.get('query') || '');

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  return (
    <>
      <SearchSection
        highlight={`'${searchValue || '검색어'}'`}
        backText="에 대한 검색 결과입니다."
        onSearch={handleSearch}
        marginTop="80px"
      />
      <TipsSection showLikes={false} />
      <RecommendTitle title={searchValue} />
      <RecommendedTipsSection items={dummyData.slice(0, 8)} />
    </>
  );
};

export default SearchPage;
