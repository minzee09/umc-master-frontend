import { create } from 'zustand';
import { getUsers } from '@apis/profileApi';

interface User {
    user_id: number;
    email: string;
    nickname: string;
    city: string | null;
    district: string | null;
    profile_image_url: string | null;
    provider: string;
    providerId: string;
    role: string;
    status: string;
    created_at: string;
    updated_at: string;
    last_login: string | null;
    location_id: string | null;
  }

interface UserState {
  user: User | null;
  fetchUser: () => Promise<void>;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,

  fetchUser: async () => {
    try {
      const data = await getUsers();
      console.log('스토어에 저장할 데이터:', data);  // 가져온 데이터 확인

      // 데이터가 존재하면 저장, 아니면 null 처리
      if (data) {
        set({ user: data as User });  // User 타입으로 캐스팅 후 저장
        console.log('저장된 상태:', useUserStore.getState().user);
      } else {
        console.warn('API 응답이 비어 있습니다.');
        set({ user: null });
      }
    } catch (error) {
      console.error('사용자 정보 조회 실패:', error);
    }
  },

  clearUser: () => set({ user: null }),
}));
