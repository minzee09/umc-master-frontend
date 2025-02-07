/* eslint-disable react/prop-types */
import styled, { useTheme } from "styled-components";
import Typography from "@components/common/typography";
import Button from "@components/Button/Button";
import CategoryInputSection from "@pages/main/components/CategoriesInputSection";
import { useState } from "react";
import ImgClose from "@assets/close.svg";


interface ProfileEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEdit: (editParams: string) => void;
  categories: { section: string; tags: string[] }[];
}

const InterestEditModal: React.FC<ProfileEditModalProps> = ({ isOpen, onClose, onEdit, categories }) => {

    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [editQuery, ] = useState<string>('');
  
    const handleTagClick = (tag: string) => {
      const isSelected = selectedTags.includes(tag);
      const updatedTags = isSelected ? selectedTags.filter((t) => t !== tag) : [...selectedTags, tag];
      setSelectedTags(updatedTags);
    };
  
    const handleEdit = () => {
      const query = editQuery.trim();
      const tags = selectedTags.join(',');
      const editParams = new URLSearchParams();
  
      if (query) editParams.append('query', query);
      if (tags) editParams.append('tags', tags);
  
      onEdit(editParams.toString()); // 조합된 쿼리 문자열 전달
      onClose();
    };

  const theme = useTheme();

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <Container onClick={(e) => e.stopPropagation()}>
        <InterestEditForm>
          <Close onClick={onClose}><img src={ImgClose} alt="close"/></Close>
            <Typography 
              variant="headingXxSmall"
              style={{color: theme.colors.primary[900]}}
            >나의 관심사 변경</Typography>
            <ScrollableContent>
                <CategoryInputSection
                    categories={categories}
                    selectedTags={selectedTags}
                    onTagClick={handleTagClick}
                    isComplete={false}
                    isHasTitle={false}
                    tagAndTitleGap={10}
                />
            </ScrollableContent>
            <Button variant="interestEdit" onClick={handleEdit}>나의 관심사 변경 완료</Button>
        </InterestEditForm>
      </Container>
    </ModalOverlay>
  );
};

export default InterestEditModal;

const ModalOverlay = styled.div`
  position: fixed; /* 화면에 고정되도록 설정 */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);;
  padding: 68px 60px 68px 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* 모달이 다른 요소 위에 오도록 설정 */
`

const Container = styled.div`
  display: inline-flex;
  padding: 100px 66px 63px 54px;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  border-radius: 20px;
  border: 2px solid ${({ theme }) => theme.colors.primary[800]};
  background: #FFF;
`

const Close = styled.button`
  position: absolute;
  top: -60px;
  right: 0px;
  width: 40px;
  height: 40px;
  cursor: pointer;
`

const InterestEditForm = styled.div`
  position: relative;
  display: flex;
  width: 720px;
  flex-direction: column;
  align-items: center;
  gap: 40px;
`

const ScrollableContent = styled.div`
  flex: 1;
  overflow-y: auto;
  max-height: 500px;
`;