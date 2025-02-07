import Typography from "@components/common/typography";
import Tag from "@components/Tag/Tag";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import styled, { useTheme } from "styled-components";
import { saveTipDetailPageDataList } from "../dummydata/dummydata";


const PostDetail: React.FC = () => {

  const { tipId } = useParams<{ tipId: string }>();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // TODO: 추후 API 연동 시, 실제 데이터 불러오도록 수정
  const detail = saveTipDetailPageDataList.find((item) => item.id === tipId);
  console.log(tipId);


  if (!detail) {
    return <PostView>해당 포스트를 찾을 수 없습니다.</PostView>;
  }

  const theme = useTheme();
  return (
        <PostView>
          <Img />
          <Typography 
            variant="headingXxSmall"
            style={{color: theme.colors.primary[900]}}
          >{detail.title}</Typography>
          <PostInfo>
            <InfoDetail>
              <Author>
                <ProfileImg/>
                <AuthorInfo>
                  <Typography 
                    variant="titleXxSmall"
                    style={{color: theme.colors.text.black}}
                  >{detail.author}</Typography>
                  <Bestnum>
                    <Typography
                      variant="bodySmall"
                      style={{color: theme.colors.text.lightGray}}
                    >BEST 꿀팁 선정 횟수</Typography>
                    <Typography
                      variant="bodySmall"
                      style={{color: theme.colors.text.lightGray}}
                    >{detail.bestnum}회</Typography>
                  </Bestnum>
                </AuthorInfo>
              </Author>
              <Tags>
                {detail.tags.map((tag, index) => (
                    <Tag key={index} selected={true} text={tag}></Tag>
                ))}
              </Tags>
            </InfoDetail>
            <PostDate>
              <Typography 
                variant="bodySmall"
                style={{color: theme.colors.text.black}}
              >{detail.date}</Typography>
              <Typography 
                variant="bodySmall"
                style={{color: theme.colors.text.black}}
              >{detail.time}</Typography>
            </PostDate>
          </PostInfo>
          <Typography 
            variant="bodySmall"
            style={{color: theme.colors.text.black}}
          >{detail.description}</Typography>
        </PostView>
  );
};

export default PostDetail;

const PostView = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 32px;
  align-self: stretch;
`

const Img = styled.div`
  width: 1280px;
  height: 360px;
  border-radius: 20px;
  background: #D9D9D9;
`

const PostInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  align-self: stretch;
`

const InfoDetail = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 32px;
`

const Author = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 19px;
`

const ProfileImg = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50px;
  background: #D9D9D9;
`

const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
`

const Bestnum = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`

const Tags = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

const PostDate = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`