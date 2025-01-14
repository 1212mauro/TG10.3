import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Registration from './pages/Registration';
import MainPage from './pages/MainPage';
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
        <Route path="/main" element={<MainPage />} />
      </Routes>
    </Router>
  );
};

export default App;
