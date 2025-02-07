import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

interface SectionScrollIndicatorProps {
  sectionCount: number;
}

const SectionScrollIndicator: React.FC<SectionScrollIndicatorProps> = ({ sectionCount }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  // 스크롤 위치에 따라 활성 섹션 업데이트
  const handleScroll = () => {
    const scrollPosition = window.scrollY + window.innerHeight / 2;
    const sections = document.querySelectorAll('[data-section]');

    sections.forEach((section) => {
      const index = parseInt(section.getAttribute('data-section') || '0');
      const offsetTop = section.getBoundingClientRect().top + window.scrollY;
      const offsetHeight = section.clientHeight;

      if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
        setActiveIndex(index);
      }
    });
  };

  // 클릭 시 해당 섹션으로 스크롤 이동
  const scrollToSection = (index: number) => {
    const section = document.querySelector(`[data-section="${index}"]`);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <IndicatorContainer>
      {Array.from({ length: sectionCount }).map((_, index) => (
        <Dot key={index} $active={index === activeIndex} onClick={() => scrollToSection(index)} />
      ))}
    </IndicatorContainer>
  );
};

export default SectionScrollIndicator;

const IndicatorContainer = styled.div`
  position: fixed;
  right: 100px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  z-index: 1000;
`;

// transient prop $active: DOM으로 전달되지 않음
const Dot = styled.div<{ $active: boolean }>`
  width: ${({ $active }) => ($active ? '22px' : '16px')};
  height: ${({ $active }) => ($active ? '22px' : '16px')};
  border-radius: 50%;
  background-color: ${({ $active }) => ($active ? '#fff' : 'transparent')};
  border: 2px solid ${({ $active }) => ($active ? 'transparent' : '#fff')};
  cursor: pointer;
`;
