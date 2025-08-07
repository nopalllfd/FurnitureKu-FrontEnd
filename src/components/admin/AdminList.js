import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';

const AdminList = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const res = await api.get('/products');
    setProducts(res.data);
  };

  const handleDelete = async (id) => {
    await api.delete(`/products/${id}`);
    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h2>Daftar Produk</h2>
      <Link to="/admin/products/create">Tambah Produk</Link>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.nama} - Rp {product.harga}
            <Link to={`/admin/products/edit/${product.id}`}>Edit</Link>
            <button onClick={() => handleDelete(product.id)}>Hapus</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminList;
