import React, { useState } from 'react'
import Modal from './Modal'
import UserManageForm from './UserManageForm'

function UserToManage({ user, updateUser, disabled }) {

    const [isBeingManaged, setIsBeingManaged] = useState(false)

    function handleUserUpdate(user){
        updateUser(user)
        setIsBeingManaged(false)
    }
    
    return (
        <div
            key={user.userId}
            className="bg-gray-200 p-4 border border-gray-300 w-full text-center rounded-lg"
            >
            <p className="font-bold">{user.username}</p>
            <p>{user.role}</p>
            <button
                disabled={disabled}
                onClick={() => setIsBeingManaged(true)}
                className={`mt-4 py-2 px-4 bg-${disabled ? "gray" : "blue"}-500 hover:bg-${disabled ? "gray" : "blue"}-700 text-white rounded-lg`}
                // className={`ml-4 mt-4 bg-${!manageBoards ? "blue" : "gray"}-500 ${!manageBoards ? "hover:bg-blue-700" : ""} text-white py-4 px-4 rounded-lg`}
            >
                Manage User
            </button>

            {isBeingManaged && 
                <Modal title={`edit role for user ${user.username}`} onClose={() => setIsBeingManaged(false)}>
                    <UserManageForm user={user} updateUser={(user) => handleUserUpdate(user)}/>
                </Modal>
            }
        </div>
    )
}

export default UserToManage