import { create } from 'zustand';

interface ModalState {
  isModalVisible: boolean;
  showModal: () => void;
  hideModal: () => void;
}

// Zustand 스토어 생성
export const useModalStore = create<ModalState>((set) => ({
  isModalVisible: false,
  showModal: () => set({ isModalVisible: true }),
  hideModal: () => set({ isModalVisible: false }),
}));
