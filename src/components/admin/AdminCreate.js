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
        console.log('Kategori hasil API:', res.data); // 🐞 Debug
        // Gunakan res.data.data jika perlu (misal response-nya ada di dalam `data`)
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
    <form onSubmit={handleSubmit}>
      <h2>Tambah Produk</h2>

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
      />

      <input
        name="stock"
        placeholder="Stok"
        value={form.stock}
        onChange={handleChange}
        type="number"
      />

      <textarea
        name="description"
        placeholder="Deskripsi"
        value={form.description}
        onChange={handleChange}
      />

      <button type="submit">Simpan</button>
    </form>
  );
};

export default AdminCreate;
