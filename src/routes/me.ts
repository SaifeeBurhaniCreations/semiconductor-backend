import { Hono } from "hono";
import { authMiddleware } from "../auth/authMiddleware";

export const meRoute = new Hono();

meRoute.get("/", authMiddleware, async (c) => {
  return c.json(c.get("user"));
});
