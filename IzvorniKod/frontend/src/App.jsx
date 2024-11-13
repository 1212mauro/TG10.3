import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Registracija from './pages/Registracija';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registracija" element={<Registracija />} />
      </Routes>
    </Router>
  );
};

export default App;
