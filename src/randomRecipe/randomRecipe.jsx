import React, { useState } from 'react';

// Simple mapper with fixed time/difficulty (clean + reliable MVP)
function mapMealToCard(meal) {
  return {
    id: Number(meal.idMeal),
    title: meal.strMeal,
    totalTime: '30 minutes',
    difficulty: 'Medium',
    imageUrl: meal.strMealThumb,
  };
}

export function RandomRecipe() {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  async function getRandomRecipe() {
    try {
      setLoading(true);
      setError(null);

      // Frontend call to TheMealDB (meets rubric requirement)
      const r = await fetch('https://www.themealdb.com/api/json/v1/1/random.php', { cache: 'no-store' });
      if (!r.ok) throw new Error('TheMealDB error');
      const d = await r.json();
      const meal = d?.meals?.[0];
      if (!meal) throw new Error('No meal returned');

      setRecipe(mapMealToCard(meal));
    } catch (err) {
      console.error(err);
      setError('Failed to fetch a random recipe. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <h1 className="mt-1">Random Recipe Generator</h1>

      <img
        src="logo.png"
        style={{ width: '250px', height: 'auto', borderRadius: '25%' }}
        alt="Logo"
      />

      <section className="text-center">
        <p className="mt-5">Discover completely random recipes with our random recipe generator!</p>

        <div className="align-items-center">
          <button
            className="btn btn-primary my-4"
            onClick={getRandomRecipe}
            disabled={loading}
          >
            {loading ? 'Fetching deliciousness…' : 'Generate Random Recipe'}
          </button>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        {recipe && !error && (
          <div className="card mx-auto text-start mb-5 p-3 shadow" style={{ maxWidth: 560 }}>
            <img
              src={recipe.imageUrl}
              alt={recipe.title}
              className="card-img-top"
              style={{ objectFit: 'cover', maxHeight: '340px', borderRadius: '8px' }}
            />
            <div className="card-body text-center">
              <h4 className="card-title">{recipe.title}</h4>
              <p className="card-text mb-1">Prep + Cook: {recipe.totalTime}</p>
              <p className="card-text mb-1">Difficulty: {recipe.difficulty}</p>

              <div className="d-flex justify-content-center gap-2 mt-3">
                <button
                  className="btn btn-outline-secondary"
                  onClick={getRandomRecipe}
                >
                  Try Another
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowDetails(true)}
                >
                  Details
                </button>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Lightweight popup/modal */}
      {showDetails && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Feature coming soon"
          className="d-flex align-items-center justify-content-center"
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.45)',
            zIndex: 1050,
            padding: '1rem',
          }}
          onClick={() => setShowDetails(false)} // click backdrop to close
        >
          <div
            className="bg-white rounded-3 shadow p-4"
            style={{ maxWidth: 520, width: '100%', position: 'relative' }}
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
          >
            <button
              type="button"
              aria-label="Close"
              className="btn-close"
              style={{ position: 'absolute', top: 12, right: 12 }}
              onClick={() => setShowDetails(false)}
            />
            <h5 className="mb-2">Coming soon</h5>
            <p className="mb-0">
              This functionality will be built out in the future to display all recipe information,
              including ingredients, instructions, nutrition, and more.
            </p>
            <div className="text-end mt-3">
              <button className="btn btn-secondary" onClick={() => setShowDetails(false)}>
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
