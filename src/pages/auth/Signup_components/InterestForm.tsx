import Typography from "@components/common/typography";
import CategoryInputSection from "@pages/main/components/CategoriesInputSection";
import { useState } from "react";
import { styled, useTheme } from "styled-components";


const dummyCategories = [
  { section: '계절', tags: ['봄', '여름', '가을', '겨울'] },
  { section: '패션', tags: ['패션', '맨투맨', '니트', '바지', '치마', '블라우스', '자켓'] },
  { section: '청소', tags: ['청소', '방', '정리', '인테리어', '가구', '청소도구'] },
  {
    section: '요리 / 식재료',
    tags: ['요리', '음식', '보관', '냉장', '냉동', '면', '밥', '술', '반찬', '레시피', '냉장고'],
  },
  { section: '재활용 / 분리수거', tags: ['재활용', '분리수거', '리폼', '플라스틱', '스티로폼', '종이', '유리'] },
  { section: '주거', tags: ['주택', '원룸', '빌라', '아파트', '기숙사'] },
];

const InterestForm: React.FC = () => {
  
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleTagClick = (tag: string) => {
    const isSelected = selectedTags.includes(tag);
    const updatedTags = isSelected ? selectedTags.filter((t) => t !== tag) : [...selectedTags, tag];
    setSelectedTags(updatedTags);
  };

  const theme = useTheme();
  return (
    <Container>
      <Typography 
        variant="headingXxxSmall"
        style={{color: theme.colors.primary[700]}}
      >관심사 (필수, 10개 이내) *</Typography>
      <InterestEditForm>
        <CategoryInputSection
            categories={dummyCategories}
            selectedTags={selectedTags}
            onTagClick={handleTagClick}
            isComplete={false}
            isHasTitle={false}
            tagAndTitleGap={28}
        />
      </InterestEditForm>
    </Container>
  );
};

export default InterestForm;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 30px;
  align-self: stretch;
`

const InterestEditForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 28px;
  align-self: stretch;
`