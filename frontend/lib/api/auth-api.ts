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

