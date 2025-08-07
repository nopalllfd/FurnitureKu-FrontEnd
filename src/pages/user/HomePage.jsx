import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaCouch, FaBed, FaChair, FaThLarge, FaCube, FaTruck, FaShieldAlt, FaUndoAlt } from 'react-icons/fa';

const categoryIcons = [<FaCouch />, <FaBed />, <FaChair />, <FaThLarge />, <FaCube />];

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const reasons = [
    { icon: <FaTruck />, label: 'Fast Delivery' },
    { icon: <FaShieldAlt />, label: 'Secure Payment' },
    { icon: <FaUndoAlt />, label: 'Easy Return' },
  ];

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/categories');
      setCategories(response.data.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchProducts = async (categoryId = null) => {
    try {
      let url = 'http://localhost:8000/api/products';
      if (categoryId) {
        url += `?category_id=${categoryId}`;
      }
      const response = await axios.get(url);
      setProducts(response.data.data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategoryId(categoryId);
    fetchProducts(categoryId);
  };

  return (
    <div style={{ backgroundColor: '#0D0D0D', color: 'white', minHeight: '100vh' }}>
      {/* Hero Section */}
      <div className="container py-5 d-flex flex-column flex-lg-row align-items-center justify-content-between">
        <div className="mb-4 mb-lg-0">
          <h1
            className="fw-bold"
            style={{ color: '#FFD700' }}
          >
            Discover Futuristic Furniture
          </h1>
          <p className="lead">Explore elegant furniture for modern living space.</p>
          <div className="d-flex gap-3">
            <button
              className="btn"
              style={{ backgroundColor: '#FFD700', color: '#0D0D0D' }}
            >
              Shop Now
            </button>
            <button className="btn btn-outline-light">See Collections</button>
          </div>
        </div>
        <img
          src="https://i.pinimg.com/originals/91/73/04/91730454aff9775bfacb0442c4ca4bb5.jpg"
          alt="Hero"
          className="img-fluid rounded shadow"
          style={{ maxWidth: '400px' }}
        />
      </div>

      {/* Categories */}
      <div className="container py-4">
        <h4
          className="mb-3"
          style={{ color: '#FFD700' }}
        >
          Categories
        </h4>
        <div className="row">
          {categories.map((cat, i) => (
            <div
              key={cat.id}
              className="col-6 col-sm-4 col-md-3 col-lg-2 mb-3"
              onClick={() => handleCategoryClick(cat.id)}
            >
              <div
                className={`text-center py-3 rounded shadow-sm ${selectedCategoryId === cat.id ? 'bg-warning text-dark' : ''}`}
                style={{
                  backgroundColor: selectedCategoryId === cat.id ? '#FFD700' : '#1a1a1a',
                  color: selectedCategoryId === cat.id ? '#0D0D0D' : '#FFD700',
                  cursor: 'pointer',
                  transition: '0.3s',
                }}
              >
                <div className="fs-4">{categoryIcons[i % categoryIcons.length]}</div>
                <div>{cat.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div className="container py-4">
        <h4
          className="mb-3"
          style={{ color: '#FFD700' }}
        >
          Featured Products
        </h4>
        <div className="row">
          {products.length === 0 ? (
            <div className="col-12">
              <p className="text-warning">No products found in this category.</p>
            </div>
          ) : (
            products.map((product, i) => (
              <div
                className="col-sm-6 col-md-4 col-lg-3 mb-4"
                key={i}
              >
                <div
                  className="card h-100 shadow-sm"
                  style={{ backgroundColor: '#1a1a1a', color: 'white' }}
                >
                  <img
                    src={`http://localhost:8000/storage/${product.image}`}
                    className="card-img-top"
                    alt={product.name}
                    style={{ height: '180px', objectFit: 'cover' }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{product.name}</h5>
                    <p
                      className="card-text"
                      style={{ color: '#FFD700' }}
                    >
                      Rp {product.price.toLocaleString()}
                    </p>
                    <button className="btn btn-outline-warning mt-auto">Add to Cart</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="container py-4">
        <h4
          className="mb-3"
          style={{ color: '#FFD700' }}
        >
          Why Choose Us
        </h4>
        <div className="row text-center">
          {reasons.map((reason, i) => (
            <div
              className="col-4"
              key={i}
            >
              <div
                className="fs-3"
                style={{ color: '#FFD700' }}
              >
                {reason.icon}
              </div>
              <p>{reason.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
