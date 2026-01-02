import { verifyAccessToken } from "./jwt";
import { MiddlewareWrapper } from "../types/types";
import { UserContext } from "../types/core";
import { AccessTokenPayload } from "../types/jwt";

export const authMiddleware: MiddlewareWrapper = async (c, next) => {
  const auth = c.req.header("authorization");
  if (!auth) return c.json({ error: "Unauthorized" }, 401);

  try {
    const token = auth.replace("Bearer ", "");
    const decoded = verifyAccessToken(token) as AccessTokenPayload;

    const user: UserContext = {
      id: decoded.sub,
      role: decoded.role,
      capabilities: decoded.caps,
      twoFA: decoded.twoFA,
    };

    c.set("user", user);

    await next();
  } catch {
    return c.json({ error: "Invalid or expired token" }, 401);
  }
};
