import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  // State khusus untuk form registrasi
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
      await register({ name, email, password, password_confirmation: passwordConfirmation });
      // Setelah sukses, redirect ke halaman login dengan pesan sukses
      navigate('/login', { state: { message: 'Registrasi berhasil! Silakan login.' } });
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Registrasi gagal. Pastikan data valid.';
      setError(errorMessage);
    }
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div
        className="card shadow-sm"
        style={{ width: '100%', maxWidth: '420px' }}
      >
        <div className="card-body p-4">
          <h3 className="text-center mb-4">Register Akun Baru</h3>

          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleRegister}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Nama Lengkap"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
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
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Konfirmasi Password"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100"
            >
              Daftar
            </button>
          </form>

          <p className="text-center mt-3">
            Sudah punya akun? <Link to="/login">Login di sini</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
