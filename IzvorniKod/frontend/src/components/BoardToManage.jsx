import React, { useState } from 'react'
import Modal from './Modal'
import BoardManageForm from './BoardManageForm'

function BoardToManage({ board, updateBoard }) {

    const [isBeingManaged, setIsBeingManaged] = useState(false)

    function handleBoardUpdate(board){
        updateBoard(board)
        setIsBeingManaged(false)
    }

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

            {isBeingManaged && 
                <Modal title={`edit board for address ${board.address}`} onClose={() => setIsBeingManaged(false)}>
                    <BoardManageForm board={board} updateBoard={(board) => handleBoardUpdate(board)}/>
                </Modal>
            }
        </div>
    )
}

export default BoardToManage