// schemas/system.validator.ts
import { z } from "zod";

export const systemLockdownValidator = {
  body: z.object({}).strict(),
};
