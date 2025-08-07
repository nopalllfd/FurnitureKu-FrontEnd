import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

// Layouts
import UserLayout from '../layouts/UserLayout';
import AdminLayout from '../layouts/AdminLayout';

// Pages
import HomePage from '../pages/user/HomePage'; // Ganti ProductList ke HomePage
import LoginPage from '../pages/LoginPage';
import Dashboard from '../pages/admin/Dashboard';
import RegisterPage from '../pages/RegisterPage';
import ManageProducts from '../pages/admin/ManageProducts';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rute untuk User / Publik */}
        <Route element={<UserLayout />}>
          <Route
            path="/"
            element={<HomePage />}
          />
          {/* <Route path="/product/:id" element={<ProductDetail />} /> */}
          <Route
            path="/login"
            element={<LoginPage />}
          />
        </Route>
        <Route
          path="/register"
          element={<RegisterPage />}
        />

        {/* Rute untuk Admin (dilindungi) */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route
            path="dashboard"
            element={<Dashboard />}
          />
          <Route
            path="products"
            element={<ManageProducts />}
          />
        </Route>

        {/* Rute jika halaman tidak ditemukan */}
        <Route
          path="*"
          element={
            <div>
              <h1>404 Not Found</h1>
              <a href="/">Go Home</a>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
