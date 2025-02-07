/* eslint-disable react/prop-types */
import Button from "@components/Button/Button";
import Typography from "@components/common/typography";
import Input from "@components/Input/Input";
import { useEffect, useState } from "react";
import styled, { useTheme } from "styled-components";

const emails = [
  { value: "naver.com", label: "naver.com" },
  { value: "daum.net", label: "daum.net" }, 
  { value: "gmail.com", label: "gmail.com" }, 
  { value: "nate.com", label: "nate.com" }, 
  { value: "icloud.com", label: "icloud.com" }, 
  { value: "outlook.com", label: "outlook.com" }, 
];

const EmailForm: React.FC<{ onCheckRequired: (isValid: boolean) => void }> = ({ onCheckRequired }) => {
  
  const theme = useTheme();

  const [email, setEmail] = useState<string>('');
  const [authCode, setAuthCode] = useState<string>('');

  // 이메일과 인증번호 입력이 모두 채워졌는지 확인하는 useEffect
  useEffect(() => {
    if (email && authCode) {
      onCheckRequired(true); // 유효성 체크
    } else {
      onCheckRequired(false); // 유효성 체크
    }
  }, [email, authCode, onCheckRequired]);

  return (
    <Container>
      <Typography 
        variant="headingXxxSmall"
        style={{color: theme.colors.primary[700]}}
      >이메일 입력 (필수) *</Typography>
      <Email>
        <Input 
          errorMessage="" 
          type={'email'} 
          placeholder={'이메일 입력'} 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Typography 
          variant="titleSmall"
          style={{color: theme.colors.text.lightGray}}
        >@</Typography>
        <EmailSelect>
          {emails.map((email) => (
            <option key={email.value} value={email.value}>
              {email.label}
            </option>
          ))}
        </EmailSelect>
        <Button variant="emailCheck">이메일 인증</Button>
      </Email>
      <Email>
        <Input 
          errorMessage="" 
          type={'email'} 
          placeholder={'인증번호를 입력해주세요.'} 
          value={authCode}
          onChange={(e) => setAuthCode(e.target.value)}
        />
        <Button variant="emailCheck">인증 확인</Button>
      </Email>
    </Container>
  );
};

export default EmailForm;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 30px;
  align-self: stretch;
`

const Email = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 21px;
  align-self: stretch;
`

const EmailSelect = styled.select`
  display: flex;
  min-width: 252px;
  height: 72px;
  padding: 21px 72px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 20px;
  border: 2px solid ${({ theme }) => theme.colors.text.lightGray};
  background: #FFF;

  font-size: ${({ theme }) => theme.typography.body.small.size};
  font-weight: ${({ theme }) => theme.typography.body.small.weight};
  line-height: ${({ theme }) => theme.typography.body.small.lineHeight};

  appearance: none; /* 기본 드롭다운 화살표 제거 */

  /* 드롭다운 화살표 추가 */
  background-image: url('/src/assets/Dropdown Arrow.svg');
  background-repeat: no-repeat;
  background-position: right 16px center;
  background-size: 25px;

  & option {
    padding: 8px 12px;
    background-color: ${({ theme }) => theme.colors.text.white};
    color: ${({ theme }) => theme.colors.text.black};
  }
`