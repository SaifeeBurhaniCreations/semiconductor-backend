export const auditLog = async (
  userId: string,
  action: string,
  metadata?: any
) => {
  console.log("[AUDIT]", {
    userId,
    action,
    metadata,
    at: new Date().toISOString(),
  });
};
