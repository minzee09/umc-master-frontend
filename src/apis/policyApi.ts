import axiosInstance from '@apis/axios-instance';
//TODO: api 연결시 구조 바뀔 수도 있음
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
  magazine_image_url_list: {
    image_name: string;
    image_url: string;
  }[];
  magazine_likes: number;
  magazine_bookmarks: number;
  organization: {
    id: number;
    name: string;
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

export const getPolicies = async ({ locationId }: GetPoliciesParams): Promise<Policy[]> => {
  const { data } = await axiosInstance.get(`/policies?location_id=${locationId}`);
  return data.result;
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
