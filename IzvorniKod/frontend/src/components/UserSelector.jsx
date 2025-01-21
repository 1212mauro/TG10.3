import React, { useEffect, useState } from 'react'
import client from '../lib/AxiosConfig'

function UserSelector({ boardID, users, setUsers, HandleSubmit }) {

    const [userList, setUserList] = useState([])
    const [checked, setChecked] = useState([])

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        const token = localStorage.getItem('authToken');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        console.log(boardID)
        const response = boardID ? 
            await client.get(`/main/getUsersOnBoard/${boardID}`, config) : 
            await client.get(`/main/getUsers`, config)
        console.log(response.data)
        setUserList(response.data)
        setUsers(response.data.filter(user => user.role === "ADMIN"))
    }

        function handleChange(e) {
        if (e.target.checked) {
            console.log(e.target.checked, e.target, userList)
            setUsers(c => [...c, JSON.parse(e.target.value)]);
        } else {
            setUsers(users.filter((item) => item.userId !== JSON.parse(e.target.value).userId));
        }
    }

    return (
        <>
            {userList.map(user =>
            (
                <div className="mb-4 mx-4 flex items-center">
                <input
                    type="checkbox"
                    value={JSON.stringify(user)}
                    checked={users.filter(checkedUser => checkedUser.userId == user.userId).length > 0}
                    onChange={handleChange}
                    className="mr-2"
                />
                <label className="text-sm font-medium text-gray-700">{user.username}</label>
            </div>))}
            <button onClick={HandleSubmit}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
            >
            Spremi
            </button>
        </>
    )
}

export default UserSelector