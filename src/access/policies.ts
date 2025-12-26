// RULE-GSP-742
export const require2FA = async (c, next) => {
  const user = c.get("user");
  if (!user.twoFactorVerified) {
    return c.json({ error: "2FA required" }, 403);
  }
  await next();
};

// RULE-IPL-V2
export const requireAICoreHandshake = async (c, next) => {
  const aiCoreHealthy = true; // replace with real signal
  if (!aiCoreHealthy) {
    return c.json(
      { error: "AI core validation failed" },
      412
    );
  }
  await next();
};
