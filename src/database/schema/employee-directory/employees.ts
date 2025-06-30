import { pgTable, varchar, text, date, timestamp, numeric, boolean } from "drizzle-orm/pg-core";
import { departments } from "./departments";

export const employees = pgTable("employees", {
  employeeId: varchar("employee_id", { length: 36 }).primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull().unique(),
  phoneNumber: text("phone_number").unique(),
  dateOfBirth: date("date_of_birth"),
  gender: text("gender"),
  hireDate: date("hire_date").notNull(),
  position: text("position"),
  departmentId: varchar("department_id", { length: 36 }).notNull()
    .references(() => departments.id),
  supervisorId: varchar("supervisor_id", { length: 36 }),
  salary: numeric("salary", { precision: 12, scale: 2 }),
  address: text("address"),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});
