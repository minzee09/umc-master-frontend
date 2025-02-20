import { useQuery } from '@tanstack/react-query';
import { getComments } from '@apis/commentApi';

export const useComments = (tipId: number) => {
  return useQuery({
    queryKey: ['comments', tipId],
    queryFn: () => getComments(tipId),
  });
};
