import React from 'react';
import styled from 'styled-components';
import Card from './Card';
import UserIcon from '@assets/icons/person.svg?react';
import Typography from '@components/common/typography';

interface NumberCardProps {
  cards: {
    id: number;
    image: string;
    text: string;
    likes: number;
    bookmarks: number;
    date: string;
    userNumber: number;
  }[];
  showNumber?: boolean;
  onCardClick: (id: number) => void;
}

const NumberCard: React.FC<NumberCardProps> = ({ cards, showNumber = true, onCardClick }) => {
  return (
    <GridContainer>
      {cards.map((card, index) => (
        <CardWrapper key={card.id} onClick={() => onCardClick(card.id)}>
          {showNumber && (
            <CardNumber>
              <Typography variant="bodyXSmall">{index + 1}</Typography>
            </CardNumber>
          )}
          <Card image={card.image} text={card.text} likes={card.likes} bookmarks={card.bookmarks} date={card.date} />
          <CardUserNumber>
            <UserIcon />
            <Typography variant="bodyXSmall">{card.userNumber}</Typography>
          </CardUserNumber>
        </CardWrapper>
      ))}
    </GridContainer>
  );
};

export default NumberCard;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  max-width: 1280px;
  margin: 0 auto;
`;

const CardWrapper = styled.div`
  position: relative;
`;

const CardNumber = styled.div`
  position: absolute;
  top: 8px;
  left: 8px;
  width: 32px;
  height: 32px;
  background-color: rgba(0, 0, 0, 0.2);
  color: ${({ theme }) => theme.colors.text['white']};
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CardUserNumber = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 80px;
  left: 8px;
  width: 71px;
  height: 32px;
  background-color: rgba(0, 0, 0, 0.2);
  color: ${({ theme }) => theme.colors.text['white']};
  border-radius: 5px;
  gap: 4px;
`;
