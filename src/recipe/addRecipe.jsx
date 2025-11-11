import React from 'react';
import { useNavigate } from 'react-router-dom';
import RecipeForm from './recipeForm';

async function createRecipe(payload) {
  const res = await fetch('/api/recipes', {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (res.status === 401) throw new Error('NOT_AUTH');
  if (!res.ok) {
    const msg = await res.text().catch(() => '');
    throw new Error(msg || `HTTP ${res.status}`);
  }
  return res.json();
}

export function AddRecipe() {
  const navigate = useNavigate();

  return (
    <main className="container py-4">
      <h2 className="my-4">Add New Recipe</h2>

      <RecipeForm
        mode="add"
        onSubmit={async (values) => {
          const payload = {
            title: (values.title ?? '').trim() || 'Untitled',
            description: (values.description ?? '').trim(),
            servings: Number(values.servings) || 1,
            difficulty: (values.difficulty ?? '').trim() || '—',
            totalTime:
              typeof values.totalTime === 'number'
                ? `${values.totalTime} minutes`
                : ((values.totalTime ?? '').toString().trim() || '—'),
            ingredients: Array.isArray(values.ingredients)
              ? values.ingredients.filter(Boolean).map(s => s.trim())
              : [],
            steps: Array.isArray(values.steps)
              ? values.steps.filter(Boolean).map(s => s.trim())
              : [],

            imageUrl: values.imageUrl?.startsWith?.('blob:') ? '' : (values.imageUrl ?? '').trim(),
          };

          try {
            const created = await createRecipe(payload);
            // go to canonical route for this recipe
            navigate(`/recipe/${created.id}`, { state: { recipe: created } });
          } catch (e) {
            if (e?.message === 'NOT_AUTH') {
              alert('Please log in to add a recipe.');
              navigate('/login'); 
            } else {
              alert(e?.message || 'Failed to create recipe.');
            }
          }
        }}
        onCancel={() => navigate(-1)}
      />
    </main>
  );
}
