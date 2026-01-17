import { setToken } from "@/auth/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "./axios";
import { queryClient } from "@/query/client";

const loginApi = async (payload) => {
  const response = await api.post("/auth/login", payload);
  console.log("respose",response)
  return response;
};

export const useLogin = () => {
  return useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      console.log(data)
      setToken(data.token);
    },
  });
};

