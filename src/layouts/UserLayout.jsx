import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const UserLayout = () => {
  return (
    <div
      className="min-vh-100 d-flex flex-column"
      style={{ backgroundColor: '#1C1C1C', color: '#FFFFFF' }}
    >
      {/* Navbar */}
      <nav
        className="py-3 px-4 d-flex justify-content-between align-items-center border-bottom"
        style={{
          backgroundColor: '#333333',
          borderBottom: '2px solid #F2C94C',
        }}
      >
        <h4 style={{ color: '#F2C94C', margin: 0 }}>FUFU</h4>
        <div>
          <Link
            to="/"
            className="me-4"
            style={{ color: '#FFFFFF', textDecoration: 'none' }}
          >
            Home
          </Link>
          <Link
            to="/login"
            style={{ color: '#FFFFFF', textDecoration: 'none' }}
          >
            Login
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer
        className="text-center py-3 border-top"
        style={{
          backgroundColor: '#333333',
          borderTop: '2px solid #F2C94C',
        }}
      >
        <small style={{ color: '#AAAAAA' }}>© {new Date().getFullYear()} Futuristore. All rights reserved.</small>
      </footer>
    </div>
  );
};

export default UserLayout;
