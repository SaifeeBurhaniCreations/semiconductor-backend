import { verifyToken } from "./jwt";
import { ROLE_CAPABILITIES } from "../access/roleCapabilities";

export const authMiddleware = async (c, next) => {
  const auth = c.req.header("authorization");
  if (!auth) return c.json({ error: "Unauthorized" }, 401);

  try {
    const token = auth.replace("Bearer ", "");
    const decoded = verifyToken(token);

    const roleCaps = ROLE_CAPABILITIES[decoded.role] || [];

    c.set("user", {
      id: decoded.sub,
      role: decoded.role,
      capabilities: roleCaps,
      twoFactorVerified: decoded.twoFactorVerified ?? false,
    });

    await next();
  } catch {
    return c.json({ error: "Invalid token" }, 401);
  }
};
