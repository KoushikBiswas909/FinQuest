"use client";

import React, { useEffect, useState } from "react";
import SortableTable, { Column } from "@/components/sortableTable/SortableTable";

interface Employee {
  id: string;
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
}

export default function EmployeesTablePage({ refreshKey }: { refreshKey?: number }) {
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:3000/api/employees");
      const json = await res.json();
      const data = Array.isArray(json) ? json : json.data ?? [];
      setEmployees(data);
    };
    fetchData();
  }, [refreshKey]);

  const columns: Column<Employee>[] = [
    { key: "id", label: "ID" },
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

  return (
    <div className="p-6 bg-white min-h-screen">
      <SortableTable columns={columns} data={employees} />
    </div>
  );
}
