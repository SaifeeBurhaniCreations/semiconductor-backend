import { PolicyContext } from "../types/policy";

export const require2FA = async (c, next) => {
  if (!c.get("user").twoFA) {
    return c.json({ error: "2FA required" }, 403);
  }
  await next();
};

export const requireCriticalApproval = async (c, next) => {
  const cap = c.get("activeCapability");
  if (cap.risk === "critical" && !c.get("user").twoFA) {
    return c.json({ error: "Critical action requires 2FA" }, 403);
  }
  await next();
};
// RULE-IPL-V2
export const requireAICoreHandshake = async (c, next) => {
  const aiCoreHealthy = true; // replace with real signal
  if (!aiCoreHealthy) {
    return c.json({ error: "AI core validation failed" }, 412);
  }
  await next();
};