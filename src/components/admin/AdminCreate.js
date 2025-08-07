import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';

const AdminCreate = () => {
  const [form, setForm] = useState({
    name: '',
    category_id: '',
    price: '',
    stock: '',
    description: ''
  });

  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get('/categories');
        const data = Array.isArray(res.data) ? res.data : res.data.data;
        setCategories(data);
      } catch (error) {
        console.error('Gagal memuat kategori:', error);
        alert('Gagal memuat daftar kategori.');
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, category_id, price, stock, description } = form;

    if (!name || !category_id || !price || !stock || !description) {
      alert('Semua field harus diisi!');
      return;
    }

    try {
      await api.post('/products', {
        name,
        category_id: Number(category_id),
        price: Number(price),
        stock: Number(stock),
        description
      });

      navigate('/admin/products');
    } catch (error) {
      console.error('Gagal tambah produk:', error);
      const message =
        error.response?.data?.errors
          ? Object.values(error.response.data.errors).flat().join('\n')
          : 'Terjadi kesalahan saat menambahkan produk.';
      alert(message);
    }
  };

  return (
    <div
      style={{
        background: '#0f2c54',
        padding: '2rem',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
        color: 'white',
        maxWidth: '600px',
        margin: '0 auto'
      }}
    >
      <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Tambah Produk</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input
          name="name"
          placeholder="Nama Produk"
          value={form.name}
          onChange={handleChange}
          style={inputStyle}
        />

        <select
          name="category_id"
          value={form.category_id}
          onChange={handleChange}
          style={inputStyle}
        >
          <option value="">Pilih Kategori</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <input
          name="price"
          placeholder="Harga"
          value={form.price}
          onChange={handleChange}
          type="number"
          style={inputStyle}
        />

        <input
          name="stock"
          placeholder="Stok"
          value={form.stock}
          onChange={handleChange}
          type="number"
          style={inputStyle}
        />

        <textarea
          name="description"
          placeholder="Deskripsi"
          value={form.description}
          onChange={handleChange}
          rows={4}
          style={{ ...inputStyle, resize: 'vertical' }}
        />

        <button
          type="submit"
          style={{
            background: '#1a3b6d',
            color: 'white',
            padding: '0.75rem',
            borderRadius: '8px',
            border: 'none',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Simpan
        </button>
      </form>
    </div>
  );
};

const inputStyle = {
  padding: '0.75rem',
  borderRadius: '8px',
  border: '1px solid #ccc',
  fontSize: '1rem'
};

export default AdminCreate;
