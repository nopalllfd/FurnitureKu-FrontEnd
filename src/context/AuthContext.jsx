import React, { createContext, useState, useContext } from 'react';
import apiClient from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ isAuthenticated: false, user: null });

  // Fungsi login yang memanggil API
  const login = async (credentials) => {
    // Hapus token lama jika ada
    localStorage.removeItem('authToken');

    // Panggil API login
    const response = await apiClient.post('/login', credentials); // Asumsi endpoint login adalah /login

    // Asumsi response API berisi token dan data user
    // e.g., { token: "xxx", user: { id: 1, name: "Admin", role: "admin" } }
    const { token, user } = response.data;

    // Simpan token ke localStorage
    localStorage.setItem('authToken', token);

    // Update state auth di React
    setAuth({ isAuthenticated: true, user: user });

    // Kembalikan data user agar LoginPage bisa melakukan redirect
    return user;
  };

  // Fungsi register baru
  const register = async (userData) => {
    // Panggil API register Anda
    await apiClient.post('/register', userData);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setAuth({ isAuthenticated: false, user: null });
  };

  return <AuthContext.Provider value={{ auth, login, register, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
