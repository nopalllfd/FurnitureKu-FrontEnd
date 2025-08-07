import React, { useEffect, useState } from 'react';
import api from '../../services/api'; 
import { useParams, useNavigate } from 'react-router-dom';

const AdminUpdate = () => {
  const { id } = useParams();
  const [form, setForm] = useState({ nama: '', harga: '', stok: '', deskripsi: '' });
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/products/${id}`).then((res) => setForm(res.data));
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.put(`/products/${id}`, form);
    navigate('/admin/products');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Produk</h2>
      <input name="nama" value={form.nama} onChange={handleChange} />
      <input name="harga" value={form.harga} onChange={handleChange} />
      <input name="stok" value={form.stok} onChange={handleChange} />
      <textarea name="deskripsi" value={form.deskripsi} onChange={handleChange} />
      <button type="submit">Update</button>
    </form>
  );
};

export default AdminUpdate;
