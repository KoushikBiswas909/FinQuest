import { db } from "@/database/drizzle"
import { employees } from "@/database/schema/employee-directory/employees"

export const getAllEmployees = async () => {
    return db.select({
        id: employees.employeeId,
        firstName: employees.firstName,
        lastName: employees.lastName,
        email: employees.email,
        phoneNumber: employees.phoneNumber,
        dateOfBirth: employees.dateOfBirth,
        gender: employees.gender,
        hireDate: employees.hireDate,
        position: employees.position,
        departmentId: employees.departmentId,
        supervisorId: employees.supervisorId,
        salary: employees.salary,
        address: employees.address
    }).from(employees);
}