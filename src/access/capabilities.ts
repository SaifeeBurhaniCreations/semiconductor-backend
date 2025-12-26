export const CAPABILITIES = {
  // System
  SYSTEM_LOCKDOWN_GLOBAL: "system:lockdown:global",
  SYSTEM_LOCKDOWN_LOCAL: "system:lockdown:local",

  // Infrastructure
  INFRA_PROVISION: "infra:provision",
  INFRA_ROUTING_CHANGE: "infra:routing:change",

  // AI
  AI_COMMAND_EXECUTE: "ai:command:execute",
  AI_COMMAND_QUERY: "ai:command:query",
  AI_MODEL_ISOLATE: "ai:model:isolate",

  // Manufacturing / Safety
  EMERGENCY_STOP_LOCAL: "emergency:stop:local",
  EMERGENCY_STOP_GLOBAL: "emergency:stop:global",

  // Data
  DATA_EXPORT_RAW: "data:export:raw",
  DATA_EXPORT_PDF: "data:export:pdf",
  DATA_EXPORT_SNAPSHOT: "data:export:snapshot",
} as const;

export type Capability =
  (typeof CAPABILITIES)[keyof typeof CAPABILITIES];
