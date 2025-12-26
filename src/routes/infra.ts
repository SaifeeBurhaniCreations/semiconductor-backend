import { Hono } from "hono";
import { authMiddleware } from "../auth/authMiddleware";
import { requireCapability } from "../access/requireCapability";
import { CAPABILITIES } from "../access/capabilities";
import { requireAICoreHandshake } from "../access/policies";
import { auditLog } from "../audit/auditLogger";

export const infraRoutes = new Hono();

infraRoutes.post(
  "/provision",
  authMiddleware,
  requireCapability(CAPABILITIES.INFRA_PROVISION),
  requireAICoreHandshake,
  async (c) => {
    const user = c.get("user");

    await auditLog(user.id, "INFRA_PROVISION");

    return c.json({ status: "provisioned" });
  }
);
