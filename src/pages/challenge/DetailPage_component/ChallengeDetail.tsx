/* eslint-disable react/prop-types */
import Typography from "@components/common/typography";
import Tag from "@components/Tag/Tag";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import styled, { useTheme } from "styled-components";
import ProfileDefault from '@assets/mainCharacter.png';
import FirstImg from '@assets/dummyImage/1.png';
import SecondImg from '@assets/dummyImage/2.png';
import ThirdImg from '@assets/dummyImage/3.png';
import FourthImg from '@assets/dummyImage/4.png';
import Check from '@assets/icons/check.svg';

interface Hashtag {
  hashtag_id: number;
  name: string;
}

interface Media {
  media_url: string;
  media_type: string;
}
interface User {
  user_id: number;
  nickname: string;
  profile_image_url: string | null;
}

export interface TipItem {
  id: string;
  title: string;
  content: string;
  created_at: string;
  media: Media[];
  hashtags: { hashtag: Hashtag }[];
  user: User;
  _count: {
    likes: number;
    saves: number;
  };
  comments: { author: string; date: string; time: string; comment: string }[];
}
interface PostDetailProps {
  detail: TipItem;
}

const ChallengeDetail: React.FC<PostDetailProps> = ({ detail }) => {

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  console.log(id);

  if (!detail) {
    return <PostView>해당 포스트를 찾을 수 없습니다.</PostView>;
  }

  const theme = useTheme();
  return (
    <PostView>
      {detail.media.length > 0 && <Img src={detail.media[0].media_url} alt="게시물 이미지" />}
      <Typography variant="headingXxSmall" style={{ color: theme.colors.primary[900] }}>
        {detail.title}
      </Typography>
      <PostInfo>
        <InfoDetail>
          <Author>
            <ProfileImg src={detail.user.profile_image_url || ProfileDefault} alt="프로필 이미지" />
            <AuthorInfo>
              <Typography variant="titleXxSmall" style={{ color: theme.colors.text.black }}>
                {detail.user.nickname}
              </Typography>
            </AuthorInfo>
          </Author>
          <Tags>
            {detail.hashtags.map((tag, index) => (
              <Tag key={index} selected={true} text={tag.hashtag.name}></Tag>
            ))}
          </Tags>
        </InfoDetail>
        <PostDate>
          <Typography variant="bodySmall" style={{ color: theme.colors.text.black }}>
            {detail.created_at.slice(0, 10)}
          </Typography>
        </PostDate>
      </PostInfo>
      <Method>
        <Explaination>
          <Typography
            variant="bodySmall"
            style={{color: theme.colors.text.black}}
          >인증 방법을 알려드릴게요</Typography>
          <StyledTypography
            variant="bodyXSmall"
            style={{color: theme.colors.text.white}}
          >내용물이 있는 쓰레기는 깨끗하게 헹구고, 부착물을 제거한 후 분리배출하기</StyledTypography>
          <Sequence>
            <MethodCard>
              <StyledImg>
                <img src={FirstImg} alt="첫번째 사진" />
                <Success>O</Success>
              </StyledImg>
              <Typography
                variant="bodySmall"
                style={{color: theme.colors.text.black}}
              >성공 처리</Typography>
              <Typography
                variant="bodyXSmall"
                style={{color: theme.colors.text.black}}
              >내용물을 깨끗하게 헹군 뒤, 부착물을 제거한 후 배출</Typography>
            </MethodCard>
            <MethodCard>
              <StyledImg>
                <img src={SecondImg} alt="두번째 사진" />
                <Success>O</Success>
              </StyledImg>
              <Typography
                variant="bodySmall"
                style={{color: theme.colors.text.black}}
              >성공 처리</Typography>
              <Typography
                variant="bodyXSmall"
                style={{color: theme.colors.text.black}}
              >부착물을 제거한 후 박스를 펼친 후 제출</Typography>
            </MethodCard>
            <MethodCard>
              <StyledImg>
                <img src={ThirdImg} alt="세번째 사진" />
                <Fail>X</Fail>
              </StyledImg>
              <Typography
                variant="bodySmall"
                style={{color: theme.colors.text.black}}
              >실패 처리</Typography>
              <Typography
                variant="bodyXSmall"
                style={{color: theme.colors.text.black}}
              >부착물을 제거한 후 제출해주세요.</Typography>
            </MethodCard>
            <MethodCard>
              <StyledImg>
                <img src={FourthImg} alt="네번째 사진" />
                <Fail>X</Fail>
              </StyledImg>
              <Typography
                variant="bodySmall"
                style={{color: theme.colors.text.black}}
              >실패 처리</Typography>
              <Typography
                variant="bodyXSmall"
                style={{color: theme.colors.text.black}}
              >다 쓴 치솔모, 알약 포장재 등 여러 재질이 섞여있는 플라스틱은 일반 쓰레기로 분리해주세요.</Typography>
            </MethodCard>
          </Sequence>
        </Explaination>
      </Method>
      <Cautions>
        <List>
          <Typography
            variant="titleXxSmall"
            style={{color: theme.colors.text.black}}
          >챌린지 진행 시 유의사항을 지켜주세요</Typography>
          <Description>
            <CheckList>
              <img src={Check} alt="체크표시" />
              <Typography
                variant="bodySmall"
                style={{color: theme.colors.text.black}}
              >00시 00분 ~ 23시 59분 사이에 인증하셔야 합니다.</Typography>
            </CheckList>
            <CheckList>
              <img src={Check} alt="체크표시" />
              <Typography
                variant="bodySmall"
                style={{color: theme.colors.text.black}}
              >2주동안 주 2일, 하루에 1번 인증샷을 촬영하셔야 합니다.</Typography>
            </CheckList>
            <CheckList>
              <img src={Check} alt="체크표시" />
              <Typography
                variant="bodySmall"
                style={{color: theme.colors.text.black}}
              >사진첩을 사용하실 수 없습니다.</Typography>
            </CheckList>
            <CheckList>
              <img src={Check} alt="체크표시" />
              <Typography
                variant="bodySmall"
                style={{color: theme.colors.text.black}}
              >인증샷이 참가자에게만 공개됩니다.</Typography>
            </CheckList>
          </Description>
        </List>
      </Cautions>
      <ContentWrapper>
        <Typography variant="bodySmall" style={{ color: theme.colors.text.black }}>
          {detail.content}
        </Typography>
      </ContentWrapper>
    </PostView>
  );
};

export default ChallengeDetail;

const PostView = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 32px;
  align-self: stretch;
`;

const Img = styled.img`
  width: 80vw;
  height: 360px;
  border-radius: 20px;
  object-fit: cover;
  background: #d9d9d9;
`;

const PostInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  align-self: stretch;
`;

const InfoDetail = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 32px;
`;

const Author = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 19px;
`;

const ProfileImg = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50px;
  object-fit: cover;
  background: #d9d9d9;
`;

const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
`;

const Tags = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const PostDate = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ContentWrapper = styled.div`
  white-space: pre-wrap;
  word-wrap: break-word;
`;

const Method = styled.div`
  display: flex;
  padding: 30px 28px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  border-radius: 20px;
  border: 0.8px solid ${({ theme }) => theme.colors.text.gray};
  background: #FFF;
  box-shadow: 1.5px 3px 7.5px 0px rgba(156, 156, 156, 0.40);
`

const Explaination = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  align-self: stretch;
`

const StyledTypography = styled(Typography)`
  display: flex;
  padding: 13.75px 464px 10.25px 27px;;
  align-items: center;
  align-self: stretch;
  border-radius: 20px;
  background: ${({ theme }) => theme.colors.primary[700]};
`

const Sequence = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 30px;
  align-self: stretch;
`

const MethodCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
`

const StyledImg = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  
  width: 280px;  /* 가로 크기 고정 */
  height: 300px; /* 세로 크기 고정 */

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 7.5px;
  }
`;

const Success = styled.div`
  position: absolute;
  display: flex;
  bottom: 0px;
  width: 100%;
  height: 40px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  border-radius: 0px 0px 7.5px 7.5px;
  background: ${({ theme }) => theme.colors.blue[400]};
  color: white;
`

const Fail = styled.div`
  position: absolute;
  display: flex;
  bottom: 0px;
  width: 100%;
  height: 40px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  border-radius: 0px 0px 7.5px 7.5px;
  background: ${({ theme }) => theme.colors.red[500]};
  color: white;
`

const Cautions = styled.div`
  display: flex;
  padding: 30px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;
  border-radius: 20px;
  border: 0.8px solid ${({ theme }) => theme.colors.text.gray};
  background: #FFF;
  box-shadow: 1.5px 3px 7.5px 0px rgba(156, 156, 156, 0.40);
`

const List = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  align-self: stretch;
`

const Description = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  align-self: stretch;
`

const CheckList = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`