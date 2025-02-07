import styled from "styled-components";
import PostDetail from "./DetailPage_componenets/PostDetail";
import CommentView from "./DetailPage_componenets/CommentView";
import Likes from "@assets/savetipdetail/Likes.svg";
import Liked from "@assets/savetipdetail/liked.svg";
import Saves from "@assets/savetipdetail/saves.svg";
import Saved from "@assets/savetipdetail/saved.svg";
import Link from "@assets/savetipdetail/link.svg";
import Typography from "@components/common/typography";
import { dummyData } from "./dummydata/dummydata";
import { useParams } from "react-router-dom";
import theme from "@styles/theme";
import { useState } from "react";

const SaveTipDetailPage: React.FC = () => {

  const { tipId } = useParams<{ tipId: string }>();

  const detail = dummyData.find((item) => item.id === tipId);

  if (!detail) {
    return <div>데이터를 찾을 수 없습니다.</div>;
  }
  
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
  
  return (
    <Container>
      <SaveTipDatail>
        <PostDetail/>
        <Line/>
        <CommentView/>
      </SaveTipDatail>
      <InteractionButtons>
        <Interaction onClick={handleLikeClick}>
          <Img src={liked ? Liked : Likes} alt="좋아요"/>
          <Typography 
            variant="bodyXSmall"
            style={{color: theme.colors.text.lightGray}}
          >{likes}</Typography>
        </Interaction>
        <Interaction onClick={handleSaveClick}>
          <Img src={saved ? Saved : Saves} alt="저장하기"/>
          <Typography 
            variant="bodyXSmall"
            style={{color: theme.colors.text.lightGray}}
          >{saves}</Typography>
        </Interaction>
        <Interaction>
          <Img src={Link} alt="공유하기"/>
          <Typography 
            variant="bodyXSmall"
            style={{color: theme.colors.text.lightGray}}
          >공유하기</Typography>
        </Interaction>
      </InteractionButtons>
    </Container>
  );
};

export default SaveTipDetailPage;

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 80px;
  padding-bottom: 100px;
  background: #FFF;
`

const SaveTipDatail = styled.div`
  display: flex;
  width: 1280px;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: 60px;
`

const Line = styled.div`
  width: 1280px;
  height: 1px;
  border: 1px solid ${({ theme }) => theme.colors.primary[800]};
`

const InteractionButtons = styled.div`
  position: fixed;
  right: 168px;
  top: 610px;
  width: 72px;
  height: 366px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 36px;
`

const Interaction = styled.div`
  display: flex;
  width: 72px;
  flex-direction: column;
  align-items: center;
  gap: 7px;
`

const Img = styled.img`
  object-fit: cover;
  cursor: pointer;
`