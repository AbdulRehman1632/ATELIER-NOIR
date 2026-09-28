import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [adminUser, setAdminUser] = useState(() => {
    try {
      const saved = localStorage.getItem('atelier_admin_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => localStorage.getItem('atelier_admin_token') || null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token && adminUser) {
      localStorage.setItem('atelier_admin_token', token);
      localStorage.setItem('atelier_admin_user', JSON.stringify(adminUser));
    } else {
      localStorage.removeItem('atelier_admin_token');
      localStorage.removeItem('atelier_admin_user');
    }
  }, [token, adminUser]);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Invalid credentials');
      }

      setAdminUser(data.data);
      setToken(data.data.token);
      return data.data;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setAdminUser(null);
    setToken(null);
    localStorage.removeItem('atelier_admin_token');
    localStorage.removeItem('atelier_admin_user');
  };

  return (
    <AuthContext.Provider
      value={{
        adminUser,
        token,
        isAuthenticated: !!token,
        login,
        logout,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
