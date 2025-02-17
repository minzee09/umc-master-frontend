/* eslint-disable react/prop-types */
import { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useTipList } from '@apis/queries/useTipQueries';
import Card from '@components/Card/Card';
import SkeletonCard from '@components/Skeleton/SkeletonCard';
import Typography from '@components/common/typography';
import usePagination from '@hooks/usePagination';
import dummyImage from '@assets/dummyImage/dummy.jpeg';
import { AnimatePresence, motion } from 'framer-motion';

interface TipsSectionProps {
  title?: string;
  showArrows?: boolean;
  showLikes?: boolean;
  showRecent?: boolean;
  defaultSort?: 'latest' | 'likes' | 'bookmarks';
  isLoading?: boolean;
  items?: TipItem[];
}

interface Hashtag {
  hashtagId: number;
  name: string;
}

interface Image {
  media_url: string;
  media_type: string;
}
interface Author {
  userId: number;
  nickname: string;
  profileImageUrl: string | null;
}

interface TipItem {
  tipId: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  hashtags: Hashtag[];
  imageUrls: Image[];
  likesCount: number;
  savesCount: number;
  author: Author;
}

const TipsSection: React.FC<TipsSectionProps> = ({
  title,
  showArrows = false,
  showLikes = true,
  showRecent = false,
  items,
  isLoading,
  defaultSort = 'latest',
}) => {
  const navigate = useNavigate();
  const [sortOption, setSortOption] = useState<'likes' | 'latest' | 'bookmarks'>(defaultSort);
  const { page, handlePrevPage, handleNextPage } = usePagination(1);
  const {
    data: tipsData,
    isFetching,
    isError,
  } = items
    ? { data: undefined, isFetching: false, isError: false } // 이미 데이터가 주입된 경우 API 호출하지 않음
    : useTipList({ title: title || '', page, sortOption });

  // 만약 외부 데이터가 없으면 내부 데이터 사용
  const tips: TipItem[] = items || tipsData?.result?.tips || [];
  const loading = isLoading ?? (items ? false : isFetching);

  const [direction, setDirection] = useState<number>(0);

  // 정렬된 아이템
  const sortedItems =
    tips.length > 0
      ? [...tips].sort((a, b) => {
          if (sortOption === 'likes') return (b.likesCount || 0) - (a.likesCount || 0);
          if (sortOption === 'latest')
            return new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime();
          if (sortOption === 'bookmarks') return (b.savesCount || 0) - (a.savesCount || 0);
          return 0;
        })
      : [];

  if (isError) return <div>Something went wrong...</div>; // 에러 발생 시 표시

  const handleCardClick = (id: number) => {
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
        <CardsOuterWrapper>
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
              {loading
                ? Array.from({ length: 5 }).map((_, index) => <SkeletonCard key={index} />)
                : sortedItems
                    .slice(0, 5)
                    .map((item: TipItem, index: number) => (
                      <Card
                        key={index}
                        image={item?.imageUrls[0]?.media_url || dummyImage}
                        text={item.title}
                        likes={item.likesCount || 0}
                        bookmarks={item.savesCount || 0}
                        date={item.createdAt?.slice(0, 10) || ''}
                        onClick={() => handleCardClick(item.tipId)}
                      />
                    ))}
            </CardsWrapper>
          </AnimatePresence>
        </CardsOuterWrapper>

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

const CardsOuterWrapper = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  /* 필요에 따라 고정 높이 또는 min-height를 지정 */
  min-height: 300px;
`;

const CardsWrapper = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(5, minmax(240px, 1fr));
  gap: 20px;
  position: relative;
  max-width: 1280px; /* 원하는 최대 너비 설정 */
  margin: 0 auto; /* 가운데 정렬 */
  z-index: 0;
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
