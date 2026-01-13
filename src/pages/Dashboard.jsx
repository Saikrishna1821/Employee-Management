import { useDashboard } from "@/api/employee.api";
import React from "react";
import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";

export const Dashboard = () => {
  const { data } = useDashboard();
  console.log("daed", data);
  const employees = [
    { id: 1, name: "John", active: true },
    { id: 2, name: "Sara", active: false },
    { id: 3, name: "Mike", active: true },
    { id: 4, name: "Anita", active: true },
  ];

  const totalEmployees = data?.total_count;
  const activeEmployees = data?.active;
  const inactiveEmployees = data?.inactive;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className=" p-4 rounded-lg shadow">
          <p className="text-sm text-gray-500">Total Employees</p>
          <p className="text-3xl font-bold">{totalEmployees}</p>
        </div>

        <div className=" p-4 rounded-lg shadow">
          <p className="text-sm text-gray-500">Active Employees</p>
          <p className="text-3xl font-bold text-green-600">{activeEmployees}</p>
        </div>

        <div className=" p-4 rounded-lg shadow">
          <p className="text-sm text-gray-500">Inactive Employees</p>
          <p className="text-3xl font-bold text-red-600">{inactiveEmployees}</p>
        </div>
      </div>
    </div>
  );
};

export const DashboardLayout=()=> {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <SidebarTrigger />
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
