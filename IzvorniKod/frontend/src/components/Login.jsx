// Login.js
import React, { useState } from 'react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Trenutno nema autentifikacije, ali ovdje možete dodati logiku za autentifikaciju kasnije
    if (!username || !password) {
      setError('Molimo unesite korisničko ime i lozinku');
    } else {
      setError('');
      console.log('Podaci:', { username, password });
      // Ovdje bi bila logika za autentifikaciju
    }
  };

  return (
    <div className="max-w-sm mx-auto p-8 border rounded-3xl shadow-lg">
      <h2 className="text-2xl text-center mb-4">Prijava</h2>
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">Korisničko ime</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 mt-2 border rounded-md"
            placeholder="Unesite korisničko ime"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Lozinka</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mt-2 border rounded-md"
            placeholder="Unesite lozinku"
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md">
          Prijavi se
        </button>
      </form>
    </div>
  );
};

export default Login;
