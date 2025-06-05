import { z } from "zod";

export const itemSchema = z.object({
  itemId: z.number(),
  name: z.string(),
  type: z.string(),
  size: z.tuple([z.number(), z.number()]),
  properties: z.record(z.any()).optional(),
});

export type ItemSchema = z.infer<typeof itemSchema>;
