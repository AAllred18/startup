import React from 'react';
import { useNavigate } from 'react-router-dom';
import RecipeForm from './recipeForm';

async function createRecipe(payload) {
  const res = await fetch('/api/recipes', {
    method: 'POST',
    credentials: 'include', // send auth cookie
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (res.status === 401) {
    throw new Error('NOT_AUTH');
  }
  if (!res.ok) {
    const msg = await res.text().catch(() => '');
    throw new Error(msg || `HTTP ${res.status}`);
  }
  return res.json(); // { id, ownerEmail, title, totalTime, difficulty, imageUrl }
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
            totalTime:
              typeof values.totalTime === 'number'
                ? `${values.totalTime} minutes`
                : ((values.totalTime ?? '').trim() || '—'),
            difficulty: (values.difficulty ?? '').trim() || '—',
            imageUrl: (values.imageUrl ?? '').trim() || 'placeholder.jpg',
          };

          try {
            await createRecipe(payload);
            navigate('/myRecipes');
          } catch (e) {
            if (e?.message === 'NOT_AUTH') {
              alert('Please log in to add a recipe.');
              navigate('/login'); // adjust to your actual login route
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
// Old code for using local storage for new recipe

// Mock create; replace with real API later
// async function createRecipe(payload){ return { ...payload, id: crypto.randomUUID() }; }

// // temporary function to store recipes on local storage to show it is added to overall recipe list
// function loadLocalRecipes() {
//   try {
//     return JSON.parse(localStorage.getItem('myRecipes_local') || '[]');
//   } catch { return []; }
// }
// function saveLocalRecipes(list) {
//   localStorage.setItem('myRecipes_local', JSON.stringify(list));
// }