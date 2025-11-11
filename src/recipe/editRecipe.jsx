import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import RecipeForm from './recipeForm';

async function apiFetchRecipe(id) {
  const res = await fetch(`/api/recipes/${id}`, { credentials: 'include' });
  if (!res.ok) throw new Error('Failed to load recipe');
  return await res.json();
}

async function apiUpdateRecipe(id, payload) {
  const res = await fetch(`/api/recipes/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.msg || 'Update failed');
  }
  return await res.json();
}

async function apiDeleteRecipe(id) {
  const res = await fetch(`/api/recipes/${id}`, { method: 'DELETE', credentials: 'include' });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.msg || 'Delete failed');
  }
}

function normalizeForForm(r = {}) {
  const toMinutesNumber = (v) => {
    if (v === null || v === undefined) return '';
    if (typeof v === 'number' && Number.isFinite(v)) return v;
    const m = String(v).match(/\d+/);
    return m ? Number(m[0]) : '';
  };
  return {
    title: r.title ?? '',
    description: r.description ?? '',
    servings: Number.isFinite(Number(r.servings)) ? Number(r.servings) : 1,  // sensible defaults
    difficulty: r.difficulty ?? 'Easy',
    totalTime: toMinutesNumber(r.totalTime) || 1,
    imageUrl: r.imageUrl ?? '',
    imageFile: null,
    ingredients: Array.isArray(r.ingredients) && r.ingredients.length ? r.ingredients : [''],
    steps: Array.isArray(r.steps) && r.steps.length ? r.steps : [''],
  };
}

export function EditRecipe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const recipeFromState = location.state?.recipe ?? null;

  const [initial, setInitial] = useState(recipeFromState ? normalizeForForm(recipeFromState) : null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [err, setErr] = useState(null);

  // ALWAYS fetch to hydrate full data, even if we have partial state
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setErr(null);
        setLoading(true);
        const data = await apiFetchRecipe(id);
        if (!cancelled) setInitial(normalizeForForm(data));
      } catch (e) {
        if (!cancelled) setErr(e.message || 'Failed to load recipe');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [id]);

  const handleDelete = async () => {
    const sure = window.confirm('Delete this recipe? This cannot be undone.');
    if (!sure) return;
    try {
      setDeleting(true);
      await apiDeleteRecipe(id);
      navigate('/myRecipes');
    } catch (e) {
      setErr(e.message || 'Failed to delete');
      setDeleting(false);
    }
  };

  return (
    <main className="container py-4">
      <div className="d-flex align-items-center justify-content-between my-2">
        <h2 className="m-0">Edit Recipe</h2>
      </div>

      {err && <div className="alert alert-danger">{err}</div>}

      <button type="button" className="btn btn-outline-danger"
        onClick={handleDelete} disabled={loading || deleting}>
        {deleting ? 'Deleting…' : 'Delete'}
      </button>

      <RecipeForm
        mode="edit"
        initialData={initial}
        loading={loading}
        onSubmit={async (payload) => {
          const saved = await apiUpdateRecipe(id, payload);
          // Go to the canonical route for deep-linking and pass the fresh object, too
          navigate(`/recipe/${id}`, { state: { recipe: saved } });
        }}
        onCancel={() => navigate(-1)}
      />
    </main>
  );
}
