import React, { useEffect } from 'react'
import { useState } from 'react';
import AddBoardForm from './AddBoardForm';
import client from '../lib/AxiosConfig';

function BoardList({ setOpenBoard }) {

    const [boardList, setBoardList] = useState([]);
    const [isFormOpen, setIsFormOpen] = useState(false)

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        let boards = await client.get("/main/getBoards")
        setBoardList(boards.data)
    }

    const HandleButtonClick = (boardID) => {
        console.log(boardID)
        setOpenBoard(boardID)
        localStorage.setItem("openBoard", `${boardID}`);
    };

    async function HandleSaveBoard(newBoard){
        let addedBoard = await client.post("/main/addBoard", newBoard);
        console.log(addedBoard.data)
        setBoardList(boardList => [...boardList, addedBoard.data])
    }

    return (
        <section className="container-xl lg:container m-auto">
            <h1 className="text-xl font-bold text-center">Ploče po adresama</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-gray-300 rounded-lg p-6">
                {boardList.map((board, index) => (
                <div key={index} className="bg-gray-200 p-4 border border-gray-300 w-full text-center rounded-lg">
                    <p>{board.address}</p>
                    <button onClick={() => HandleButtonClick(board.boardID)} className="mt-4 py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white rounded-lg cursor-pointer">
                        Click Me
                    </button>
                </div>
            ))}
                <button
                onClick={() => setIsFormOpen(true)}
                className="bg-blue-500 hover:bg-blue-700 p-4 border border-gray-300 cursor-pointer w-full text-center rounded-lg h-[150px]">
                    Add New Item
                </button>
            </div>

            {isFormOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <AddBoardForm onClose={() => setIsFormOpen(false)} onSave={HandleSaveBoard} />
                </div>
            )}
        </section>
    )
}

export default BoardList