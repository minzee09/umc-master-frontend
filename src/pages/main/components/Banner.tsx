import Typography from '@components/common/typography';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'; // 아이콘 추가
import { AnimatePresence, motion } from 'framer-motion';

const TOTAL_PAGES = 5;
const AUTO_SLIDE_INTERVAL = 3000; // 3초

const pageData = [
  { title: 'Welcome!', description: '오늘도 마스터원에서 꿀팁들을 얻어가세요!' },
  { title: 'Quiz', description: '오늘의 퀴즈로 재미와 지식을 확인해보세요!' },
  { title: '정보', description: '이 주의 BEST 정보들, 최신 트렌드를 알아보세요!' },
  { title: '사용자 맞춤', description: '본인 취향에 맞는 꿀팁들을 확인해보세요!' },
  { title: 'Event', description: '다양한 이벤트를 참여하고 혜택을 받아가세요!' },
];

const Banner: React.FC = () => {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [direction, setDirection] = useState<number>(0);

  const handleNextPage = (): void => {
    setDirection(1);
    setPageNumber((prev) => (prev < TOTAL_PAGES ? prev + 1 : 1));
  };

  const handlePrevPage = (): void => {
    setDirection(-1);
    setPageNumber((prev) => (prev > 1 ? prev - 1 : TOTAL_PAGES));
  };

  const goToPage = (page: number): void => {
    setDirection(page > pageNumber ? 1 : -1);
    setPageNumber(page);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNextPage();
    }, AUTO_SLIDE_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  // 현재 페이지의 텍스트 데이터
  const currentPageData = pageData[pageNumber - 1];

  return (
    <Container>
      <ArrowLeft onClick={handlePrevPage}>
        <MdKeyboardArrowLeft />
      </ArrowLeft>
      <AnimatePresence custom={direction} initial={false}>
        <SlideContent
          key={pageNumber}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.5 }}
          layout
        >
          <StyledTypography variant="titleMedium">{currentPageData.title}</StyledTypography>
          <Typography variant="titleLarge">{currentPageData.description}</Typography>
        </SlideContent>
      </AnimatePresence>
      <ArrowRight onClick={handleNextPage}>
        <MdKeyboardArrowRight />
      </ArrowRight>
      <PageIndicator>
        {Array.from({ length: TOTAL_PAGES }, (_, index) => (
          <PageDot key={index} $isActive={pageNumber === index + 1} onClick={() => goToPage(index + 1)} />
        ))}
      </PageIndicator>
    </Container>
  );
};

export default Banner;

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100vw' : '-100vw', // 뷰포트 기준으로 이동
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? '100vw' : '-100vw',
    opacity: 0,
  }),
};

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
  overflow: hidden;
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
  z-index: 10;
`;

const ArrowRight = styled(ArrowButtonBase)`
  right: 220px;
  z-index: 10;
`;

const SlideContent = styled(motion.div)`
  position: absolute;
  width: 100%;
  text-align: center;
  top: 65px;
  z-index: 5;
`;

const PageIndicator = styled.div`
  position: relative;
  top: 88px;
  display: flex; /* Flexbox로 변경 */
  align-items: center; /* 세로 정렬 */
  gap: 10px; /* 간격 설정 */

  color: rgba(99, 99, 99, 1);
`;

const PageDot = styled.div<{ $isActive: boolean }>`
  width: 12px;
  height: 12px;
  background-color: ${({ $isActive }) => ($isActive ? 'white' : 'rgba(255, 255, 255, 0.5)')};
  border-radius: 50%;
  cursor: pointer;

  &:hover {
    background-color: white;
  }
`;
