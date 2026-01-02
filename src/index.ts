import { Hono } from "hono";
import { systemRoutes } from "./routes/system";
import { aiRoutes } from "./routes/ai";
import { infraRoutes } from "./routes/infra";
// import { mongo } from "./db/mongo";
import { cors } from "hono/cors";
import { meRoute } from "./routes/me";
// import connectDB from "./db/config";
// await mongo.$connect();
const app = new Hono();
app.use(cors());
app.get("/", (c) => {
  return c.text("Hello LogicFlow!");
});

// connectDB();

app.route("/api/v1/system", systemRoutes);
app.route("/api/v1/ai", aiRoutes);
app.route("/api/v1/infra", infraRoutes);
app.route("/api/v1/me", meRoute)

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
