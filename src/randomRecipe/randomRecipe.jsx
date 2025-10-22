import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function mockFetchRandomRecipe() {
  const randomRecipes = [
    {
      id: 1,
      title: 'Creamy Garlic Pasta',
      totalTime: '20 minutes',
      difficulty: 'Easy',
      imageUrl: 'creamygarlicpasta.jpg',
      description: 'A quick and creamy garlic pasta dish perfect for busy weeknights.',
    },
    {
      id: 2,
      title: 'Hawaiian BBQ Chicken',
      totalTime: '35 minutes',
      difficulty: 'Medium',
      imageUrl: 'hawaiianbbqchicken.jpg',
      description: 'A tangy and sweet barbecue chicken with a tropical twist.',
    },
    {
      id: 3,
      title: 'Vegetable Stir Fry',
      totalTime: '25 minutes',
      difficulty: 'Easy',
      imageUrl: 'vegetablestirfry.jpg',
      description: 'A colorful, healthy stir fry loaded with fresh vegetables.',
    },
  ];

  return new Promise((resolve) => {
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * randomRecipes.length);
      resolve(randomRecipes[randomIndex]);
    }, 600);
  });
}


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