import React from 'react';
import { CSSProperties, styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import RoutePaths from '@router/routePaths';
import Typography from '@components/common/typography';

const StartButton: React.FC<{ style?: CSSProperties }> = ({ style }) => {
  const navigate = useNavigate();

  const handleStartClick = () => {
    // TODO: 로그인 이력(토큰)으로 판단할 예정
    const token = localStorage.getItem('token');
    console.log('랜딩페이지 토큰 유무: ', token);
    if (token) {
      navigate(RoutePaths.MAIN);
    } else {
      navigate(RoutePaths.LOGIN);
    }
  };

  return (
    <Button onClick={handleStartClick} style={style}>
      <Typography variant="titleXSmall">지금 시작하기</Typography>
    </Button>
  );
};

export default StartButton;

const Button = styled.button`
  padding: 18px 42px;
  background-color: ${({ theme }) => theme.colors.text.white};
  border-radius: 50px;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;
