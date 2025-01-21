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
        const token = localStorage.getItem('authToken');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        let boards = await client.get("/main/getBoards", config)
        console.log(boards)
        setBoardList(boards.data)
    }

    const HandleButtonClick = (boardID) => {
        console.log(boardID)
        setOpenBoard(boardID)
    };

    async function HandleSaveBoard(newBoard){
        const token = localStorage.getItem('authToken');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        let addedBoard = await client.post("/main/addBoard", newBoard, config);
        console.log(addedBoard.data)
        setBoardList(boardList => [...boardList, addedBoard.data])
    }
    let isPrivate = false;
    return (
        <section className="container-xl lg:container m-auto">
            <h1 className="text-xl font-bold text-center mt-5">Ploče po adresama</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-gray-300 rounded-lg p-6">
                {boardList.map((board, index) => (
                
                <div key={index} className="relative bg-gray-200 p-4 border border-gray-300 w-full text-center rounded-lg">
                <div className={`absolute top-2 right-2 text-white text-xs font-semibold py-1 px-2 rounded ${
                    isPrivate ? 'bg-blue-500/50' : 'bg-green-500/50'
                }`}
                >
                {isPrivate ? 'Private' : 'Public'}
                </div>  
                    <p>{board.address}</p>
                    <button onClick={() => HandleButtonClick(board.boardID)} className="mt-4 py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white rounded-lg cursor-pointer">
                        Click Me
                    </button>
                </div>
                
            ))}
                <button
                onClick={() => setIsFormOpen(true)}
                className="text-white bg-blue-500 hover:bg-green-500 p-4 border border-gray-300 cursor-pointer w-full text-center rounded-lg h-[150px]">
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