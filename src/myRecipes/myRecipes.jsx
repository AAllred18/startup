import React, { useMemo, useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import '../recipes.css'

function loadLocalRecipes() {
  try { return JSON.parse(localStorage.getItem('myRecipes_local') || '[]'); }
  catch { return []; }
}

async function mockFetchMyRecipes() {
  return Promise.resolve([
    { id: 'r1', title: 'Shoyu Chicken', totalTime: '35 minutes', difficulty: 'Easy', imageUrl: 'ShoyuChicken.jpeg' },
    { id: 'r2', title: 'Fried Rice',     totalTime: '20 minutes', difficulty: 'Easy', imageUrl: 'FriedRice.jpeg'  },
  ]);
}

function normalizeRecipe(r) {
  return {
    id: r.id,
    title: r.title ?? 'Untitled',
    totalTime: r.totalTime ?? '—',
    difficulty: r.difficulty ?? '—',
    imageUrl: r.imageUrl ?? 'placeholder.jpg',
  };
}

function MyRecipeCard({ recipe, onEdit, onShare }) {
  return (
    <div className="card mb-4 h-100">
      <img src={recipe.imageUrl} alt={recipe.title} className="card-img-top" />
      <div className="card-body text-center">
        <h4 className="card-title">{recipe.title}</h4>
        <p className="card-text mb-1">Prep + Cook: {recipe.totalTime}</p>
        <p className="card-text">Difficulty: {recipe.difficulty}</p>
        <div className="d-flex justify-content-center gap-3 mt-3">
          {/* When you move to dynamic routes, switch to: `/recipes/${recipe.id}` */}
          <NavLink to="/viewRecipe" className="btn btn-primary">View</NavLink>
          <button className="btn btn-outline-secondary" onClick={() => onEdit?.(recipe)}>Edit</button>
          <button className="btn btn-outline-secondary" onClick={() => onShare?.(recipe)}>Share</button>
        </div>
      </div>
    </div>
  );
}

export function MyRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [err, setErr] = useState(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setErr(null);

        // API call goes here later

        const data = await mockFetchMyRecipes();
        const normalizedServer = data.map(normalizeRecipe);

        // For now load local recipes until they are saved on the DB and can be retrieved here
        const local = loadLocalRecipes().map(normalizeRecipe);

        const mergedById = new Map();
        for (const r of [...local, ...normalizedServer]) {
          mergedById.set(r.id, r);
        }
        const merged = Array.from(mergedById.values());

        if (!cancelled) setRecipes(merged);
      } catch (e) {
        if (!cancelled) setErr('Failed to load your recipes.');
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const filtered = useMemo(() => {
    if (!query.trim()) return recipes;
    const q = query.trim().toLowerCase();
    return recipes.filter(r => r.title.toLowerCase().includes(q));
  }, [recipes, query]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  // Temporarily have it output a message when trying to edit or share recipe
  // Eventually will change addRecipe.jsx to populate with information from recipe
  // Share button will be linked to the discover page and use websocket
  const onEdit = (r) => alert(`Edit "${r.title}" (wire to /recipes/${r.id}/edit later)`);
  const onShare = (r) => alert(`Share "${r.title}" (POST /api/recipes/${r.id}/share later)`);


  return (
    <main>
      <h1 class="text-center py-3">My Recipes</h1>
      <h4 class="text-center">Store all of your recipes here!</h4>

      <header class="py-3 px-4">
        <div class="d-flex align-items-center w-100">
          <div class="fw-semibold me-3">
            User: NewUser
          </div>

          <div class="d-flex ms-auto align-items-center gap-3">
            <NavLink to="/recipe/addRecipe" className="btn btn-primary">
                Add New Recipe
            </NavLink>

             <form className="d-flex align-items-center gap-2 m-0" onSubmit={handleSearchSubmit}>
              {/* Search for recipe */}
              <input
                id="q"
                name="q"
                type="search"
                className="form-control"
                placeholder="Search by Recipe Name"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button type="submit" className="btn btn-outline-secondary">Search</button>
            </form>
          </div>
        </div>
        
      </header>

      {err && (
        <div className="container">
          <div className="alert alert-danger" role="alert">{err}</div>
        </div>
      )}

      <section>
        <div className="recipes-container">
          {!err && filtered.length === 0 && (
            <p className="text-muted text-center w-100">No recipes found.</p>
          )}

          {filtered.map((recipe) => (
            <MyRecipeCard
              key={recipe.id}
              recipe={recipe}
              onEdit={onEdit}
              onShare={onShare}
            />
          ))}
        </div>
      </section>

    </main>
  );
}