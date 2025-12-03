import React from 'react';
import { NavLink } from 'react-router-dom';

export function PublicRecipeCard({ recipe, onView, onSave }) {
  return (
    <div className="card h-100 d-flex flex-column w-100">
      <img
        src={recipe.imageUrl}
        alt={recipe.title}
        className="card-img-top recipe-card-img"
        style={{ objectFit: "cover", height: "120px", width: "100%" }}
      />

      <div className="card-body text-center d-flex flex-column">
        <h4 className="card-title">
          {recipe.title}{' '}
          {recipe.isShared && (
            <span className="badge text-bg-success align-middle">Shared</span>
          )}
        </h4>

        <p className="card-text mb-1">Prep + Cook: {recipe.totalTime}</p>
        <p className="card-text mb-1">Difficulty: {recipe.difficulty}</p>

        {recipe.ownerEmail && (
          <p className="card-text mb-1 text-muted">Shared by {recipe.ownerEmail}</p>
        )}

        {/* push buttons to bottom for clean spacing */}
        <div className="mt-auto d-flex justify-content-center gap-2 pt-3">
          <button
            className="btn btn-primary"
            onClick={() => onSave?.(recipe)}
          >
            View
          </button>

          <button
            className="btn btn-outline-secondary"
            onClick={() => onSave?.(recipe)}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
