// src/types/core.ts

import { CapabilityContext } from "./capability";

export type UserContext = {
  id: string;
  role: string;
  capabilities: CapabilityContext[];
  twoFA: boolean;
};

export type RequestContext = {
  user?: UserContext;
  activeCapability?: CapabilityContext;
};
