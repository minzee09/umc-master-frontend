import styled from "styled-components";
import Title from "./Login_components/Title";
import InputForm from "./Login_components/InputForm";

const LoginPage: React.FC = () => {

  return (
    <Container>
      <LoginForm>
        <Title/>
        <InputForm/>
      </LoginForm>
    </Container>
  );
};

export default LoginPage;

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 84px;
  padding-bottom: 84px;
  background: #FFF;
`

const LoginForm = styled.div`
  display: flex;
  width: 616px;
  flex-direction: column;
  align-items: center;
  gap: 40px;
`