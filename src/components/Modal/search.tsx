import Typography from '@components/common/typography';
import ModalSearchBar from '@components/SearchBar/components/ModalSearchBar';

import CategoryInputSection from '@pages/main/components/CategoriesInputSection';
import React, { useState } from 'react';
import styled from 'styled-components';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (value: string) => void;
  categories: { section: string; tags: string[] }[];
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onSearch, categories }) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // 상태 초기화 함수
  const resetState = () => {
    setSelectedTags([]);
    setSearchQuery('');
  };

  // 모달 닫기 핸들러
  const handleClose = () => {
    resetState();
    onClose();
  };

  const handleTagClick = (tag: string) => {
    const isSelected = selectedTags.includes(tag);
    const updatedTags = isSelected ? selectedTags.filter((t) => t !== tag) : [...selectedTags, tag];
    setSelectedTags(updatedTags);
  };

  const handleSearch = () => {
    const query = searchQuery.trim();
    const tags = selectedTags.join(',');
    const searchParams = new URLSearchParams();

    if (query) searchParams.append('query', query);
    if (tags) searchParams.append('hashtags', tags);

    onSearch(searchParams.toString()); // 조합된 쿼리 문자열 전달
    onClose();
    window.scrollTo(0, 0);
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={handleClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <SearchBarContainer>
          <ModalSearchBar onSearch={(value) => setSearchQuery(value)} />
        </SearchBarContainer>
        <SelectedTagsContainer>
          {selectedTags.length > 0 &&
            selectedTags.map((tag) => (
              <SelectedTag key={tag}>
                <Typography variant="bodySmall">#{tag}</Typography>
              </SelectedTag>
            ))}
        </SelectedTagsContainer>
        <ScrollableContent>
          <CategoryInputSection
            categories={categories}
            selectedTags={selectedTags}
            onTagClick={handleTagClick}
            isComplete={false}
            isHasTitle={false}
            tagAndTitleGap={10}
          />
        </ScrollableContent>
        <ButtonContainer>
          <CancelButton onClick={handleClose}>
            <Typography variant="titleXxxSmall">취소</Typography>
          </CancelButton>
          <SearchButton onClick={handleSearch}>
            <Typography variant="titleXxxSmall">검색</Typography>
          </SearchButton>
        </ButtonContainer>
      </ModalContent>
    </ModalOverlay>
  );
};

export default SearchModal;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  width: clamp(300px, 50vw, 840px); /* 최소 300px, 최대 840px */
  max-height: 80vh;
  border-radius: 30px;
  padding: 68px 60px 68px 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SearchBarContainer = styled.div`
  border: 2px solid ${({ theme }) => theme.colors.text['gray']};
  border-radius: 20px;
  width: 720px;
`;

const SelectedTagsContainer = styled.div`
  margin-top: 10px;
  display: flex;
  width: 100%;
  justify-content: flex-start;
  flex-wrap: wrap;
  min-height: 48px;
  gap: 10px;
`;

const SelectedTag = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 24px;
  border-radius: 30px;
  height: 48px;
  background-color: ${({ theme }) => theme.colors.primary[500]};
  color: ${({ theme }) => theme.colors.text['white']};
`;

const ScrollableContent = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  width: 100%;
`;

const CancelButton = styled.button`
  padding: 19px 156px;
  background: lightgray;
  border: none;
  border-radius: 20px;
  cursor: pointer;
`;

const SearchButton = styled.button`
  padding: 19px 156px;
  background: rgba(4, 112, 214, 1);
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
`;
