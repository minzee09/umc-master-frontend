import { createBrowserRouter, RouterProvider } from 'react-router-dom';
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
import KakaoCallback from '@pages/auth/KakaoCallback';
import FindPrivacy from '@pages/auth/FindPrivacy';
import ChallengePage from '@pages/challenge/ChallengePage';
import ChatPage from '@pages/chat/ChatPage';
import ErrorPage from '@pages/error/ErrorPage';
import MyChallengePage from '@pages/mychallenge/MyChallenge';
import ChallengeDetailPage from '@pages/challenge/ChallengeDetailPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <LandingPage /> },
          { path: RoutePaths.LOGIN, element: <LoginPage /> },
          { path: RoutePaths.SIGNUP, element: <SignupPage /> },
          { path: RoutePaths.FINDPRIVACY, element: <FindPrivacy /> },
          { path: RoutePaths.MYPAGE, element: <MyPage /> },
          { path: RoutePaths.MAIN, element: <MainPage /> },
          { path: RoutePaths.SEARCH, element: <SearchPage /> },
          { path: RoutePaths.SAVE_TIP, element: <SaveTipPage /> },
          { path: RoutePaths.SAVE_TIP_DETAIL, element: <SaveTipDetailPage /> },
          { path: RoutePaths.CREATE_POST, element: <CreatePostPage /> },
          { path: RoutePaths.COMMUNITY, element: <CommunityPage /> },
          { path: RoutePaths.MAGAZINE, element: <MagazinePage /> },
          { path: RoutePaths.MAGAZINE_DETAIL, element: <MagazineDetailPage /> },
          { path: RoutePaths.KAKAO_CALLBACK, element: <KakaoCallback /> },
          { path: RoutePaths.CHALLENGE, element: <ChallengePage /> },
          { path: RoutePaths.MYCHALLENGE, element: <MyChallengePage /> },
          { path: RoutePaths.CHALLENGE_DETAIL, element: <ChallengeDetailPage /> },
          { path: RoutePaths.CHAT, element: <ChatPage /> },
        ],
      },
    ],
  },
]);

const Router: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default Router;
