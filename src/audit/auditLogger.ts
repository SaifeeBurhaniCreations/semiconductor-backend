export const auditLog = async (
  userId: string,
  action: string,
  meta?: any
) => {
  console.log("[AUDIT]", {
    userId,
    action,
    meta,
    timestamp: new Date().toISOString(),
  });
};
