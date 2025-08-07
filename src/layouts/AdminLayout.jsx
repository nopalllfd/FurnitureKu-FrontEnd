import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminLayout = () => {
  const { logout } = useAuth();
  return (
    <div style={{ display: 'flex' }}>
      <aside style={{ width: '200px', background: '#333', color: 'white', minHeight: '100vh', padding: '1rem' }}>
        <h3>Admin Panel</h3>
        <nav style={{ display: 'flex', flexDirection: 'column' }}>
          <Link
            to="/admin/dashboard"
            style={{ color: 'white', marginBottom: '0.5rem' }}
          >
            Dashboard
          </Link>
          <Link
            to="/admin/products"
            style={{ color: 'white', marginBottom: '0.5rem' }}
          >
            Manage Products
          </Link>
          <button
            onClick={logout}
            style={{ marginTop: '2rem' }}
          >
            Logout
          </button>
        </nav>
      </aside>
      <main style={{ flex: 1, padding: '1rem' }}>
        {/* Halaman admin akan dirender di sini */}
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
