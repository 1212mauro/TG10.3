import React, { useEffect, useState } from "react";
import client from "../lib/AxiosConfig";
import { add } from "lodash";

function BoardManageForm({ board, updateBoard }) {
    const [usersList, setUserList] = useState([])
    const [address, setAddress] = useState(board.address);
    const [selectedUsers, setSelectedUsers] = useState(board.users);
  
    useEffect(() => {
        fetchData()
    }, [])

    async function fetchData(){
        const token = localStorage.getItem('authToken');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        let res1 = await client.get("/main/getUsers", config)
        setUserList(res1.data)
    }

    function handleSubmit(){
        let updatedBoard = board
        updatedBoard.address = address
        updatedBoard.users = selectedUsers
        updateBoard(updatedBoard)
    }

    const handleAddressChange = (e) => {
      setAddress(e.target.value);
    };
  
    function handleUserChange(e){
  
        if (e.target.checked) {
            setSelectedUsers(c => [...c, JSON.parse(e.target.value)]);
        } else {
            setSelectedUsers(selectedUsers.filter((item) => item.userId != JSON.parse(e.target.value).userId));
        }
        
    };

  return (
    <div className="max-w-lg mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Board Management Form</h1>
        <div className="mb-4">
            <p className="mb-2">
                <strong>Address:</strong> {address || "No address entered"}
            </p>
            <input
                type="text"
                placeholder={board.address}
                onChange={handleAddressChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>

        <div className="mb-6">
            <label className="block text-lg font-medium mb-2">Users:</label>
            <div className="grid grid-cols-3 gap-4">
            {usersList.map((user) => (
                <div key={user.userId} className="flex items-center">
                <input
                    type="checkbox"
                    value={JSON.stringify(user)}
                    onChange={handleUserChange}
                    checked={selectedUsers.filter(checkedUser => checkedUser.userId == user.userId).length > 0}
                    className="mr-2"
                />
                <label className="text-gray-700">
                    {user.username}
                </label>
                </div>
            ))}
            </div>
        </div>

        <div className="mt-4">
            <h2 className="font-semibold text-xl mb-2">Selected Users:</h2>
            <p className="mb-2">
                <strong>Selected Users:</strong>
            {selectedUsers.length > 0 ? selectedUsers.map(user => user.username).join(", ") : "None"}
            </p>
        </div>
        <button onClick={handleSubmit} className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">
            Submit
        </button>
    </div>
  );
}

export default BoardManageForm;