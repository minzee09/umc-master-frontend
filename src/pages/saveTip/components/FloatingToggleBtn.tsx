/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import theme from '@styles/theme';
import Typography from '@components/common/typography';
import Likes from '@assets/savetipdetail/Likes.svg';
import Liked from '@assets/savetipdetail/liked.svg';
import Saves from '@assets/savetipdetail/saves.svg';
import Saved from '@assets/savetipdetail/saved.svg';
import Link from '@assets/savetipdetail/link.svg';
import { useToggleLike, useToggleBookmark } from '@apis/queries/useTipDetailMutations';

interface FloatingToggleBtnProps {
  tipId: number;
  initialLikes: number;
  initialSaves: number;
  userLiked: boolean;
  userSaved: boolean;
}

const FloatingToggleBtn: React.FC<FloatingToggleBtnProps> = ({
  tipId,
  initialLikes,
  initialSaves,
  userLiked,
  userSaved,
}) => {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(userLiked);
  const [saves, setSaves] = useState(initialSaves);
  const [saved, setSaved] = useState(userSaved);

  const { mutate: toggleLike } = useToggleLike(tipId);
  const { mutate: toggleBookmark } = useToggleBookmark(tipId);

  const handleLikeClick = () => {
    toggleLike();
    setLikes((prevLikes) => prevLikes + (liked ? -1 : 1));
    setLiked(!liked);
  };

  const handleSaveClick = () => {
    toggleBookmark();
    setSaves((prevSaves) => prevSaves + (saved ? -1 : 1));
    setSaved(!saved);
  };

  const realUrl = 'https://umc-master-frontend.vercel.app'; // 실제 URL을 여기에 설정하세요
  // const realUrl = window.location.href; // 현재 보고 있는 페이지의 URL
  const loadKakaoSDK = () => {
    const script = document.createElement('script');
    script.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js';
    script.integrity = import.meta.env.VITE_INTEGRITY_VALUE; // 환경 변수 사용
    script.crossOrigin = 'anonymous';
    script.onload = () => {
      console.log('Kakao SDK 로드 완료');
    };
    document.head.appendChild(script);
  };

  loadKakaoSDK();

  useEffect(() => {
    if (!window.Kakao) return;
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(`${import.meta.env.VITE_JAVASCRIPT_KEY}`); // 여기에 카카오 앱 키를 넣어주세요
    }
  }, []);
  const shareKakao = () => {
    if (!window.Kakao) {
      console.error('Kakao SDK가 로드되지 않았습니다.');
      return;
    }
    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: '오늘의 꿀팁',
        description: '오늘의 꿀팁을 보러 갈까요?',
        imageUrl: 'https://mud-kage.kakao.com/dn/NTmhS/btqfEUdFAUf/FjKzkZsnoeE4o19klTOVI1/openlink_640x640s.jpg',
        link: {
          mobileWebUrl: realUrl,
        },
      },
      buttons: [
        {
          title: '나도 꿀팁 보러가기',
          link: {
            mobileWebUrl: realUrl,
          },
        },
      ],
    });
  };

  return (
    <BtnContainer>
      <InteractionBtn onClick={handleLikeClick}>
        <BtnImg src={liked ? Liked : Likes} alt="좋아요" />
        <Typography variant="bodyXSmall" style={{ color: theme.colors.text.lightGray }}>
          {likes}
        </Typography>
      </InteractionBtn>
      <InteractionBtn onClick={handleSaveClick}>
        <BtnImg src={saved ? Saved : Saves} alt="저장하기" />
        <Typography variant="bodyXSmall" style={{ color: theme.colors.text.lightGray }}>
          {saves}
        </Typography>
      </InteractionBtn>
      <InteractionBtn onClick={shareKakao}>
        <BtnImg src={Link} alt="공유하기" />
        <Typography variant="bodyXSmall" style={{ color: theme.colors.text.lightGray }}>
          공유하기
        </Typography>
      </InteractionBtn>
    </BtnContainer>
  );
};

export default FloatingToggleBtn;

const BtnContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  right: 2%;
  bottom: 5%;
  gap: 26px;
`;

const InteractionBtn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 7px;
`;

const BtnImg = styled.img`
  object-fit: cover;
  cursor: pointer;
`;
