import { Hono } from "hono";
import { authMiddleware } from "../auth/authMiddleware";
import { requireCapability } from "../access/requireCapability";
import { CAPABILITIES } from "../access/capabilities";
import { auditLog } from "../audit/auditLogger";

export const aiRoutes = new Hono();

aiRoutes.post(
  "/command",
  authMiddleware,
  requireCapability(CAPABILITIES.AI_COMMAND_EXECUTE),
  async (c) => {
    const user = c.get("user");
    const body = await c.req.json();

    await auditLog(user.id, "AI_COMMAND_EXECUTE", body);

    return c.json({ result: "command accepted" });
  }
);
