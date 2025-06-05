import { z } from "zod";

export const inventoryUnequippedSchema = z.object({
  character: z.string(),
  width: z.number().min(1),
  height: z.number().min(1),
  grid: z.array(z.array(z.number().nullable())),
});

export type InventoryUnequippedSchema = z.infer<typeof inventoryUnequippedSchema>;
