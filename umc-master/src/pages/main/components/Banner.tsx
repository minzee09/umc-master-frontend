import Typography from '@components/common/typography';
import { useState } from 'react';
import styled from 'styled-components';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'; // 아이콘 추가

const TOTAL_PAGES = 5;

const Banner: React.FC = () => {
  const [pageNumber, setPageNumber] = useState<number>(1);

  const handleNextPage = (): void => {
    setPageNumber((prev) => (prev < TOTAL_PAGES ? prev + 1 : 1));
  };

  const handlePrevPage = (): void => {
    setPageNumber((prev) => (prev > 1 ? prev - 1 : TOTAL_PAGES));
  };

  return (
    <Container>
      <ArrowLeft onClick={handlePrevPage}>
        <MdKeyboardArrowLeft />
      </ArrowLeft>
      <Content>
        <StyledTypography variant="titleMedium">Welcome!</StyledTypography>
        <Typography variant="titleLarge">오늘도 마스터원에서 꿀팁들을 얻어가세요!</Typography>
      </Content>
      <ArrowRight onClick={handleNextPage}>
        <MdKeyboardArrowRight />
      </ArrowRight>
      <PageIndicator>
        <Typography variant="titleXxSmall">{pageNumber}</Typography>
        <Typography variant="titleXxSmall">|</Typography>
        <Typography variant="titleXxSmall">5</Typography>
      </PageIndicator>
    </Container>
  );
};

export default Banner;

const StyledTypography = styled(Typography)`
  padding-bottom: 20px;
`;

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 280px;
  background-color: ${({ theme }) => theme.colors.primary[500]};
  color: white;
  text-align: center;
`;

const ArrowButtonBase = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: white;
  font-size: 80px;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

const ArrowLeft = styled(ArrowButtonBase)`
  left: 220px;
`;

const ArrowRight = styled(ArrowButtonBase)`
  right: 220px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PageIndicator = styled.div`
  position: absolute;
  bottom: 46px;
  right: 340px;
  display: flex; /* Flexbox로 변경 */
  align-items: center; /* 세로 정렬 */
  gap: 10px; /* 간격 설정 */

  background: white;
  color: rgba(99, 99, 99, 1);
  padding: 6px 27px;
  border-radius: 20px;
`;
