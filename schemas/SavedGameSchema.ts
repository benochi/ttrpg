import { z } from "zod";

export const savedGameSchema = z.object({
  game: z.string(),
  slot: z.number().min(0),
  characters: z.array(z.string()).optional(),
});

export type SavedGameSchema = z.infer<typeof savedGameSchema>;
