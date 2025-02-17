import axiosInstance from '@apis/axios-instance';

export interface Author {
  userId: number;
  nickname: string;
  profileImageUrl: string | null;
}

export interface Hashtag {
  hashtagId: number;
  name: string;
}

export interface Image {
  media_url: string;
  media_type: string;
}

export interface TipItem {
  tipId: number;
  title: string;
  content: string;
  author: Author;
  hashtags: Hashtag[];
  imageUrls: Image[];
  likesCount: number;
  savesCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface TipsResponse {
  isSuccess: boolean;
  message: string;
  result: TipItem[];
}

export interface GetTipsParams {
  query: string;
  page: number;
  limit: number;
  tags?: string[];
}

export const getSearchTips = async ({ query, tags, page, limit }: GetTipsParams): Promise<TipsResponse> => {
  const response = await axiosInstance.get<TipsResponse>('/tips/search', {
    params: {
      query,
      hashtags: tags?.length ? tags.join(',') : undefined,
      page,
      limit,
    },
  });
  return response.data;
};
