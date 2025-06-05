import { z } from "zod";

export const gameSchema = z.object({
  account: z.string(),
  title: z.string(),
  saves: z.array(z.string()).optional(),
});

export type GameSchema = z.infer<typeof gameSchema>;
