/* eslint-disable react/prop-types */
import styled from 'styled-components';
import PlusIcon from '@assets/icons/plus.svg?react';
import { FiX } from 'react-icons/fi';
import { useEffect, useState } from 'react';

interface ImageUploaderProps {
  maxImages: number;
  images: File[];
  onUpload: (files: File[]) => void;
  onDelete: (index: number) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ maxImages, images, onUpload, onDelete }) => {
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  useEffect(() => {
    // 새 파일 목록이 들어올 때마다 blob URL을 생성
    const newUrls = images.map((file) => URL.createObjectURL(file));
    setPreviewUrls(newUrls);

    // 언마운트되거나 images가 바뀔 때 이전 URL 해제
    return () => {
      newUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [images]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      if (images.length + files.length > maxImages) {
        alert(`최대 ${maxImages}개의 이미지만 업로드할 수 있습니다.`);
        onUpload(files.slice(0, maxImages - images.length));
        return;
      }
      onUpload(files);
    }
  };

  return (
    <ImageUploadContainer>
      {Array.from({ length: maxImages }).map((_, index) => (
        <ImageBox key={index}>
          {images[index] ? (
            <>
              <UploadedImage src={previewUrls[index]} />
              <DeleteButton onClick={() => onDelete(index)}>
                <FiX />
              </DeleteButton>
            </>
          ) : (
            index === images.length && (
              <Label htmlFor="file-upload">
                <PlusIcon />
                <HiddenFileInput id="file-upload" type="file" onChange={handleImageUpload} multiple />
              </Label>
            )
          )}
        </ImageBox>
      ))}
    </ImageUploadContainer>
  );
};

export default ImageUploader;

const ImageUploadContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const ImageBox = styled.div`
  width: 240px;
  height: 240px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.text['lightGray']};
  position: relative;
`;

const UploadedImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
`;

const DeleteButton = styled.button`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 10px;
  right: 10px;
  background: ${({ theme }) => theme.colors.text['black']};
  color: ${({ theme }) => theme.colors.text['white']};
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.text['lightGray']};
  }
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const Label = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 100%;
  height: 100%;
`;
