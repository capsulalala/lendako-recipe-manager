import { useEffect, useMemo, useState } from "react";
import { createRecipe, listRecipes, type Recipe } from "./api";

export default function App() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");

  async function refresh() {
    try {
      setLoading(true);
      setError(null);
      const resp = await listRecipes({ ingredient: search || undefined });
      setRecipes(resp.items);
    } catch (e: any) {
      setError(e.message || String(e));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { refresh(); }, []);

  const canCreate = useMemo(() => {
    return name.trim().length > 0 && instructions.trim().length > 0 && ingredients.trim().length > 0;
  }, [name, ingredients, instructions]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      const ing = ingredients.split(",").map((s) => s.trim()).filter(Boolean);
      await createRecipe({ name: name.trim(), instructions: instructions.trim(), ingredients: ing });
      setName(""); setIngredients(""); setInstructions("");
      await refresh();
    } catch (e: any) {
      setError(e.message || String(e));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container">
      <h1>Recipe Manager</h1>
      <p className="small">List and create recipes. Search by ingredient. All local on your computer.</p>

      <div className="card">
        <h2>Search</h2>
        <div className="row">
          <div style={{ flex: 1 }}>
            <label>Ingredient</label>
            <input placeholder="e.g., tomato" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <button onClick={refresh} disabled={loading}>Search</button>
        </div>
      </div>

      <div className="card">
        <h2>Create a Recipe</h2>
        <form onSubmit={onSubmit}>
          <div className="row">
            <div style={{ flex: 1 }}>
              <label>Name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Adobo" />
            </div>
          </div>
          <div className="row">
            <div style={{ flex: 1 }}>
              <label>Ingredients (comma-separated)</label>
              <input value={ingredients} onChange={(e) => setIngredients(e.target.value)} placeholder="chicken, soy sauce, vinegar" />
            </div>
          </div>
          <div className="row">
            <div style={{ flex: 1 }}>
              <label>Instructions</label>
              <textarea rows={4} value={instructions} onChange={(e) => setInstructions(e.target.value)} placeholder="Steps to cook..." />
            </div>
          </div>
          <button type="submit" disabled={!canCreate || loading}>Create</button>
        </form>
      </div>

      <div className="card">
        <h2>Recipes</h2>
        {loading && <p>Loading…</p>}
        {error && <p style={{ color: 'crimson' }}>{error}</p>}
        {!loading && !error && (
          <div className="list">
            {recipes.map((r) => (
              <div key={r.id} className="card">
                <h3>{r.name}</h3>
                <p className="small">Created: {new Date(r.createdAt).toLocaleString()}</p>
                <div style={{ marginBottom: '0.5rem' }}>
                  {r.ingredients.map((i, idx) => (
                    <span key={idx} className="badge">{i}</span>
                  ))}
                </div>
                <p>{r.instructions}</p>
              </div>
            ))}
            {recipes.length === 0 && <p>No recipes found.</p>}
          </div>
        )}
      </div>

      <footer>
        Backend: <code>http://localhost:4000</code> • Frontend: <code>http://localhost:5173</code>
      </footer>
    </div>
  );
}
