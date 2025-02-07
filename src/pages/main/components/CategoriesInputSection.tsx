import React from 'react';
import styled, { useTheme } from 'styled-components';
import Typography from '@components/common/typography';
import Tag from '@components/Tag/Tag';

interface CategoryInputSectionProps {
  categories: { section: string; tags: string[] }[];
  isComplete?: boolean;
  isHasTitle?: boolean;
  onComplete?: () => void;
  onTagClick?: (tag: string) => void; // 태그 클릭 핸들러
  selectedTags: string[]; // 선택된 태그 상태
  tagAndTitleGap: number;
}

const CategoryInputSection: React.FC<CategoryInputSectionProps> = ({
  categories,
  onComplete,
  isHasTitle = true,
  isComplete = true,
  onTagClick,
  selectedTags,
  tagAndTitleGap,
}) => {
  const theme = useTheme();

  return (
    <Section>
      <Div>
        {isHasTitle && (
          <Typography style={{ color: theme.colors.primary[900] }} variant="titleXSmall">
            관심사 입력 (최대 10개 이내)
          </Typography>
        )}

        {isComplete && (
          <CompleteButton onClick={onComplete}>
            <Typography variant="titleXxSmall">완료</Typography>
          </CompleteButton>
        )}
      </Div>
      {categories.map((category, index) => (
        <CategorySection key={index}>
          <Typography variant="titleXxSmall" style={{ marginBottom: '10px', color: theme.colors.primary[700] }}>
            {category.section}
          </Typography>
          <TagsWrapper style={{ marginBottom: `${tagAndTitleGap}px` }}>
            {category.tags.map((tag, i) => (
              <Tag
                key={`${index}-${i}`}
                text={tag}
                selected={selectedTags.includes(tag)}
                onClick={() => onTagClick && onTagClick(tag)}
              />
            ))}
          </TagsWrapper>
        </CategorySection>
      ))}
    </Section>
  );
};

export default CategoryInputSection;

const Section = styled.div``;

const Div = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const CompleteButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 13px 32px;
  min-width: 100px;
  height: 50px;
  background-color: ${({ theme }) => theme.colors.primary[500]};
  color: ${({ theme }) => theme.colors.text['white']};
  border: none;
  border-radius: 25px;
  cursor: pointer;
`;

const CategorySection = styled.div``;

const TagsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;

  gap: 12px;
`;
