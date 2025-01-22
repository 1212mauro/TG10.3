import React, { useState } from 'react'

function BoardToManage({ board }) {

    const [isBeingManaged, setIsBeingManaged] = useState(false)

    return (
        <div
            key={board.boardID}
            className="bg-gray-200 p-4 border border-gray-300 w-full text-center rounded-lg"
            >
            <p className="font-bold">{board.address}</p>
            <button
                onClick={() => setIsBeingManaged(true)}
                className="mt-4 py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white rounded-lg"
            >
                Manage Board
            </button>
        </div>
    )
}

export default BoardToManage