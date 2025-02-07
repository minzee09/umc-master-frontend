import { motion } from 'framer-motion';
import styled from 'styled-components';
import theme from '@styles/theme';
import CharacterImg from '@assets/character/landing.png';
import Typography from '@components/common/typography';
import useScrollAnimation from '@hooks/useScrollAnimation';
import StartButton from './StartButton';

const TitleSection: React.FC = () => {
  const animation = useScrollAnimation({ direction: 'up', duration: 1 });
  return (
    <Section as={motion.section} {...animation}>
      <Content>
        <TextContainer>
          <Typography variant="headingXSmall" style={{ color: theme.colors.text.white }}>
            1인 가구를 위한 가이드북
          </Typography>
          <Typography variant="headingMedium" style={{ color: theme.colors.text.white }}>
            나만의 자취 꿀팁 완성하기
          </Typography>
          <StartButton style={{ marginTop: 60, width: '60%' }} />
        </TextContainer>
        <ImageContainer>
          <Character src={CharacterImg} alt="Character" />
        </ImageContainer>
      </Content>
    </Section>
  );
};

export default TitleSection;

const Section = styled.section`
  width: 100%;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.primary[500]};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 10%;
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Character = styled.img`
  width: 100%;
  height: auto;
`;
