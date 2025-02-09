import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Typography from '@components/common/typography';
import Tag from '@components/Tag/Tag';

interface MagazineDetail {
  id: string;
  image: string;
  title: string;
  author: string;
  date: string;
  tags: string[];
  description: string;
  externalLink: string;
}
const dummyDetails: MagazineDetail[] = [
  {
    id: '1',
    image: 'https://i.ibb.co/SXSyhmX6/image-11.png',
    title: '서리풀 보디가드 [주거안전] - 홈방범 시스템',
    author: '서초1인가구지원센터',
    date: '2024.12.30',
    tags: ['보안', '도어가드', '홈케어'],
    description: `홈 방범 시스템

- 도어가드벨, 몰카안심 존 등 1인세 설치
- 설치비: 무료
- 연이용료: 9,900원
- 대상: 인터넷(유선) 설치가 되어있는 서초구 거주 1인가구
- 무인경비서비스 설치 주택 적용 불가 (신규 아파트, 신규 오피스텔, 청년주택 등)

문의: 서초1인가구지원센터`,
    externalLink: 'https://example.com',
  },
];

const MagazineDetailPage: React.FC = () => {
  const { magazineId } = useParams<{ magazineId: string }>();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // TODO: 추후 API 연동 시, 실제 데이터 불러오도록 수정
  const detail = dummyDetails.find((item) => item.id === magazineId);

  if (!detail) {
    return <Container>해당 매거진을 찾을 수 없습니다.</Container>;
  }

  return (
    <Container>
      <Image src={detail.image || '/placeholder.svg'} alt={detail.title} />
      <Title>
        <Typography variant="titleMedium">{detail.title}</Typography>
      </Title>
      <AuthorContainer>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 20 }}>
          <ProfileImage />
          <Author>
            <Typography variant="titleXxSmall">{detail.author}</Typography>
          </Author>
        </div>
        <Date>
          <Typography variant="bodySmall">{detail.date}</Typography>
        </Date>
      </AuthorContainer>
      <Tags>
        {detail.tags.map((tag) => (
          <Tag key={tag} text={tag} selected />
        ))}
      </Tags>
      <Description>
        <Typography variant="bodySmall">{detail.description}</Typography>
      </Description>
      <Line />
      <Button href={detail.externalLink} target="_blank" rel="noopener noreferrer">
        <Typography variant="titleXSmall">해당 페이지로 이동하기</Typography>
      </Button>
    </Container>
  );
};

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 20px 0;
`;

const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 20px;
  margin-bottom: 32px;
`;

const Title = styled.div`
  margin-bottom: 16px;
  color: ${({ theme }) => theme.colors.primary[900]};
  word-break: keep-all;
`;

const AuthorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 32px;
`;

const ProfileImage = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.text.lightGray};
`;

const Author = styled.div`
  color: ${({ theme }) => theme.colors.text.black};
`;

const Date = styled.div`
  margin-bottom: 40px;
  color: ${({ theme }) => theme.colors.text.black};
`;

const Tags = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 32px;
`;

const Description = styled.div`
  white-space: pre-wrap;
  line-height: 1.6;
`;

const Line = styled.div`
  width: 100%;
  height: 2px;
  margin: 60px 0;
  border-radius: 2px;
  background-color: ${({ theme }) => theme.colors.primary[800]};
`;

const Button = styled.a`
  display: block;
  width: 100%;
  margin-bottom: 100px;
  padding: 24px;
  border: none;
  border-radius: 20px;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.primary[500]};
  color: white;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary[600]};
  }
`;

export default MagazineDetailPage;
