import { create } from 'zustand';

interface TokenStore {
  accessToken: string | null;
  refreshToken: string | null;
  setTokens: (tokens: { accessToken: string; refreshToken: string }) => void;
  clearTokens: () => void;
}

export const useTokenStore = create<TokenStore>((set) => ({
  accessToken: null,
  refreshToken: `${import.meta.env.VITE_REFRESH_TOKEN}`,
  setTokens: (tokens) => {
    console.log('Setting Tokens:', tokens);
    set(() => ({
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    }));
    console.log('Tokens after Setting:', useTokenStore.getState());
  },
  clearTokens: () => {
    set(() => ({
      accessToken: null,
      refreshToken: null,
    }));
    console.log('Tokens Cleared:', useTokenStore.getState());
  },
}));
