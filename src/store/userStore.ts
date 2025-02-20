import { create } from 'zustand';
import { getUsers } from '@apis/profileApi';
import axiosInstance from '@apis/axios-instance';

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
  hashtags: string[];
}
interface ProfileUpdateData {
  nickname?: string;
  city?: string;
  district?: string;
  hashtags?: string[];
}

interface UserState {
  user: User | null;
  profileImageUrl: string;
  setProfileImageUrl: (url: string) => void;
  fetchUser: () => Promise<void>;
  updateProfile: (profileData: ProfileUpdateData) => Promise<void>;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,

  fetchUser: async () => {
    try {
      const data = await getUsers();
      console.log('스토어에 저장할 데이터:', data); // 가져온 데이터 확인

      // 데이터가 존재하면 저장, 아니면 null 처리
      if (data) {
        set({ user: data as User }); // User 타입으로 캐스팅 후 저장
        console.log('저장된 상태:', useUserStore.getState().user);
      } else {
        console.warn('API 응답이 비어 있습니다.');
        set({ user: null });
      }
    } catch (error) {
      console.error('사용자 정보 조회 실패:', error);
    }
  },

  updateProfile: async (profileData: { nickname?: string; city?: string; district?: string; hashtags?: string[] }) => {
    try {
      const response = await axiosInstance.put('/profile', profileData);
      set({ user: response.data });
    } catch (error) {
      console.error('Failed to update profile:', error);
      throw error;
    }
  },

  clearUser: () => set({ user: null }),

  profileImageUrl: "",
  setProfileImageUrl: (url) => set({ profileImageUrl: url }),
}));
