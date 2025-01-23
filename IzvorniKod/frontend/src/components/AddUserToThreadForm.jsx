import React, { useContext, useEffect, useState } from 'react'
import client from '../lib/AxiosConfig'
import { UserContext } from '../pages/AdminPage'
import Modal from './Modal'
import { BoardContext } from './ThreadList'

function AddUserToThreadForm({ onClose, thread }) {

    const [userList, setUserList] = useState([])
    const [unconfirmedUser, setUnconfirmedUser] = useState(null)

    const boardID = useContext(BoardContext)

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        const token = localStorage.getItem('authToken');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        console.log(boardID)
        const response = await client.get(`/main/getUsersNotOnThread/${boardID}/${thread.threadID}`, config) 
        setUserList(response.data)
    }

    async function handleAddUser(threadID, userID){
        const token = localStorage.getItem('authToken');
        const config = {
            headers: { Authorization: `Bearer ${token}`}
        };
        let res = await client.put(`/main/addUserToThread/${threadID}/${userID}`, config)
        setUnconfirmedUser(null)
        fetchData()
        console.log(res.data)
    }

    return (
        <Modal title="Select user" onClose={onClose}>
            {unconfirmedUser ? (
                <div>
                    <p className="px-4 py-2 bg-gray-200 text-black rounded-lg">User [ {unconfirmedUser.username} ] will become a participant of thread [ {thread.title} ]</p>
                    <button 
                        onClick={() => handleAddUser(thread.threadID, unconfirmedUser.userId)}
                        className="absolute left-8 bottom-8 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    >
                        CONFIRM
                    </button>
                </div>
            ) : (
                <div className='flex flex-col'>
                    {userList.length > 0 ? (
                        userList.map(user => 
                            <button 
                                onClick={() => {setUnconfirmedUser(user)}}
                                className="px-4 py-2 bg-gray-200 text-black font-semibold rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                            >
                                {user.username}
                            </button>)
                    ) : (
                        <p className="px-4 py-2 bg-gray-200 text-black rounded-lg">No users left to set</p>
                    )}
                </div>
            )}
        </Modal>
    )
}

export default AddUserToThreadForm