import React, { useContext } from 'react';
import { UserContext } from '../pages/MainPage';

function HeaderComp({ username, openBoardID, setOpenBoardID, onLogout }) {

  const user = useContext(UserContext)

  const loadBackToBoard = openBoardID && user.role === 'ADMIN'

  function HandleCloseBoard(){
    setOpenBoardID(null)
  }

  return (
    <header className="bg-green-500 text-white p-6 text-center">
      <div className="flex flex-col items-center gap-3">
      <h1 className="text-xl font-bold mb-4">StanBlog</h1>
        {username ? (
          <>
            <h1 className="text-xl font-bold">Welcome, {username}</h1>
            {loadBackToBoard &&
            <button onClick={HandleCloseBoard} className="absolute top-4 right-4 bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded-lg">
              Back to board select
            </button>}
            <button onClick={onLogout} className="absolute top-4 left-4 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg">
              Logout
            </button>
          </>
        ) : (
          <h1>Logged in as guest</h1>
        )}
      </div>
    </header>
  );
}

export default HeaderComp;
