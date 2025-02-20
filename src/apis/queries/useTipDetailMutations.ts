import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toggleLike, toggleBookmark } from '@apis/tipApi';

export const useToggleLike = (tipId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => toggleLike(tipId),
    onSuccess: (data) => {
      console.log(data.message);
      queryClient.invalidateQueries({ queryKey: ['tipDetail', tipId] });
    },
    onError: (error) => {
      console.error('좋아요 토글 오류:', error);
    },
  });
};

export const useToggleBookmark = (tipId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => toggleBookmark(tipId),
    onSuccess: (data) => {
      console.log(data.message);
      queryClient.invalidateQueries({ queryKey: ['tipDetail', tipId] });
    },
    onError: (error) => {
      console.error('북마크 토글 오류:', error);
    },
  });
};
