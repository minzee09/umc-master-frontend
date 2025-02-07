import Typography from "@components/common/typography";
import styled, { useTheme } from "styled-components";

const Title: React.FC = () => {

  const theme = useTheme();
  return (
      <LoginTitle>
          <Typography 
            variant="headingSmall"
            style={{color: theme.colors.primary[700]}}
          >로그인</Typography>
          <Typography 
            variant="titleXSmall"
            style={{color: theme.colors.text.gray}}
          >지금 마스터원에서 자취 꿀팁을 얻어가세요!</Typography>
      </LoginTitle>
  );
};

export default Title;

const LoginTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`