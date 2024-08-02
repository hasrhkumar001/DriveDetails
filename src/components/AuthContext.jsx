import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const user = JSON.parse(localStorage.getItem('user'));
    setAuthToken(token);
    setUser(user);
  }, []);

  const login = (token, user) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(user));
    setAuthToken(token);
    setUser(user);
  };

  const logout = () => {
    localStorage.clear();
    setAuthToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ authToken, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
