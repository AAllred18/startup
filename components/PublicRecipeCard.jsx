// components/PublicRecipeCard.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';

export function PublicRecipeCard({ recipe, onView, onSave }) {
  // matches RecipeCard’s shape/classes so it looks the same
  return (
    <div className="card mb-4 h-100">
      <img src={recipe.imageUrl} alt={recipe.title} className="card-img-top recipe-card-img" />
      <div className="card-body text-center">
        <h4 className="card-title">
          {recipe.title}{' '}
          {/* keep the same badge placement if you ever want to show "Shared" */}
          {recipe.isShared && <span className="badge text-bg-success align-middle">Shared</span>}
        </h4>

        {/* keep these two lines exactly like RecipeCard */}
        <p className="card-text mb-1">Prep + Cook: {recipe.totalTime}</p>
        <p className="card-text mb-1">Difficulty: {recipe.difficulty}</p>

        {/* the one extra line you wanted */}
        {recipe.userName && (
          <p className="card-text mb-1 text-muted">Shared by {recipe.userName}</p>
        )}

        <div className="d-flex justify-content-center gap-2 mt-3">
          {/* Use the same View style as RecipeCard */}
          <NavLink to={`/recipe/${recipe.id}`} state={{ recipe }} className="btn btn-primary">
            View
          </NavLink>
          <button className="btn btn-outline-secondary" onClick={() => onSave?.(recipe)}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
