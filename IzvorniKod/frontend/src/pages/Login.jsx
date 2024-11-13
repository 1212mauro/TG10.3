// Login.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaGoogle, FaGithub } from 'react-icons/fa';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset previous errors

    try {
      const response = await fetch('http://projectbajeet.work.gd/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json(); // Assuming the response is JSON

      if (response.ok) {
        // On successful login, set user data
        setUser(data);
        console.log('Successful login:', data);
      } else {
        // Display error message on login failure
        setError(data.message || 'Invalid username or password.');
      }
    } catch (err) {
      setError('An error occurred during login.');
      console.error('Error:', err);
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
        <div className="flex justify-center items-center space-x-4 mt-2">
          <button className="flex items-center bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
            <FaGoogle className="mr-2" />
            Google
          </button>
          <Link to="/registracija" className="text-blue-500 hover:underline">
            Registriraj se
          </Link>
          <button className="flex items-center bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-900">
            <FaGithub className="mr-2" />
            GitHub
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
