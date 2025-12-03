import React, { useEffect, useState, useCallback } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Popup } from '../../components/Popup';
import { RecipeEvent, RecipeNotifier } from '../../services/recipeNotifier'; // <-- make sure path matches your file

function SharedRecipeCard({ r, onView, onSave }) {
  return (
    <div className="card recipe-card mb-4 h-100">
      <img src={r.imageUrl} alt={r.title} className="card-img-top" />
      <div className="card-body text-center">
        <h4 className="card-title">{r.title}</h4>
        <p className="card-text mb-1">Prep + Cook: {r.totalTime}</p>
        <p className="card-text mb-1">Difficulty: {r.difficulty}</p>
        {r.userName && <p className="card-text">User: {r.userName}</p>}
        <div className="d-flex justify-content-center gap-3 mt-3">
          <button className="btn btn-primary" onClick={() => onView(r)}>View</button>
          <button className="btn btn-outline-secondary" onClick={() => onSave(r)}>Save</button>
        </div>
      </div>
    </div>
  );
}

export function Discover() {
  const navigate = useNavigate();

  // Popup state
  const [showDetails, setShowDetails] = useState(false);
  const openComingSoon = () => setShowDetails(true);
  const closeComingSoon = () => setShowDetails(false);

  // Data + UI states
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [connStatus, setConnStatus] = useState('connecting'); // 'connected' | 'disconnected' | 'connecting'
  const [error, setError] = useState('');

  const reload = useCallback(async () => {
    setError('');
    try {
      setLoading(true);
      const res = await fetch('/api/discover', {
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || `Failed to load discover (${res.status})`);
      }
      const data = await res.json();
      setRecipes(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
      setError(e?.message ?? 'Failed to load discover feed');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // initial load
    reload();

    // subscribe to WS events
    const unsubscribe = RecipeNotifier.addHandler((evt) => {
      if (evt.type === RecipeEvent.System) {
        setConnStatus(evt?.value?.msg === 'connected' ? 'connected' : 'disconnected');
        return;
      }

      // For any recipe change event, simplest is to re-fetch the list.
      if (
        evt.type === RecipeEvent.Shared ||
        evt.type === RecipeEvent.Unshared ||
        evt.type === RecipeEvent.Updated ||
        evt.type === RecipeEvent.Deleted
      ) {
        reload();
      }
    });

    return unsubscribe;
  }, [reload]);

  // Hook up buttons to popup
  const handleView = () => openComingSoon();
  const handleSave = () => openComingSoon();
  const handleSavedRecipes = () => openComingSoon();

  const gridClass = 'row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4';

  return (
    <main>
      <div className="d-flex align-items-center justify-content-between">
        <div>
          <h1>Discover</h1>
          <h3>Explore new recipes from people on our platform</h3>
        </div>

        {/* tiny status badge */}
        <span
          className={`badge text-bg-${
            connStatus === 'connected' ? 'success' : connStatus === 'connecting' ? 'secondary' : 'warning'
          }`}
          title="WebSocket status"
        >
          {connStatus}
        </span>
      </div>

      {/* Header actions */}
      <header className="py-3 px-4">
        <div className="d-flex align-items-center w-100">
          <div className="d-flex ms-auto align-items-center gap-3">
            <button type="button" className="btn btn-primary" onClick={handleSavedRecipes}>
              Saved Recipes
            </button>
            <NavLink to="/randomRecipe" className="btn btn-primary">
              Random Recipe
            </NavLink>
          </div>
        </div>
      </header>

      <section className="px-2 pb-5">
        {loading && <p className="text-center text-muted">Loading shared recipes…</p>}
        {!!error && !loading && (
          <div className="alert alert-danger text-center" role="alert">
            {error}
          </div>
        )}

        {!loading && !error && recipes.length === 0 && (
          <p className="text-center text-muted">No shared recipes yet. Check back soon!</p>
        )}

        {!loading && !error && recipes.length > 0 && (
          <div className={gridClass}>
            {recipes.map((r) => (
              <div className="col" key={r.id}>
                <SharedRecipeCard r={r} onView={handleView} onSave={handleSave} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Popup */}
      <Popup
        show={showDetails}
        onClose={closeComingSoon}
        title="Coming soon"
        message="This functionality will be built out in the future to display full recipe information (ingredients, instructions, nutrition, and more)."
        confirmText="Got it"
      />
    </main>
  );
}
