import React from 'react';
import { Outlet, Link } from 'react-router-dom';
// import { AdminCreate} from '../components/admin/AdminCreate';
// import { AdminUpdate } from '../components/admin/AdminUpdate';
import AdminList from '../../components/admin/AdminList';


const ManageProducts = () => (
  <div style={{ color: 'white' }}>
    <h2>Manage Furniture Products</h2>
    <AdminList />
  </div>
);

export default ManageProducts;