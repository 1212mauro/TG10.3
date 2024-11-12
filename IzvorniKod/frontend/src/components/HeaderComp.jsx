import React from 'react';

function HeaderComp({ username, onLogout }) {
  return (
    <header className="flex flex-col justify-between items-center p-4 bg-gray-800 text-white rounded-xl" >
      
      <div className="flex flex-col items-center gap-3">
        {username ? (
          <>
            <span>Pozdrav, {username}!</span>
            <button 
              onClick={onLogout} 
              className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white font-semibold rounded"
            >
              Odjava
            </button>
          </>
        ) : (
          <span>Gost</span>
        )}
      </div>
    </header>
  );
}

export default HeaderComp;
