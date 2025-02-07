import React from 'react';
import styled, { keyframes } from 'styled-components';
import theme from '@styles/theme';
import Card from '@components/Card/Card';
import Typography from '@components/common/typography';

const SavedTipsSection: React.FC = () => {
  const savedTips = [
    {
      image: 'https://i.pinimg.com/736x/0c/b6/13/0cb613f2fa6acd76eb0c6603e5478127.jpg',
      text: '요리 꿀팁 모음',
      likes: 100,
      bookmarks: 50,
      date: '2025.12.31',
    },
    {
      image: 'https://i.pinimg.com/736x/30/7a/3b/307a3bd81de9c0557b01f783d82d8920.jpg',
      text: '청소 노하우',
      likes: 892,
      bookmarks: 800,
      date: '2025.01.20',
    },
    {
      image: 'https://i.pinimg.com/736x/48/35/b8/4835b87d1aca4362260fae8ae87b2f14.jpg',
      text: '자취생 돈 관리법',
      likes: 1290,
      bookmarks: 67,
      date: '2025.01.24',
    },
    {
      image: 'https://i.pinimg.com/736x/eb/36/14/eb3614ce03439258661ccec93696558d.jpg',
      text: '공간 활용 인테리어',
      likes: 180,
      bookmarks: 34,
      date: '2025.02.09',
    },
    {
      image: 'https://i.pinimg.com/736x/c0/60/a6/c060a604f50d2fbc03ae3d7046f0ba78.jpg',
      text: '효율적인 시간 관리',
      likes: 1200,
      bookmarks: 40,
      date: '2025.02.02',
    },
  ];

  return (
    <Section>
      <ScrollContainer>
        <CardContainer>
          {savedTips.concat(savedTips).map((tip, index) => (
            <CardWrapper key={index}>
              <Card likes={tip.likes} bookmarks={tip.bookmarks} date={tip.date} image={tip.image} text={tip.text} />
            </CardWrapper>
          ))}
        </CardContainer>
      </ScrollContainer>
      <Typography variant="headingSmall" style={{ color: theme.colors.text.white, marginTop: 40 }}>
        여러 꿀팁들을 여기에 다 모아 저장한 다음{`\n`}필요할 때 확인하세요!
      </Typography>
    </Section>
  );
};

export default SavedTipsSection;

const Section = styled.section`
  width: 100%;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.primary[700]};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  white-space: break-spaces;
`;

const ScrollContainer = styled.div`
  width: 100%;
  overflow-x: hidden;
  position: relative;
`;

const slideAnimation = keyframes`
  0% { transform: translateX(-80%); }
  100% { transform: translateX(-23%); }
`;

const CardContainer = styled.div`
  display: flex;
  animation: ${slideAnimation} 10s ease-out forwards;
  width: fit-content;

  &:hover {
    animation-play-state: paused;
  }

  & > div {
    width: 280px;
    height: 300px;
    flex-shrink: 0;
  }
`;

// Card 내부의 span과 div 텍스트만 흰색으로 오버라이드, i 태그(=icon)는는 그대로
const CardWrapper = styled.div`
  span,
  div {
    color: #ffffff !important;
    background: transparent !important;
    cursor: default;
  }
`;
