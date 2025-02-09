import React from 'react';
import styled from 'styled-components';
import dummyCat from '@assets/dummyCat.jpg';
import Typography from '@components/common/typography';
import { useModalStore } from '@store/modalStore';

const CompeleteModal: React.FC = () => {
  const hideModal = useModalStore((state) => state.hideModal);

  return (
    <ModalContainer>
      <ModalContent>
        <StyledImg src={dummyCat} />
        <Typography variant="titleXSmall">당신의 꿀팁이 등록되었습니다!</Typography>
        <CloseBTN onClick={hideModal}>
          <Typography variant="bodyMedium">확인</Typography>
        </CloseBTN>
      </ModalContent>
    </ModalContainer>
  );
};

export default CompeleteModal;

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const ModalContent = styled.div`
  width: 440px;
  background: ${({ theme }) => theme.colors.text['white']};
  border-radius: 10px;
  border: 2px solid ${({ theme }) => theme.colors.text['gray']};
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 13px 0px 49px 0px;
`;

const StyledImg = styled.img`
  margin-bottom: 38px;
`;

const CloseBTN = styled.div`
  padding: 15px 147px;
  background-color: ${({ theme }) => theme.colors.primary[700]};
  color: ${({ theme }) => theme.colors.text['white']};
  border-radius: 20px;
  margin-top: 20px;
`;
