import React from 'react';
import styled from 'styled-components';
import Typography from '@components/common/typography';

interface CardInfoProps {
  text: string;
  likes: number;
  bookmarks: number;
  date: string;
}

const CardInfo: React.FC<CardInfoProps> = ({ text, likes, bookmarks, date }) => {
  return (
    <>
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
    </>
  );
};

export default CardInfo;

const CardText = styled.div`
  margin: 3px 0;
`;

const CardDetails = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
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
  color: ${({ theme }) => theme.colors.text[500]};
`;
