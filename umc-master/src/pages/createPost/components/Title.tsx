/* eslint-disable react/prop-types */
import Typography from '@components/common/typography';
import styled from 'styled-components';

interface TextInputProps {
  type: 'input' | 'textarea';
  title: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}

const Title: React.FC<TextInputProps> = ({ title, type, value, placeholder, onChange }) => {
  return (
    <Container>
      <TitleDiv>
        <Typography variant="titleXSmall">{title}</Typography>
      </TitleDiv>
      {type === 'input' ? (
        <TitleInputContainer>
          <TitleInput value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
        </TitleInputContainer>
      ) : (
        <TextAreaContainer>
          <TextArea value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
        </TextAreaContainer>
      )}
    </Container>
  );
};

export default Title;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
  align-items: center;
  justify-content: center;
`;

const TitleDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: 40px;
  margin-bottom: 24px;
  width: 1280px;
`;

const TitleInputContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TitleInput = styled.input`
  height: 70px;
  width: 1280px;
  border-radius: 20px;
  border: 2px solid ${({ theme }) => theme.colors.text['gray']};
  font-size: 18px;
  line-height: 27px;
  padding-left: 32px;
`;

const TextAreaContainer = styled.div``;

const TextArea = styled.textarea`
  width: 1280px;
  padding: 23px 32px;
  min-height: 338px;
  border: 2px solid ${({ theme }) => theme.colors.text['gray']};
  border-radius: 20px;
  font-size: 18px;
`;
