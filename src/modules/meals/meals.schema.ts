import { z } from "zod";

export const createMealsSchema = z.object({
  name: z.string(),
  description: z.string().email().optional(),
  date: z.string(),
  diet: z.coerce.boolean().optional(),
});

export type CreateMealBody = z.infer<typeof createMealsSchema>;

export const updateMealsSchema = z.object({
  name: z.string().optional(),
  description: z.string().email().optional(),
  date: z.string().optional(),
  diet: z.coerce.boolean().optional(),
});

export type UpdateMealBody = z.infer<typeof updateMealsSchema>;
