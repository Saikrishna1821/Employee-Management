import {
  useCreateEmployee,
  useDeleteEmployee,
  useEmployees,
  useUpdateEmployee,
} from "@/api/employee.api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import EmployeeForm from "@/components/ui/EmployeeForm";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useState } from "react";
import fallback from "../assets/fallback.png";
import { toast } from "sonner";
import { formatDate } from "@/constants/helper";

const Employees = () => {
  const { data, isLoading, isError, error } = useEmployees();
  const createEmployee = useCreateEmployee();
  const updateEmployee = useUpdateEmployee();
  const deleteEmployee = useDeleteEmployee();
  const [search, setSearch] = useState("");
  const [genderFilter, setGenderFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [open, setOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const filteredEmployees = data?.filter((emp) => {
    const matchByName = emp.full_name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchByGender = genderFilter === "all" || emp.gender === genderFilter;
    const matchByStatus =
      statusFilter === "all" || emp.is_active == statusFilter;

    return matchByName && matchByStatus && matchByGender;
  });
  const handleAdd = () => {
    setSelectedEmployee(null);
    setOpen(true);
  };
  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setOpen(true);
  };
  const handleDeleteClick = (id) => {
    setEmployeeToDelete(id);
    setDeleteOpen(true);
  };

  const handleConfirmDelete = () => {
    deleteEmployee.mutate(employeeToDelete, {
      onSuccess: () => toast.success("Employee has been successfully deleted"),
      onError: (e) => toast.error("Something went wrong!"),
    });
    setDeleteOpen(false);
    setEmployeeToDelete(null);
  };
  const handleSave = (data) => {
    if (selectedEmployee) {
      console.log(data);
      updateEmployee.mutate(data, {
        onSuccess: () => {
          toast.success(
            `${selectedEmployee.full_name} details have been successfully updated`
          );
        },
        onError: (e) => toast.error("Something went wrong!"),
      });
    } else {
      createEmployee.mutate(data, {
        onSuccess: () => {
          toast("success", "Employee has been successfully added");
        },
        onError: (error) => {
          console.log("E", error);
        },
      });
    }

    setOpen(false);
  };

  if (isLoading) {
    return (
      <div className="p-6 text-center text-gray-500">Loading employees...</div>
    );
  }
  if (isError) {
    return <div className="p-6 text-center text-red-500">{error.message}</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Employees</h1>

        <Button className="print:hidden" variant="secondary" onClick={() => window.print()}>
          Print
        </Button>
      </div>

      <div className="print:hidden flex justify-end mb-4">
        <Button onClick={handleAdd}>Add Employee</Button>
      </div>
      <div className="flex flex-col md:flex-row gap-4 mb-4 print:hidden">
        <Input
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Select value={genderFilter} onValueChange={setGenderFilter}>
          <SelectTrigger className="md:w-40">
            <SelectValue placeholder="Gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="M">Male</SelectItem>
            <SelectItem value="F">Female</SelectItem>
            <SelectItem value="O">Others</SelectItem>
          </SelectContent>
        </Select>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="md:w-48">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="1">Active</SelectItem>
            <SelectItem value="0">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Profile</TableHead>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead>DOB</TableHead>
              <TableHead>State</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="print:hidden">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredEmployees?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-6">
                  No employees found
                </TableCell>
              </TableRow>
            ) : (
              filteredEmployees.map((emp) => (
                <TableRow key={emp.id}>
                  <TableCell>
                    <img
                      src={emp.profile_image || fallback}
                      alt="Preview"
                      className="h-8 w-8 rounded-full"
                    />
                  </TableCell>
                  <TableCell>{emp.employee_code}</TableCell>

                  <TableCell>{emp.full_name}</TableCell>
                  <TableCell>{emp.gender}</TableCell>
                  <TableCell>{emp.dob}</TableCell>
                  <TableCell>{emp.state}</TableCell>

                  <TableCell>
                    <span
                      className={`text-sm font-medium ${
                        emp.is_active ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {emp.is_active ? "Active" : "Inactive"}
                    </span>
                  </TableCell>

                  <TableCell className="space-x-2 print:hidden">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(emp)}
                    >
                      Edit
                    </Button>

                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDeleteClick(emp?.id)}
                    >
                      Delete
                    </Button>

                  
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {selectedEmployee ? "Edit Employee" : "Add Employee"}
              </DialogTitle>
            </DialogHeader>

            <EmployeeForm
              initialData={selectedEmployee}
              onSubmit={handleSave}
            />
          </DialogContent>
        </Dialog>
        <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
            </DialogHeader>

            <p className="text-sm text-gray-600">
              Are you sure you want to delete{" "}
              <span className="font-semibold">{employeeToDelete?.name}</span>?
            </p>

            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setDeleteOpen(false)}>
                Cancel
              </Button>

              <Button variant="destructive" onClick={handleConfirmDelete}>
                Delete
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Employees;
