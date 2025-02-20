import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '@apis/axios-instance';
import { useTokenStore } from '@store/tokenStore';
import { useAuthStore } from '@store/authStore';

const KakaoCallback: React.FC = () => {
  const { setAuth } = useAuthStore();
  const { setTokens } = useTokenStore();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      console.log('✅ 카카오 로그인 코드 확인:', code);

      axiosInstance
        .post('/login/kakao', { code })
        .then((response) => {
          const { accessToken, refreshToken } = response.data.result;
          setTokens({ accessToken, refreshToken });
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);
          setAuth(true);
          navigate('/main');
        })
        .catch(() => {
          // console.error('❌ 카카오 로그인 실패:', error.response?.data || error.message);
          // alert(error.response?.data?.message || '카카오 로그인에 실패했습니다.');
          navigate('/');
        });
    } else {
      console.warn('⚠️ 카카오 로그인 코드 없음');
    }
  }, [navigate]);

  return <></>;
};

export default KakaoCallback;
