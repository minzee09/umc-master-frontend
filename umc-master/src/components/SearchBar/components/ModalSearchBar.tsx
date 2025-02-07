/* eslint-disable react/prop-types */
import { useState } from 'react';
import styled from 'styled-components';

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (value: string) => void;
}

const ModalSearchBar: React.FC<SearchBarProps> = ({ placeholder = '검색', onSearch }) => {
  const [inputValue, setInputValue] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value); // 내부 상태 업데이트
    if (onSearch) {
      onSearch(value); // 입력값 변경 시 onSearch 호출
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch(inputValue); // 문자열 전달
    }
  };

  return (
    <SearchBarContainer>
      <SearchInput
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange} // 내부 상태 업데이트
        onKeyDown={handleKeyDown}
      />
    </SearchBarContainer>
  );
};

export default ModalSearchBar;

const SearchBarContainer = styled.div`
  position: relative;
  width: 100%;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 22px 32px;
  font-size: 18px;
  border: none;
  outline: none;
`;
