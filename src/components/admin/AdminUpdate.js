import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { useParams, useNavigate } from 'react-router-dom';

const AdminUpdate = () => {
  const { id } = useParams();
  const [form, setForm] = useState({
    name: '',
    category_id: '',
    price: '',
    stock: '',
    description: ''
  });

  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();

  // Ambil data produk berdasarkan ID
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        setForm({
          name: res.data.data.name || '',
          category_id: res.data.data.category_id?.toString() || '',
          price: res.data.data.price || '',
          stock: res.data.data.stock || '',
          description: res.data.data.description || ''
        });
      } catch (error) {
        console.error('Gagal memuat data produk:', error);
        alert('Terjadi kesalahan saat mengambil data produk.');
      }
    };

    fetchData();
  }, [id]);

  // Ambil data kategori untuk pilihan dropdown
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get('/categories');
        setCategories(res.data); // Pastikan ini array
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

    if (!form.name || !form.category_id || !form.price || !form.stock || !form.description) {
      alert('Semua field harus diisi!');
      return;
    }

    try {
      await api.put(`/products/${id}`, {
        name: form.name,
        category_id: parseInt(form.category_id),
        price: parseInt(form.price),
        stock: parseInt(form.stock),
        description: form.description
      });

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
    <form onSubmit={handleSubmit}>
      <h2>Edit Produk</h2>

      <input
        name="name"
        placeholder="Nama Produk"
        value={form.name}
        onChange={handleChange}
      />

      <select
        name="category_id"
        value={form.category_id}
        onChange={handleChange}
      >
        <option value="">Pilih Kategori</option>
        {Array.isArray(categories) &&
          categories.map((cat) => (
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
      />

      <input
        name="stock"
        placeholder="Stok"
        value={form.stock}
        onChange={handleChange}
      />

      <textarea
        name="description"
        placeholder="Deskripsi"
        value={form.description}
        onChange={handleChange}
      />

      <button type="submit">Update</button>
    </form>
  );
};

export default AdminUpdate;
