/* eslint-disable react/prop-types */
import styled from 'styled-components';
import BigCard from '@components/Card/BigCard';
import { useTipList } from '@apis/queries/useTipQueries';
import SkeletonBigCard from '@components/Skeleton/SkeletonBigCard';
import { useNavigate } from 'react-router-dom';

interface TipsSectionProps {
  title?: string;
  items: { image: string; text: string; likes?: number; bookmarks?: number; date?: string }[];
  showArrows?: boolean;
  showLikes?: boolean;
}

interface TipItem {
  image: string;
  text: string;
  likes?: number;
  bookmarks?: number;
  date?: string;
  id: string;
}

const RecommendedTipsSection: React.FC<TipsSectionProps> = ({ title = 'recommendTip', items }) => {
  const navigate = useNavigate();
  const { data: tipsData, isFetching, isError } = useTipList({ title, page: 1, sortOption: 'latest' });

  const handleCardClick = (id: string) => {
    navigate(`/save-tip/${id}`);
  };

  if (isError) return <div>Something went wrong...</div>;

  const tips = tipsData?.data?.length > 0 ? tipsData.data : items;

  return (
    <SectionContainer>
      <CardsWrapper>
        {isFetching
          ? Array.from({ length: 8 }).map((_, index) => <SkeletonBigCard key={index} />) // ✅ SkeletonCard 컴포넌트 활용
          : tips.map((item: TipItem, index: number) => (
              <BigCard
                key={index}
                image={item.image}
                text={item.text}
                likes={item.likes || 0}
                bookmarks={item.bookmarks || 0}
                date={item.date || ''}
                onClick={() => {
                  handleCardClick(item.id);
                }}
              />
            ))}
      </CardsWrapper>
    </SectionContainer>
  );
};

export default RecommendedTipsSection;

const SectionContainer = styled.div`
  max-width: 1405px;
  margin: 0 auto;
  margin-bottom: 150px;
  display: flex;
  flex-direction: column;
`;

const CardsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(330px, 1fr));
  gap: 28px;
`;
