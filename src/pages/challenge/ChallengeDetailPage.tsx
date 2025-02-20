import styled from "styled-components";
import ChallengeComment from "./DetailPage_component/ChallengeComment";
import ChallengeDetail from "./DetailPage_component/ChallengeDetail";
import { ChallengeDetailPageDataList, dummyData } from "@pages/challenge/dummydata/dummydata";
import FloatingToggleBtn from "./DetailPage_component/FloatingToggleBtn";
import { useParams } from "react-router-dom";

const ChallengeDetailPage: React.FC = () => {

  const { id } = useParams<{ id: string }>();

  const detail = dummyData.find((item) => item.id === id);

  if (!detail) {
    return <div>데이터를 찾을 수 없습니다.</div>;
  }
  
  return (
    <Container>
      <Content>
        <ChallengeDetail detail={ChallengeDetailPageDataList[0]} />
        <Line />
        <ChallengeComment />
      </Content>
      <FloatingToggleBtn />
    </Container>
  );
};

export default ChallengeDetailPage;

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

const Content = styled.div`
  display: flex;
  width: 1280px;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: 60px;
`

const Line = styled.div`
  width: 1280px;
  height: 1px;
  border: 1px solid ${({ theme }) => theme.colors.primary[800]};
`