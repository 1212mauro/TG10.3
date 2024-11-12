// Login.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Resetuj prethodne greške

    try {
      const response = await fetch(' http://projectbajeet.work.gd/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json(); // Pretpostavljamo da je odgovor JSON

      if (response.ok) {
        // Ako je odgovor uspešan, postavite korisničke podatke
        setUser(data);
        console.log('Uspešna prijava:', data);
      } else {
        // Ako postoji greška u prijavi, prikaži poruku greške
        setError(data.message || 'Neispravan username ili lozinka.');
      }
    } catch (err) {
      setError('Došlo je do greške prilikom prijave.');
      console.error('Greška:', err);
    }
  };
  return (
    <div className="max-w-sm mx-auto mt-16 p-8 border rounded-3xl shadow-lg">
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

      <div className="text-center mt-4">
        <p>Nemate račun?</p>
        <Link to="/registracija" className="text-blue-500 hover:underline">
          Registriraj se
        </Link>
      </div>
    </div>
  );
};

export default Login;
