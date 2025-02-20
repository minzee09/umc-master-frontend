import { create } from 'zustand';

interface TokenStore {
  accessToken: string | null;
  refreshToken: string | null;
  setTokens: (tokens: { accessToken: string; refreshToken: string }) => void;
  clearTokens: () => void;
}

export const useTokenStore = create<TokenStore>((set) => ({
  accessToken: null,
  refreshToken: null /* 로그인 기능 완성 후 수정 예정임 */,
  setTokens: (tokens) => {
    // console.log('Setting Tokens:', tokens);
    set(() => ({
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    }));
    // console.log('Tokens after Setting:', useTokenStore.getState());
  },
  clearTokens: () => {
    set(() => ({
      accessToken: null,
      refreshToken: null,
    }));
    // console.log('Tokens Cleared:', useTokenStore.getState());
  },
}));
