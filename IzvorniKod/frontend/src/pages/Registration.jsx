import React, { useState } from 'react';
import LoginInput from '../components/LoginInput';
import RegisterFooter from '../components/RegisterFooter';

function Registration(){
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Molimo unesite sve podatke');
    } else {
      setError('');
      console.log('Registracija podaci:', { username, password });
      try {
        const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          console.log("uspjesna prijava");
        } else {
          setError(data.message || 'Invalid username or password.');
        }
      } catch (err) {
        setError('An error occurred during login.');
        console.error('Error:', err);
      }
    }

  };

  return (
    <div className="max-w-sm mx-auto mt-16 p-8 border rounded-3xl shadow-lg">
      <h2 className="text-2xl text-center mb-4">Registracija</h2>
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}
      <LoginInput label="username" type="text" labelClassName="block text-sm font-medium text-gray-700" inputClassName="w-full p-2 mt-2 border rounded-md" stateSetter={setUsername}/>
      <LoginInput label="password" type="password" labelClassName="block text-sm font-medium text-gray-700" inputClassName="w-full p-2 mt-2 border rounded-md" stateSetter={setPassword}/>
      <button onClick={handleSubmit} className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-700">
        Registriraj se
      </button>
      <RegisterFooter />
    </div>
  );
};

export default Registration;
