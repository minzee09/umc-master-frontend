import React from 'react';
import styled from 'styled-components';
import CardInfo from './CardInfo';

interface CardProps {
  image: string;
  text: string;
  likes: number;
  bookmarks: number;
  date: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const Card: React.FC<CardProps> = ({ image, text, likes, bookmarks, date, onClick }) => {
  return (
    <CardContainer onClick={onClick}>
      <CardImageWrapper>
        <CardImage src={image} alt={text} />
      </CardImageWrapper>
      <CardInfo text={text} likes={likes} bookmarks={bookmarks} date={date} />
    </CardContainer>
  );
};

export default Card;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  text-align: center;
  background-color: #ffffff;
  overflow: hidden;
  cursor: pointer;
`;

const CardImageWrapper = styled.div`
  border-radius: 10px;
  overflow: hidden;
`;

const CardImage = styled.img`
  min-width: 240px;
  width: 100%;
  height: 200px;
  object-fit: cover;
`;
