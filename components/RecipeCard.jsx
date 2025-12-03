import React from 'react';
import { NavLink } from 'react-router-dom';

// inside RecipeCard
export function RecipeCard({ recipe, onEdit, onShare, onUnshare, isShared, disabled }) {
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
          <NavLink to={`/recipe/${recipe.id}`} state={{ recipe }} className="btn btn-primary">
             View
           </NavLink>
          <button className="btn btn-outline-secondary" onClick={() => onEdit?.(recipe)} disabled={disabled}>
            Edit
          </button>
          {!isShared ? (
            <button className="btn btn-primary" onClick={onShare} disabled={disabled}>
              {disabled ? 'Sharing…' : 'Share'}
            </button>
          ) : (
            <button className="btn btn-warning" onClick={onUnshare} disabled={disabled}>
              {disabled ? 'Unsharing…' : 'Unshare'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}


// export function RecipeCard({
//   recipe = {},
//   onEdit,
//   onShare,
//   viewTo = '/viewRecipe',
// }) {
//   const {
//     id,
//     title = 'Untitled',
//     totalTime = '—',
//     difficulty = '—',
//     imageUrl = 'placeholder.jpg',
//   } = recipe;

//   return (
//     <div className="card mb-4 h-100">
//       <img src={imageUrl} alt={title} className="card-img-top" />
//       <div className="card-body text-center">
//         <h4 className="card-title">{title}</h4>
//         <p className="card-text mb-1">Prep + Cook: {totalTime}</p>
//         <p className="card-text">Difficulty: {difficulty}</p>

//         <div className="d-flex justify-content-center gap-3 mt-3 flex-wrap">
//           <NavLink to={`/recipe/${recipe.id}`} state={{ recipe }} className="btn btn-primary">
//             View
//           </NavLink>

//           {onEdit && (
//             <NavLink
//               to={`/recipe/${id}/edit`}
//               state={{ recipe }}
//               className="btn btn-outline-secondary"
//             >
//               Edit
//             </NavLink>
//           )}

//           {onShare && (
//             <button
//               className="btn btn-outline-secondary"
//               onClick={() => onShare(recipe)}
//             >
//               Share
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
