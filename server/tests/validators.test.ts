import { describe, it, expect } from "vitest";
import { recipeCreateSchema } from "../src/validators.js";

describe("recipeCreateSchema", () => {
  it("accepts a valid recipe", () => {
    const data = {
      name: "Test",
      ingredients: ["a", "b"],
      instructions: "mix"
    };
    const parsed = recipeCreateSchema.parse(data);
    expect(parsed.name).toBe("Test");
  });

  it("rejects empty name", () => {
    const bad = { name: "", ingredients: ["x"], instructions: "mix" };
    expect(() => recipeCreateSchema.parse(bad)).toThrow();
  });
});
