import api from "./axios";

export const authApi = {
    login: async (credentials: any) => {
        const response = await api.post("/auth/staff/login", credentials);
        return response.data;
    },
    register: async (userData: any) => {
        const response = await api.post("/auth/staff/register", userData);
        return response.data;
    }
};
