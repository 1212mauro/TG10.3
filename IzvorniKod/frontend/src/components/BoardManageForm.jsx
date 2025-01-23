import React, { useState } from "react";

function BoardManageForm({ board, onClose }) {
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [newAddress, setNewAddress] = useState(board.address);

  const handleSaveAddress = () => {
    // Save address logic
    setIsEditingAddress(false);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-1/2">
        <h2 className="text-2xl font-bold mb-4">Board Details</h2>

        <p><strong>Board ID:</strong> {board.boardID}</p>

        <div>
          <p><strong>Address:</strong> {board.address}</p>
          {!isEditingAddress && (
            <button onClick={() => setIsEditingAddress(true)} className="mt-2 bg-yellow-500 text-white p-1 rounded">
              Change Address
            </button>
          )}
        </div>

        {isEditingAddress && (
          <div className="mt-4">
            <input
              type="text"
              value={newAddress}
              onChange={(e) => setNewAddress(e.target.value)}
              className="border p-1"
            />
            <button onClick={handleSaveAddress} className="ml-2 bg-green-500 text-white p-1 rounded">
              Save
            </button>
            <button onClick={() => setIsEditingAddress(false)} className="ml-2 bg-red-500 text-white p-1 rounded">
              Close
            </button>
          </div>
        )}

        <div className="mt-4">
          <h3 className="text-xl font-semibold">Threads</h3>
          <div className="max-h-64 overflow-y-auto border p-2">
            {board.threads.map((thread) => (
              <div key={thread.threadID} className="border-b py-2">
                <p><strong>Title:</strong> {thread.title}</p>
                <p><strong>Description:</strong> {thread.description}</p>
              </div>
            ))}
          </div>
        </div>

        <button onClick={onClose} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
          Close
        </button>
        
      </div>
    </div>
  );
}

export default BoardManageForm;