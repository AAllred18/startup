import React, { useEffect, useMemo, useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

// Lightweight modal (use your shared component here if you already have one)
function InfoModal({ open, title, body, onClose }) {
  if (!open) return null;
  return (
    <div className="modal fade show d-block" tabIndex="-1" style={{ background: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <p className="mb-0">{body}</p>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SharedRecipeCard({ r, onView, onSave }) {
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
  const navigate = useNavigate();

  // 🔔 modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalBody, setModalBody] = useState('');

  const openModal = (title, body) => {
    setModalTitle(title);
    setModalBody(body);
    setModalOpen(true);
  };
  const closeModal = () => setModalOpen(false);

  // Previous 2 recipes
  const initial = useMemo(() => ([
    { id: 'e1', title: 'Chicken Enchilada', totalTime: '35 minutes', difficulty: 'Easy', userName: 'OnoFood18', imageUrl: 'Enchilada.jpeg' },
    { id: 'm1', title: 'Marry Me Chicken', totalTime: '25 minutes', difficulty: 'Easy', userName: 'Foodie234', imageUrl: 'marrymechicken.jpg' },
  ]), []);

  // Pool of “shared” recipes
  const pool = useMemo(() => ([
    { title: 'Creamy Garlic Pasta', totalTime: '20 minutes', difficulty: 'Easy', userName: 'foodieOne', imageUrl: 'creamygarlicpasta.jpeg' },
    { title: 'Hawaiian BBQ Chicken', totalTime: '35 minutes', difficulty: 'Medium', userName: 'ILoveFood', imageUrl: 'hawaiianbbqchicken.jpg' },
    { title: 'Veggie Stir Fry', totalTime: '25 minutes', difficulty: 'Easy', userName: 'GoCougs', imageUrl: 'vegetablestirfry.jpeg' },
    { title: 'Beef Bulgogi Bowls', totalTime: '30 minutes', difficulty: 'Medium', userName: 'Yummyrecipes', imageUrl: 'bulgogi.jpeg' },
    { title: 'Lemon Herb Salmon', totalTime: '22 minutes', difficulty: 'Easy', userName: 'CoolGrandma', imageUrl: 'lemonsalmon.jpeg' },
  ]), []);

  const [recipes, setRecipes] = useState(initial);
  const [feedStopped, setFeedStopped] = useState(false);
  const timerRef = useRef(null);
  const stopTimerRef = useRef(null);
  const idRef = useRef(1000);

  const pushRandom = () => {
    const pick = pool[Math.floor(Math.random() * pool.length)];
    const newItem = {
      id: `r${idRef.current++}`,
      title: pick.title,
      totalTime: pick.totalTime,
      difficulty: pick.difficulty,
      userName: pick.userName,
      imageUrl: pick.imageUrl,
    };
    setRecipes(prev => [...prev, newItem]);
  };

  useEffect(() => {
    timerRef.current = setInterval(pushRandom, 10000);
    stopTimerRef.current = setTimeout(() => {
      clearInterval(timerRef.current);
      setFeedStopped(true);
    }, 60000);

    return () => {
      clearInterval(timerRef.current);
      clearTimeout(stopTimerRef.current);
    };
  }, []);

  // 🔔 Use modal for View and Save
  const handleView = (r) =>
    openModal('Feature coming soon', 'Viewing full shared recipe details will be built out soon—including ingredients, steps, and nutrition.');
  const handleSave = (r) =>
    openModal('Feature coming soon', `Saving "${r.title}" to your collection will be enabled in a later update.`);

  // 🔔 Use modal for Saved Recipes header button
  const handleSavedRecipes = () =>
    openModal('Feature coming soon', 'A personalized Saved Recipes page is coming soon. You’ll be able to see all your saved shares here.');

  const gridClass = 'row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4';

  return (
    <main>
      <h1>Discover</h1>
      <h3>Explore new recipes from people on our platform</h3>

      {/* Small utility header */}
      <header className="py-3 px-4">
        <div className="d-flex align-items-center w-100">
          <div className="d-flex ms-auto align-items-center gap-3">
            {/* Saved Recipes uses modal instead of navigation for now */}
            <button type="button" className="btn btn-primary" onClick={handleSavedRecipes}>
              Saved Recipes
            </button>
            {/* Random Recipe still navigates */}
            <NavLink to="/randomRecipe" className="btn btn-primary">
              Random Recipe
            </NavLink>
          </div>
        </div>
      </header>

      <section className="px-2 pb-5">
        {recipes.length === 0 ? (
          <p className="text-center text-muted">No recipes yet. Check back soon!</p>
        ) : (
          <div className={gridClass}>
            {recipes.map((r) => (
              <div className="col" key={r.id}>
                <SharedRecipeCard r={r} onView={handleView} onSave={handleSave} />
              </div>
            ))}
          </div>
        )}

        {feedStopped && (
          <div className="text-center text-muted mt-4">
            🔔 The feed has stopped adding new recipes after one minute.
          </div>
        )}
      </section>

      {/* Modal */}
      <InfoModal
        open={modalOpen}
        title={modalTitle}
        body={modalBody}
        onClose={closeModal}
      />
    </main>
  );
}
