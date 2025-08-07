import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { useParams, useNavigate } from 'react-router-dom';

const AdminUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    category_id: '',
    price: '',
    stock: '',
    description: ''
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        const product = res.data.data;

        setForm({
          name: product.name || '',
          category_id: product.category_id?.toString() || '',
          price: product.price || '',
          stock: product.stock || '',
          description: product.description || ''
        });
      } catch (error) {
        console.error('Gagal memuat data produk:', error);
        alert('Terjadi kesalahan saat mengambil data produk.');
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get('/categories');
        setCategories(res.data.data || []);
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
      await api.put(`/products/${id}`, {
        name,
        category_id: parseInt(category_id),
        price: parseInt(price),
        stock: parseInt(stock),
        description
      });

      alert('Produk berhasil diperbarui!');
      navigate('/admin/products');
    } catch (error) {
      console.error('Gagal mengupdate produk:', error);
      const message =
        error.response?.data?.errors
          ? Object.values(error.response.data.errors).flat().join('\n')
          : 'Terjadi kesalahan saat mengupdate produk.';
      alert(message);
    }
  };

  return (
    <div
      style={{
        maxWidth: '600px',
        margin: '0 auto',
        background: '#0f2c54',
        padding: '2rem',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
        color: 'white'
      }}
    >
      <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Edit Produk</h2>

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
          type="number"
          value={form.price}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          name="stock"
          placeholder="Stok"
          type="number"
          value={form.stock}
          onChange={handleChange}
          style={inputStyle}
        />

        <textarea
          name="description"
          placeholder="Deskripsi"
          value={form.description}
          onChange={handleChange}
          style={{ ...inputStyle, height: '100px', resize: 'vertical' }}
        />

        <button
          type="submit"
          style={{
            padding: '0.75rem',
            background: '#1a73e8',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Update
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

export default AdminUpdate;
