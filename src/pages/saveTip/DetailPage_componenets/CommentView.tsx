/* eslint-disable react/prop-types */
import Typography from "@components/common/typography";
import { useCallback, useEffect, useRef, useState } from "react";
// import { useParams } from "react-router-dom";
import styled, { useTheme } from "styled-components";
import { generateComments } from "../dummydata/dummydata";
import SkeletonComment from "@components/Skeleton/SkeletonComment";


const commentCount = 1000; // 실제 데이터에서 가져올 값
const formattedNumber = new Intl.NumberFormat().format(commentCount);

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

const CommentView: React.FC = () => {

  const theme = useTheme();
  // const { tipId } = useParams<{ tipId: string }>();

  const comment = generateComments(1300);
  
  const [comments, setComments] = useState<{ author: string; date: string; time: string; comment: string }[]>(comment.slice(0, COMMENTS_PER_LOAD * 2));
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 관리
  const [hasMore, setHasMore] = useState(comment.length > COMMENTS_PER_LOAD);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useRef<HTMLDivElement | null>(null);

  const handleAddComment = () => {
    if (inputValue.trim().length === 0) return;
    setComments((prevComments) => [
      {
        author: "내이름", // 예시로 새 댓글 작성자 지정
        date: "2025.02.02", // 예시로 새 댓글 작성 날짜 지정
        time: "2:43", // 예시로 새 댓글 작성 시간 지정
        comment: inputValue, // 새 댓글 내용
      },
      ...prevComments,
    ]);
    setInputValue("");
  };

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
      <CommentAdd>
        <Title>
          <Typography
            variant="headingXxxSmall"
            style={{color: theme.colors.text.black}}
          >댓글</Typography>
          <Typography 
            variant="titleXxxSmall"
            style={{color: theme.colors.text.gray}}
          >({formattedNumber})</Typography>
        </Title>
        <StyledInput 
          type={'text'} 
          placeholder={'댓글을 작성해주세요. (최대 300자)'} 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAddComment()}
        />
      </CommentAdd>
      {comments.length === 0 && !isLoading ? (
        <Typography variant="bodySmall">아직 댓글이 없습니다.</Typography>
      ) : (
        <CommentList>
          {comments.map((cmt, index) => (
            <CommentCard key={index}>
              <Author>
                <ProfileImg />
                <AuthorInfo>
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
                </AuthorInfo>
              </Author>
              <CommentText text={cmt.comment} />
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

export default CommentView;

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
  align-items: center;
  align-self: stretch;
  gap: 10px;
`

const StyledInput = styled.input`
  display: flex;
  height: 72px;
  padding: 23px 32px;
  align-items: center;
  align-self: stretch;
  border-radius: 20px;
  border: 2px solid ${({ theme }) => theme.colors.primary[400]};
  background: ${({ theme }) => theme.colors.text.white};

  color: ${({ theme }) => theme.colors.text.gray};

  font-family: ${({ theme }) => theme.fontFamily.regular};
  font-size: ${({ theme }) => theme.typography.body.small.size};
  font-weight: ${({ theme }) => theme.typography.body.small.weight};
  line-height: ${({ theme }) => theme.typography.body.small.lineHeight};
  letter-spacing: -0.48px;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary[500]};
  }
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
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background: #D9D9D9;
`

const AuthorInfo = styled.div`
  display: flex;
  width: 125px;
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