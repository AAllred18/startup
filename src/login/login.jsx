import React from 'react';

export function Login() {
  return (
    <main>
      <h1 className="text-center">Welcome to ShareABite</h1>
    
      <img src="logo.png" style={{ width: '250px', height: 'auto', borderRadius: '25%' }}/>
      <h3 className="text-center">Where recipes bring people together!</h3>

  
      <div className="p-3 my-2" 
        style={{
          backgroundColor: '#F4EADC',
          borderRadius: '5%',
          maxWidth: '500px',
          padding: '4rem',
        }}>
        <p className="fw-semibold">Sign in or create an account to get started!</p>
        <form method="get" action="recipes.html">
          <div className="input-group mb-3">
            <span className="input-group-text">Email</span>
            <input type="email" placeholder="your@email.com" className="form-control"/>
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text">Password</span>
            <input type="password" placeholder="password" className="form-control"/>
          </div>
          <div className="d-flex gap-2 justify-content-center">
            <button type="submit" className="btn btn-primary">Login</button>
            <button type="submit" className="btn btn-outline-secondary">Create</button>
          </div>
        </form>
      </div>
    </main>
  );
}