import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { getSession } from "next-auth/react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public data?: unknown,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

// Create axios instance
export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - dynamically fetches NextAuth session
axiosInstance.interceptors.request.use(
  async (config) => {
    // Attempt to fetch session on the client side
    if (typeof window !== "undefined") {
      const session = await getSession();
      const token = session?.user?.token;
      
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor for error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response) {
      const data = error.response.data as Record<string, unknown>;
      const statusCode = error.response.status;

      throw new ApiError(
        statusCode,
        (data?.error as string) || (data?.message as string) || "Request failed",
        data,
      );
    } else if (error.request) {
      throw new ApiError(0, "No response from server");
    } else {
      throw new ApiError(0, error.message || "Request failed");
    }
  },
);

// API client helpers
export const api = {
  get: <T = unknown>(url: string, config?: AxiosRequestConfig) =>
    axiosInstance.get<T>(url, config).then((res) => res.data),

  post: <T = unknown, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig) =>
    axiosInstance.post<T>(url, data, config).then((res) => res.data),

  put: <T = unknown, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig) =>
    axiosInstance.put<T>(url, data, config).then((res) => res.data),

  patch: <T = unknown, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig) =>
    axiosInstance.patch<T>(url, data, config).then((res) => res.data),

  delete: <T = unknown>(url: string, config?: AxiosRequestConfig) =>
    axiosInstance.delete<T>(url, config).then((res) => res.data),
};
