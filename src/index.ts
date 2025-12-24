import { serve } from "bun";
import { Hono } from "hono";
import { cors } from "hono/cors";
import "dotenv/config";
import { loginRoute } from "./auth/login";
import { employeesRoute } from "./routes/employees";
import { authMiddleware } from "./auth/middleware";
import { mongo } from "./db/mongo";
// import connectDB from "./db/config";
await mongo.$connect();
const app = new Hono();
app.use(cors());
app.get("/", (c) => {
  return c.text("Hello LogicFlow!");
});

// connectDB();

app.route("/login", loginRoute);

app.use("/employees/*", authMiddleware);
app.route("/employees", employeesRoute);

app.post("/api/v1/login", async (c) => {
  const { username, password } = await c.req.json();
  if (
    username !== process.env.LOGIN_USERNAME ||
    password !== process.env.LOGIN_PASSWORD
  ) {
    return c.json({ success: false }, 401);
  } else {
    return c.json({ success: true }, 200);
  }
});

const port = process.env.BUN_PORT ? parseInt(process.env.BUN_PORT) : 8000;

export default {
  fetch: app.fetch,
  port,
};

console.log(`Server started at https://localhost:${port}`);

// export default app;
