import React from 'react';

export function RandomRecipe() {
  return (
    <main>
      <h1 class="mt-1">Random Recipe Generator</h1>

      <img src="logo.png" style="width:250px; height:auto; border-radius: 25%;"/>

      <section class="text-center">
        <p>Discover completely random recipes with our random recipe generator!</p>
        <div class="align-items-center">
          <button class="btn btn-primary">Random Recipe</button>
        </div>
      </section>

    </main>
  );
}