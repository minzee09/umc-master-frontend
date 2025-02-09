import axiosInstance from "@apis/axios-instance";

interface User {
    user_id: number;
    email: string;
    nickname: string;
    city: string | null;
    district: string | null;
    profile_image_url: string | null;
    provider: string;
    providerId: string;
    role: string;
    status: string;
    created_at: string;
    updated_at: string;
    last_login: string | null;
    location_id: string | null;
  }

export const getUsers = async (): Promise<User> => {
  const { data } = await axiosInstance.get('/profile');
  console.log('API 응답 (data.result):', data.result);  // 응답 확인
  return data.result;  // result 객체를 반환 (User 타입과 일치)
};