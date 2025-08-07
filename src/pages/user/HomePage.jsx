import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../../services/api';
import ProductCard from '../../components/user/ProductCard'; // Pastikan path ini benar

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get('/products?limit=8');
        setProducts(response.data.data || response.data);
      } catch (err) {
        console.error('Gagal memuat produk:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      {/* 1. Hero Section - Menggunakan komponen Jumbotron Bootstrap */}
      <div
        className="container-fluid bg-dark text-white p-5 text-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=2070')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <h1 className="display-4 fw-bold">Desain Furnitur Modern & Elegan</h1>
        <p className="lead my-3 col-md-8 mx-auto">Temukan koleksi terbaik untuk setiap sudut ruangan Anda, dirancang dengan kualitas dan estetika premium.</p>
        <Link
          to="/products"
          className="btn btn-primary btn-lg mt-3"
        >
          Lihat Semua Koleksi
        </Link>
      </div>
      [Image of stylish modern furniture collection]
      <div className="container my-5">
        {/* 2. Produk Unggulan Section */}
        <section className="text-center mb-5">
          <h2 className="mb-4 fw-bold">Produk Unggulan</h2>
          <p className="text-muted mb-5">Pilihan favorit pelanggan yang menggabungkan fungsi dan gaya.</p>
          {loading ? (
            <div className="d-flex justify-content-center">
              <div
                className="spinner-border"
                style={{ width: '3rem', height: '3rem' }}
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <div className="row">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="col-lg-3 col-md-4 col-sm-6 mb-4"
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}
        </section>

        {/* 3. Kategori Section */}
        <section className="text-center pt-5 bg-light rounded-3">
          <div className="container">
            <h2 className="mb-4 fw-bold">Jelajahi Kategori</h2>
            <div className="row">
              <div className="col-md-4 mb-4">
                <Link
                  to="/category/ruang-tamu"
                  className="card h-100 shadow-sm text-decoration-none text-dark border-0"
                >
                  <div className="card-body p-4">
                    <div className="mb-3">
                      <i className="fas fa-couch fa-3x text-primary"></i>
                    </div>
                    <h5 className="card-title">Ruang Tamu</h5>
                  </div>
                </Link>
              </div>
              <div className="col-md-4 mb-4">
                <Link
                  to="/category/kamar-tidur"
                  className="card h-100 shadow-sm text-decoration-none text-dark border-0"
                >
                  <div className="card-body p-4">
                    <div className="mb-3">
                      <i className="fas fa-bed fa-3x text-primary"></i>
                    </div>
                    <h5 className="card-title">Kamar Tidur</h5>
                  </div>
                </Link>
              </div>
              <div className="col-md-4 mb-4">
                <Link
                  to="/category/ruang-kerja"
                  className="card h-100 shadow-sm text-decoration-none text-dark border-0"
                >
                  <div className="card-body p-4">
                    <div className="mb-3">
                      <i className="fas fa-briefcase fa-3x text-primary"></i>
                    </div>
                    <h5 className="card-title">Ruang Kerja</h5>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
