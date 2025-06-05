import { z } from "zod";

export const inventoryEquippedSchema = z.object({
  character: z.string(),
  slots: z.object({
    head: z.number().optional(),
    chest: z.number().optional(),
    legs: z.number().optional(),
    feet: z.number().optional(),
    arms: z.number().optional(),
    hands: z.number().optional(),
    shoulders: z.number().optional(),
    waist: z.number().optional(),
    back: z.number().optional(),
    primary: z.number().optional(),
    secondary: z.number().optional(),
    ranged: z.number().optional(),
    ammo: z.number().optional(),
    finger1: z.number().optional(),
    finger2: z.number().optional(),
    belt1: z.number().optional(),
    belt2: z.number().optional(),
    belt3: z.number().optional(),
    belt4: z.number().optional(),
  }),
});

export type InventoryEquippedSchema = z.infer<typeof inventoryEquippedSchema>;
