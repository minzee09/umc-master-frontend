import Typography from '@components/common/typography';
import styled from 'styled-components';
import Banner from './components/Banner';
import TipSection from './components/TipSection';

const MyChallengePage: React.FC = () => {
  return (
    <>
      <Banner />
      <Title>
        <Typography variant="headingXxSmall">나의 챌린지</Typography>
      </Title>
      <TipSection />
    </>
  );
};

export default MyChallengePage;

const Title = styled.div`
  color: ${({ theme }) => theme.colors.primary[900]};
  display: flex;
  justify-content: center;
  margin-bottom: 32px;
`;
