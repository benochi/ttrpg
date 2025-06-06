import { z } from "zod";

export const gameTitleSchema = z.object({
  name: z.string().min(1, "Required"),
  description: z.string().min(1, "Required"),
  developer: z.string().min(1, "Required"),
  genre: z.string().min(1, "Required"),
  tags: z.array(z.string()).optional(),
  features: z.array(z.string()).optional(),
  releaseDate: z
    .string()
    .refine(val => !isNaN(Date.parse(val)), { message: "Invalid date format" }),
  thumbnailUrl: z
    .string()
    .transform(val => (val.trim() === "" ? undefined : val))
    .optional()
    .refine(val => !val || /^https?:\/\//.test(val), { message: "Invalid URL" }),
  coverImageUrl: z
    .string()
    .transform(val => (val.trim() === "" ? undefined : val))
    .optional()
    .refine(val => !val || /^https?:\/\//.test(val), { message: "Invalid URL" }),
  isFree: z.boolean(),
  price: z
    .preprocess(val => (val === "" || val === null || isNaN(Number(val)) ? 0 : Number(val)), z.number()),
  subscriptionPrice: z
    .preprocess(val => (val === "" || val === null || isNaN(Number(val)) ? 0 : Number(val)), z.number()),
});

export type GameTitleInput = z.infer<typeof gameTitleSchema>;
