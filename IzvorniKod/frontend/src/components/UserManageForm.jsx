import React, { useState } from "react";

function UserManageForm({ user, onClose }) {
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [isEditingRole, setIsEditingRole] = useState(false);
  const [newUsername, setNewUsername] = useState(user.username);
  const [newRole, setNewRole] = useState(user.role);

  const handleSaveUsername = () => {
    // Save username logic
    setIsEditingUsername(false);
  };

  const handleSaveRole = () => {
    // Save role logic
    setIsEditingRole(false);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg">
        
        <h2 className="text-xl font-bold mb-4">User Details</h2>

        <div>
          <p><strong>Username:</strong> {user.username}</p>
          {!isEditingUsername && (
            <button onClick={() => setIsEditingUsername(true)} className="mt-2 bg-yellow-500 text-white p-1 rounded">
              Change Username
            </button>
          )}
        </div>

        {isEditingUsername && (
          <div className="mt-4">
            <input
              type="text"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              className="border p-1"
            />
            <button onClick={handleSaveUsername} className="ml-2 bg-green-500 text-white p-1 rounded">
              Save
            </button>
            <button onClick={() => setIsEditingUsername(false)} className="ml-2 bg-red-500 text-white p-1 rounded">
              Close
            </button>
          </div>
        )}



        <div className="mt-4">
          <p><strong>Role:</strong> {user.role}</p>
          {!isEditingRole && (
            <button onClick={() => setIsEditingRole(true)} className="mt-2 bg-yellow-500 text-white p-1 rounded">
              Change Role
            </button>
          )}
        </div>

        {isEditingRole && (
          <div className="mt-4">
            <select value={newRole} onChange={(e) => setNewRole(e.target.value)} className="border p-1">
              <option value="ADMIN">ADMIN</option>
              <option value="TENANT">TENANT</option>
              <option value="REPRESENTATIVE">REPRESENTATIVE</option>
            </select>
            <button onClick={handleSaveRole} className="ml-2 bg-green-500 text-white p-1 rounded">
              Save
            </button>
            <button onClick={() => setIsEditingRole(false)} className="ml-2 bg-red-500 text-white p-1 rounded">
              Close
            </button>
          </div>
        )}

        <button onClick={onClose} className="mt-4 bg-blue-500 text-white p-2 rounded">Close</button>

      </div>
    </div>
  );
}

export default UserManageForm;