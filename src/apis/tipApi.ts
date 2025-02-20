/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from '@apis/axios-instance';

interface GetTipsParams {
  pageParam: number;
  sorted: string;
}

export interface NewPost {
  userId?: number;
  title: string;
  content: string;
  hashtags: string[];
  imageUrls: File[];
}

export interface GetSavedParams {
  page: number;
}
export const getTips = async ({ pageParam, sorted }: GetTipsParams) => {
  const { data } = await axiosInstance.get(`/tips/sorted?page=${pageParam}&limit=5&sort=${sorted}`);
  return data;
};

export const createPost = async (newPost: NewPost): Promise<void> => {
  try {
    const formData = new FormData();

    formData.append('title', newPost.title);
    formData.append('content', newPost.content);
    formData.append('hashtags', newPost.hashtags.join(','));

    if (newPost.userId !== undefined) {
      formData.append('userId', String(newPost.userId));
    }
    newPost.imageUrls.forEach((file) => {
      formData.append('files', file);
    });

    await axiosInstance.post<void>('/tips', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(`서버 에러: ${error.response.status} - ${error.response.data.message}`);
    } else if (error.request) {
      throw new Error('서버에 응답이 없습니다. (네트워크 문제일 수 있습니다)');
    } else {
      throw new Error(`요청 설정 에러: ${error.message}`);
    }
  }
};

export const getSavedTips = async () => {
  try {
    const { data } = await axiosInstance.get(`/users/saved-tips`);
    console.log('저장된 꿀팁 API 응답:', data.result);
    return data.result;
  } catch (error: any) {
    console.error('저장된 꿀팁 API 에러 발생:', error.response?.status, error.response?.data);
    throw new Error(`저장된 꿀팁 API 요청 실패: ${error.response?.status}`);
  }
};

export const getTipDetail = async (tipId: number) => {
  const { data } = await axiosInstance.get(`/tips/${tipId}`);
  return data.result;
};

export const toggleLike = async (tipId: number) => {
  const response = await axiosInstance.post(`/tips/${tipId}/like`);
  return response.data;
};

export const toggleBookmark = async (tipId: number) => {
  const response = await axiosInstance.post(`/tips/${tipId}/bookmark`);
  return response.data;
};
