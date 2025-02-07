import { useEffect } from 'react';
import styled from 'styled-components';
import Typography from '@components/common/typography';
import MindMap from './components/mindMap';
import CardGrid, { CardGridData } from './components/cardGrid';
import dummyImg from '@assets/dummyImage/dummy.jpeg';

const generateDummyData = (): CardGridData[] => {
  return Array.from({ length: 9 }, (_, index) => ({
    id: String(index + 1),
    image: dummyImg,
    text: `더미 데이터 ${index + 1}`,
    likes: Math.floor(Math.random() * 2000) + 1000,
    bookmarks: Math.floor(Math.random() * 2000) + 1000,
    date: '2025.01.18',
  }));
};

const MagazinePage = () => {
  const programData = generateDummyData();
  const influencerData = generateDummyData();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container>
      <Title style={{ marginTop: 10 }}>
        <Typography variant="headingXxSmall">인기 관심사</Typography>
      </Title>
      <MindMap />
      <Title>
        <Typography variant="headingXxSmall">서초구 지원 프로그램</Typography>
      </Title>
      <CardGrid cards={programData} />
      <Title>
        <Typography variant="headingXxSmall">인플루언서 꿀팁</Typography>
      </Title>
      <CardGrid cards={influencerData} />
      <div style={{ height: 100 }} />
    </Container>
  );
};

export default MagazinePage;

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  margin-top: 80px;
  margin-bottom: 40px;
  text-align: center;
  color: ${({ theme }) => theme.colors.primary[900]};
`;
