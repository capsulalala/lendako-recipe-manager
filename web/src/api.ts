const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

export type Recipe = {
  id: number;
  name: string;
  ingredients: string[];
  instructions: string;
  createdAt: string;
};

export type Paginated<T> = {
  page: number;
  pageSize: number;
  total: number;
  items: T[];
};

export async function listRecipes(opts?: { ingredient?: string; page?: number; pageSize?: number }): Promise<Paginated<Recipe>> {
  const params = new URLSearchParams();
  if (opts?.ingredient) params.set("ingredient", opts.ingredient);
  if (opts?.page) params.set("page", String(opts.page));
  if (opts?.pageSize) params.set("pageSize", String(opts.pageSize));
  const res = await fetch(`${BASE_URL}/recipes?${params.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch recipes");
  return res.json();
}

export async function createRecipe(data: { name: string; ingredients: string[]; instructions: string; }): Promise<Recipe> {
  const res = await fetch(`${BASE_URL}/recipes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.message || "Failed to create recipe");
  }
  return res.json();
}
