import React from 'react';
import { NavLink } from 'react-router-dom';

export function RecipeCard({
  recipe,
  onEdit,
  onShare,
  onUnshare,
  isShared,
  disabled,          // true while this card is making a share/unshare request
}) {
  const handleEdit = () => onEdit?.(recipe);
  const handleShare = () => onShare?.(recipe);
  const handleUnshare = () => onUnshare?.(recipe);

  return (
    <div className="card mb-4 h-100">
      <img src={recipe.imageUrl} alt={recipe.title} className="card-img-top" />
      <div className="card-body text-center">
        <h4 className="card-title">
          {recipe.title}{' '}
          {isShared && <span className="badge text-bg-success align-middle">Shared</span>}
        </h4>

        <p className="card-text mb-1">Prep + Cook: {recipe.totalTime}</p>
        <p className="card-text mb-1">Difficulty: {recipe.difficulty}</p>

        <div className="d-flex justify-content-center gap-2 mt-3">
          <NavLink
            to={`/recipe/${recipe.id}`}
            state={{ recipe }}
            className="btn btn-primary"
          >
            View
          </NavLink>

          <button
            className="btn btn-outline-secondary"
            onClick={handleEdit}
            disabled={disabled}
            aria-disabled={disabled}
          >
            Edit
          </button>

          {!isShared ? (
            <button
              className="btn btn-primary"
              onClick={handleShare}
              disabled={disabled}
              aria-disabled={disabled}
            >
              {disabled ? 'Sharing…' : 'Share'}
            </button>
          ) : (
            <button
              className="btn btn-secondary"
              onClick={handleUnshare}
              disabled={disabled}
              aria-disabled={disabled}
            >
              {disabled ? 'Unsharing…' : 'Unshare'}
            </button>
          )}
        </div>

        {/* Optional subtle progress text for screen readers */}
        <span className="visually-hidden" aria-live="polite">
          {disabled ? 'Working…' : ''}
        </span>
      </div>
    </div>
  );
}
