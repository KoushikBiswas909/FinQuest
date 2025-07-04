import { Hono } from "hono";
import employees from "./routes/employees"
import { handle } from "hono/vercel";

export const runtime = "nodejs";

const app = new Hono().basePath("/api");
const routes = app.route("/employees", employees);


export const GET = handle(app);
export const POST = handle(app);


// generating RPC types
export type AppType = typeof routes;