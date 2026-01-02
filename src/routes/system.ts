import { Hono } from "hono";
import { authMiddleware } from "../auth/authMiddleware";
import { requireCapability } from "../access/requireCapability";
import { require2FA } from "../access/policies";
import { CAPABILITIES } from "../access/capabilities";
import { auditLog } from "../audit/auditLogger";

export const systemRoutes = new Hono();

systemRoutes.post(
  "/lockdown/global",
  authMiddleware,
  requireCapability(CAPABILITIES.SYSTEM_LOCKDOWN_GLOBAL.id),
  require2FA,
  async (c) => {
    const user = c.get("user");
    await auditLog(user.id, "SYSTEM_LOCKDOWN_GLOBAL");
    return c.json({ status: "LOCKED" });
  }
);
