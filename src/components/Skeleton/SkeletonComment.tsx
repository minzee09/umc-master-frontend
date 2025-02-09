import styled, { keyframes } from "styled-components";

const shimmer = keyframes`
  0% { opacity: 0.6; }
  50% { opacity: 1; }
  100% { opacity: 0.6; }
`;

const SkeletonComment: React.FC = () => {
    
  return (
      <CommentCard>
        <Author>
          <ProfileImg/>
          <AuthorInfo>
            <Nickname />
            <CommentDate />
          </AuthorInfo>
         </Author>
        <Content />
      </CommentCard>
  );
};

export default SkeletonComment;

const CommentCard = styled.div`
  width: 1080px;
  height: 121px;
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
  background: ${({ theme }) => theme.colors.text.lightGray};
  animation: ${shimmer} 1.5s infinite linear;
`

const AuthorInfo = styled.div`
  display: flex;
  width: 128px;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
`

const Nickname = styled.div`
  width: 108px;
  height: 30px;
  display: flex;
  background: ${({ theme }) => theme.colors.text.lightGray};
  border-radius: 12px;
  animation: ${shimmer} 1.5s infinite linear;
`

const CommentDate = styled.div`
  width: 168px;
  height: 24px;
  display: flex;
  background: ${({ theme }) => theme.colors.text.lightGray};
  border-radius: 12px;
  animation: ${shimmer} 1.5s infinite linear;
`

const Content = styled.div`
  width: 100%;
  min-height: 40px;
  display: flex;
  background: ${({ theme }) => theme.colors.text.lightGray};
  border-radius: 12px;
  animation: ${shimmer} 1.5s infinite linear;
`