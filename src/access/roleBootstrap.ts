import { CAPABILITIES, CapabilityId } from "./capabilities";

export const ROLE_BOOTSTRAP: Record<string, CapabilityId[]> = {
  admin: ["*"],

  engineer: [
    CAPABILITIES.AI_COMMAND_EXECUTE.id,
    CAPABILITIES.AI_COMMAND_QUERY.id,
    CAPABILITIES.INFRA_PROVISION.id,
    CAPABILITIES.DATA_EXPORT_PDF.id,
  ],

  operator: [
    CAPABILITIES.AI_COMMAND_QUERY.id,
    CAPABILITIES.EMERGENCY_STOP_LOCAL.id,
  ],

  auditor: [
    CAPABILITIES.DATA_EXPORT_PDF.id,
  ],
};
