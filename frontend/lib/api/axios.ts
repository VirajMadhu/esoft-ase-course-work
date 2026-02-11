import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";
import { APP_CONFIG } from "../config";
import { toast } from "sonner";
import { logout } from "./auth-logout";

const api: AxiosInstance = axios.create({
    baseURL: APP_CONFIG.api.baseUrl,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 30000,
});

api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = Cookies.get("auth_token");
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle 403 Forbidden - Session expired
        if (error.response?.status === 403) {
            toast.error("Session expired. Please log in again.");
            logout();
            
            // Redirect to login with current path
            if (globalThis.window !== undefined) {
                const currentPath = globalThis.location.pathname;
                globalThis.location.href = `/login?from=${encodeURIComponent(currentPath)}`;
            }
        }
        
        const message = error.response?.data?.message || error.message || "An unexpected error occurred";
        return Promise.reject(new Error(message));
    }
);

export default api;

// -------------------
// Optional: Typed helper function for GET requests
export async function fetchData<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  const { data } = await api.get<T>(url, config);
  return data;
}
