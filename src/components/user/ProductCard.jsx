// src/components/user/ProductCard.jsx
import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="card h-100">
      <img
        src={product.image}
        className="card-img-top"
        alt={product.name}
        style={{ height: '200px', objectFit: 'cover' }}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">{product.description}</p>
        <div className="mt-auto">
          <strong>Rp {product.price}</strong>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
