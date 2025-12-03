import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { RecipeCard } from '../../components/RecipeCard';
import '../recipes.css'

export function MyRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [err, setErr] = useState(null);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [busyIds, setBusyIds] = useState(new Set()); // disable buttons per card during calls
  const navigate = useNavigate();

  // ---- helpers ----
  const isObjectId = (s) => /^[0-9a-fA-F]{24}$/.test(String(s || ''));

  const toCard = (r) => ({
    id: r.id,                              // must be Mongo _id from server
    title: r.title ?? 'Untitled',
    totalTime: r.totalTime ?? '—',
    difficulty: r.difficulty ?? '—',
    imageUrl: r.imageUrl ?? 'placeholder.jpg',
    shared: !!r.shared,
  });

  const fetchMyRecipes = useCallback(async () => {
    setErr(null);
    setLoading(true);
    try {
      // Fetch username
      const userRes = await fetch('/api/user', { credentials: 'include' });
      if (userRes.ok) {
        const user = await userRes.json();
        setUserEmail(user.email);
      }

      // Fetch recipes (these will have correct Mongo ids)
      const r = await fetch('/api/recipes', { credentials: 'include' });
      if (!r.ok) throw new Error('Failed to load your recipes.');
      const data = await r.json();
      setRecipes(data.map(toCard));
    } catch (e) {
      setErr(e.message || 'Failed to load your recipes.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (cancelled) return;
      await fetchMyRecipes();
    })();
    return () => { cancelled = true; };
  }, [fetchMyRecipes]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? recipes.filter(r => (r.title || '').toLowerCase().includes(q)) : recipes;
  }, [recipes, query]);

  const onEdit = (recipe) => {
    navigate(`/recipe/${recipe.id}/edit`, { state: { recipe } });
  };

  const toggleShare = async (recipe, share) => {
    try {
      // Guard: only call API with a real Mongo ObjectId
      if (!isObjectId(recipe.id)) {
        console.warn('Share blocked – not a Mongo ObjectId:', recipe.id);
        alert('Recipe is still syncing. Please try again in a moment.');
        return;
      }

      setBusyIds(prev => new Set(prev).add(recipe.id));

      console.log('Share click → id:', recipe.id, 'user:', userEmail, 'share?', share);

      const r = await fetch(`/api/recipes/${recipe.id}/share`, {
        method: share ? 'POST' : 'DELETE',
        credentials: 'include',
      });

      if (!r.ok) {
        const txt = await r.text().catch(() => '');
        throw new Error(txt || (share ? 'Share failed' : 'Unshare failed'));
      }

      // Optimistic local update
      setRecipes(prev => prev.map(x => x.id === recipe.id ? { ...x, shared: share } : x));

      // Optional but keeps UI perfectly in sync with DB/broadcasts
      await fetchMyRecipes();
    } catch (e) {
      alert(e.message || (share ? 'Share failed' : 'Unshare failed'));
    } finally {
      setBusyIds(prev => {
        const next = new Set(prev);
        next.delete(recipe.id);
        return next;
      });
    }
  };

  const onShare = (recipe) => toggleShare(recipe, true);
  const onUnshare = (recipe) => toggleShare(recipe, false);

  return (
    <main>
      <h1 className="text-center py-3">My Recipes</h1>
      <h4 className="text-center">Store all of your recipes here!</h4>

      <header className="py-3 px-4">
        <div className="d-flex align-items-center w-100">
          <div className="fw-semibold me-3">
            {userEmail ? `User: ${userEmail}` : 'User: (not logged in)'}
          </div>
          <div className="d-flex ms-auto align-items-center gap-3">
            <NavLink to="/recipe/addRecipe" className="btn btn-primary">
              Add New Recipe
            </NavLink>
            <form className="d-flex align-items-center gap-2 m-0" onSubmit={(e)=>e.preventDefault()}>
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

      <section className="px-3">
        {loading && <p className="text-center text-muted">Loading recipes…</p>}

        <div className="recipes-container">
          {!loading && !err && filtered.length === 0 && (
            <p className="text-muted text-center w-100">No recipes found.</p>
          )}

          {filtered.map((recipe) => (
            <RecipeCard
              key={recipe.id || recipe.title}                 // fallback during first render if needed
              recipe={recipe}
              onEdit={onEdit}
              onShare={() => onShare(recipe)}
              onUnshare={() => onUnshare(recipe)}
              isShared={recipe.shared}
              // Disable when busy, while initial loading, or until we have a real Mongo id
              disabled={busyIds.has(recipe.id) || loading || !isObjectId(recipe.id)}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

// Previous code for recipes we were saving on localstorage

// function loadLocalRecipes() {
//   try { return JSON.parse(localStorage.getItem('myRecipes_local') || '[]'); }
//   catch { return []; }
// }

// async function mockFetchMyRecipes() {
//   return Promise.resolve([
//     { id: 'r1', title: 'Shoyu Chicken', totalTime: '35 minutes', difficulty: 'Easy', imageUrl: 'ShoyuChicken.jpeg' },
//     { id: 'r2', title: 'Fried Rice',     totalTime: '20 minutes', difficulty: 'Easy', imageUrl: 'FriedRice.jpeg'  },
//   ]);
// }

// async function createRecipe(payload) {
//   const res = await fetch('/api/recipes', {
//     method: 'POST',
//     credentials: 'include',                // send cookie
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(payload),
//   });

//   if (res.status === 401) {
//     throw new Error('You must be logged in to add a recipe.');
//   }
//   if (!res.ok) {
//     const text = await res.text().catch(() => '');
//     throw new Error(text || 'Failed to create recipe');
//   }

//   return res.json();                       // -> { id, ownerEmail, title, totalTime, difficulty, imageUrl }
// }

// function normalizeRecipe(r) {
//   return {
//     id: r.id,
//     title: r.title ?? 'Untitled',
//     totalTime: r.totalTime ?? '—',
//     difficulty: r.difficulty ?? '—',
//     imageUrl: r.imageUrl ?? 'placeholder.jpg',
//   };
// }

// function MyRecipeCard({ recipe, onEdit, onShare }) {
//   return (
//     <div className="card mb-4 h-100">
//       <img src={recipe.imageUrl} alt={recipe.title} className="card-img-top" />
//       <div className="card-body text-center">
//         <h4 className="card-title">{recipe.title}</h4>
//         <p className="card-text mb-1">Prep + Cook: {recipe.totalTime}</p>
//         <p className="card-text">Difficulty: {recipe.difficulty}</p>
//         <div className="d-flex justify-content-center gap-3 mt-3">
//           {/* When you move to dynamic routes, switch to: `/recipes/${recipe.id}` */}
//           <NavLink to="/viewRecipe" className="btn btn-primary">View</NavLink>
//           <button className="btn btn-outline-secondary" onClick={() => onEdit?.(recipe)}>Edit</button>
//           <button className="btn btn-outline-secondary" onClick={() => onShare?.(recipe)}>Share</button>
//         </div>
//       </div>
//     </div>
//   );
// }