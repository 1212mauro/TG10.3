import React, { useState } from 'react'

function UserManageForm({ user, updateUser }) {
    
    const [activeUser, setUser] = useState(JSON.parse(sessionStorage.getItem("user")));
    const [newRole, setNewRole] = useState(user.role);

    const roles = activeUser.role == 'SUPERADMIN' ? ['ADMIN', 'REPRESENTATIVE', 'TENANT'] : ['REPRESENTATIVE', 'TENANT']
  
    function handleSubmit(){
        let updatedUser = user
        updatedUser.role = newRole
        updateUser(updatedUser)
    };
  
    return (
        <div className="max-w-lg mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Managing user: {user.username}</h1>
            <div className="mb-6">
                <label className="block text-lg font-medium mb-2">
                    Role:
                </label>
                <select onChange={(e) => setNewRole(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    {roles.map(role => role == newRole ? <option selected value={role}>{role}</option> : <option value={role}>{role}</option>)}
                </select>
            </div>    
            <div className="mb-4">
                <button onClick={handleSubmit} className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">
                    Submit
                </button>
            </div>  
            <div className="mt-4">
                <h2 className="font-semibold text-xl mb-2">Selected Information:</h2>
                <p className="mb-2">
                    <strong>Role:</strong> {newRole}
                </p>
            </div>
        </div>
    );
};


export default UserManageForm