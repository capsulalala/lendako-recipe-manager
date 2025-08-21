import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const samples = [
    {
      name: "Tomato Pasta",
      instructions: "Boil pasta. Saute garlic, add tomatoes, toss with pasta.",
      ingredients: ["pasta", "tomato", "garlic", "olive oil"]
    },
    {
      name: "Chicken Adobo",
      instructions: "Simmer chicken with soy sauce, vinegar, peppercorns, and bay leaves.",
      ingredients: ["chicken", "soy sauce", "vinegar", "garlic", "bay leaf"]
    }
  ];

  for (const r of samples) {
    await prisma.recipe.create({
      data: {
        name: r.name,
        instructions: r.instructions,
        ingredients: { create: r.ingredients.map((i) => ({ name: i })) }
      }
    });
  }
  console.log("Seeded sample recipes.");
}

main().finally(async () => {
  await prisma.$disconnect();
});
