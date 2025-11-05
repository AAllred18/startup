import React from 'react';

import { Unauthenticated } from './unauthenticated';
import { Authenticated } from './authenticated';
import { AuthState } from './authState';

export function Login({ userName, authState, onAuthChange }) {
  const handleLogin = (loginUserName) => {
    onAuthChange(loginUserName, AuthState.Authenticated);
  };

  const handleLogout = () => {
    onAuthChange(userName, AuthState.Unauthenticated);
  };

  const panelStyle = {
    backgroundColor: '#F4EADC',
    borderRadius: '5%',
    maxWidth: '500px',
    padding: '4rem',
  };

  return (
    <main className="container d-flex flex-column align-items-center gap-3 py-4">
      {authState !== AuthState.Unknown && (
        <>
          <h1 className="text-center m-0">Welcome to ShareABite</h1>
          <img
            src="logo.png"
            alt="ShareABite logo"
            style={{ width: '250px', height: 'auto', borderRadius: '25%' }}
          />
          <h3 className="text-center">Where recipes bring people together!</h3>
        </>
      )}

      <div className="w-100 d-flex justify-content-center">
        {authState === AuthState.Authenticated && (
          <div className="w-100 d-flex justify-content-center">
            <div className="w-100" style={{ maxWidth: '900px' }}>
              <Authenticated userName={userName} onLogout={() => onAuthChange(userName, AuthState.Unauthenticated)} />
            </div>
          </div>
        )}

        {authState === AuthState.Unauthenticated && (
          <div className="p-3 my-2 w-70 d-flex justify-content-center">
            <div style={panelStyle} className="w-100 d-flex flex-column align-items-stretch">
              <Unauthenticated
                userName={userName}
                onLogin={(loginUserName) => {
                onAuthChange(loginUserName, AuthState.Authenticated);
              }}
              />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
