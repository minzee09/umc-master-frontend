import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import PostDetail from './components/PostDetail';
import CommentView from './components/CommentView';
import FloatingToggleBtn from './components/FloatingToggleBtn';
import { useTipDetail } from '@apis/queries/useTipDetailQuery';

const SaveTipDetailPage: React.FC = () => {
  const { tipId } = useParams<{ tipId: string }>();
  const { data: detail, isLoading, error } = useTipDetail(Number(tipId));
  console.log('꿀팁 상세', detail);

  if (isLoading) return;
  if (error) return <div>데이터를 불러오는 중 오류가 발생했습니다.</div>;
  if (!detail) return <div>데이터를 찾을 수 없습니다.</div>;

  return (
    <Container>
      <Content>
        <PostDetail detail={detail} />
        <Line />
        <CommentView />
      </Content>
      <FloatingToggleBtn
        tipId={Number(tipId)}
        initialLikes={detail.likesCount}
        initialSaves={detail.savesCount}
        userLiked={detail.isLiked}
        userSaved={detail.isBookmarked}
      />
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
  background: #fff;
`;

const Content = styled.div`
  display: flex;
  width: 80vw;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: 60px;
`;

const Line = styled.div`
  width: 80vw;
  height: 1px;
  border: 1px solid ${({ theme }) => theme.colors.primary[800]};
`;
