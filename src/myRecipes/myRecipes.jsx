import React, { useMemo } from 'react';
import { NavLink } from 'react-router-dom';

import '../recipes.css'

async function mockFetchMyRecipes() {
  return Promise.resolve([
    { id: 'r1', title: 'Shoyu Chicken', totalTime: '35 minutes', difficulty: 'Easy', imageUrl: 'ShoyuChicken.jpeg' },
    { id: 'r2', title: 'Fried Rice',     totalTime: '20 minutes', difficulty: 'Easy', imageUrl: 'FriedRice.jpeg'  },
    { id: 'r3', title: 'Teri Beef',      totalTime: '30 minutes', difficulty: 'Medium', imageUrl: 'teribeef.jpg'  },
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
            <NavLink to="/addRecipe" className="btn btn-primary">
                Add New Recipe
            </NavLink>

            <form class="d-flex align-items-center gap-2 m-0">
              <input id="q" name="q" type="search" class="form-control" placeholder="Search by Recipe Name"/>
              <button type="submit" class="btn btn-outline-secondary">Search</button>
            </form>
          </div>
        </div>
        
      </header>

      <section>
        <div class="recipes-container">
        
          <div class="card mb-4">
            <img src="ShoyuChicken.jpeg" class="card-img-top"/>
            <div class="card-body text-center">
              <h4 class="card-title">Shoyu Chicken</h4>
              <p class="card-text mb-1">Prep + Cook: 35 minutes</p>
              <p class="card-text">Difficulty: Easy</p>
              <div class="d-flex justify-content-center gap-3 mt-3">
                <NavLink to="/viewRecipe" className="btn btn-primary">
                    View
                </NavLink>
                <a href="" class="btn btn-outline-secondary">Edit</a>
                <a href="" class="btn btn-outline-secondary">Share</a>
              </div>
            </div>
          </div>

          <div class="card mb-4">
            <img src="FriedRice.jpeg" class="card-img-top"/>
            <div class="card-body text-center">
              <h4 class="card-title">Fried Rice</h4>
              <p class="card-text mb-1">Prep + Cook: 20 minutes</p>
              <p class="card-text">Difficulty: Easy</p>
              <div class="d-flex justify-content-center gap-3 mt-3">
                <a href="" class="btn btn-primary">View</a>
                <a href="" class="btn btn-outline-secondary">Edit</a>
                <a href="" class="btn btn-outline-secondary">Share</a>
              </div>
            </div>
          </div>

          <div class="card mb-4">
            <img src="ShoyuChicken.jpeg" class="card-img-top"/>
            <div class="card-body text-center">
              <h4 class="card-title">Shoyu Chicken</h4>
              <p class="card-text mb-1">Prep + Cook: 35 minutes</p>
              <p class="card-text">Difficulty: Easy</p>
              <div class="d-flex justify-content-center gap-3 mt-3">
                <a href="viewRecipe.html" class="btn btn-primary">View</a>
                <a href="" class="btn btn-outline-secondary">Edit</a>
                <a href="" class="btn btn-outline-secondary">Share</a>
              </div>
            </div>
          </div>

          <div class="card mb-4">
            <img src="FriedRice.jpeg" class="card-img-top"/>
            <div class="card-body text-center">
              <h4 class="card-title">Fried Rice</h4>
              <p class="card-text mb-1">Prep + Cook: 20 minutes</p>
              <p class="card-text">Difficulty: Easy</p>
              <div class="d-flex justify-content-center gap-3 mt-3">
                <a href="" class="btn btn-primary">View</a>
                <a href="" class="btn btn-outline-secondary">Edit</a>
                <a href="" class="btn btn-outline-secondary">Share</a>
              </div>
            </div>
          </div>

          <div class="card mb-4">
            <img src="ShoyuChicken.jpeg" class="card-img-top"/>
            <div class="card-body text-center">
              <h4 class="card-title">Shoyu Chicken</h4>
              <p class="card-text mb-1">Prep + Cook: 35 minutes</p>
              <p class="card-text">Difficulty: Easy</p>
              <div class="d-flex justify-content-center gap-3 mt-3">
                <a href="viewRecipe.html" class="btn btn-primary">View</a>
                <a href="" class="btn btn-outline-secondary">Edit</a>
                <a href="" class="btn btn-outline-secondary">Share</a>
              </div>
            </div>
          </div>

          <div class="card mb-4">
            <img src="FriedRice.jpeg" class="card-img-top"/>
            <div class="card-body text-center">
              <h4 class="card-title">Fried Rice</h4>
              <p class="card-text mb-1">Prep + Cook: 20 minutes</p>
              <p class="card-text">Difficulty: Easy</p>
              <div class="d-flex justify-content-center gap-3 mt-3">
                <a href="" class="btn btn-primary">View</a>
                <a href="" class="btn btn-outline-secondary">Edit</a>
                <a href="" class="btn btn-outline-secondary">Share</a>
              </div>
            </div>
          </div>

           <div class="card mb-4">
            <img src="ShoyuChicken.jpeg" class="card-img-top"/>
            <div class="card-body text-center">
              <h4 class="card-title">Shoyu Chicken</h4>
              <p class="card-text mb-1">Prep + Cook: 35 minutes</p>
              <p class="card-text">Difficulty: Easy</p>
              <div class="d-flex justify-content-center gap-3 mt-3">
                <a href="viewRecipe.html" class="btn btn-primary">View</a>
                <a href="" class="btn btn-outline-secondary">Edit</a>
                <a href="" class="btn btn-outline-secondary">Share</a>
              </div>
            </div>
          </div>

          <div class="card mb-4">
            <img src="FriedRice.jpeg" class="card-img-top"/>
            <div class="card-body text-center">
              <h4 class="card-title">Fried Rice</h4>
              <p class="card-text mb-1">Prep + Cook: 20 minutes</p>
              <p class="card-text">Difficulty: Easy</p>
              <div class="d-flex justify-content-center gap-3 mt-3">
                <a href="" class="btn btn-primary">View</a>
                <a href="" class="btn btn-outline-secondary">Edit</a>
                <a href="" class="btn btn-outline-secondary">Share</a>
              </div>
            </div>
          </div>

        </div>
      </section>

    </main>
  );
}