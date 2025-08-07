import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const UserLayout = () => {
  return (
    <div>
      <nav style={{ padding: '1rem', background: '#f0f0f0', borderBottom: '1px solid #ccc' }}>
        <Link
          to="/"
          style={{ marginRight: '1rem' }}
        >
          Home
        </Link>
        <Link to="/login">Login</Link>
      </nav>
      <main style={{ padding: '1rem' }}>
        {/* Halaman user akan dirender di sini */}
        <Outlet />
      </main>
    </div>
  );
};

export default UserLayout;
