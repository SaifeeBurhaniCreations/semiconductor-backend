import { Hono } from "hono";
import { ROLE_BOOTSTRAP } from "../access/roleBootstrap";
import { buildCapabilityContext } from "../access/capabilityContext";
import { signAccessToken, signRefreshToken } from "./jwt";
import { auditLog } from "../audit/auditLogger";

export const loginRoute = new Hono();

loginRoute.post("/", async (c) => {
  const body = await c.req.json();

  // MOCK USER (replace later)
  const user = {
    id: "user-1",
    role: body.role,
    twoFA: body.twoFA === true,
  };

  const capIds = ROLE_BOOTSTRAP[user.role] || [];
  const capabilityContext = buildCapabilityContext(capIds as any);

  const accessToken = signAccessToken({
    userId: user.id,
    role: user.role,
    capabilities: capabilityContext,
    twoFA: user.twoFA,
  });

  const refreshToken = signRefreshToken(user.id);

  await auditLog(user.id, "LOGIN_SUCCESS", {
    role: user.role,
    capabilities: capabilityContext.map(c => c.id),
  });

  return c.json({ accessToken, refreshToken });
});
