import { Hono } from "hono";
import { authMiddleware } from "../auth/authMiddleware";
import { requireCapability } from "../access/requireCapability";
import { CAPABILITIES } from "../access/capabilities";
import { requireAICoreHandshake } from "../access/policies";
import { auditLog } from "../audit/auditLogger";
import { AppEnv } from "../types/types";
import { validator } from "@logifex/validator";
import { infraProvisionValidator } from "../validator/infra.validator";

export const infraRoutes = new Hono<AppEnv>();

infraRoutes.post(
  "/provision",
  async ()=>{console.log("Infra endpoint hit")},
  authMiddleware,
  requireCapability(CAPABILITIES.INFRA_PROVISION),
  requireAICoreHandshake,
  validator(infraProvisionValidator),
  async (c) => {
    const user = c.get("user");

    await auditLog(user.id, "INFRA_PROVISION");

    return c.json({ status: "provisioned" });
  }
);
