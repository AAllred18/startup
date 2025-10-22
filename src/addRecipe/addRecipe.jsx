import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const mockFetchRecipeById = async (id) => Promise.resolve({
  id,
  title: 'Shoyu Chicken',
  description: 'Savory soy-based braised chicken.',
  servings: 4,
  difficulty: 'Easy',
  totalTime: 35,
  ingredients: ['Chicken', 'Shoyu (soy sauce)', 'Brown Sugar', 'Ginger', 'Garlic', 'Water', 'Green Onions'],
  steps: [
    'Pat dry the chicken with paper towels.',
    'Combine shoyu, brown sugar, water, ginger, and garlic in pot.',
    'Add chicken; simmer 30–45 minutes.',
    'Optional: Broil to crisp the skin.',
    'Reduce sauce 5 minutes; serve over rice.',
  ],
  imageUrl: 'ShoyuChicken.jpeg',
});

const mockCreateRecipe = async (payload) => {
  // Assign an id for backend (mock)
  return Promise.resolve({ ...payload, id: crypto.randomUUID() });
};

const mockUpdateRecipe = async (id, payload) => {
  return Promise.resolve({ ...payload, id });
};

const emptyForm = {
  title: '',
  description: '',
  servings: '',
  difficulty: 'Easy',
  totalTime: '',
  ingredients: [''], // empty row
  steps: [''],
  imageFile: null,
  imageUrl: '', 
};

export function AddRecipe() {
  return (
    <main className="container py-4">
      <h2 className="my-4">Add New Recipe</h2>

      <form>
        <fieldset className="mb-4">
          <legend>Basics</legend>

          <div className="mb-3">
            <label htmlFor="title">
              Recipe Title <span>*</span>
            </label>
            <input
              id="title"
              type="text"
              className="form-control"
              required
              placeholder="Recipe Name"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="desc">Short Description</label>
            <textarea
              id="desc"
              className="form-control"
              maxLength={200}
              placeholder="Enter a short description of your recipe here"
            ></textarea>
          </div>

          <div className="mb-3">
            <label htmlFor="servings">Servings</label>
            <input
              id="servings"
              type="number"
              min={1}
              step={1}
              placeholder="4"
              className="form-control mb-3"
            />

            <label htmlFor="difficulty">Difficulty</label>
            <select id="difficulty" className="form-select mb-3" defaultValue="Easy">
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>

            <label htmlFor="totalTime">Total Time (min)</label>
            <input
              id="totalTime"
              type="number"
              min={0}
              step={1}
              defaultValue={0}
              className="form-control mb-3"
            />
          </div>
        </fieldset>

        <fieldset className="mb-4">
          <legend>Ingredients</legend>

          <div className="d-flex gap-2 mb-2 justify-content-between">
            <input
              type="text"
              className="form-control"
              placeholder="Ingredient + Quantity here"
              required
            />
            <button type="button" className="btn btn-outline-secondary">Remove</button>
          </div>

          {/* TODO: Decide how to model list of ingredients & steps for DB storage */}
          <button type="button" className="btn btn-primary">+ Add Ingredient</button>
        </fieldset>

        <fieldset className="mb-4">
          <legend>Steps</legend>
          <ol className="list-unstyled">
            <li className="d-flex gap-2">
              <textarea
                rows={2}
                className="form-control"
                placeholder="Describe the first step…"
                required
              ></textarea>
              <button type="button" className="btn btn-outline-secondary">Remove</button>
            </li>
          </ol>
          <button type="button" className="btn btn-primary">+ Add Step</button>
        </fieldset>

        <fieldset className="mb-4">
          <legend>Photo (optional)</legend>
          <input type="file" accept="image/*" />
        </fieldset>

        <div className="mb-4">
          <button type="submit" className="btn btn-primary">Save Recipe</button>
        </div>
      </form>
    </main>
  );
}
