import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function HeaderComp({ username, openBoardID, setOpenBoardID, onLogout }) {

  
  const navigate = useNavigate()
  const location = useLocation()
  const [user, setUser] = useState(() => {
    const storedUser = sessionStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : undefined;
  });
  const loadBackToBoard = ((openBoardID && (user.role === 'ADMIN' || user.role === 'SUPERADMIN')) || location.pathname === '/admin')

  function handleBackToMain(){
    setOpenBoardID(null)
    navigate("/main")
  }

  return (
    <header className="bg-green-500 text-white p-6 text-center">
      <div className="relative flex flex-col items-center gap-3">
      <h1 className="text-xl font-bold mb-4">StanBlog</h1>
        {username ? (
          <>
            <h1 className="text-xl font-bold">Welcome, {username.split("@")[0]}</h1>
            {loadBackToBoard &&
            <button onClick={handleBackToMain} className="absolute top-0 right-0 bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded-lg">
              Back to board select
            </button>}
            <button onClick={onLogout} className="absolute top-0 left-0 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg">
              Logout
            </button>
            {location.pathname !== "/admin" && (user.role === 'ADMIN' || user.role === 'SUPERADMIN') && (
              <button
                onClick={() => navigate("/admin")}
                className="absolute bottom-0 right-0 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
              >
                Manage Website
              </button>
            )}
          </>
        ) : (
          <h1>Logged in as guest</h1>
        )}
      </div>
    </header>
  );
}

export default HeaderComp;
