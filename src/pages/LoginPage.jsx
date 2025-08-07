import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  useEffect(() => {
    if (location.state?.message) {
      setSuccessMessage(location.state.message);
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
    <div className="container-fluid bg-dark text-white min-vh-100 d-flex justify-content-center align-items-center">
      <div
        className="card shadow border border-warning bg-secondary"
        style={{ width: '100%', maxWidth: '420px' }}
      >
        <div className="card-body p-4">
          <h3 className="text-center text-warning mb-4">Login ke FUFU</h3>

          {error && <div className="alert alert-danger">{error}</div>}
          {successMessage && <div className="alert alert-success">{successMessage}</div>}

          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <input
                type="email"
                className="form-control bg-dark text-white border-warning"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control bg-dark text-white border-warning"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-warning w-100 text-dark fw-bold"
            >
              Masuk
            </button>
          </form>

          <p className="text-center mt-3 text-white">
            Belum punya akun?{' '}
            <Link
              to="/register"
              className="text-warning text-decoration-none"
            >
              Daftar sekarang
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
