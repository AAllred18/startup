import React from 'react';

export function SavedRecipes() {
  return (
    <main>
      <h1>Saved Recipes</h1>
      <div class="card recipe-card mb-4 h-100">
        <img src="Enchilada.jpeg" class="card-img-top"/>
        <div class="card-body text-center">
          <h4 class="card-title">Chicken Enchilada</h4>
          <p class="card-text mb-1">Prep + Cook: 35 minutes</p>
          <p class="card-text mb-1">Difficulty: Easy</p>
          <p class="card-text">User: OnoFood18</p>
          <div class="d-flex justify-content-center gap-3 mt-3">
            <a href="" class="btn btn-primary">View</a>
          </div>
        </div>
      </div>

    </main>
  );
}