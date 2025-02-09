import Typography from '@components/common/typography';
import React from 'react';
import styled from 'styled-components';

interface CardProps {
  image: string;
  text: string;
  likes: number;
  bookmarks: number;
  date: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const BigCard: React.FC<CardProps> = ({ image, text, likes, bookmarks, date, onClick }) => {
  return (
    <CardContainer onClick={onClick}>
      <CardImageWrapper>
        <CardImage src={image} alt={text} />
      </CardImageWrapper>
      <CardText>
        <Typography variant="titleXxxSmall">{text}</Typography>
      </CardText>
      <CardDetails>
        <IconWrapper>
          <HeartIcon className="fas fa-heart" />
          <Typography variant="captionDefault">
            <Count>{likes.toLocaleString()}</Count>
          </Typography>
        </IconWrapper>
        <IconWrapper>
          <BookmarkIcon className="fas fa-bookmark" />
          <Typography variant="captionDefault">
            <Count>{bookmarks.toLocaleString()}</Count>
          </Typography>
        </IconWrapper>
      </CardDetails>
      <DateWrapper>
        <Typography variant="captionDefault">
          <CardDate>{date}</CardDate>
        </Typography>
      </DateWrapper>
    </CardContainer>
  );
};

export default BigCard;

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
  min-width: 300px;
  height: 250px;
  object-fit: cover;
`;

const CardText = styled.div`
  margin: 3px 0;
`;

const CardDetails = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const HeartIcon = styled.i`
  font-size: 16px;
  color: #ff6b6b;
`;

const BookmarkIcon = styled.i`
  font-size: 16px;
  color: #3498db;
`;

const Count = styled.span`
  color: #121212;
`;

const DateWrapper = styled.div`
  margin-top: 6px;
`;

const CardDate = styled.span`
  color: #7f8c8d;
`;
