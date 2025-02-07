/* eslint-disable react/prop-types */
import Typography from "@components/common/typography";
import Input from "@components/Input/Input";
import { useEffect, useState } from "react";
import { styled, useTheme } from "styled-components";


const PasswordForm: React.FC<{ onCheckRequired: (isValid: boolean) => void }> = ({ onCheckRequired }) => {

  const theme = useTheme();

  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  useEffect(() => {
    if (password && confirmPassword && password === confirmPassword) {
      onCheckRequired(true);
    } else {
      onCheckRequired(false);
    }
  }, [password, confirmPassword]);
  
  return (
    <Container>
      <Typography 
        variant="headingXxxSmall"
        style={{color: theme.colors.primary[700]}}
      >비밀번호 입력 (필수) *</Typography>
      <Input 
        errorMessage="" 
        type={'password'} 
        placeholder={'비밀번호 입력 (숫자, 영문자, 문자 포함 8~15자 이내)'}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Input 
        errorMessage="" 
        type={'password'} 
        placeholder={'비밀번호 확인'} 
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
    </Container>
  );
};

export default PasswordForm;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 30px;
  align-self: stretch;
`