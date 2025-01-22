import React, { useState } from 'react'

function UserToManage({ user }) {

    const [isBeingManaged, setIsBeingManaged] = useState(false)

    return (
        <div
            key={user.userId}
            className="bg-gray-200 p-4 border border-gray-300 w-full text-center rounded-lg"
            >
            <p className="font-bold">{user.username}</p>
            <p>{user.role}</p>
            <button
                onClick={() => setIsBeingManaged(true)}
                className="mt-4 py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white rounded-lg"
            >
                Manage Users
            </button>
        </div>
    )
}

export default UserToManage