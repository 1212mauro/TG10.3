import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import MainPage from './pages/MainPage';
import Registration from './pages/Registration';

// Komponenta zaštićene rute
const ProtectedRoute = ({ element }) => {
  const authToken = localStorage.getItem('authToken');
  return authToken ? element : <Navigate to="/" />;
};

function App(){
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registracija" element={<Registration />} />
        <Route path="/mainPage" element={<MainPage/>} />
      </Routes>
    </Router>
  );
};

export default App;
