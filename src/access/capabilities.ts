export type CapabilityRisk =
  | "low"
  | "medium"
  | "high"
  | "critical";

export type CapabilityDomain =
  | "system"
  | "infra"
  | "ai"
  | "emergency"
  | "data";

export type CapabilityDefinition = {
  id: string;
  domain: CapabilityDomain;
  action: string;
  description: string;
  risk: CapabilityRisk;
};

export const CAPABILITIES = {
  SYSTEM_LOCKDOWN_GLOBAL: {
    id: "system:lockdown:global",
    domain: "system",
    action: "lockdown",
    description: "Initiate or lift a global system lockdown",
    risk: "critical",
  },

  SYSTEM_LOCKDOWN_LOCAL: {
    id: "system:lockdown:local",
    domain: "system",
    action: "lockdown",
    description: "Initiate or lift a local system lockdown",
    risk: "high",
  },

  INFRA_PROVISION: {
    id: "infra:provision",
    domain: "infra",
    action: "provision",
    description: "Provision infrastructure resources",
    risk: "high",
  },

  AI_COMMAND_EXECUTE: {
    id: "ai:command:execute",
    domain: "ai",
    action: "execute",
    description: "Execute AI system commands",
    risk: "high",
  },

  AI_COMMAND_QUERY: {
    id: "ai:command:query",
    domain: "ai",
    action: "query",
    description: "Query AI system state",
    risk: "medium",
  },

  EMERGENCY_STOP_LOCAL: {
    id: "emergency:stop:local",
    domain: "emergency",
    action: "stop",
    description: "Trigger a local emergency stop",
    risk: "high",
  },

  DATA_EXPORT_PDF: {
    id: "data:export:pdf",
    domain: "data",
    action: "export",
    description: "Export data as PDF",
    risk: "medium",
  },
} as const;

export type CapabilityId =
  (typeof CAPABILITIES)[keyof typeof CAPABILITIES]["id"];
