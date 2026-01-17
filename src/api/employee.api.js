import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "./axios";
import { queryClient } from "@/query/client";
import { formatDate } from "@/constants/helper";

export const fetchEmployeesApi = async () => {
  const result = await api.get("/employee/");

  const employees = result.map((emp) => ({
    ...emp,
    dob: formatDate(emp.dob),
  }));
  return employees;
};

export const useEmployees = () => {
  return useQuery({
    queryKey: ["employees"],
    queryFn: fetchEmployeesApi,
  });
};

export const createEmployeeApi = (data) => {
  return api.post("/employee/add", data);
};

export const useCreateEmployee = () => {
  return useMutation({
    mutationFn: createEmployeeApi,
    onSuccess: () => {
      queryClient.refetchQueries({ queryFn: ["employees"] });
    },
  });
};

export const updateEmployeeApi = (data) => {
    const id = data.get("id"); 
  return api.put(`/employee/update/${id}`, data);
};

export const useUpdateEmployee = () => {

  return useMutation({
    mutationFn: updateEmployeeApi,
    onSuccess: () => {
      queryClient.refetchQueries({ queryFn: ["employees"] });
    },
  });
};
export const deleteEmployeeApi = (id) => {
  return api.put(`/employee/delete/${id}`);
};

export const useDeleteEmployee = () => {
  return useMutation({
    mutationFn: deleteEmployeeApi,
    onSuccess: () => {
      queryClient.refetchQueries({ queryFn: ["employees"] });
    },
  });
};

export const dashboardCounts = async () => {
  const data= await api.get("/employee/dashboard");
  return data
};
export const useDashboard = () => {
  return useQuery({
    queryKey: ["counts"],
    queryFn: dashboardCounts,
  });
};
