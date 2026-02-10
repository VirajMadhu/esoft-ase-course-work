import api from "@/lib/api/axios";

export async function loginApi(email: string, password: string): Promise<{
  token: string;
  user: {
    id: number;
    email: string;
    role: string;
  };
}> {
  const { data } = await api.post("/auth/login", { email, password });

  return data;
}

export async function signupApi(userData: Record<string, unknown>): Promise<{
  message: string;
  email: string;
}> {
  const { data } = await api.post("/auth/signup", userData);
  return data;
}

export async function verifyOtpApi(email: string, otp: string): Promise<{
  message: string;
}> {
  const { data } = await api.post("/auth/verify-otp", { email, otp });
  return data;
}

export const changePassword = async (data: {
  currentPassword: string;
  newPassword: string;
}) => {
  const res = await api.put("/auth/change-password", data);
  return res.data;
};
