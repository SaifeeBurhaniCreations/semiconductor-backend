import { Capability } from "./capabilities";

export const requireCapability = (capability: Capability) =>
  async (c, next) => {
    const user = c.get("user");

    if (
      user.capabilities.includes("*") ||
      user.capabilities.includes(capability)
    ) {
      return next();
    }

    return c.json(
      { error: `Forbidden: missing capability ${capability}` },
      403
    );
  };
