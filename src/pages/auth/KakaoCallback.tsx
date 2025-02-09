import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const KakaoCallback: React.FC = () => {

  const navigate = useNavigate();

  useEffect(() => {
    const getAccessToken = async () => {
      const queryParams = new URLSearchParams(window.location.search);
      const code = queryParams.get('code');

      if (!code) {
        console.error('Authorization code not found');
        return;
      }

      try {
        // 카카오에서 Access Token 요청
        const response = await axios.post('https://kauth.kakao.com/oauth/token', {
          grant_type: 'authorization_code',
          client_id: import.meta.env.VITE_KAKAO_API_KEY,
          redirect_uri: 'http://localhost:3000/oauth/kakao/callback',
          code,
        });

        const kakaoAccessToken = response.data.access_token;

        // 백엔드로 카카오 Access Token 전송
        const backendResponse = await axios.post('http://localhost:3000/login/kakao', {
          kakaoAccessToken,
        });

        const { accessToken, refreshToken } = backendResponse.data.result;

        // Access Token 및 Refresh Token 저장 (예: 로컬 스토리지)
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);

        // 홈 또는 사용자 대시보드로 이동
        navigate('/');
      } catch (error) {
        console.error('Failed to login with Kakao:', error);
      }
    };

    getAccessToken();
  }, [navigate]);

  return <div>카카오 로그인 중…</div>;
};

export default KakaoCallback;
