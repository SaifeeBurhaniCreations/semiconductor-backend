import { CapabilityId } from "../types/capability";
import { UserContext } from "../types/core";



export const requireCapability = (cap: CapabilityId) =>
  async (c, next) => {
    const user = c.get("user") as UserContext;

    const match = user.capabilities.find(
      (uc) => uc.id === cap
    );

    if (!match) {
      return c.json({ error: "Forbidden" }, 403);
    }

    // risk-based hook (future)
    c.set("activeCapability", match);

    await next();
  };
