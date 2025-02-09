/* eslint-disable react/prop-types */
import styled, { useTheme } from 'styled-components';
import Card from '@components/Card/Card';
import Typography from '@components/common/typography';
import { useNavigate } from 'react-router-dom';

interface TipCardItem {
  id: string;
  image: string;
  text: string;
  likes?: number;
  bookmarks?: number;
  date?: string;
}

interface RecentTipsProps {
  items: TipCardItem[];
}

const RecentTips: React.FC<RecentTipsProps> = ({ items }) => {

  const theme = useTheme();

  const navigate = useNavigate(); // 추가

  const handleCardClick = (id: string) => {
    navigate(`/save-tip/${id}`); // 상세 페이지로 이동
  };

  return (
    <RecentGoodTip>
      <Typography 
        variant='titleXxSmall' 
        style={{color: theme.colors.primary[800]}}
      >최근에 본 꿀팁</Typography>
      {items.length === 0 ? (
        <Typography variant="bodySmall">최근 본 꿀팁이 없습니다.</Typography>
      ) : (
        <TipCardList>
          {items.map((item) => (
            <Card 
              key={item.id} 
              image={item.image} 
              text={item.text} 
              likes={item.likes || 0} 
              bookmarks={item.bookmarks || 0} 
              date={item.date || ''}
              onClick={() => handleCardClick(item.id)}
            />
          ))}
      </TipCardList>
      )}
    </RecentGoodTip>
  );
};

export default RecentTips;

const RecentGoodTip = styled.div`
  display: flex;
  height: 295px;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  flex-shrink: 0;
`

const TipCardList = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  align-self: stretch;
`