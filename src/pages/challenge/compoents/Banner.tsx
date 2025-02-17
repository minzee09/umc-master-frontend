import Typography from '@components/common/typography';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import mainCharacter from '@assets/mainCharacter2.png';

const Banner: React.FC = () => {
  const navigate = useNavigate();
  const onClickCreateBTN = () => {
    navigate(`/main`); /* MyChallengePage 나오면 수정 예정 */
  };
  return (
    <Container>
      <Typography style={{ marginBottom: '12px' }} variant="headingSmall">
        홈마스터와 챌린지를 하고 싶다면?
      </Typography>
      <Typography variant="titleSmall">내가 저장한 챌린지를 수행하고 포인트를 받아가세요!</Typography>
      <Image src={mainCharacter} />
      <TipCreateBTN onClick={onClickCreateBTN}>
        <Typography variant="bodyMedium">나의 챌린지 확인하기</Typography>
      </TipCreateBTN>
    </Container>
  );
};

export default Banner;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 440px;
  background: linear-gradient(${({ theme }) => theme.colors.primary[600]}, ${({ theme }) => theme.colors.primary[900]});
  color: ${({ theme }) => theme.colors.text['white']};
  margin-bottom: 80px;
`;

const TipCreateBTN = styled.button`
  height: 48px;
  padding: 8px 39px;
  background-color: ${({ theme }) => theme.colors.text['white']};
  border-radius: 50px;
  color: ${({ theme }) => theme.colors.text['black']};
`;

const Image = styled.img`
  object-fit: contain;
  margin: 32px 0px;
`;
