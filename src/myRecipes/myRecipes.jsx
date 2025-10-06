import React from 'react';

import { NavLink } from 'react-router-dom';
import '../recipes.css'

export function MyRecipes() {
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
            <a href="addRecipe.html" class="btn btn-primary">Add New Recipe</a>

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