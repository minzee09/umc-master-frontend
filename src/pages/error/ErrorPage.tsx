import ErrorIcon from '@assets/error.svg?react';
import Typography from '@components/common/typography';
import styled from 'styled-components';

const ErrorPage: React.FC = () => {
  return (
    <Container>
      <ErrorIcon />
      <Typography variant="headingXSmall">ERROR</Typography>
      <Typography variant="titleXSmall">다시 시도해보세요</Typography>
    </Container>
  );
};

export default ErrorPage;

const Container = styled.div`
  display: flex;
  min-height: 80vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;
