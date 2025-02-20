import { useEffect, useState } from 'react';
import styled from 'styled-components';
import theme from '@styles/theme';
import Typography from '@components/common/typography';
import Likes from '@assets/savetipdetail/Likes.svg';
import Liked from '@assets/savetipdetail/liked.svg';
import Saves from '@assets/savetipdetail/saves.svg';
import Saved from '@assets/savetipdetail/saved.svg';
import Link from '@assets/savetipdetail/link.svg';
import { dummyData } from "@pages/challenge/dummydata/dummydata";
import { useParams } from 'react-router-dom';

const FloatingToggleBtn: React.FC = () => {

  const { id } = useParams<{ id: string }>();

  const detail = dummyData.find((item) => item.id === id);

if (!detail) {
  return <div>데이터를 찾을 수 없습니다.</div>; // 데이터가 없으면 메시지 출력
}
  
  //TODO: 유저 추가 여부 서버에서 데이터 주면 추가 예정
  const [likes, setLikes] = useState(detail.likes);
  const [liked, setLiked] = useState(false);

  const handleLikeClick = () => {
    if (!liked) {
      setLikes(likes + 1); // 좋아요 수 증가
      setLiked(true); // 좋아요 상태로 변경
    } else {
      setLikes(likes - 1); // 좋아요 취소 시 수 감소
      setLiked(false); // 좋아요 취소 상태로 변경
    }
  };

  const [saves, setSaves] = useState(detail.bookmarks);
  const [saved, setSaved] = useState(false);

  const handleSaveClick = () => {
    if (!saved) {
      setSaves(saves + 1); // 좋아요 수 증가
      setSaved(true); // 좋아요 상태로 변경
    } else {
      setSaves(saves - 1); // 좋아요 취소 시 수 감소
      setSaved(false); // 좋아요 취소 상태로 변경
    }
  };

  const realUrl = "https://umc-master-frontend.vercel.app"; // 실제 URL을 여기에 설정하세요
  // const realUrl = window.location.href; // 현재 보고 있는 페이지의 URL
  const loadKakaoSDK = () => {
    const script = document.createElement("script");
    script.src = "https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js";
    script.integrity = import.meta.env.VITE_INTEGRITY_VALUE; // 환경 변수 사용
    script.crossOrigin = "anonymous";
    script.onload = () => {
      console.log("Kakao SDK 로드 완료");
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
          console.error("Kakao SDK가 로드되지 않았습니다.");
          return;
      }
      window.Kakao.Share.sendDefault({
          objectType: "feed",
          content: {
              title: "오늘의 꿀팁",
              description: "오늘의 꿀팁을 보러 갈까요?",
              imageUrl:
                  "https://mud-kage.kakao.com/dn/NTmhS/btqfEUdFAUf/FjKzkZsnoeE4o19klTOVI1/openlink_640x640s.jpg",
              link: {
                  mobileWebUrl: realUrl,
              },
          },
          buttons: [
              {
                  title: "나도 꿀팁 보러가기",
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
      <InteractionBtn>
        <BtnImg src={Link} alt="공유하기" onClick={shareKakao} />
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
