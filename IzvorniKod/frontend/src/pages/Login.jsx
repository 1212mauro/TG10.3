import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import LoginFooter from '../components/LoginFooter';
import client from '../lib/AxiosConfig';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook za navigaciju

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Resetuj prethodne greške

    try {
      const response = await client.post("/auth/login", JSON.stringify({ username, password }))
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ username, password }),
      // });
      let data = response.data
      if (response.status == 200) {
        console.log(data)
        // console.log(username)
        // Pohrani token u lokalnu pohranu
        sessionStorage.setItem("user" , JSON.stringify(data))
        // localStorage.setItem('authToken', data.token);
        console.log('Uspešna prijava:', data);
        
        // Preusmjeri na glavnu stranicu
        navigate('/main?token=tost');
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
      navigate("/main");
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
