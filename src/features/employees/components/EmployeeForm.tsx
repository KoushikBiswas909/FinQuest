"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

interface EmployeeFormInputs {
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  gender: "Male" | "Female" | "Transgender";
  hireDate: string;
  position: "Software Engineer" | "Marketing";
  departmentId: string;
  supervisorId: string;
  salary: number;
  address: string;
  activity: "Active" | "Not Active";
}

interface EmployeeFormProps {
  onSubmit: (data: EmployeeFormInputs) => void;
  initialValues?: EmployeeFormInputs;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({ onSubmit, initialValues }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EmployeeFormInputs>({
    defaultValues: initialValues || {
      employeeId: "",
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      dateOfBirth: "",
      gender: "Male",
      hireDate: "",
      position: "Software Engineer",
      departmentId: "",
      supervisorId: "",
      salary: 1,
      address: "",
      activity: "Active"
    },
  });

  useEffect(() => {
    if (initialValues) {
      reset(initialValues);
    }
  }, [initialValues, reset]);

  const handleReset = () => {
    reset();
  };

  const submitForm = async (data: EmployeeFormInputs) => {
  try {
    const isEdit = !!initialValues;
    const url = isEdit
      ? `http://localhost:3000/api/employees/${data.employeeId}`
      : "http://localhost:3000/api/employees";
    const method = isEdit ? "PUT" : "POST";

    let payload: any = { ...data };
    if (isEdit) {
      delete payload.employeeId;
      payload = Object.fromEntries(
        Object.entries(payload).filter(([key, value]) => {
          return (initialValues as any)?.[key] !== value;
        })
      );
    }

    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const result = await response.json();
    console.log("Success:", result);

    // Important change:
    onSubmit?.(result.data); // pass server-created employee data
    reset();
  } catch (error) {
    console.error("Error submitting form:", error);
  }
};


  return (
    <div className="h-full flex flex-col">
      <form onSubmit={handleSubmit(submitForm)} className="flex flex-col h-full">
        {/* Scrollable content area */}
        <div className="flex-1 overflow-y-auto px-4 pt-6 space-y-6">

          {/* Employee ID */}
          <div>
            <label className="block text-sm font-semibold text-black mb-1">
              Employee ID
            </label>
            <input
              type="text"
              {...register("employeeId", { required: "Employee ID is required" })}
              className={`w-full px-3 py-2 border ${errors.employeeId ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
            />
            {errors.employeeId && (
              <p className="text-sm text-red-500 mt-1">{errors.employeeId.message}</p>
            )}
          </div>

          {/* First Name */}
          <div>
            <label className="block text-sm font-semibold text-black mb-1">
              First Name
            </label>
            <input
              type="text"
              {...register("firstName", { required: "First name is required" })}
              className={`w-full px-3 py-2 border ${errors.firstName ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
            />
            {errors.firstName && (
              <p className="text-sm text-red-500 mt-1">{errors.firstName.message}</p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-semibold text-black mb-1">
              Last Name
            </label>
            <input
              type="text"
              {...register("lastName", { required: "Last name is required" })}
              className={`w-full px-3 py-2 border ${errors.lastName ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
            />
            {errors.lastName && (
              <p className="text-sm text-red-500 mt-1">{errors.lastName.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-black mb-1">
              Email ID
            </label>
            <input
              type="text"
              {...register("email", { required: "Email is required" })}
              className={`w-full px-3 py-2 border ${errors.email ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-semibold text-black mb-1">
              Phone Number
            </label>
            <input
              type="text"
              {...register("phoneNumber", { required: "Phone Number is required" })}
              className={`w-full px-3 py-2 border ${errors.phoneNumber ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
            />
            {errors.phoneNumber && (
              <p className="text-sm text-red-500 mt-1">{errors.phoneNumber.message}</p>
            )}
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-sm font-semibold text-black mb-1">
              Date of Birth
            </label>
            <input
              type="date"
              {...register("dateOfBirth", { required: "Date of Birth is required" })}
              className={`w-full px-3 py-2 border ${errors.dateOfBirth ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
            />
            {errors.dateOfBirth && (
              <p className="text-sm text-red-500 mt-1">{errors.dateOfBirth.message}</p>
            )}
          </div>


          {/* Gender */}
          <div>
            <label className="block text-sm font-semibold text-black mb-1">
              Gender
            </label>
            <select
              {...register("gender", { required: "Gender is required" })}
              className={`w-full px-3 py-2 border ${errors.gender ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
              defaultValue=""
            >
              <option value="" disabled>Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Transgender">Transgender</option>
            </select>
            {errors.gender && (
              <p className="text-sm text-red-500 mt-1">{errors.gender.message}</p>
            )}
          </div>


          {/* Hire Date */}
          <div>
            <label className="block text-sm font-semibold text-black mb-1">
              Hire Date
            </label>
            <input
              type="date"
              {...register("hireDate", { required: "Hire date is required" })}
              className={`w-full px-3 py-2 border ${errors.hireDate ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
            />
            {errors.hireDate && (
              <p className="text-sm text-red-500 mt-1">{errors.hireDate.message}</p>
            )}
          </div>

          {/* Position */}
          <div>
            <label className="block text-sm font-semibold text-black mb-1">
              Position
            </label>
            <select
              {...register("position", { required: "Position is required" })}
              className={`w-full px-3 py-2 border ${errors.position ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
              defaultValue=""
            >
              <option value="" disabled>Select position</option>
              <option value="Software Engineer">Software Engineer</option>
              <option value="Marketing">Marketing</option>
            </select>
            {errors.position && (
              <p className="text-sm text-red-500 mt-1">{errors.position.message}</p>
            )}
          </div>


          {/* Department ID */}
          <div>
            <label className="block text-sm font-semibold text-black mb-1">
              Department ID
            </label>
            <input
              type="text"
              {...register("departmentId", { required: "Department ID is required" })}
              className={`w-full px-3 py-2 border ${errors.departmentId ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
            />
            {errors.departmentId && (
              <p className="text-sm text-red-500 mt-1">{errors.departmentId.message}</p>
            )}
          </div>

          {/* Supervisor ID */}
          <div>
            <label className="block text-sm font-semibold text-black mb-1">
              Supervisor ID
            </label>
            <input
              type="text"
              {...register("supervisorId", { required: "Supervisor ID is required" })}
              className={`w-full px-3 py-2 border ${errors.supervisorId ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
            />
            {errors.supervisorId && (
              <p className="text-sm text-red-500 mt-1">{errors.supervisorId.message}</p>
            )}
          </div>

          {/* Salary */}
          <div>
            <label className="block text-sm font-semibold text-black mb-1">
              Salary
            </label>
            <input
              type="text"
              {...register("salary", { required: "salary is required" })}
              className={`w-full px-3 py-2 border ${errors.salary ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
            />
            {errors.salary && (
              <p className="text-sm text-red-500 mt-1">{errors.salary.message}</p>
            )}
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-semibold text-black mb-1">
              Address
            </label>
            <input
              type="text"
              {...register("address", { required: "Address is required" })}
              className={`w-full px-3 py-2 border ${errors.address ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
            />
            {errors.address && (
              <p className="text-sm text-red-500 mt-1">{errors.address.message}</p>
            )}
          </div>

          {/* Activity */}
          <div>
            <label className="block text-sm font-semibold text-black mb-1">
              Activity
            </label>

            <div className="flex space-x-6">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="Active"
                  {...register("activity", { required: "Activity is required" })}
                  className="text-blue-500 focus:ring-blue-500"
                />
                <span className="text-black">Active</span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="Not Active"
                  {...register("activity", { required: "Activity is required" })}
                  className="text-blue-500 focus:ring-blue-500"
                />
                <span className="text-black">Not Active</span>
              </label>
            </div>

            {errors.activity && (
              <p className="text-sm text-red-500 mt-1">{errors.activity.message}</p>
            )}
          </div>



          {/* Extra inputs for scrolling test, UNCONTROLLED (no react-hook-form register) */}
          {/* {[...Array(15)].map((_, i) => (
            <div key={i}>
              <label className="block text-sm font-semibold text-black mb-1">
                Extra Field {i + 1}
              </label>
              <input
                type="text"
                placeholder={`Extra input ${i + 1}`}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          ))} */}

          {/* Spacer to push footer down if not enough content */}
          <div className="flex-grow" />
        </div>

        {/* Sticky Footer */}
        <div className="shrink-0 border-t pt-4 pb-4 px-4 bg-white sticky bottom-0 z-10">
          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2 text-gray-700 hover:text-black border border-gray-300 rounded hover:bg-gray-100 transition"
            >
              Reset
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;
