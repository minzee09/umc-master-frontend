import TipsSection from '@pages/main/components/TipsSection';
import Banner from './components/Banner';
import { useModalStore } from '@store/modalStore';
import CompeleteModal from '@components/Modal/compelete';

const CommunityPage: React.FC = () => {
  const isModalVisible = useModalStore((state) => state.isModalVisible);
  return (
    <>
      <Banner />
      <TipsSection title="BEST 5 꿀팁" defaultSort="likes" />
      <TipsSection title="꿀팁 모아보기" defaultSort="likes" showRecent />

      {isModalVisible && <CompeleteModal />}
    </>
  );
};

export default CommunityPage;
