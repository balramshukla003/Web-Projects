import React, { createContext, useContext, useState } from 'react';
import AuthContext from './AuthContext';

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider(props) {
  const [authUser, setAuthUser] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  const authValue = {
    authUser,
    setAuthUser,
    userLoggedIn,
    setUserLoggedIn,
  };

  return (
    <AuthContext.Provider value={authValue}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default { AuthContext };
