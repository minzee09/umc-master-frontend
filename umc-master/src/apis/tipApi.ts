import axiosInstance from '@apis/axios-instance';

interface GetTipsParams {
  pageParam: number;
  sorted: string;
}

export const getTips = async ({ pageParam, sorted }: GetTipsParams) => {
  const { data } = await axiosInstance.get(`/tips/sorted?page=${pageParam}&limit=10&sort=${sorted}`);
  return data;
};

// 다른 Tips 관련 API들...
