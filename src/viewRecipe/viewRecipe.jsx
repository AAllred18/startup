import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

function toMinutesString(v, fallback = '—') {
  if (v === null || v === undefined) return fallback;
  if (typeof v === 'number' && Number.isFinite(v)) return `${v} minutes`;
  const n = Number(String(v).match(/\d+/)?.[0]);
  return Number.isFinite(n) ? `${n} minutes` : String(v || '').trim() || fallback;
}

function normalizeRecipe(r = {}) {
  const steps = Array.isArray(r.steps) ? r.steps
              : Array.isArray(r.directions) ? r.directions
              : [];
  return {
    id: r.id,
    title: r.title ?? 'Untitled Recipe',
    imageUrl: r.imageUrl ?? 'placeholder.jpg',
    totalTime: toMinutesString(r.totalTime),
    difficulty: r.difficulty ?? '—',
    ingredients: Array.isArray(r.ingredients) ? r.ingredients : [],
    steps,
  };
}

async function fetchRecipeById(id) {
  const res = await fetch(`/api/recipes/${id}`, { credentials: 'include' });
  if (!res.ok) throw new Error('Failed to load recipe');
  return res.json();
}

export function ViewRecipe() {
  const { id } = useParams();
  const location = useLocation();
  const recipeFromState = location.state?.recipe ?? null;

  // Optimistic initial render from state (partial), then hydrate from API
  const [recipe, setRecipe] = useState(recipeFromState ? normalizeRecipe(recipeFromState) : null);
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setErr(null);
        setLoading(true);
        const fresh = await fetchRecipeById(id);
        if (!cancelled) {
          setRecipe(prev => {
            const merged = { ...normalizeRecipe(prev || {}), ...normalizeRecipe(fresh) };
            // Ensure arrays after merge
            merged.ingredients = Array.isArray(merged.ingredients) ? merged.ingredients : [];
            merged.steps = Array.isArray(merged.steps) ? merged.steps : [];
            return merged;
          });
        }
      } catch (e) {
        if (!cancelled) setErr(e.message || 'Failed to load recipe.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [id]);

  const ingredients = useMemo(() => recipe?.ingredients ?? [], [recipe]);
  const steps = useMemo(() => recipe?.steps ?? [], [recipe]);

  if (err) return <main className="container py-4"><div className="alert alert-danger">{err}</div></main>;
  if (loading && !recipe) return <main className="container py-4">Loading…</main>;

  return (
    <main className="container py-4">
      <h2 className="mb-3 mt-2">{recipe?.title}</h2>

      {recipe?.imageUrl && (
        <img src={recipe.imageUrl} alt={recipe.title} className="mb-3 img-fluid rounded" style={{ maxWidth: 720 }} />
      )}

      <div className="mb-4">
        <h5 className="mb-1">Prep + Cook Time: {recipe?.totalTime}</h5>
        <h5 className="mb-0">Difficulty: {recipe?.difficulty}</h5>
      </div>

      <section className="mb-4">
        <h4 className="mb-3">Ingredients</h4>
        <ul className="list-unstyled ps-3">
          {ingredients.map((item, idx) => (
            <li key={idx} className="mb-1 d-flex align-items-start">
              <span className="me-2">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h4 className="mb-3">Steps</h4>
        <ol className="ps-3">
          {steps.map((step, idx) => <li key={idx} className="mb-2">{step}</li>)}
        </ol>
      </section>
    </main>
  );
}
