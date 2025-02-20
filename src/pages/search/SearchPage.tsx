import SearchSection from '@components/SearchBar/SearchSection';
import { useSearchParams } from 'react-router-dom';
import RecommendTitle from './components/RecommendTitle';
import TipsSection from '@pages/main/components/TipsSection';

const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const hashtagsParam = searchParams.get('hashtags');
  const tags = hashtagsParam?.split(',').filter((tag) => tag.trim()) || [];

  const handleSearch = (value: string) => {
    setSearchParams({ query: value, page: '1' });
  };

  return (
    <>
      <SearchSection
        highlight={`'${query || (tags && '선택한 태그') || '검색어'}'`}
        backText="에 대한 좋아요순 검색 결과입니다"
        onSearch={handleSearch}
        marginTop="80px"
      />
      <TipsSection showLikes={false} query={query} tags={tags} isSearchSection defaultSort="likes" />

      <RecommendTitle title={query || (tags && `선택한 태그`) || '검색어'} />
      <TipsSection
        query={query}
        tags={tags}
        isBigCard
        showLikes={false}
        isSearchSection
        defaultSort="saves"
        isMoreLimit
      />
    </>
  );
};

export default SearchPage;
