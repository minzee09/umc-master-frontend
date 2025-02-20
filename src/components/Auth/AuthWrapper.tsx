import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTokenStore } from '@store/tokenStore';
import RoutePaths from '@router/routePaths';

interface AuthWrapperProps {
  children: React.ReactNode;
}

const AuthWrapper = ({ children }: AuthWrapperProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { accessToken } = useTokenStore.getState();

  useEffect(() => {
    // 로그인 페이지가 아니고 토큰이 없는 경우 리다이렉트
    if (!accessToken && location.pathname !== RoutePaths.LANDING) {
      navigate(RoutePaths.LOGIN, { replace: true });
    }
  }, [accessToken, location.pathname, navigate]);

  // 토큰이 없고 로그인 페이지가 아닌 경우 아무것도 렌더링하지 않음
  if (!accessToken && location.pathname !== RoutePaths.LOGIN) {
    return null;
  }

  return <>{children}</>;
};

export default AuthWrapper;
