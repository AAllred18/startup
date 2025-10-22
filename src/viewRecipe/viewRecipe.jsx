import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

// Preset to only show recipe information of Shoyu Chicken
// Need viewRecipe to be paired with a recipe id in the future to pull up that specific information
function mockFetchRecipeById(id) {
  return Promise.resolve({
    id,
    title: 'Shoyu Chicken',
    imageUrl: 'ShoyuChicken.jpeg',
    totalTime: '35 minutes',
    difficulty: 'Easy',
    ingredients: [
      'Chicken',
      'Shoyu (soy sauce)',
      'Brown Sugar',
      'Ginger',
      'Garlic',
      'Water',
      'Green Onions',
    ],
    directions: [
      'Pat dry the chicken with paper towels.',
      'In a large pot over medium-high heat, combine shoyu, brown sugar, water, ginger, and garlic; stir to dissolve.',
      'Add chicken, bring to a boil, then reduce to low. Cover and simmer 30–45 minutes.',
      'Optional: Broil at 500°F for 4–5 minutes to crisp the skin.',
      'Uncover pot and reduce sauce over high heat for 5 minutes.',
      'Serve chicken over rice, spoon sauce over, and garnish with green onions.',
    ],
  });
}

function normalizeRecipe(r) {
  return {
    id: r.id,
    title: r.title ?? 'Untitled Recipe',
    imageUrl: r.imageUrl ?? 'placeholder.jpg',
    totalTime: r.totalTime ?? '—',
    difficulty: r.difficulty ?? '—',
    ingredients: Array.isArray(r.ingredients) ? r.ingredients : [],
    directions: Array.isArray(r.directions) ? r.directions : [],
  };
}

export function ViewRecipe() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [err, setErr] = useState(null);

  const ingredients = useMemo(() => recipe?.ingredients ?? [], [recipe]);
  const directions = useMemo(() => recipe?.directions ?? [], [recipe]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setErr(null);
        const data = await mockFetchRecipeById(id || 'demo');
        const normalized = normalizeRecipe(data);
        if (!cancelled) setRecipe(normalized);
      } catch {
        if (!cancelled) setErr('Failed to load recipe.');
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (err) {
    return (
      <main className="container py-4">
        <div className="alert alert-danger" role="alert">{err}</div>
      </main>
    );
  }

  // Avoid initial jank (mock resolves almost instantly)
  if (!recipe) {
    return null; // or a tiny skeleton if you prefer
  }

  return (
     <main>

      <h2 className="mb-3 mt-2">{recipe.title}</h2>

      {recipe.imageUrl && (
        <img
          src={recipe.imageUrl}
          alt={recipe.title}
          className="mb-3 img-fluid rounded"
          style={{ maxWidth: 720 }}
        />
      )}

      <div className="mb-4">
        <h5 className="mb-1">Prep + Cook Time: {recipe.totalTime}</h5>
        <h5 className="mb-0">Difficulty: {recipe.difficulty}</h5>
      </div>

      <section className="mb-4">
        <h4 className="mb-3">Ingredients</h4>
        <ul className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-2 ps-3">
          {ingredients.map((item, idx) => (
            <li className="col" key={idx}>{item}</li>
          ))}
        </ul>
      </section>

      <section>
        <h4 className="mb-3">Directions</h4>
        <ol className="ps-3">
          {directions.map((step, idx) => (
            <li key={idx} className="mb-2">{step}</li>
          ))}
        </ol>
      </section>
    </main>
  );
}
