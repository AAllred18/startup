import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function mockFetchRandomRecipe() {
  const randomRecipes = [
    {
      id: 1,
      title: 'Creamy Garlic Pasta',
      totalTime: '20 minutes',
      difficulty: 'Easy',
      imageUrl: 'creamygarlicpasta.jpg',
      description: 'A quick and creamy garlic pasta dish perfect for busy weeknights.',
    },
    {
      id: 2,
      title: 'Hawaiian BBQ Chicken',
      totalTime: '35 minutes',
      difficulty: 'Medium',
      imageUrl: 'hawaiianbbqchicken.jpg',
      description: 'A tangy and sweet barbecue chicken with a tropical twist.',
    },
    {
      id: 3,
      title: 'Vegetable Stir Fry',
      totalTime: '25 minutes',
      difficulty: 'Easy',
      imageUrl: 'vegetablestirfry.jpg',
      description: 'A colorful, healthy stir fry loaded with fresh vegetables.',
    },
  ];

  return new Promise((resolve) => {
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * randomRecipes.length);
      resolve(randomRecipes[randomIndex]);
    }, 600);
  });
}


export function RandomRecipe() {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function getRandomRecipe() {
    try {
      setLoading(true);
      setError(null);

      // Insert real API call here later on

      const data = await mockFetchRandomRecipe();
      setRecipe(data);
    } catch (err) {
      setError('Failed to fetch a random recipe. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <h1 className="mt-1">Random Recipe Generator</h1>

      <img src="logo.png" style={{ width: '250px', height: 'auto', borderRadius: '25%' }}/>

      <section className="text-center">
        <p className='mt-5'>Discover completely random recipes with our random recipe generator!</p>
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
          <div className="card mx-auto text-start mb-5 p-3" style={{ maxWidth: 560 }}>
            <img
              src={recipe.imageUrl}
              alt={recipe.title}
              className="card-img-top"
            />
            <div className="card-body text-center">
              <h4 className="card-title">{recipe.title}</h4>
              <p className="card-text mb-1">Prep + Cook: {recipe.totalTime}</p>
              <p className="card-text mb-1">Difficulty: {recipe.difficulty}</p>
              <p className="card-text">{recipe.description}</p>
              <div className="d-flex justify-content-center mt-3">
                <button
                  className="btn btn-outline-secondary"
                  onClick={getRandomRecipe}
                >
                  Try Another
                </button>
              </div>
            </div>
          </div>
        )}

      </section>

    </main>
  );
}