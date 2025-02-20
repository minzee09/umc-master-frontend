import RoutePaths from '@router/routePaths';
import { useTokenStore } from '@store/tokenStore';
import axios, { AxiosInstance } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
  },
  baseURL: import.meta.env.VITE_BASE_URL,
});

// Refresh token function
const refreshAccessToken = async (refreshToken: string) => {
  try {
    const response = await axiosInstance.post('/token/refresh', {
      refreshToken,
    });
    // console.log('New Access Token from Server:', response.data.result.accessToken);
    return response.data.result.accessToken;
  } catch (error) {
    console.error('Error refreshing access token:', error);
    throw error;
  }
};

axiosInstance.interceptors.request.use((config) => {
  const { accessToken } = useTokenStore.getState();

  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }
  // console.log('Request Headers:', config.headers);
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      const { refreshToken } = useTokenStore.getState();

      try {
        if (refreshToken) {
          const newAccessToken = await refreshAccessToken(refreshToken);

          // 토큰 상태 설정
          useTokenStore.getState().setTokens({
            accessToken: newAccessToken,
            refreshToken,
          });

          // 새 토큰이 적용되는지 확인하기 위한 로그 추가
          // console.log('New Access Token:', newAccessToken);

          // 원래 요청에 새로운 토큰 적용
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

          // console.log('Retrying request with new token:', originalRequest.headers['Authorization']);

          // 재시도
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        // 토큰 갱신 실패 시 명확한 로그아웃 처리
        console.error('토큰 갱신 실패:', refreshError);
        useTokenStore.getState().clearTokens();

        // 로그인 페이지로 리다이렉트
        if (window.location.pathname !== RoutePaths.LOGIN) {
          window.location.href = RoutePaths.LOGIN;
        }

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
