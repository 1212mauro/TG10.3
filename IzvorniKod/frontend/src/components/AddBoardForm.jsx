import React, { useState } from 'react'
import Input from './Input';
import Modal from './Modal';
import UserSelector from './UserSelector';

function AddBoardForm({ onClose, onSave }) {

    const [address, setAddress] = useState()
    const [UserSelectorIsOpen, setUserSelectorIsOpen] = useState(false)
    const [users, setUsers] = useState([])

    function handleSave(){
    const newThread = {
        boardID : null,
        address : address,
        users : users
    };
    onSave(newThread);
    onClose(); 
  };

    return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Dodaj novu diskusiju</h2>
        <Input label="Building address" type="text" labelClassName="block text-sm font-medium text-gray-700" inputClassName="w-full p-2 mt-2 border rounded-lg" stateSetter={setAddress}/>
        <div className="flex justify-end gap-4">
            <button
            onClick={onClose}
            className="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-400"
            >
                Zatvori
            </button>
            <button
                onClick={() => setUserSelectorIsOpen(true)}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
            >
                Spremi
            </button>
            {UserSelectorIsOpen && 
            <Modal title={"select users for this board"} onClose={() => setUserSelectorIsOpen(false)}>
                <UserSelector users={users} setUsers={setUsers} HandleSubmit={handleSave} boardID={0} />
            </Modal>}
        </div>
    </div>
  );
}

export default AddBoardForm