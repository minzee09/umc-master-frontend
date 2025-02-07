import Typography from '@components/common/typography';
import styled, { useTheme } from 'styled-components';
import CameraImg from '@assets/icons/cameraImg.svg'
import { useState } from 'react';
import ProfileEditModal from '../modal/ProfileEditModal';


const ProfileSection: React.FC = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const theme = useTheme();
  return (
    <ProfileCard>
      <State>
        <ProfileImg/>
        <Img src={CameraImg}/>
      </State>
      <Card>
        <Text>
          <Hello>
            <Typography 
              variant='headingXxxSmall'
              style={{color: theme.colors.text.black}}
            >애니</Typography>
            <Typography
              variant='bodySmall'
              style={{color: theme.colors.text.black}}
            >님 오늘도 반가워요!</Typography>
          </Hello>
          <LoginType>카카오 로그인</LoginType>
        </Text>
        <ProfileEdit onClick={() => setIsModalOpen(true)}>프로필 변경</ProfileEdit>
        <ProfileEditModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onEdit={() => console.log("Edit")}
        />
      </Card>
    </ProfileCard>
  );
};

export default ProfileSection;

const ProfileCard = styled.div`
  display: flex;
  align-items: center;
  gap: 60px;
`

const State = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ProfileImg = styled.div`
  width: 140px;
  height: 140px;
  background-color: rgb(230, 230, 230);
  border-radius: 50%;
`

const Img = styled.img`
  position: absolute;
  bottom: -13px;
  right: -33px;
  width: 60px;
  height: 60px;
  flex-shrink: 0;
`

const Card = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1100px;
  height: 140px;
  padding: 18px 56px 20px 56px;
  gap: 10px;
  border-radius: 20px;
  border: 1px solid var(--Text-gray, #636363);
  background-color: #fff;
  position: relative;
`

const Text = styled.div`
  display: flex;
  width: 565px;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
`

const Hello = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const ProfileEdit = styled.button`
  position: absolute;
  right: 56px;

  display: flex;
  width: 196px;
  height: 60px;
  padding: 17px 5px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  border-radius: 20px;
  background: ${({ theme }) => theme.colors.primary[500]};
  color: #FFF;

  font-family: ${({ theme }) => theme.fontFamily.medium};
  font-size: ${({ theme }) => theme.typography.title.xxsmall.size};
  font-weight: ${({ theme }) => theme.typography.title.xxsmall.weight};
  line-height: ${({ theme }) => theme.typography.title.xxsmall.lineHeight};
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.primary[600]};
  }
`

const LoginType = styled.button`
  display: flex;
  width: 160px;
  height: 50px;
  padding: 18px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 20px;
  background: #3B1E1E;
  color: #FFF;

  font-family: ${({ theme }) => theme.fontFamily.medium};
  font-size: ${({ theme }) => theme.typography.body.small.size};
  font-weight: ${({ theme }) => theme.typography.body.small.weight};
  line-height: ${({ theme }) => theme.typography.body.small.lineHeight};
`