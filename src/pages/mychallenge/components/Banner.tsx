import Typography from '@components/common/typography';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import mainCharacter from '@assets/mainCharacter2.png';

const Banner: React.FC = () => {
  const navigate = useNavigate();
  const onClickCreateBTN = () => {
    navigate(`/challenge`); /* MyChallengePage 나오면 수정 예정 */
  };

  return (
    <Container>
      <Typography style={{ marginBottom: '12px' }} variant="headingSmall">
        포인트를 쌓고 싶다면?
      </Typography>
      <Typography variant="titleSmall">지금 현재 인기 챌린지와 신규 챌린지를 확인해보세요!</Typography>
      <Image src={mainCharacter} />
      <TipCreateBTN onClick={onClickCreateBTN}>
        <Typography variant="bodyMedium">챌린지 페이지로</Typography>
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
  cursor: pointer;
`;

const Image = styled.img`
  object-fit: contain;
  margin: 32px 0px;
`;
