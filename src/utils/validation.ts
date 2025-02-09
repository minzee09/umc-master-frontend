import axios from "axios";

interface PostResponse {
  success: boolean;
  message: string;
  exists?: boolean; // exists는 이메일 확인에서만 사용됨
}

const postRequest = async (url: string, data: object): Promise<PostResponse> => {
  try {
    const response = await axios.post(url, data);
    return response.data;
  } catch (error) {
    console.error("서버 오류:", error);
    return { success: false, message: "서버 오류가 발생했습니다." };
  }
};

export const validateEmailFormat = (email: string): string => {
  if (!email) return "이메일을 입력해주세요.";
  if (!/\S+@\S+\.\S+/.test(email)) return "아이디는 이메일 형식으로 입력해주세요.";
  return "";
};

export const validatePasswordFormat = (password: string): string => {
  if (!password) return "비밀번호를 입력해주세요.";
  if (password.length < 8 || password.length > 15) {
    return "비밀번호는 8자 이상 15자 이내로 입력해주세요.";
  }

  const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,15}$/;
  if (!regex.test(password)) {
    return "비밀번호 형태가 올바르지 않습니다. (숫자, 영문자, 특수문자 포함 8~15자 이내)";
  }

  return "";
};

// 서버에서 이메일 검증 (존재 여부 확인)
export const validateEmailOnServer = async (email: string): Promise<PostResponse> => {
  const response = await postRequest("/api/check-email", { email });
  if (!response.success || !response.exists) {
    return { success: false, message: "존재하지 않는 이메일입니다." };
  }
  return { success: true, message: "" };
};

// 서버에서 비밀번호 검증 (이메일과 비밀번호 일치 여부 확인)
export const validatePasswordOnServer = async (email: string, password: string): Promise<PostResponse> => {
  const response = await postRequest("/api/check-login", { email, password });
  if (!response.success) {
    return { success: false, message: "아이디와 비밀번호가 일치하지 않습니다." };
  }
  return { success: true, message: "" };
};