import React, { useEffect, useMemo, useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

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

  // Previous 2 recipes from the 6 laid out 
  const initial = useMemo(() => ([
    { id: 'e1', title: 'Chicken Enchilada', totalTime: '35 minutes', difficulty: 'Easy', userName: 'OnoFood18', imageUrl: 'Enchilada.jpeg' },
    { id: 'm1', title: 'Marry Me Chicken', totalTime: '25 minutes', difficulty: 'Easy', userName: 'Foodie234', imageUrl: 'marrymechicken.jpg' },
  ]), []);

  // New "shared" recipes , excluding images for now
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

  // Add a new random recipe to the top
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
    // Start adding recipes every 10 seconds
    timerRef.current = setInterval(() => {
      pushRandom();
    }, 10000);

    // Stop adding new recipes after 1 minute
    stopTimerRef.current = setTimeout(() => {
      clearInterval(timerRef.current);
      setFeedStopped(true);
    }, 60000);

    return () => {
      clearInterval(timerRef.current);
      clearTimeout(stopTimerRef.current);
    };
  }, []);

  const handleView = (r) => navigate(`/recipes/${r.id}`);
  const handleSave = (r) => alert(`Saved "${r.title}"`);

  const gridClass = 'row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4';

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

      <section className="px-2 pb-5">
        {recipes.length === 0 ? (
          <p className="text-center text-muted">No recipes yet. Check back soon!</p>
        ) : (
          <div className={gridClass}>
            {recipes.map((r) => (
              <div className="col" key={r.id}>
                <SharedRecipeCard
               r={r} onView={handleView} onSave={handleSave} />
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

    </main>
  );
}

// Old layout for 6 recipes that were premade

{/* <!-- This section is a placeholder for the WebSocket data -->
       <!-- Real time recipes shared will appear here --> */}
      {/* <section> */}
        {/* <!-- Want to make a React card component to cleanly dispay recipe info -->
             <!-- Placed the same 2 recipes 6 times to show responsive design --> */}
        {/* <div class="recipes-container">  
            <div class="card recipe-card mb-4 h-100">
              <img src="Enchilada.jpeg" class="card-img-top"/>
              <div class="card-body text-center">
                <h4 class="card-title">Chicken Enchilada</h4>
                <p class="card-text mb-1">Prep + Cook: 35 minutes</p>
                <p class="card-text mb-1">Difficulty: Easy</p>
                <p class="card-text">User: OnoFood18</p>
                <div class="d-flex justify-content-center gap-3 mt-3">
              
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
      </section> */}