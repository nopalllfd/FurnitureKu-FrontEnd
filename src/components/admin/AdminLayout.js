import React, { useEffect, useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

const AdminLayout = () => {
  const { logout } = useAuth();
  const location = useLocation();
  const isDashboard = location.pathname === '/admin/dashboard';

  const [stats, setStats] = useState([
    { label: 'Total Products', value: '-' },
    { label: 'Total Transaction', value: '-' },
    { label: 'Total Income', value: '-' },
  ]);

  useEffect(() => {
    if (isDashboard) {
      const token = localStorage.getItem('token');

      axios
        .get('http://localhost:8000/api/admin/summary', {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        })
        .then((response) => {
          const { total_products, total_transaction, total_income } = response.data;

          setStats([
            { label: 'Total Products', value: total_products },
            { label: 'Total Transaction', value: total_transaction },
            { label: 'Total Income', value: `Rp${Number(total_income).toLocaleString('id-ID')}` },
          ]);
        })
        .catch((error) => {
          console.error('Gagal fetch data dashboard:', error);
        });
    }
  }, [isDashboard]);

  return (
    <div style={{ display: 'flex' }}>

      {/* Main content */}
      <main
        style={{
          flex: 1,
          padding: '2rem',
          background: '#1a3b6d',
          color: 'white',
        }}
      >
        {isDashboard ? (
          <>
            <h2 style={{ marginBottom: '2rem' }}>Admin Dashboard</h2>
            <div style={{ display: 'flex', gap: '2rem' }}>
              {stats.map((item, index) => (
                <div
                  key={index}
                  style={{
                    flex: 1,
                    background: '#0f2c54',
                    padding: '1.5rem',
                    borderRadius: '12px',
                    textAlign: 'center',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                  }}
                >
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>{item.label}</h3>
                  <p style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>{item.value}</p>
                </div>
              ))}
            </div>
          </>
        ) : (
          <Outlet />
        )}
      </main>
    </div>
  );
};

export default AdminLayout;
