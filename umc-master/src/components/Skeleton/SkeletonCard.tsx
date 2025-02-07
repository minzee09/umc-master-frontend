import styled from 'styled-components';

const SkeletonCard = () => {
  return (
    <SkeletonContainer>
      <SkeletonImage />
      <SkeletonText />
      <SkeletonDetails>
        <SkeletonIcon />
        <SkeletonIcon />
      </SkeletonDetails>
      <SkeletonDate />
    </SkeletonContainer>
  );
};

export default SkeletonCard;

const SkeletonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  background-color: ${({ theme }) => theme.colors.text['white']};
  overflow: hidden;
  cursor: pointer;
  border-radius: 12px;
`;

const SkeletonImage = styled.div`
  width: 240px;
  height: 200px;
  background-color: ${({ theme }) => theme.colors.text['lightGray']};
  border-radius: 12px;
  animation: shimmer 1.5s infinite linear;
`;

const SkeletonText = styled.div`
  width: 100%;
  height: 20px;
  background-color: ${({ theme }) => theme.colors.text['lightGray']};
  margin-top: 10px;
  border-radius: 4px;
  animation: shimmer 1.5s infinite linear;
`;

const SkeletonDetails = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
  margin-top: 5px;
`;

const SkeletonIcon = styled.div`
  width: 50px;
  height: 15px;
  background-color: ${({ theme }) => theme.colors.text['lightGray']};
  border-radius: 4px;
  animation: shimmer 1.5s infinite linear;
`;

const SkeletonDate = styled.div`
  width: 80px;
  height: 15px;
  background-color: ${({ theme }) => theme.colors.text['lightGray']};
  margin-top: 8px;
  border-radius: 4px;
  animation: shimmer 1.5s infinite linear;

  @keyframes shimmer {
    0% {
      opacity: 0.6;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0.6;
    }
  }
`;
