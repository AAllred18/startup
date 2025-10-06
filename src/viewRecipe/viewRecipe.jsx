import React from 'react';

export function ViewRecipe() {
  return (
     <main>

      <h2 class="mb-4 mt-3">Shoyu Chicken</h2>

      <img src="ShoyuChicken.jpeg" class="mb-3"/>

      <h4>Prep + Cook Time: 35 minutes</h4>
      <h4>Difficulty: Easy</h4>

      <h4>Ingredients</h4>
      <div class="row row-cols-2 row-cols-3 row-cols-4">
        <li class="col">Chicken</li>
        <li class="col">Shoyu</li>
        <li class="col">Brown Sugar</li>
        <li class="col">Ginger</li>
        <li class="col">Garlic</li>
        <li class="col">Water</li>
        <li class="col">Green Onions</li>
      </div>

      <h4>Directions</h4>
      <ol>
        <li>Prepare the chicken by pat drying it with a paper towel. It will help absorb more flavor while cooking.</li>
        <li>Heat a large pot or deep pan over medium-high heat. Combine shoyu, brown sugar, honey, water, ginger, and garlic. Stir to dissolve the sugar and honey.</li>
        <li>Add the chicken to the pot, ensuring they are mostly submerged. Bring to a boil then reduce the heat to low. Cover and let the chicken simmer for 30-45 minutes. Take the chicken out and set aside.</li>
        <li>Optional – Remove the chicken and place on a baking sheet. Broil chicken in the oven at 500 Degrees Fahrenheit for 4-5 minutes or until the chicken skin has become crispy.</li>
        <li>Uncover the pot and let the sauce reduce over high heat for 5 minutes</li>
        <li>Plate the chicken over rice, pour sauce over, and garnish with green onions.</li>
      </ol>

    </main>
  );
}