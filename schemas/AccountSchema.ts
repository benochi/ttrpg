import { z } from "zod";

export const accountSchema = z.object({
  user: z.string(),
  games: z.array(z.string()).optional(),
});

export type AccountSchema = z.infer<typeof accountSchema>;
