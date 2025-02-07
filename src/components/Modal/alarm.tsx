/* eslint-disable react/prop-types */
import styled, { useTheme } from 'styled-components';
import AlarmIcon from '@assets/icons/alarm.svg?react';
import CloseIcon from '@assets/icons/close.svg?react';
import Typography from '@components/common/typography';

const DUMMY_ALARMS = [
  { id: 1, message: '뉴비님이 애니님의 꿀팁을 저장했어요!', time: '1시간 전' },
  { id: 2, message: '애니님이 올린 게시물이 이 주의 꿀팁 BEST 5에 선정되었어요!', time: '2시간 전' },
  { id: 3, message: '애니님! NEW 꿀팁이 올라왔어요!', time: '2시간 전' },
  { id: 4, message: '애니님! MASTER1의 신규 회원이 되신 것을 환영합니다!', time: '4시간 전' },
];

interface AlarmModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AlarmModal: React.FC<AlarmModalProps> = ({ isOpen, onClose }) => {
  const theme = useTheme();
  if (!isOpen) return null;

  return (
    <ModalWrapper onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>
          <CloseIcon />
        </CloseButton>
        <Header>
          <Title>
            <AlarmIcon fill={theme.colors.primary[800]} />
            <Typography variant="headingXxSmall">알림</Typography>
          </Title>
        </Header>
        <Divider />
        <NotificationList>
          {DUMMY_ALARMS.map((alarm) => (
            <NotificationItem key={alarm.id}>
              <Typography variant="bodyMedium" style={{ width: '90%', color: theme.colors.primary[600] }}>
                {alarm.message}
              </Typography>
              <Time>{alarm.time}</Time>
            </NotificationItem>
          ))}
        </NotificationList>
      </ModalContent>
    </ModalWrapper>
  );
};

export default AlarmModal;

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 120px;
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
  max-width: 540px;
  padding: 38px 40px;
  border-radius: 10px;
  border: 2px solid ${({ theme }) => theme.colors.primary[700]};
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  background: ${({ theme }) => theme.colors.text.white};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${({ theme }) => theme.colors.primary[800]};
`;

const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  border: none;
  background: none;
  cursor: pointer;
`;

const Divider = styled.hr`
  margin: 8px 0;
  border: none;
  border-top: 1px solid ${({ theme }) => theme.colors.primary[700]};
`;

const NotificationList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const NotificationItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding-top: 32px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.text.gray};

  &:last-child {
    border-bottom: none;
  }
`;

const Time = styled.span`
  font-size: 12px; /**TODO: 디자인 시스템 수정시 반영 예정 */
  align-self: flex-end;
  margin: 20px 0;
  padding-top: 20px;
  color: ${({ theme }) => theme.colors.text.gray};
`;
