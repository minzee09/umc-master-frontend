/* eslint-disable react/prop-types */
import { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useTipList } from '@apis/queries/useTipQueries';
import Card from '@components/Card/Card';
import SkeletonCard from '@components/Skeleton/SkeletonCard';
import Typography from '@components/common/typography';
import usePagination from '@hooks/usePagination';
import dummyData from '@assets/dummy/dummyData';
import { AnimatePresence, motion } from 'framer-motion';

interface TipsSectionProps {
  title?: string;
  showArrows?: boolean;
  showLikes?: boolean;
  showRecent?: boolean;
  defaultSort?: 'latest' | 'likes' | 'bookmarks';
}

interface TipItem {
  image: string;
  text: string;
  likes?: number;
  bookmarks?: number;
  date?: string;
  id: string;
}

const TipsSection: React.FC<TipsSectionProps> = ({
  title,
  showArrows = false,
  showLikes = true,
  showRecent = false,
  defaultSort = 'latest',
}) => {
  const navigate = useNavigate();
  const [sortOption, setSortOption] = useState<'likes' | 'latest' | 'bookmarks'>(defaultSort);
  const { page, handlePrevPage, handleNextPage } = usePagination(1);
  const { data: tipsData, isFetching, isError } = useTipList({ title: title || '', page, sortOption });
  const [direction, setDirection] = useState<number>(0);

  const tips = tipsData?.data?.length > 0 ? tipsData.data : dummyData;

  // 정렬된 아이템
  const sortedItems = (tips || []).sort((a: TipItem, b: TipItem) => {
    if (sortOption === 'likes') return (b.likes || 0) - (a.likes || 0);
    if (sortOption === 'latest') return new Date(a.date || '').getTime() - new Date(b.date || '').getTime();
    if (sortOption === 'bookmarks') return (b.bookmarks || 0) - (a.bookmarks || 0);
    return 0;
  });

  if (isError) return <div>Something went wrong...</div>; // 에러 발생 시 표시

  const handleCardClick = (id: string) => {
    navigate(`/save-tip/${id}`);
  };

  const handleSlide = (direction: number) => {
    setDirection(direction);
    if (direction === -1) handlePrevPage();
    if (direction === 1) handleNextPage(5);
  };

  console.log(tips);
  return (
    <SectionContainer>
      <SectionHeader>
        <Typography variant="headingXxSmall">{title}</Typography>
      </SectionHeader>
      <SortAndCardWrapper>
        <SortButtonGroup $hasButtons={showLikes}>
          {showLikes && (
            <>
              {showRecent && (
                <SortButton $active={sortOption === 'latest'} onClick={() => setSortOption('latest')}>
                  <Typography variant="bodyXSmall">최신순</Typography>
                </SortButton>
              )}
              <SortButton $active={sortOption === 'likes'} onClick={() => setSortOption('likes')}>
                <Typography variant="bodyXSmall">좋아요순</Typography>
              </SortButton>
              <SortButton $active={sortOption === 'bookmarks'} onClick={() => setSortOption('bookmarks')}>
                <Typography variant="bodyXSmall">저장많은순</Typography>
              </SortButton>
            </>
          )}
        </SortButtonGroup>
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <CardsWrapper
            key={page}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5 }}
          >
            {isFetching
              ? Array.from({ length: 5 }).map((_, index) => <SkeletonCard key={index} />)
              : sortedItems.map((item: TipItem, index: number) => (
                  <Card
                    key={index}
                    image={item.image}
                    text={item.text}
                    likes={item.likes || 0}
                    bookmarks={item.bookmarks || 0}
                    date={item.date || ''}
                    onClick={() => handleCardClick(item.id)}
                  />
                ))}
          </CardsWrapper>
        </AnimatePresence>

        {showArrows && (
          <>
            <LeftArrow onClick={() => handleSlide(-1)}>{'<'}</LeftArrow>
            <RightArrow onClick={() => handleSlide(1)}>{'>'}</RightArrow>
          </>
        )}
      </SortAndCardWrapper>
    </SectionContainer>
  );
};

export default TipsSection;

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
};

const SortAndCardWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  max-width: 1280px;
  margin: 0 auto;
`;

const SectionContainer = styled.div`
  max-width: 1424px;
  margin: 0 auto;
  margin-bottom: 150px;
  display: flex;
  flex-direction: column;
`;

const SortButtonGroup = styled.div<{ $hasButtons: boolean }>`
  display: flex;
  gap: 10px;
  margin-bottom: 16px;
  margin-left: auto;
  height: ${({ $hasButtons }) => ($hasButtons ? 'auto' : '40px')}; /* 버튼이 없을 때 고정된 높이 */
`;

const SortButton = styled.button<{ $active: boolean }>`
  padding: 7px 16px;
  color: ${({ $active, theme }) => ($active ? theme.colors.text['white'] : theme.colors.text['gray'])};
  background-color: ${({ $active, theme }) => ($active ? theme.colors.primary[600] : theme.colors.text['white'])};
  border: none;
  border-radius: 25px;
  cursor: pointer;
  border: ${({ $active }) => ($active ? 'none' : '1px solid #ccc')};
  &:hover {
    background-color: ${({ $active, theme }) => ($active ? theme.colors.primary[600] : theme.colors.text['white'])};
  }
  margin: 0 auto; /* 가운데 정렬 */
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.colors.primary[900]};
`;

const CardsWrapper = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(5, minmax(240px, 1fr));
  gap: 20px;
  position: relative;
  max-width: 1280px; /* 원하는 최대 너비 설정 */
  margin: 0 auto; /* 가운데 정렬 */
`;

const LeftArrow = styled.span`
  font-size: 40px;
  font-weight: bold;
  color: #121212;
  position: absolute;
  top: 50%;
  left: -62px;
  transform: translateY(-50%);
  z-index: 10;
  cursor: pointer;
`;

const RightArrow = styled.span`
  font-size: 40px;
  font-weight: bold;
  color: #121212;
  position: absolute;
  top: 50%;
  right: -62px;
  transform: translateY(-50%);
  z-index: 10;
  cursor: pointer;
`;
