import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AdminList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:8000/api/products')
      .then(response => {
        const data = Array.isArray(response.data)
          ? response.data
          : response.data.data;

        setProducts(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Gagal fetch produk:', error);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Yakin ingin menghapus produk ini?")) {
      try {
        await axios.delete(`http://localhost:8000/api/products/${id}`);
        setProducts(products.filter(product => product.id !== id));
      } catch (error) {
        console.error('Gagal menghapus produk:', error);
      }
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Daftar Produk</h2>

      <Link to="/admin/create">
        <button>Tambah Produk</button>
      </Link>

      <ul>
        {Array.isArray(products) && products.map((product) => (
          <li key={product.id}>
            <strong>{product.name}</strong> - Rp{product.price}<br />
            <small>{product.description}</small><br />

            <Link to={`/admin/edit/${product.id}`}>
              <button>Edit</button>
            </Link>

            <button onClick={() => handleDelete(product.id)}>Hapus</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminList;
