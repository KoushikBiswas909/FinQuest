import { Hono } from "hono";
import { getAllEmployees } from "@/services/employeesService";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";
import { employees, insertEmployeesSchema } from "@/database/schema/employee-directory/employees";
import { db } from "@/database/drizzle";
// import { createId } from "@paralleldrive/cuid2";

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

export default app;