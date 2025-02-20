import { getPolicies, getPolicyGuide, getPopularHashtags } from '@apis/policyApi';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

interface PolicyListParams {
  locationId: number;
}

interface PolicyGuideParams {
  policyId: number;
}

export const usePolicies = ({ locationId }: PolicyListParams) => {
  return useQuery({
    queryKey: ['policies', locationId],
    queryFn: () => getPolicies({ locationId }),
    placeholderData: keepPreviousData,
  });
};

export const usePolicyGuide = ({ policyId }: PolicyGuideParams) => {
  return useQuery({
    queryKey: ['policyGuide', policyId],
    queryFn: () => getPolicyGuide({ policyId }),
    placeholderData: keepPreviousData,
  });
};

export const usePopularHashtags = ({ limit }: { limit: number }) => {
  return useQuery({
    queryKey: ['hashtag'],
    queryFn: () => getPopularHashtags({ limit }),
  });
};
