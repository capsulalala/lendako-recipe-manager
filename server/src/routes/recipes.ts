import { Router } from "express";
import { prisma } from "../prisma.js";
import { recipeCreateSchema } from "../validators.js";

export const recipesRouter = Router();

// GET /recipes?ingredient=tomato&page=1&pageSize=10
recipesRouter.get("/", async (req, res) => {
  const ingredient = (req.query.ingredient as string | undefined)?.toLowerCase();
  const page = Number(req.query.page ?? 1);
  const pageSize = Number(req.query.pageSize ?? 10);
  const skip = (page - 1) * pageSize;

  const where = ingredient
    ? { ingredients: { some: { name: { contains: ingredient, mode: "insensitive" } } } }
    : {};

  const [items, total] = await Promise.all([
    prisma.recipe.findMany({
      where,
      include: { ingredients: true },
      orderBy: { createdAt: "desc" },
      skip,
      take: pageSize
    }),
    prisma.recipe.count({ where })
  ]);

  res.json({
    page,
    pageSize,
    total,
    items: items.map((r) => ({
      id: r.id,
      name: r.name,
      instructions: r.instructions,
      ingredients: r.ingredients.map((i) => i.name),
      createdAt: r.createdAt
    }))
  });
});

// POST /recipes
recipesRouter.post("/", async (req, res) => {
  try {
    const parsed = recipeCreateSchema.parse(req.body);
    const created = await prisma.recipe.create({
      data: {
        name: parsed.name,
        instructions: parsed.instructions,
        ingredients: { create: parsed.ingredients.map((i) => ({ name: i })) }
      },
      include: { ingredients: true }
    });
    res.status(201).json({
      id: created.id,
      name: created.name,
      instructions: created.instructions,
      ingredients: created.ingredients.map((i) => i.name),
      createdAt: created.createdAt
    });
  } catch (err: any) {
    // Zod validation errors have .issues
    if (err?.issues) {
      return res.status(400).json({
        message: "Validation error",
        errors: err.issues.map((i: any) => ({ path: i.path, message: i.message }))
      });
    }
    console.error(err);
    res.status(500).json({ message: "Unexpected server error" });
  }
});
