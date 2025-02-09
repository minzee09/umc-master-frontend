import styled from 'styled-components';
import { motion } from 'framer-motion';
import TrophyImage from '@assets/trophy.png';
import useScrollAnimation from '@hooks/useScrollAnimation';
import StartButton from './StartButton';
import Typography from '@components/common/typography';
import theme from '@styles/theme';

const InfluencerSection: React.FC = () => {
  const animation = useScrollAnimation({ direction: 'up', duration: 1 });
  return (
    <Section as={motion.section} {...animation}>
      <Content>
        <Icon src={TrophyImage} alt="트로피 아이콘" />
        <Typography variant="headingSmall" style={{ color: theme.colors.text.white }}>
          인플루언서들의 노하우들도 홈마스터에서{`\n`}모두 확인할 수 있어요!
        </Typography>
        <StartButton />
      </Content>
    </Section>
  );
};

export default InfluencerSection;

const Section = styled.section`
  width: 100%;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.primary[600]};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 24px;
  white-space: break-spaces;
`;

const Icon = styled.img`
  width: 300px;
`;
