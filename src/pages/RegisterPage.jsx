import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState('');

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await register({
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
      });
      navigate('/login', {
        state: { message: 'Registrasi berhasil! Silakan login.' },
      });
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Registrasi gagal. Pastikan data valid.';
      setError(errorMessage);
    }
  };

  return (
    <div className="container-fluid bg-dark text-white min-vh-100 d-flex justify-content-center align-items-center">
      <div
        className="card shadow border border-warning bg-secondary"
        style={{ width: '100%', maxWidth: '420px' }}
      >
        <div className="card-body p-4">
          <h3 className="text-center text-warning mb-2">Daftar Akun FUFU</h3>
          <p className="text-center text-light mb-4">Isi data dengan lengkap</p>

          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleRegister}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control bg-dark text-white border-warning"
                placeholder="Nama Lengkap"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

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

            <div className="mb-4">
              <input
                type="password"
                className="form-control bg-dark text-white border-warning"
                placeholder="Konfirmasi Password"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-warning w-100 text-dark fw-bold"
            >
              Daftar
            </button>
          </form>

          <p className="text-center mt-3 text-white">
            Sudah punya akun?{' '}
            <Link
              to="/login"
              className="text-warning text-decoration-none"
            >
              Login di sini
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
