import { MiddlewareHandler } from "hono";

export const requirePermission = (perm: string): MiddlewareHandler =>
  async (c, next) => {
    const user = c.get("user");
    if (!user?.permissions?.includes(perm)) {
      return c.json({ error: "Forbidden" }, 403);
    }
    await next();
  };
