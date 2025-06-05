import { z } from "zod";

export const accountSchema = z.object({
  user: z.string(),
  games: z.array(z.string()),
});