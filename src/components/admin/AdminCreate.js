import React, { useState } from 'react';
import api from '../../services/api'; // Pastikan path ini sesuai dengan struktur proyekmu
import { useNavigate } from 'react-router-dom';

const AdminCreate = () => {
  const [form, setForm] = useState({ nama: '', harga: '', stok: '', deskripsi: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post('/products', form);
    navigate('/admin/products');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Tambah Produk</h2>
      <input name="nama" placeholder="Nama Produk" onChange={handleChange} />
      <input name="harga" placeholder="Harga" onChange={handleChange} />
      <input name="stok" placeholder="Stok" onChange={handleChange} />
      <textarea name="deskripsi" placeholder="Deskripsi" onChange={handleChange} />
      <button type="submit">Simpan</button>
    </form>
  );
};

export default AdminCreate;
