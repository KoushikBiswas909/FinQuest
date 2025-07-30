"use client"
import { useState } from "react";
import SlideInModal from "@/components/slideInPanel/SlideInModal";
import EmployeeForm from "@/features/employees/components/EmployeeForm";
import EmployeesTablePage from "@/features/employees/components/EmployeesTablePage";


export default function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleFormSubmit = () => {
    // Close modal
    setIsModalOpen(false);
    // Trigger table refresh
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="bg-white min-h-screen p-6">
      <button
        onClick={() => setIsModalOpen(true)}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Add Employee
      </button>

      {/* Employee Table */}
      <EmployeesTablePage refreshKey={refreshKey} />

      {/* Slide-in Modal */}
      <SlideInModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Employee"
      >
        <EmployeeForm onSubmit={handleFormSubmit} />
      </SlideInModal>
    </div>
  );
}
