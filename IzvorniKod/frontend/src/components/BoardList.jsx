import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import AddBoardForm from './AddBoardForm';
import client from '../lib/AxiosConfig';
import { UserContext } from '../pages/MainPage';

function BoardList({ setOpenBoard }) {

    const [boardList, setBoardList] = useState([]);
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [canAddBoards, setCanAddBoards] = useState(false)

    const user = useContext(UserContext)

    useEffect(() => {
        fetchData()
        setCanAddBoards(user.role === 'ADMIN')
    }, [])

    const fetchData = async () => {
        const token = localStorage.getItem('authToken');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        let boards = await client.get(`/main/getBoardsForUser/${user.userId}`, config)
        console.log(boards.data)
        setBoardList(boards.data)
        if (user.role === 'ADMIN'){
            boards = await client.get(`/main/getBoards`, config)
            setBoardList(boards.data)
        }
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
        const setBoard = user.role === 'ADMIN' || addedBoard.data.users.filter(p => p.userId == user.userId).length > 0
        setBoard && setBoardList(boardList => [...boardList, addedBoard.data])
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
                {canAddBoards &&(
                    <button
                    onClick={() => setIsFormOpen(true)}
                    className="bg-blue-500 hover:bg-blue-700 p-4 border border-gray-300 cursor-pointer w-full text-center rounded-lg h-[150px]">
                        Add New Item
                    </button>
                )}
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
