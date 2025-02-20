// import axiosInstance from '@apis/axios-instance';

// interface UserSignup {
//   email: string;
//   password: string;
//   nickname: string;
//   hashtags: string[];
// }

// export const postSignup = async ({ email, password, nickname, hashtags } : UserSignup) => {
//   const { data } = await axiosInstance.post(`/signup`, {
//     email,
//     password,
//     nickname,
//     hashtags,
//   });
//   return data;
// };

import axios from 'axios';

export const postSignup = async () => {
  try {
    const response = await axios.post('https://api.hmaster.shop/api/v1/signup', {
      email: 'ekos555@naver.com',
      password: 'asfa1234!@',
      nickname: 'rael',
      hashtags: ['봄', '패션', '청소', '요리', '재활용', '주택']
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log('회원가입 성공:', response.data);
  } catch (error) {
    console.error('회원가입 오류:', error);
  }
};
