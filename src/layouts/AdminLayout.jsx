import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminLayout = () => {
  const { logout } = useAuth();

  return (
    <div style={{ display: 'flex' }}>
      <aside
        style={{
          width: '260px',
          background: '#0f2c54', // Navy gelap
          color: 'white',
          minHeight: '100vh',
          padding: '1.5rem',
        }}
      >
        <h3
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
            textAlign: 'center',
          }}
        >
          <img
            src="/logofufu.jpeg"
            alt="Logo"
            style={{ width: '50px', height: '50px', borderRadius: '8px' }}
          />
          Furniture Future
        </h3>

        <nav style={{ display: 'flex', flexDirection: 'column', marginTop: '2rem' }}>
          <Link
            to="/admin/dashboard"
            style={{
              color: 'white',
              marginBottom: '1rem',
              textDecoration: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              background: '#1a3b6d', // Highlight menu aktif
            }}
          >
            Dashboard
          </Link>
          <Link
            to="/admin/products"
            style={{
              color: 'white',
              marginBottom: '1rem',
              textDecoration: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              background: '#1a3b6d',
            }}
          >
            Manage Products
          </Link>
          <button
            onClick={logout}
            style={{
              marginTop: '2rem',
              padding: '0.5rem 1rem',
              background: '#ff8a3d', // Orange terang (aksen tombol)
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            Logout
          </button>
        </nav>
      </aside>

      <main
        style={{
          flex: 1,
          padding: '2rem',
          background: '#1a3b6d', // Background konten abu muda
          color: '#111', // Warna teks utama
        }}
      >
        {/* Halaman admin akan dirender di sini */}
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;