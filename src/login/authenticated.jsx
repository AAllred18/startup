import React from 'react';
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';

import './authenticated.css';

export function Authenticated(props) {
  const navigate = useNavigate();

  function logout() {
    fetch(`/api/auth/logout`, {
      method: 'delete',
    })
      .catch(() => {
        // Logout failed. Assuming offline
      })
      .finally(() => {
        localStorage.removeItem('userName');
        props.onLogout();
      });
  }

  return (
    <div>
        <div className="d-flex justify-content-center align-items-center text-center p-5 border border-3 rounded border-success py-2">
            <div className='userName'>Welcome back {props.userName}!</div>
        </div>

      <div className="d-flex gap-3 justify-content-center p-5">
            <Button variant='primary' onClick={() => navigate('/myRecipes')}>
                Explore Recipes
            </Button>
            <Button variant='secondary' onClick={() => logout()}>
                Logout
            </Button>
          </div>
    </div>
  );
}
