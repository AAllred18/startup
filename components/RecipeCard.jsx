import React from 'react';
import { NavLink } from 'react-router-dom';

export function RecipeCard({
  recipe = {},
  onEdit,
  onShare,
  viewTo = '/viewRecipe',
}) {
  const {
    id,
    title = 'Untitled',
    totalTime = '—',
    difficulty = '—',
    imageUrl = 'placeholder.jpg',
  } = recipe;

  return (
    <div className="card mb-4 h-100">
      <img src={imageUrl} alt={title} className="card-img-top" />
      <div className="card-body text-center">
        <h4 className="card-title">{title}</h4>
        <p className="card-text mb-1">Prep + Cook: {totalTime}</p>
        <p className="card-text">Difficulty: {difficulty}</p>

        <div className="d-flex justify-content-center gap-3 mt-3 flex-wrap">
          <NavLink to={viewTo} state={{ recipe }} className="btn btn-primary">
            View
          </NavLink>

          {onEdit && (
            <NavLink
              to={`/recipe/${id}/edit`}
              state={{ recipe }}
              className="btn btn-outline-secondary"
            >
              Edit
            </NavLink>
          )}

          {onShare && (
            <button
              className="btn btn-outline-secondary"
              onClick={() => onShare(recipe)}
            >
              Share
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
