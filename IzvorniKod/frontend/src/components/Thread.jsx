import React, { useContext, useEffect, useState } from "react";
import ThreadDetails from "./ThreadDetails";
import AddUserToThreadForm from "./AddUserToThreadForm";


function Thread({ thread, disabled, handleDelete }){
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isAddingUser, setIsAddingUser] = useState(false)
  const [user, setUser] = useState(() => {
          const storedUser = sessionStorage.getItem("user");
          return storedUser ? JSON.parse(storedUser) : undefined;
  });

  async function handleCreateMeeting(thread){

  }

  return (
    <div className="p-4 pb-2 bg-white shadow-md rounded-lg mb-4 border border-gray-200 relative">
      <span
        className={`absolute top-2 right-2 text-sm font-semibold px-2 py-1 rounded-full ${
          thread.public
            ? "bg-green-200 text-green-800"
            : "bg-red-200 text-red-800"
        }`}
      >
        {thread.public ? "Public" : "Private"}
      </span>
      <h2 className="text-xl font-semibold text-gray-800 bg-gray-200 p-2 rounded-lg inline-block mb-4">
        {thread.title}
      </h2>

      <div className="reltive flex flex-row w-full">
        <button disabled={disabled} onClick={() => setIsModalOpen(true)} className="text-blue-500 text-sm">
          Read More
        </button>
        {user && (thread.initiator.userId == user.userId || (user.role === 'ADMIN' || user.role === 'SUPERADMIN')) && !thread.public && <button onClick={() => setIsAddingUser(true)} className="text-blue-500 text-sm ml-6">
          Add user to thread
        </button>}
        {user && (thread.initiator.userId == user.userId || (user.role === 'ADMIN' || user.role === 'SUPERADMIN')) && <button onClick={handleDelete} className="bg-red-500 text-white py-1 px-2 rounded-lg text-sm hover:bg-red-700 absolute bottom-2 right-4">
          Delete thread
        </button>}
        <p className="text-gray-500 text-sm absolute bottom-10 right-4">
          Initiator: {thread.initiator.username}
        </p>
      </div>
      
      {isAddingUser && (
        <AddUserToThreadForm thread={thread} onClose={() => setIsAddingUser(false)} />
      )}

      {isModalOpen && (
        <ThreadDetails thread={thread} onClose={() => setIsModalOpen(false)} />
      )}
      
    </div>
  );
};

export default Thread;