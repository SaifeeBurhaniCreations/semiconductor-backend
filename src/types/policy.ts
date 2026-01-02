// src/types/policy.ts

import { CapabilityRisk } from "./capability";

export type PolicyResult =
  | { allowed: true }
  | { allowed: false; reason: string };

export type PolicyContext = {
  userId: string;
  role: string;
  twoFA: boolean;
  capabilityRisk: CapabilityRisk;
};
