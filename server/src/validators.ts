import { z } from "zod";

export const recipeCreateSchema = z.object({
  name: z.string().min(1, "Name is required"),
  ingredients: z.array(z.string().min(1)).nonempty("At least one ingredient required").max(25, "Too many ingredients"),
  instructions: z.string().min(1, "Instructions are required")
});

export type RecipeCreateInput = z.infer<typeof recipeCreateSchema>;
