/* eslint-disable react/prop-types */
import Typography from "@components/common/typography";
import { useCallback, useEffect, useRef, useState } from "react";
import styled, { useTheme } from "styled-components";
import { generateComments } from "@pages/challenge/dummydata/dummydata";
import SkeletonComment from "@components/Skeleton/SkeletonComment";
import Star from "@assets/icons/kid_star.svg";

const commentCount = 150; // 댓글 수 예시
const formattedNumber = new Intl.NumberFormat().format(commentCount);
const challengerNumber = '1,000'; // 누적 참가자 수 예시

const MAX_LENGTH = 100;
const COMMENTS_PER_LOAD = 3;

const CommentText: React.FC<{ text: string }> = ({ text }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const shouldShowMore = text.length > MAX_LENGTH;
    const theme = useTheme();
    
    return (
      <div>
        <Typography variant="bodySmall" style={{ color: theme.colors.text.black }}>
          {isExpanded ? text : `${text.slice(0, MAX_LENGTH)}`}
        </Typography>
        {shouldShowMore && (
          <button onClick={() => setIsExpanded(!isExpanded)} style={{ marginLeft: "4px", color: "gray", cursor: "pointer", background: "none", border: "none" }}>
            {isExpanded ? "접기" : "더보기"}
          </button>
        )}
      </div>
    );
  };

const ChallengeComment: React.FC = () => {

  const theme = useTheme();
  // const { tipId } = useParams<{ tipId: string }>();

  const comment = generateComments(1300);
  
  const [comments, setComments] = useState<{ author: string; date: string; time: string; comment: string }[]>(comment.slice(0, COMMENTS_PER_LOAD * 2));
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 관리
  const [hasMore, setHasMore] = useState(comment.length > COMMENTS_PER_LOAD);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useRef<HTMLDivElement | null>(null);

  const loadMoreData = useCallback(() => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    setTimeout(() => {
      const nextData = comment.slice(comments.length, comments.length + COMMENTS_PER_LOAD);
      setComments((prevData) => {
        const updatedComments = [...prevData, ...nextData];
        setHasMore(updatedComments.length < comment.length); // 여기서 updatedComments.length 사용!
        return updatedComments;
      });
      setIsLoading(false);
    }, 1000);
  }, [isLoading, hasMore, comments.length]);

  useEffect(() => {
    if (isLoading || !hasMore) return;

    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadMoreData();
      }
    }, { threshold: 1.0 });

    if (lastElementRef.current) observerRef.current.observe(lastElementRef.current);

    return () => observerRef.current?.disconnect();
  }, [isLoading, hasMore, loadMoreData]);

  return (
    <Comment>
      <Typography
        variant="titleXxxSmall"
        style={{color: theme.colors.text.gray}}
      >누적 참가자 {challengerNumber}명</Typography>
      <CommentAdd>
        <Title>
          <Typography
            variant="headingXxxSmall"
            style={{color: theme.colors.text.black}}
          >참가자 후기</Typography>
          <StarScore>
            <img src={Star} alt="별점"/>
            <Typography 
              variant="titleXxxSmall"
              style={{color: theme.colors.text.black}}
            >4.9 ({formattedNumber}개)</Typography>
          </StarScore>
        </Title>
      </CommentAdd>
      {comments.length === 0 && !isLoading ? (
        <Typography variant="bodySmall">아직 참가자 후기가 없습니다.</Typography>
      ) : (
        <CommentList>
          {comments.map((cmt, index) => (
            <CommentCard key={index}>
              <Author>
                <ProfileImg />
                <AuthorInfo>
                  <StarScore>
                    <img src={Star} alt="별점"/>
                    <img src={Star} alt="별점"/>
                    <img src={Star} alt="별점"/>
                    <img src={Star} alt="별점"/>
                    <img src={Star} alt="별점"/>
                  </StarScore>
                  <Typography variant="titleXxSmall" style={{ color: theme.colors.text.black }}>
                    {cmt.author}
                  </Typography>
                  <CommentDate>
                    <Typography variant="bodyXSmall" style={{ color: theme.colors.text.gray }}>
                      {cmt.date}
                    </Typography>
                    <Typography variant="bodyXSmall" style={{ color: theme.colors.text.gray }}>
                      {cmt.time}
                    </Typography>
                  </CommentDate>
                  <CommentText text={cmt.comment} />
                </AuthorInfo>
              </Author>
              
            </CommentCard>
          ))}

        {/* 마지막 요소 감지용 div */}
        {hasMore && !isLoading && <div ref={lastElementRef} style={{ height: "10px" }} />}

        {/* 스켈레톤 UI */}
        {isLoading && (
          <SkeletonWrapper>
            {Array.from({ length: COMMENTS_PER_LOAD }).map((_, index) => (
            <SkeletonComment key={`skeleton-${index}`} />
          ))}
          </SkeletonWrapper>
        )}

      </CommentList>
      )}
    </Comment>
  );
};

export default ChallengeComment;

const Comment = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 60px;
  align-self: stretch;
`

const CommentAdd = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 30px;
  align-self: stretch;
`

const Title = styled.div`
  display: flex;
  width: 134px;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
`

const StarScore = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  align-self: stretch;
`

const CommentList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 40px;
  align-self: stretch;
`

const CommentCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 32px;
  align-self: stretch;
`

const Author = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`

const ProfileImg = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50px;
  background: #D9D9D9;
`

const AuthorInfo = styled.div`
  display: flex;
  width: 900px;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
`

const CommentDate = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  align-self: stretch;
`

const SkeletonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 56px;
`