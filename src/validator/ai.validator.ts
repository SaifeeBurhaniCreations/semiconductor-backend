// schemas/ai.validator.ts
import { z } from "zod";

export const aiCommandValidator = {
  body: z.object({
    command: z.string().min(1),
    payload: z.unknown().optional(),
    targetObjectId: z.string().uuid().optional(),
  }),
};
