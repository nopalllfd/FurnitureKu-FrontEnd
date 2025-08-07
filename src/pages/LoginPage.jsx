import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const LoginPage = () => {
  // State khusus untuk form login
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  // Cek apakah ada pesan sukses dari halaman registrasi
  useEffect(() => {
    if (location.state?.message) {
      setSuccessMessage(location.state.message);
      // Hapus state dari location agar tidak muncul lagi saat refresh
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const user = await login({ email, password });
      if (user.role === 'admin') {
        navigate('/admin/dashboard', { replace: true });
      } else {
        navigate(from, { replace: true });
      }
    } catch (err) {
      setError('Login gagal. Periksa kembali email dan password Anda.');
    }
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div
        className="card shadow-sm"
        style={{ width: '100%', maxWidth: '420px' }}
      >
        <div className="card-body p-4">
          <h3 className="text-center mb-4">Login</h3>

          {error && <div className="alert alert-danger">{error}</div>}
          {successMessage && <div className="alert alert-success">{successMessage}</div>}

          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100"
            >
              Masuk
            </button>
          </form>

          <p className="text-center mt-3">
            Belum punya akun? <Link to="/register">Daftar sekarang</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
