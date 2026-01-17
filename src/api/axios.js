import { getToken } from "@/auth/auth";
import axios from "axios";

export const api = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
  timeout: 10000,
});

console.log(import.meta.env.VITE_BACKEND_URL);
console.log(api);
api.interceptors.request.use((config) => {
  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => {
    // success → unwrap data
    return response.data?.data ?? response.data;
  },
  (error) => {
    const response = error.response;

    const normalizedError = {
      status: response?.status ?? 500,
      message:
        response?.data?.message || error.message || "Something went wrong",
      errors: response?.data?.errors || null,
      raw: response?.data || null,
    };

    return Promise.reject(normalizedError);
  },
);
