import React, { useEffect } from 'react';
import api from '../api';
import { useParams, useNavigate } from 'react-router-dom';

const AdminDelete = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const confirmDelete = async () => {
      if (window.confirm('Yakin ingin menghapus produk ini?')) {
        await api.delete(`/products/${id}`);
        navigate('/admin/products');
      } else {
        navigate('/admin/products');
      }
    };

    confirmDelete();
  }, [id, navigate]);

  return <p>Menghapus produk...</p>;
};

export default AdminDelete;
