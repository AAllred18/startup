import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import RecipeForm from './recipeForm';

// Eventually connected to the edit button for each recipe when it is connected to id
// Ability to edit and delete recipe found here

async function fetchRecipe(id){ return {
  title:'Shoyu Chicken', description:'Savory soy chicken', servings:4, difficulty:'Easy',
  totalTime:35, ingredients:['Chicken','Shoyu','Sugar'], steps:['Step 1','Step 2'], imageUrl:'ShoyuChicken.jpeg'
};}
async function updateRecipe(id, payload){ return { ...payload, id }; }

export function EditRecipe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initial, setInitial] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [err, setErr] = useState(null);

  useEffect(() => {
    (async () => {
      const data = await fetchRecipe(id);
      setInitial(data);
      setLoading(false);
    })();
  }, [id]);

  const handleDelete = async () => {
    const sure = window.confirm('Delete this recipe? This cannot be undone.');
    if (!sure) return;
    await deleteRecipe(id);
    navigate('/myRecipes');
  };

  return (
    <main className="container py-4">
      <div className="d-flex align-items-center justify-content-between my-2">
        <h2 className="m-0">Edit Recipe</h2>
        <button
          type="button"
          className="btn btn-outline-danger"
          onClick={handleDelete}
          disabled={loading || deleting}
        >
          {deleting ? 'Deleting…' : 'Delete'}
        </button>
      </div>

      {err && <div className="alert alert-danger">{err}</div>}

      <RecipeForm
        mode="edit"
        initialData={initial}
        loading={loading}
        onSubmit={async (payload)=>{
          const saved = await updateRecipe(id, payload);
          navigate(`/recipes/${saved.id}`);
        }}
        onCancel={()=>navigate(-1)}
      />
    </main>
  );
}
