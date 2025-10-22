import React, { useEffect, useMemo, useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

function RecipeCard({ r, onView, onSave }) {
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
  return (
    <main>
      <h1>Discover</h1>
      <h3>Explore new recipes from people on our platform</h3>

      {/* <!-- Smaller nav bar to be givena random recipe or view saved shared recipes --> */}
      <header class="py-3 px-4">
        <div class="d-flex align-items-center w-100">
          <div class="d-flex ms-auto align-items-center gap-3">
            <NavLink to="/savedRecipes" className="btn btn-primary">
                Saved Recipes
            </NavLink>
            <NavLink to="/randomRecipe" className="btn btn-primary">
                Random Recipe
            </NavLink>
          </div>
        </div>

      </header>

      {/* <!-- This section is a placeholder for the WebSocket data -->
       <!-- Real time recipes shared will appear here --> */}
      <section>
        <div class="recipes-container">
            {/* <!-- Want to make a React card component to cleanly dispay recipe info -->
             <!-- Placed the same 2 recipes 6 times to show responsive design --> */}
            <div class="card recipe-card mb-4 h-100">
              <img src="Enchilada.jpeg" class="card-img-top"/>
              <div class="card-body text-center">
                <h4 class="card-title">Chicken Enchilada</h4>
                <p class="card-text mb-1">Prep + Cook: 35 minutes</p>
                <p class="card-text mb-1">Difficulty: Easy</p>
                <p class="card-text">User: OnoFood18</p>
                <div class="d-flex justify-content-center gap-3 mt-3">
                  {/* <!-- In the future, icons could be used to signify action --> */}
                  <a href="" class="btn btn-primary">View</a>
                  <a href="" class="btn btn-outline-secondary">Save</a>
                </div>
              </div>
            </div>

            <div class="card recipe-card mb-4">
              <img src="marrymechicken.jpg" class="card-img-top"/>
              <div class="card-body text-center">
                <h4 class="card-title">Marry Me Chicken</h4>
                <p class="card-text mb-1">Prep + Cook: 25 minutes</p>
                <p class="card-text mb-1">Difficulty: Easy</p>
                <p class="card-text">User: Foodie234</p>
                <div class="d-flex justify-content-center gap-3 mt-3">
                  <a href="" class="btn btn-primary">View</a>
                  <a href="savedRecipes.html" class="btn btn-outline-secondary">Save</a>
                </div>
              </div>
            </div>

            <div class="card recipe-card mb-4 h-100">
              <img src="Enchilada.jpeg" class="card-img-top"/>
              <div class="card-body text-center">
                <h4 class="card-title">Chicken Enchilada</h4>
                <p class="card-text mb-1">Prep + Cook: 35 minutes</p>
                <p class="card-text mb-1">Difficulty: Easy</p>
                <p class="card-text">User: OnoFood18</p>
                <div class="d-flex justify-content-center gap-3 mt-3">
                  <a href="" class="btn btn-primary">View</a>
                  <a href="savedRecipes.html" class="btn btn-outline-secondary">Save</a>
                </div>
              </div>
            </div>

            <div class="card recipe-card mb-4">
              <img src="marrymechicken.jpg" class="card-img-top"/>
              <div class="card-body text-center">
                <h4 class="card-title">Marry Me Chicken</h4>
                <p class="card-text mb-1">Prep + Cook: 25 minutes</p>
                <p class="card-text mb-1">Difficulty: Easy</p>
                <p class="card-text">User: Foodie234</p>
                <div class="d-flex justify-content-center gap-3 mt-3">
                  <a href="" class="btn btn-primary">View</a>
                  <a href="savedRecipes.html" class="btn btn-outline-secondary">Save</a>
                </div>
              </div>
            </div>

            <div class="card recipe-card mb-4 h-100">
              <img src="Enchilada.jpeg" class="card-img-top"/>
              <div class="card-body text-center">
                <h4 class="card-title">Chicken Enchilada</h4>
                <p class="card-text mb-1">Prep + Cook: 35 minutes</p>
                <p class="card-text mb-1">Difficulty: Easy</p>
                <p class="card-text">User: OnoFood18</p>
                <div class="d-flex justify-content-center gap-3 mt-3">
                  <a href="" class="btn btn-primary">View</a>
                  <a href="savedRecipes.html" class="btn btn-outline-secondary">Save</a>
                </div>
              </div>
            </div>

            <div class="card recipe-card mb-4">
              <img src="marrymechicken.jpg" class="card-img-top"/>
              <div class="card-body text-center">
                <h4 class="card-title">Marry Me Chicken</h4>
                <p class="card-text mb-1">Prep + Cook: 25 minutes</p>
                <p class="card-text mb-1">Difficulty: Easy</p>
                <p class="card-text">User: Foodie234</p>
                <div class="d-flex justify-content-center gap-3 mt-3">
                  <a href="" class="btn btn-primary">View</a>
                  <a href="savedRecipes.html" class="btn btn-outline-secondary">Save</a>
                </div>
              </div>
            </div>
        </div>
      </section>
    </main>
  );
}