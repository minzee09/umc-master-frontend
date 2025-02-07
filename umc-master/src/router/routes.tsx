import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RoutePaths from './routePaths';
import LandingPage from '@pages/landing/LandingPage';
import LoginPage from '@pages/auth/LoginPage';
import SignupPage from '@pages/auth/SignUpPage';
import MyPage from '@pages/mypage/MyPage';
import MainPage from '@pages/main/MainPage';
import SearchPage from '@pages/search/SearchPage';
import SaveTipPage from '@pages/saveTip/SaveTipPage';
import SaveTipDetailPage from '@pages/saveTip/SaveTipDetailPage';
import CreatePostPage from '@pages/createPost/CreatePostPage';
import CommunityPage from '@pages/community/CommunityPage';
import MagazinePage from '@pages/magazine/MagazinePage';
import MagazineDetailPage from '@pages/magazine/MagazineDetailPage';
import RootLayout from '@layouts/root-layout';

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<LandingPage />} />
          <Route path={RoutePaths.LOGIN} element={<LoginPage />} />
          <Route path={RoutePaths.SIGNUP} element={<SignupPage />} />
          <Route path={RoutePaths.MYPAGE} element={<MyPage />} />
          <Route path={RoutePaths.MAIN} element={<MainPage />} />
          <Route path={RoutePaths.SEARCH} element={<SearchPage />} />
          <Route path={RoutePaths.SAVE_TIP} element={<SaveTipPage />} />
          <Route path={RoutePaths.SAVE_TIP_DETAIL} element={<SaveTipDetailPage />} />
          <Route path={RoutePaths.CREATE_POST} element={<CreatePostPage />} />
          <Route path={RoutePaths.COMMUNITY} element={<CommunityPage />} />
          <Route path={RoutePaths.MAGAZINE} element={<MagazinePage />} />
          <Route path={RoutePaths.MAGAZINE_DETAIL} element={<MagazineDetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
