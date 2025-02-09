/* eslint-disable react/prop-types */
import { useState } from 'react';
import styled from 'styled-components';
import SearchIcon from '@assets/icons/search.svg?react';

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder = '검색어를 입력하세요', onSearch }) => {
  const [inputValue, setInputValue] = useState<string>('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch(inputValue);
    }
  };

  const handleIconClick = () => {
    if (onSearch) {
      onSearch(inputValue);
    }
  };

  return (
    <SearchBarContainer>
      <SearchInput
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <SearchIconDiv onClick={handleIconClick}>
        <SearchIcon />
      </SearchIconDiv>
    </SearchBarContainer>
  );
};

export default SearchBar;

const SearchBarContainer = styled.div`
  position: relative;
  width: 100%;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0px 10px 10px 10px;
  font-size: 16px;
  border: none;
  border-bottom: 2px solid rgba(99, 99, 99, 1);
  outline: none;
`;

const SearchIconDiv = styled(SearchIcon)`
  position: absolute;
  right: 10px;
  top: 30%;
  transform: translateY(-50%);
  font-size: 30px;
  cursor: pointer;
  &:hover {
    color: rgba(0, 0, 0, 0.5);
  }
`;
