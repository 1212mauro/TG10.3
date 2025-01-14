import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import LoginFooter from '../components/LoginFooter';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate(); // Navigation Hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset prior errors
  
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store token in localstorage
        localStorage.setItem('authToken', data.token);
        console.log('Uspješna prijava:', data);
        
        // Reroute to mainPage
        navigate('/mainPage');
      } else {
        setError(data.message || 'Invalid username or password.');
      }
    } catch (err) {
      setError('An error occurred during login.');
      console.error('Error:', err);
    }
  };

  const redirectToOAuth = (url) => {
    window.location.href = url;
  };

  useEffect(() => {
    const token = localStorage.getItem('authToken'); // Dobijamo token iz sessionStorage
    if (token) {
      navigate("/mainPage");
      return;
    }
  }, [navigate]);
  
  return (
    <div className="max-w-sm mx-auto mt-16 p-8 border rounded-3xl shadow-lg">
      <h2 className="text-2xl text-center mb-4">Login</h2>
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}
      <Input label="username" type="text" labelClassName="block text-sm font-medium text-gray-700" inputClassName="w-full p-2 mt-2 border rounded-md" stateSetter={setUsername}/>
      <Input label="password" type="password" labelClassName="block text-sm font-medium text-gray-700" inputClassName="w-full p-2 mt-2 border rounded-md" stateSetter={setPassword}/>
      <button onClick={handleSubmit} className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-700">Prijavi se</button>
      <LoginFooter/>
    </div>
  );
};

export default Login;
