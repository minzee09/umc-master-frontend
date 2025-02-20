import axiosInstance from '@apis/axios-instance';
import { PolicyData } from '@pages/magazine/components/cardGrid';
interface GetPoliciesParams {
  locationId: number;
}

export interface Policy {
  id: number;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
  policy_url: string;
  image_url_list: [];
  magazine_likes: number;
  magazine_bookmarks: number;
  organization: {
    id: number;
    name: string;
    image: string;
  };
  location: {
    id: number;
    name: string;
  };
  hashtag: {
    id: number;
    name: string;
  }[];
}

export interface CreatePolicyParams {
  title: string;
  description: string;
  policy_url: string;
  location_id: number;
  image_url_list: string[];
  magazine_hashtag_id_list: number[];
}

export interface PolicyMutationParams {
  policyId: number;
  data: CreatePolicyParams;
}

export interface Hashtag {
  hashtag_id: number;
  name: string;
  popularity: number;
}

export const getPolicies = async ({ locationId }: GetPoliciesParams): Promise<PolicyData[]> => {
  const { data } = await axiosInstance.get(`/policies?location_id=${locationId}`);
  return data.result.policy_list;
};

export const getPolicyGuide = async ({ policyId }: { policyId: number }): Promise<Policy> => {
  const { data } = await axiosInstance.get(`/policies/${policyId}/guide`);
  return data.result;
};

export const createPolicy = async (data: CreatePolicyParams): Promise<Policy> => {
  const response = await axiosInstance.post(`/policies`, data);
  return response.data.result;
};

export const updatePolicy = async ({ policyId, data }: PolicyMutationParams): Promise<Policy> => {
  const response = await axiosInstance.patch(`/policies/${policyId}`, data);
  return response.data.result;
};

export const deletePolicy = async ({ policyId }: { policyId: number }): Promise<boolean> => {
  const response = await axiosInstance.delete(`/policies/${policyId}`);
  return response.data.isSuccess;
};

// 인기 관심사 조회 (기본값 6개)
export const getPopularHashtags = async ({ limit }: { limit: number }): Promise<Hashtag[]> => {
  const response = await axiosInstance.get(`/hashtags/popular?limit=${limit}`);
  return response.data.result;
};
