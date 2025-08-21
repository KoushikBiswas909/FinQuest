"use client";

import React, { useEffect, useState } from "react";
import SortableTable, { Column } from "@/components/sortableTable/SortableTable";
import { FiEdit, FiTrash } from "react-icons/fi";
import SlideInModal from "@/components/slideInPanel/SlideInModal";
import EmployeeForm from "./EmployeeForm";

interface Employee {
    employeeId: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    dateOfBirth: string;
    gender: string;
    hireDate: string;
    position: string;
    departmentId: string;
    supervisorId: string;
    salary: string;
    address: string;
    activity: string;
}

export default function EmployeesTablePage() {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [refreshKey, setRefreshKey] = useState(0);

    // Delete modal state
    const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);


    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

    const openEditModal = (employee: Employee) => {
        setEditingEmployee(employee);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingEmployee(null);
    };

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch("http://localhost:3000/api/employees");
            const json = await res.json();
            const apiData = Array.isArray(json) ? json : json.data ?? [];

            // Normalize so table always has employeeId
            const normalized = apiData.map((emp: any, index: number) => ({
                ...emp,
                employeeId: emp.employeeId ?? emp.id ?? `temp-${index}`,
            }));

            setEmployees(normalized);
            setSelectedIds([]);
        };
        fetchData();
    }, [refreshKey]);

    // confirmDelete and cancelDelete HERE
    const confirmDelete = async () => {
        if (!employeeToDelete) return;

        const res = await fetch(`/api/employees/${employeeToDelete.employeeId}`, {
            method: "DELETE",
        });

        if (res.ok) {
            setRefreshKey((k) => k + 1);
        }

        setIsDeleteModalOpen(false);
        setEmployeeToDelete(null);
    };

    const cancelDelete = () => {
        setIsDeleteModalOpen(false);
        setEmployeeToDelete(null);
    };



    const columns: Column<Employee>[] = [
        { key: "employeeId", label: "ID" },
        { key: "firstName", label: "First Name" },
        { key: "lastName", label: "Last Name" },
        { key: "email", label: "Email" },
        { key: "phoneNumber", label: "Phone" },
        { key: "dateOfBirth", label: "DOB" },
        { key: "gender", label: "Gender" },
        { key: "hireDate", label: "Hire Date" },
        { key: "position", label: "Position" },
        { key: "departmentId", label: "Department ID" },
        { key: "supervisorId", label: "Supervisor ID" },
        { key: "salary", label: "Salary" },
        { key: "address", label: "Address" },
    ];

    const handleDelete = async (employee: Employee) => {
        if (!confirm(`Delete employee ${employee.firstName}?`)) return;

        const res = await fetch(`/api/employees/${employee.employeeId}`, {
            method: "DELETE",
        });
        if (res.ok) {
            setRefreshKey((k) => k + 1);
        }
    };

    const handleFormSubmit = () => {
        closeModal();                 // close modal
        setRefreshKey((k) => k + 1);  // triggers data refetch
    };

    return (
        <div className="bg-white">
            {selectedIds.length > 0 && (
                <div className="mb-4">
                    <button
                        className="px-4 py-2 bg-green-600 text-white rounded"
                        onClick={() => {
                            alert("Selected IDs: " + selectedIds.join(", "));
                        }}
                    >
                        Pay Salary
                    </button>
                </div>
            )}

            <SortableTable
                columns={columns}
                data={employees}
                enableSelection
                selectedIds={selectedIds}
                onSelectionChange={setSelectedIds}
                idKey="employeeId"
                renderActions={(row) => (
                    <div className="flex gap-2">
                        <button
                            onClick={() => openEditModal(row)}
                            className="text-blue-600 hover:text-blue-800"
                        >
                            <FiEdit />
                        </button>
                        <button
                            onClick={() => {
                                setEmployeeToDelete(row);
                                setIsDeleteModalOpen(true);
                            }}
                            className="text-red-600 hover:text-red-800"
                        >
                            <FiTrash />
                        </button>
                    </div>
                )}
            />

            {/* Slide-in modal */}
            <SlideInModal
                isOpen={isModalOpen}
                onClose={closeModal}
                title={editingEmployee ? "Edit Employee" : "Add Employee"}
            >
                <EmployeeForm
                    onSubmit={handleFormSubmit}
                    initialValues={
                        editingEmployee
                            ? {
                                ...editingEmployee,
                                // cast gender and position safely to expected literals
                                gender:
                                    editingEmployee.gender === "Male" ||
                                        editingEmployee.gender === "Female" ||
                                        editingEmployee.gender === "Transgender"
                                        ? editingEmployee.gender
                                        : "Male",
                                position:
                                    editingEmployee.position === "Software Engineer" ||
                                        editingEmployee.position === "Marketing"
                                        ? editingEmployee.position
                                        : "Software Engineer",
                                activity:
                                    editingEmployee.activity === "Active" ||
                                        editingEmployee.activity === "Not Active"
                                        ? editingEmployee.activity
                                        : "Active",
                                salary: Number(editingEmployee.salary),
                            }
                            : undefined
                    }
                />

            </SlideInModal>

            {isDeleteModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    {/* Background blur */}
                    <div className="absolute inset-0 backdrop-blur-sm" />

                    <div className="bg-white p-6 rounded-lg shadow-lg z-10 max-w-sm w-full">
                        <h2 className="text-lg font-semibold mb-4 text-gray-800">
                            Are you sure you want to delete{" "}
                            <span className="font-bold">{employeeToDelete?.firstName}</span>?
                        </h2>
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={cancelDelete}
                                className="px-4 py-2 bg-blue-400 rounded hover:bg-blue-600"
                            >
                                No
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                            >
                                Yes
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}
