// Registracija.js
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import RegisterFooter from '../components/RegisterFooter';
import client from '../lib/AxiosConfig';

const Registracija = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Molimo unesite sve podatke');
    } else {
      setError('');
      console.log('Registracija podaci:', { username, password });
      try {
        const response = await client.post('/auth/register', JSON.stringify({ username, password }))
        // fetch('/api/auth/register', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify({ username, password }),
        // });
  
        const data = response.data;
        console.log(response)
        if (response.status == 200) {
          console.log("uspjesna prijava");
          console.log(data)
          sessionStorage.setItem("user" , JSON.stringify(data))
          navigate("/main")
        } else {
          setError(data.message || 'Invalid username or password.');
        }
      } catch (err) {
        setError('An error occurred during login.');
        console.error('Error:', err);
      }
    }

  };

  useEffect(() => {
    const token = localStorage.getItem('authToken'); // Dobijamo token iz sessionStorage
    if (token) {
      navigate("/main");
      return;
    }
  }, [navigate]);

  return (
    <div className="max-w-sm mx-auto mt-16 p-8 border rounded-3xl shadow-lg">
      <h2 className="text-2xl text-center mb-4">Registracija</h2>
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}
      <Input label="username" type="text" labelClassName="block text-sm font-medium text-gray-700" inputClassName="w-full p-2 mt-2 border rounded-md" stateSetter={setUsername}/>
      <Input label="password" type="password" labelClassName="block text-sm font-medium text-gray-700" inputClassName="w-full p-2 mt-2 border rounded-md" stateSetter={setPassword}/>
      <button onClick={handleSubmit} className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-700">
        Registriraj se
      </button>
      <RegisterFooter />
    </div>
  );
};

export default Registracija;
