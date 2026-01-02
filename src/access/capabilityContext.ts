import { CAPABILITIES, CapabilityId } from "./capabilities";

export type CapabilityContext = {
  id: CapabilityId;
  domain: string;
  risk: string;
};

export function buildCapabilityContext(
  ids: CapabilityId[] | ["*"]
): CapabilityContext[] {
  if (ids.includes("*")) {
    return Object.values(CAPABILITIES).map(c => ({
      id: c.id,
      domain: c.domain,
      risk: c.risk,
    }));
  }

  return ids.map(id => {
    const def = Object.values(CAPABILITIES).find(c => c.id === id);
    if (!def) throw new Error(`Unknown capability ${id}`);
    return {
      id: def.id,
      domain: def.domain,
      risk: def.risk,
    };
  });
}
