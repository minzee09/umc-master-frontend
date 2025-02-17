import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getSearchTips, TipsResponse } from '@apis/searchApi';

interface UseSearchListParams {
  query: string;
  tags?: string[];
  page: number;
  limit?: number;
}

export const useSearchList = ({ query, tags, page, limit = 10 }: UseSearchListParams) => {
  return useQuery<TipsResponse>({
    queryKey: ['tips', query, tags, page],
    queryFn: () => getSearchTips({ query, tags, page, limit }),
    placeholderData: keepPreviousData,
  });
};
