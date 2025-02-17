import React, { useEffect, useState } from 'react';
import ImageUploader from './components/ImageUpload';
import Typography from '@components/common/typography';
import styled from 'styled-components';
import Title from './components/Title';
import CategoryInputSection from '@pages/main/components/CategoriesInputSection';
import dummyCategories from '@assets/dummy/dummyCategories';
import { useUserStore } from '@store/userStore';
import { useTipCreateAndPost } from '@apis/queries/useTipMutations';

const CreatePostPage: React.FC = () => {
  const [images, setImages] = useState<File[]>([]);
  const [text, setText] = useState<string>('');
  const [context, setContext] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const { user, fetchUser } = useUserStore();
  const mutation = useTipCreateAndPost();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const handleTagClick = (tag: string) => {
    setSelectedTags((prev) => {
      if (prev.includes(tag)) {
        return prev.filter((t) => t !== tag);
      } else if (prev.length < 10) {
        return [...prev, tag];
      } else {
        alert('최대 10개까지만 선택할 수 있습니다.');
        return prev;
      }
    });
  };

  const isFormValid =
    text.trim() !== '' && context.trim() !== '' && selectedTags.length > 0 && user?.user_id !== undefined;
  return (
    <>
      <MainTitle>
        <Typography variant="headingXSmall">NEW 꿀팁 작성</Typography>
      </MainTitle>
      <ImageUploader
        maxImages={5}
        images={images}
        onUpload={(newImages) => setImages((prev) => [...prev, ...newImages])}
        onDelete={(index) => setImages(images.filter((_, i) => i !== index))}
      />
      <Title type="input" title="제목" placeholder="50자 이내로 작성하기" value={text} onChange={setText} />
      <Title
        type="textarea"
        title="내용 작성하기"
        placeholder="최대 1800자 이내"
        value={context}
        onChange={setContext}
      />
      <Divider />

      <CategoriesContainer>
        <CategoryInputSection
          categories={dummyCategories}
          onTagClick={handleTagClick}
          selectedTags={selectedTags}
          isComplete={false}
          tagAndTitleGap={32}
        />
      </CategoriesContainer>

      <CreateBTN
        $isActive={isFormValid}
        onClick={() => {
          if (isFormValid) {
            mutation.mutate({
              title: text,
              content: context,
              hashtags: selectedTags,
              imageUrls: images,
            });
          } else {
            alert('모든 필드를 입력해주세요.');
          }
        }}
      >
        <Typography variant="titleSmall">등록하기</Typography>
      </CreateBTN>
    </>
  );
};

export default CreatePostPage;

const MainTitle = styled.div`
  margin-top: 100px;
  margin-bottom: 40px;
  color: ${({ theme }) => theme.colors.primary[900]};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Divider = styled.hr`
  border: none;
  border-top: 2px solid ${({ theme }) => theme.colors.primary[900]};
  margin: 20px auto;
  width: 1280px;
`;

const CategoriesContainer = styled.div`
  margin: 40px auto;
  max-width: 1280px;
  width: 100%;
`;

const CreateBTN = styled.div<{ $isActive: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 40px auto;
  max-width: 1280px;
  height: 80px;
  width: 100%;
  border-radius: 20px;
  background-color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.primary[500] : theme.colors.text['lightGray']};
  color: ${({ theme }) => theme.colors.text['white']};
  cursor: ${({ $isActive }) => ($isActive ? 'pointer' : 'not-allowed')};
`;
