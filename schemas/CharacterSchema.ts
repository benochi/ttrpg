import { z } from "zod";

export const characterSchema = z.object({
  savedGame: z.string(),
  name: z.string(),
  level: z.number().min(1).default(1),
  inventory: z.string().optional(),
});

export type CharacterSchema = z.infer<typeof characterSchema>;
