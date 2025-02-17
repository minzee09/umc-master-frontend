import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ArrowIcon from '@assets/icons/right_arrow.svg?react';
import Typography from '@components/common/typography';

interface SidebarProps {
  onToggle: (isOpen: boolean) => void;
  chatRooms: { id: number; history: { question: string; answer: string }[] }[];
  setCurrentRoomId: (id: number) => void;
  createNewChatRoom: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onToggle, chatRooms, setCurrentRoomId, createNewChatRoom }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    setTimeout(() => setShowContent(true), 200);
  };

  const handleClose = () => {
    setShowContent(false);
    setTimeout(() => setIsOpen(false), 300);
  };

  useEffect(() => {
    onToggle(isOpen);
  }, [isOpen, onToggle]);

  return (
    <SidebarWrapper>
      <SidebarButton $isOpen={isOpen} onClick={isOpen ? handleClose : handleOpen}>
        {!isOpen && <ArrowIcon />}
      </SidebarButton>
      <SidebarContent $isOpen={isOpen}>
        <ContentWrapper $isVisible={showContent}>
          <Header>
            <Typography variant="headingXxSmall">RECORD</Typography>
            <CloseButton onClick={handleClose}>✕</CloseButton>
          </Header>
          <Divider />
          {chatRooms.map((room) => (
            <ChatRoomItem key={room.id} onClick={() => setCurrentRoomId(room.id)}>
              채팅방 {room.id}
            </ChatRoomItem>
          ))}
          <AddRoomButton onClick={createNewChatRoom}>+ 새 채팅방 만들기</AddRoomButton>
        </ContentWrapper>
      </SidebarContent>
    </SidebarWrapper>
  );
};

export default Sidebar;

const SidebarWrapper = styled.div`
  position: fixed;
  top: 80px;
  bottom: 140px;
  left: -10px;
  height: 80vh;
  display: flex;
  align-items: stretch;
  z-index: 2000;
`;

const SidebarButton = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== '$isOpen',
})<{ $isOpen: boolean }>`
  width: ${({ $isOpen }) => ($isOpen ? '250px' : '60px')};
  height: 100%;
  border-radius: 0 10px 10px 0;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.primary[400]};
  transition:
    width 0.5s ease,
    transform 0.3s ease,
    background-color 0.5s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  &:hover {
    transform: ${({ $isOpen }) => ($isOpen ? 'none' : 'translateX(10px)')};
    background-color: ${({ theme }) => theme.colors.primary[500]};
  }
`;

const SidebarContent = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== '$isOpen',
})<{ $isOpen: boolean }>`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: ${({ $isOpen }) => ($isOpen ? '300px' : '0')};
  background-color: ${({ theme }) => theme.colors.primary[700]};
  color: white;
  padding: ${({ $isOpen }) => ($isOpen ? '30px' : '0')};
  overflow: hidden;
  transition:
    width 0.5s ease,
    padding 0.5s ease,
    background-color 0.5s ease;
  display: flex;
  flex-direction: column;
  gap: 15px;
  box-sizing: border-box;
  border-radius: 0 10px 10px 0;
`;

const ContentWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== '$isVisible',
})<{ $isVisible: boolean }>`
  opacity: ${({ $isVisible }) => ($isVisible ? '1' : '0')};
  transform: ${({ $isVisible }) => ($isVisible ? 'translateX(0)' : 'translateX(-20px)')};
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CloseButton = styled.div`
  cursor: pointer;
  font-size: 1.5rem;
  padding: 5px;
  color: white;
  transition: color 0.3s ease;
  &:hover {
    color: ${({ theme }) => theme.colors.primary[500]};
  }
`;

const Divider = styled.hr`
  border: none;
  height: 2px;
  background-color: white;
  margin: 24px 0;
`;

const ChatRoomItem = styled.div`
  margin-bottom: 16px;
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.colors.primary[300]};
  }
`;

const AddRoomButton = styled.button`
  padding: 10px;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;
