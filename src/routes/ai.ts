import { Hono } from "hono";
import { authMiddleware } from "../auth/authMiddleware";
import { requireCapability } from "../access/requireCapability";
import { CAPABILITIES } from "../access/capabilities";

export const aiRoutes = new Hono();

aiRoutes.post(
  "/command",
  authMiddleware,
  requireCapability(CAPABILITIES.AI_COMMAND_EXECUTE.id),
  async (c) => {
    return c.json({ status: "AI command accepted" });
  }
);
