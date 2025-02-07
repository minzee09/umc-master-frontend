import styled from 'styled-components';
import { motion } from 'framer-motion';
import theme from '@styles/theme';
import GiftImage from '@assets/gift.png';
import useScrollAnimation from '@hooks/useScrollAnimation';
import Typography from '@components/common/typography';

const TipsSection: React.FC = () => {
  const animation = useScrollAnimation({ direction: 'up', duration: 1 });
  return (
    <Section as={motion.section} {...animation}>
      <Content>
        <Typography variant="headingSmall" style={{ color: theme.colors.text.white }}>
          홈마스터에서 다양한 자취 지원 정책들과 꿀팁을{`\n`}확인할 수 있어요
        </Typography>
        <Icon src={GiftImage} alt="선물 아이콘" />
      </Content>
    </Section>
  );
};

export default TipsSection;

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
  width: 240px;
`;
