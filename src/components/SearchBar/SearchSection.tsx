/* eslint-disable react/prop-types */
import styled from 'styled-components';
import SearchTitle from './components/SearchTitle';
import SearchBar from './components/SearchBar';
import { useNavigate } from 'react-router-dom';
import SearchModal from '@components/Modal/search';
import { useState } from 'react';

interface SearchSectionProps {
  highlight?: string;
  frontText?: string;
  backText?: string;
  onSearch?: (value: string) => void;
  marginTop?: string;
}

const dummyCategories = [
  { section: '계절', tags: ['봄', '여름', '가을', '겨울'] },
  { section: '패션', tags: ['패션', '맨투맨', '니트', '바지', '치마', '블라우스', '자켓'] },
  { section: '청소', tags: ['청소', '방', '정리', '인테리어', '가구', '청소도구'] },
  {
    section: '요리 / 식재료',
    tags: ['요리', '음식', '보관', '냉장', '냉동', '면', '밥', '술', '반찬', '레시피', '냉장고'],
  },
  { section: '재활용 / 분리수거', tags: ['재활용', '분리수거', '리폼', '플라스틱', '스티로폼', '종이', '유리'] },
  { section: '주거', tags: ['주택', '원룸', '빌라', '아파트', '기숙사'] },
];

const SearchSection: React.FC<SearchSectionProps> = ({
  frontText,
  backText,
  highlight,
  onSearch,
  marginTop = '0px',
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const handleSearch = (value: string) => {
    if (onSearch) {
      onSearch(value);
    }
    navigate(`/search?${value}`);
  };

  return (
    <>
      <Container $marginTop={marginTop} onClick={() => setIsModalOpen(true)}>
        <SearchTitle frontText={frontText} highlight={highlight} backText={backText} />
        <SearchBar onSearch={handleSearch} />
      </Container>
      <SearchModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSearch={handleSearch}
        categories={dummyCategories}
      />
    </>
  );
};

export default SearchSection;

const Container = styled.section<{ $marginTop?: string }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 928px;
  height: 137px;
  margin: ${({ $marginTop }) => $marginTop || '0px'} auto 0 auto;
`;
