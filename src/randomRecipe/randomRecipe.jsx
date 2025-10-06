import React from 'react';

export function RandomRecipe() {
  return (
    <main>
      <h1 className="mt-1">Random Recipe Generator</h1>

      <img src="logo.png" style={{ width: '250px', height: 'auto', borderRadius: '25%' }}/>

      <section className="text-center">
        <p className='mt-5'>Discover completely random recipes with our random recipe generator!</p>
        <div className="align-items-center">
          <button className="btn btn-primary my-4">Random Recipe</button>
        </div>
      </section>

    </main>
  );
}