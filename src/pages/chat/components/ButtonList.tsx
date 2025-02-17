import React from 'react';
import styled from 'styled-components';
import Typography from '@components/common/typography';

interface ButtonListProps {
  buttonTexts: string[];
  onButtonClick: (text: number) => void;
}

const ButtonList: React.FC<ButtonListProps> = ({ buttonTexts, onButtonClick }) => (
  <ButtonContainer>
    {buttonTexts.map((text, index) => (
      <ActionButton key={index} onClick={() => onButtonClick(index)}>
        <Typography variant="titleXxxSmall">{text}</Typography>
      </ActionButton>
    ))}
  </ButtonContainer>
);

export default ButtonList;

const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
`;

const ActionButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary[500]};
  color: ${({ theme }) => theme.colors.text.white};
  border: none;
  border-radius: 20px;
  padding: 16px 40px;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary[600]};
  }
`;
