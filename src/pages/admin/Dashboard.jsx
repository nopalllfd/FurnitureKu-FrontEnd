import React from 'react';
import  AdminLayout  from '../../components/admin/AdminLayout';

const Dashboard = () => {
  return (
    <AdminLayout>
      <h1 style={{ color: 'white' }}>Admin Dashboard</h1>
      <p style={{ color: 'white' }}>
        Selamat datang di panel admin Furniture Future.
      </p>
    </AdminLayout>
  );
};

export default Dashboard;