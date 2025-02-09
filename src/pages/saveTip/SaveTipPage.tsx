import Card from "@components/Card/Card";
import Typography from "@components/common/typography";
import styled, { useTheme } from "styled-components";
import { dummyData as initialData } from "./dummydata/dummydata";
import { useCallback, useEffect, useRef, useState } from "react";
import SkeletonCard from "@components/Skeleton/SkeletonCard";
import { useNavigate } from "react-router-dom";

const PAGE_SIZE = 5;

const SaveTipPage: React.FC = () => {
  
  const theme = useTheme();

  const [data, setData] = useState(initialData.slice(0, PAGE_SIZE * 6));
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialData.length > PAGE_SIZE);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useRef<HTMLDivElement | null>(null);

  const loadMoreData = useCallback(() => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    setTimeout(() => {
      const nextData = initialData.slice(data.length, data.length + PAGE_SIZE);
      setData((prevData) => [...prevData, ...nextData]);
      setHasMore(data.length + PAGE_SIZE < initialData.length);
      setIsLoading(false);
    }, 1000);
  }, [isLoading, hasMore, data.length]);

  useEffect(() => {
    if (isLoading || !hasMore) return;

    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadMoreData();
      }
    });

    if (lastElementRef.current) observerRef.current.observe(lastElementRef.current);

    return () => observerRef.current?.disconnect();
  }, [isLoading, hasMore, loadMoreData]);

  const navigate = useNavigate(); // 추가

  const handleCardClick = (id: string) => {
    navigate(`/save-tip/${id}`); // 상세 페이지로 이동
  };

  return (
    <Container>
      <SavedTips>
        <Typography 
          variant="headingXxSmall"
          style={{color: theme.colors.primary[900]}}
        >저장한 꿀팁</Typography>
        {data.length === 0 && !isLoading ? (
          <Typography variant="bodySmall">최근 본 꿀팁이 없습니다.</Typography>
        ) : (
          <TipCardList>
            {data.map((item) => (
              <Card 
                key={item.id} 
                image={item.image} 
                text={item.text} 
                likes={item.likes || 0} 
                bookmarks={item.bookmarks || 0} 
                date={item.date || ""}
                onClick={() => handleCardClick(item.id)}
              />
            ))}
            
            {/* 마지막 요소 감지용 div */}
            {hasMore && !isLoading && <div ref={lastElementRef} style={{ height: "10px" }} />}

            {/* 스켈레톤 UI */}
            {isLoading && 
              Array.from({ length: PAGE_SIZE }).map((_, index) => (
                <SkeletonCard key={`skeleton-${index}`} />
              ))
            }
          </TipCardList>
        )}
      </SavedTips>
    </Container>
  );
};

export default SaveTipPage;

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 80px;
  padding-bottom: 100px;
  background: #FFF;
`

const SavedTips = styled.div`
  display: flex;
  width: 1280px;
  flex-direction: column;
  align-items: center;
  gap: 40px;
`

const TipCardList = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  align-self: stretch;
  flex-wrap: wrap;
  cursor: pointer;
`