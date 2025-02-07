import { getTips } from '@apis/tipApi';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

interface TipListParams {
  title: string;
  page: number;
  sortOption: string;
}

export const useTipList = ({ title, page, sortOption }: TipListParams) => {
  return useQuery({
    queryKey: [title, page, sortOption],
    queryFn: () => getTips({ pageParam: page, sorted: sortOption }),
    placeholderData: keepPreviousData,
  });
};
