import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  // Pastikan nama properti (id, name, price, image_url) sesuai dengan API Anda
  const { id, name, price, image_url } = product;

  // Format harga ke dalam Rupiah
  const formattedPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price);

  return (
    // 'h-100' memastikan semua card dalam satu baris punya tinggi yang sama
    // 'shadow-sm' memberikan efek bayangan yang halus
    <div className="card h-100 shadow-sm border-0">
      {/* Menggunakan Bootstrap's aspect ratio untuk gambar yang konsisten */}
      <div className="ratio ratio-4x3">
        <img
          src={image_url || 'https://via.placeholder.com/400x300.png?text=No+Image'}
          className="card-img-top"
          alt={name}
          // 'object-fit: cover' mencegah gambar gepeng, ini adalah inline style
          // karena Bootstrap tidak punya kelas utilitas untuk ini.
          style={{ objectFit: 'cover' }}
        />
      </div>

      {/* 'd-flex flex-column' digunakan agar tombol bisa didorong ke bawah */}
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{name}</h5>

        {/* 'mt-auto' mendorong elemen ini dan setelahnya ke bagian bawah card */}
        <p className="card-text fw-bold text-primary mt-auto pt-2">{formattedPrice}</p>

        {/* 'stretched-link' membuat seluruh card bisa di-klik */}
        <Link
          to={`/product/${id}`}
          className="btn btn-outline-primary stretched-link"
        >
          Lihat Detail
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
