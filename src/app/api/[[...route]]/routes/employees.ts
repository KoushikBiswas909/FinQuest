import { Hono } from "hono";
import { getAllEmployees } from "@/services/employeesService";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";

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

export default app;