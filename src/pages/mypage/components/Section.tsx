import Typography from '@components/common/typography';
import React from 'react';
import styled, { useTheme } from 'styled-components';

interface SectionProps {
  title: string;
  content: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, content }) => {
  
  const theme = useTheme();
  return (
    <>
      <SectionHeader>
        <Typography 
          variant='titleXxSmall'
          style={{color: theme.colors.primary[800]}}
        >{title}</Typography>
      </SectionHeader>
      <SectionContent>{content}</SectionContent>
    </>
  );
};

export default Section;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`

const SectionContent = styled.div`
  display: flex;
  align-items: center;
`
