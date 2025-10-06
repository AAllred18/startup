import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { MyRecipes } from './myRecipes/myRecipes';
import { Discover } from './discover/discover';
import { AddRecipe } from './addRecipe/addRecipe';
import { RandomRecipe } from './randomRecipe/randomRecipe'
import { SavedRecipes } from './savedRecipes/savedRecipes';
import { ViewRecipe } from './viewRecipe/viewRecipe';

export default function App() {
  return (
    <BrowserRouter> 
        <div>
            <header>
                <nav className="navbar navbar-expand-md navbar-dark navbar-custom px-4">
                    <NavLink className="navbar-brand fw-semibold" to="/">
                        ShareABite<sup>&reg;</sup>
                    </NavLink>

                    <ul className="navbar-nav ms-auto d-flex flex-row gap-2">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="">
                            Home
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="myRecipes">
                            Recipes
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="discover">
                            Discover
                        </NavLink>
                    </li>
                    </ul>
                </nav>
            </header>

            <Routes>
                <Route path='/' element={<Login />} exact />
                <Route path='/myRecipes' element={<MyRecipes />} />
                <Route path='/discover' element={<Discover />} />
                <Route path="/addRecipe" element={<AddRecipe />} />
                <Route path='/randomRecipe' element={<RandomRecipe />} />
                <Route path='/savedRecipes' element={<SavedRecipes />} />
                <Route path="/viewRecipe" element={<ViewRecipe />} />
                <Route path='*' element={<NotFound />} />
            </Routes>

            <footer className="mt-auto">
                <span className="text-reset">Author - AJ Allred</span>
                <br />
                <a href="https://github.com/AAllred18/startup/tree/main" style={{color: 'white'}}>GitHub</a>
            </footer>
        </div>
    </BrowserRouter>
  );
}

function NotFound() {
  return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}