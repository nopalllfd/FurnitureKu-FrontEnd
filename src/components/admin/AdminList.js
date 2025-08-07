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

  if (loading) return <p style={{ color: 'white' }}>Loading...</p>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <Link to="/admin/create">
          <button style={{
            backgroundColor: '#0f2c54',
            color: 'white',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            cursor: 'pointer',
            boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
          }}>
            Tambah Produk
          </button>
        </Link>
      </div>

      <div style={{ display: 'grid', gap: '1rem' }}>
        {Array.isArray(products) && products.map((product) => (
          <div
            key={product.id}
            style={{
              background: '#0f2c54',
              padding: '1rem',
              borderRadius: '10px',
              color: 'white',
              boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
            }}
          >
            <h3 style={{ marginBottom: '0.5rem' }}>{product.name}</h3>
            <p style={{ marginBottom: '0.3rem' }}>Rp{product.price.toLocaleString('id-ID')}</p>
            <p style={{ marginBottom: '1rem', fontSize: '0.9rem' }}>{product.description}</p>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <Link to={`/admin/edit/${product.id}`}>
                <button style={{
                  backgroundColor: '#1a73e8',
                  color: 'white',
                  border: 'none',
                  padding: '0.4rem 0.8rem',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}>
                  Edit
                </button>
              </Link>

              <button
                onClick={() => handleDelete(product.id)}
                style={{
                  backgroundColor: '#e63946',
                  color: 'white',
                  border: 'none',
                  padding: '0.4rem 0.8rem',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminList;
