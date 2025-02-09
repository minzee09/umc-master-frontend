import { create } from 'zustand';
import { useTokenStore } from './tokenStore';

interface AuthState {
  auth: boolean;
  setAuth: (auth: boolean, tokens?: { accessToken: string; refreshToken: string }) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => {
  // 새로고침 시 localStorage에서 토큰 읽어오기
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  // 초기 로드 시 토큰을 tokenStore에 설정
  if (accessToken && refreshToken) {
    useTokenStore.getState().setTokens({ accessToken, refreshToken });
  }

  return {
    auth: !!accessToken, 
    setAuth: (auth, tokens) => {
      set({ auth });
      if (auth && tokens) {
        localStorage.setItem('accessToken', tokens.accessToken);
        localStorage.setItem('refreshToken', tokens.refreshToken);
        useTokenStore.getState().setTokens(tokens);
      }
    },
    clearAuth: () => {
      useTokenStore.getState().clearTokens();
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      set({ auth: false });
    },
  };
});
