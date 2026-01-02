// src/types/capability.ts

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

export type CapabilityId = string;

export type CapabilityDefinition = {
  id: CapabilityId;
  domain: CapabilityDomain;
  action: string;
  description: string;
  risk: CapabilityRisk;
};

export type CapabilityContext = {
  id: CapabilityId;
  domain: CapabilityDomain;
  risk: CapabilityRisk;
};
