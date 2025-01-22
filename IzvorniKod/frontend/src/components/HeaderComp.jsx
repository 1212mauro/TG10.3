import React, { useContext } from 'react';
import { UserContext } from '../pages/MainPage';
import { useNavigate, useLocation } from 'react-router-dom';

function HeaderComp({ username, openBoardID, setOpenBoardID, onLogout, adminPage = "false" }) {
  const user = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation(); // Dohvaćanje trenutne rute

  const loadBackToBoard = openBoardID && user.role === 'ADMIN';

  const handleManageWebsite = () => {
    navigate("/admin");
  };

  function HandleCloseBoard() {
    setOpenBoardID(null);
  }

  const handleBackToMain = () => {
    navigate("/"); // Preusmjeravanje na glavnu stranicu
  };

  let role = 'ADMIN';

  return (
    <header className="bg-green-500 text-white p-6 text-center">
      <div className="flex flex-col items-center gap-3 relative">
        <button
          onClick={onLogout}
          className="absolute top-4 left-4 bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded-lg"
        >
          Logout
        </button>

        {/* Conditional rendering for the header title */}
        <h1 className="text-xl font-bold mb-4">
          {adminPage === "true" ? "AdminPage" : "StanBlog"}
        </h1>

        {username ? (
          <>
            <h1 className="text-xl font-bold">{adminPage === "true" ? "" : "Welcome,"} {username}</h1>
            {openBoardID && (
              <button
                onClick={HandleCloseBoard}
                className="absolute top-4 right-4 bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded-lg"
              >
                Back to board select
              </button>
            )}
            {!openBoardID && role === 'ADMIN' && location.pathname !== "/admin" && (
              <button
                onClick={handleManageWebsite}
                className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-lg mt-4"
              >
                Manage Website
              </button>
            )}
          </>
        ) : (
          <h1>Logged in as guest</h1>
        )}

        {/* Conditional rendering for the "Back to Main" button */}
        {adminPage === "true" && (
          <button
            onClick={handleBackToMain}
            className="absolute top-4 right-16 bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded-lg"
          >
            Back to Main
          </button>
        )}
      </div>
    </header>
  );
}

export default HeaderComp;
