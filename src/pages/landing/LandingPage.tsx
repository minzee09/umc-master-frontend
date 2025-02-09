import styled from 'styled-components';
import TitleSection from './components/TitleSection';
import TipsSection from './components/TipsSection';
import SavedTipsSection from './components/SavedTipsSection';
import InfluencerSection from './components/InfluencerSection';
import SectionScrollIndicator from './components/SectionScrollIndicator';

const LandingPage: React.FC = () => {
  const sectionCount = 4;

  return (
    <PageContainer>
      <Section data-section="0">
        <TitleSection />
      </Section>
      <Section data-section="1">
        <TipsSection />
      </Section>
      <Section data-section="2">
        <SavedTipsSection />
      </Section>
      <Section data-section="3">
        <InfluencerSection />
      </Section>
      <SectionScrollIndicator sectionCount={sectionCount} />
    </PageContainer>
  );
};

export default LandingPage;

const PageContainer = styled.div`
  background-color: #00796b;
`;

const Section = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
