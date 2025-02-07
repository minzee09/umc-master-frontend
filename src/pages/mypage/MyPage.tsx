import styled, { useTheme } from "styled-components";
import ProfileSection from "./components/ProfileSection";
import RecentTips from "./components/RecentTips";
import BestInterest from "./components/BestInterest";
import { dummyData, dummyInterests } from "./dummyData/dummyData";
import Typography from "@components/common/typography";

const MyPage: React.FC = () => {

    const theme = useTheme();
    return (
      <Container>
        <MyPageForm>
          <Typography 
            variant="headingXxSmall"
            style={{color: theme.colors.primary[900]}}
            >마이페이지</Typography>
          <ProfileSection/>
          <ProfileCard>
            <RecentTips items={dummyData}/>
            <BestInterest interests={dummyInterests}/>
          </ProfileCard>
        </MyPageForm>
      </Container>
    );
  };
  
export default MyPage;
  
const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #FFF;
`

const MyPageForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1280px;
  gap: 48px;
  padding-top: 80px;
  padding-bottom: 100px;
`

const ProfileCard = styled.div`
  display: flex;
  flex-direction: row;
  gap: 30px;
  flex-shrink: 0;
`