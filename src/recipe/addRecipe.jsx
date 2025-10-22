import React from 'react';
import { useNavigate } from 'react-router-dom';
import RecipeForm from './recipeForm';

// Mock create; replace with real API later
async function createRecipe(payload){ return { ...payload, id: crypto.randomUUID() }; }

// temporary function to store recipes on local storage to show it is added to overall recipe list
function loadLocalRecipes() {
  try {
    return JSON.parse(localStorage.getItem('myRecipes_local') || '[]');
  } catch { return []; }
}
function saveLocalRecipes(list) {
  localStorage.setItem('myRecipes_local', JSON.stringify(list));
}



export function AddRecipe(){
  const navigate = useNavigate();
  return (
    <main className="container py-4">
      <h2 className="my-4">Add New Recipe</h2>
      <RecipeForm
        mode="add"
        onSubmit={async (payload)=>{
          const saved = await createRecipe(payload);
          const newCardRecipe = {
            id: saved.id,
            title: saved.title ?? 'Untitled',
            totalTime: typeof saved.totalTime === 'number' ? `${saved.totalTime} minutes` : (saved.totalTime || '—'),
            difficulty: saved.difficulty ?? '—',
            imageUrl: saved.imageUrl || 'placeholder.jpg',
          };

          // Add this recipe to local storage
          const existing = loadLocalRecipes();

          saveLocalRecipes([newCardRecipe, ...existing]);

          // Navigate to the myRecipes landing page
          navigate('/myRecipes');
        }}
        onCancel={()=>navigate(-1)}
      />
    </main>
  );
}
