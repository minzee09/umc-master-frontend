import Typography from '@components/common/typography';
import Banner from './compoents/Banner';
import styled from 'styled-components';
import TipSection from './compoents/TipSection';

const ChallengePage: React.FC = () => {
  return (
    <>
      <Banner />
      <Title>
        <Typography variant="headingXxSmall">챌린지 구경하기</Typography>
      </Title>
      <TipSection />
    </>
  );
};

export default ChallengePage;

const Title = styled.div`
  color: ${({ theme }) => theme.colors.primary[900]};
  display: flex;
  justify-content: center;
  margin-bottom: 32px;
`;
