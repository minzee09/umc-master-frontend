import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import CloseIcon from '@assets/icons/close.svg?react';
import UserIcon from '@assets/icons/user.svg?react';
import TipIcon from '@assets/icons/tip.svg?react';
import LogoutIcon from '@assets/icons/logout.svg?react';
import Typography from '@components/common/typography';
import theme from '@styles/theme';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <ModalWrapper onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>
          <CloseIcon />
        </CloseButton>
        <ProfileWrapper>
          <ProfileImage />
          <Typography variant="titleXSmall">애니 님</Typography>
        </ProfileWrapper>
        <MenuList>
          <Typography variant="titleXxSmall" style={{ color: theme.colors.primary[600] }}>
            <MenuItemLink to="/mypage" onClick={onClose}>
              <UserIcon /> 마이페이지
            </MenuItemLink>
            <MenuItem onClick={onClose}>
              <TipIcon /> 마이꿀팁
            </MenuItem>
            <MenuItem
              onClick={() => {
                // TODO: 추후 API를 사용하여 로그아웃 기능 연결
                onClose();
              }}
            >
              <LogoutIcon /> 로그아웃
            </MenuItem>
          </Typography>
        </MenuList>
      </ModalContent>
    </ModalWrapper>
  );
};

export default ProfileModal;

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 150px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  padding: 80px 20px 0 0;
  z-index: 999;
`;

const ModalContent = styled.div`
  position: relative;
  width: 420px;
  padding: 20px;
  border-radius: 10px;
  border: 2px solid ${({ theme }) => theme.colors.primary[600]};
  background: ${({ theme }) => theme.colors.text.white};
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background: none;
  cursor: pointer;
`;

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 20px 0;
`;

const ProfileImage = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.text.lightGray};
`;

const MenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 20px 0;
`;

const MenuItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
  padding: 16px;
  border: 1px solid ${({ theme }) => theme.colors.primary[600]};
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    background: #e9e9e9;
  }
`;

// "마이페이지" 링크 전용 컴포넌트
const MenuItemLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
  padding: 16px;
  border: 1px solid ${({ theme }) => theme.colors.primary[600]};
  border-radius: 10px;
  cursor: pointer;
  text-decoration: none;
  color: ${theme.colors.primary[600]};

  &:hover {
    background: #e9e9e9;
  }
`;
