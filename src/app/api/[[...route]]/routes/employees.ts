import { Hono } from "hono";
import { getAllEmployees } from "@/services/employeesService";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";
import { employees, insertEmployeesSchema } from "@/database/schema/employee-directory/employees";
import { db } from "@/database/drizzle";
import { eq } from "drizzle-orm";
// import { createId } from "@paralleldrive/cuid2";

// For update this is a partial schema
const updateEmployeesSchema = insertEmployeesSchema.partial();

const app = new Hono()
    .get("/",
        clerkMiddleware(),
        async (c) => {
            const auth = getAuth(c);
            if (!auth?.userId) {
                return c.json({ error: "unauthorized" }, 401);
            }
            const data = await getAllEmployees();
            return c.json({ data });
        })
    .post(
        "/",
        clerkMiddleware(),
        zValidator("json", insertEmployeesSchema),
        async (c) => {
            const auth = getAuth(c);
            const values = c.req.valid("json");
            if (!auth?.userId) {
                return c.json({ error: "unauthorized" }, 401);
            }
            const [newEmployee] = await db.insert(employees).values(values).returning();

            return c.json({ data: newEmployee }, 201);
        }

    )
    .put(
        "/:id",
        clerkMiddleware(),
        zValidator("json", updateEmployeesSchema),
        async (c) => {
            const auth = getAuth(c);
            if (!auth?.userId) {
                return c.json({ error: "unauthorized" }, 401);
            }

            const id = c.req.param("id");
            const values = c.req.valid("json");

            // Update only the provided fields
            const [updatedEmployee] = await db
                .update(employees)
                .set(values)
                .where(eq(employees.employeeId, id))
                .returning();

            if (!updatedEmployee) {
                return c.json({ error: "Employee not found" }, 404);
            }

            return c.json({ data: updatedEmployee });
        }
    )
    .delete(
        "/:id",
        clerkMiddleware(),
        async (c) => {
            const auth = getAuth(c);
            if (!auth?.userId) {
                return c.json({ error: "unauthorized" }, 401);
            }

            const id = c.req.param("id");

            const [deletedEmployee] = await db
                .delete(employees)
                .where(eq(employees.employeeId, id))
                .returning();

            if (!deletedEmployee) {
                return c.json({ error: "Employee not found" }, 404);
            }

            return c.json({ data: deletedEmployee });
        }
    );

export default app;