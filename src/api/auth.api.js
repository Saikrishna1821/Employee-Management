import { setToken } from "@/auth/auth";
import { useMutation } from "@tanstack/react-query";
import { api } from "./axios";

const loginApi = async (payload) => {
  const response = await api.post("/auth/login", payload);
  return response;
};

export const useLogin = () => {
  return useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      setToken(data.token);
    },
  });
};
