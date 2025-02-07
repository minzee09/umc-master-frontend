import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import CardInfo from '@components/Card/CardInfo';

export interface CardGridData {
  id: string;
  image: string;
  text: string;
  likes: number;
  bookmarks: number;
  date: string;
}

interface CardGridProps {
  cards: CardGridData[];
}

interface ProcessedCardData extends CardGridData {
  columnSpan: number;
}

const generatePattern = (): number[] => {
  const patterns = [
    [2, 1], // 큰 카드 - 작은 카드
    [1, 2], // 작은 카드 - 큰 카드
    [1, 1, 1], // 작은 카드 3개
  ];
  return patterns[Math.floor(Math.random() * patterns.length)];
};

const applyPatternToCards = (cards: CardGridData[]): ProcessedCardData[] => {
  const updatedCards: ProcessedCardData[] = [];
  let index = 0;
  for (let i = 0; i < 3; i++) {
    const pattern = generatePattern();
    pattern.forEach((colSpan) => {
      if (index < cards.length) {
        updatedCards.push({ ...cards[index], columnSpan: colSpan });
        index++;
      }
    });
  }
  return updatedCards;
};

const CardGrid: React.FC<CardGridProps> = ({ cards }) => {
  const navigate = useNavigate();
  const updatedCards = applyPatternToCards(cards);

  const handleClick = (id: string) => {
    navigate(`/magazine/${id}`);
  };

  return (
    <Container>
      <GridContainer>
        {updatedCards.map((card) => (
          <GridItem key={card.id} columnSpan={card.columnSpan} onClick={() => handleClick(card.id)}>
            <Image src={card.image} alt={card.text} />
            <CardInfo text={card.text} likes={card.likes} bookmarks={card.bookmarks} date={card.date} />
          </GridItem>
        ))}
      </GridContainer>
    </Container>
  );
};

export default CardGrid;

const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  align-items: start; // 카드가 위쪽부터 정렬되도록 유지
`;

const GridItem = styled.div<{ columnSpan: number }>`
  overflow: hidden;
  padding: 8px 4px;
  grid-column: span ${({ columnSpan }) => columnSpan};
  border-radius: 8px;
  cursor: pointer;
`;

const Image = styled.img`
  width: 100%;
  height: 180px;
  border-radius: 8px;
  object-fit: cover;
`;
