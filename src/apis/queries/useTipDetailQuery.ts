import { getTipDetail } from '@apis/tipApi';
import { useQuery } from '@tanstack/react-query';

export const useTipDetail = (tipId: number) => {
  return useQuery({
    queryKey: ['tipDetail', tipId],
    queryFn: () => getTipDetail(tipId),
    enabled: !!tipId, // tipId가 있을 때만 실행
  });
};
