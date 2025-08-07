import React, { useEffect } from 'react';
import api from '../../services/api';
import { useParams, useNavigate } from 'react-router-dom';

const AdminDelete = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const confirmDelete = async () => {
      const confirmed = window.confirm('Yakin ingin menghapus produk ini?');

      // Jika user batal, langsung navigasi balik
      if (!confirmed) {
        navigate('/admin/products');
        return;
      }

      try {
        console.log("🔄 Mengirim request DELETE ke ID:", id);
        const response = await api.delete(`/products/${id}`);
        console.log("✅ Response dari server:", response.data);
        alert('✅ Produk berhasil dihapus.');
      } catch (error) {
        console.error('❌ Gagal menghapus produk:', error);

        // Cek error dari response server
        const message =
          error?.response?.data?.message ||
          'Terjadi kesalahan saat menghapus produk.';
        alert(`⚠️ ${message}`);
      } finally {
        navigate('/admin/products');
      }
    };

    // Panggil fungsi hapus saat komponen dimount
    confirmDelete();
  }, [id, navigate]);

  return <p>Menghapus produk...</p>;
};

export default AdminDelete;
