import React from 'react';
import { useNavigate } from 'react-router-dom';
import RecipeForm from './recipeForm';

// Mock create; replace with real API later
async function createRecipe(payload){ return { ...payload, id: crypto.randomUUID() }; }

export function AddRecipe(){
  const navigate = useNavigate();
  return (
    <main className="container py-4">
      <h2 className="my-4">Add New Recipe</h2>
      <RecipeForm
        mode="add"
        onSubmit={async (payload)=>{
          const saved = await createRecipe(payload);
          navigate(`/recipes/${saved.id}`);
        }}
        onCancel={()=>navigate(-1)}
      />
    </main>
  );
}
