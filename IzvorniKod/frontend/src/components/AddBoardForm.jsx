import React, { useState } from 'react'
import Input from './Input';

function AddBoardForm({ onClose, onSave }) {

    const [address, setAddress] = useState()

    function handleSave(e){
    const newThread = {
        boardID : null,
        address : address
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
                onClick={handleSave}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
            >
                Spremi
            </button>
        </div>
    </div>
  );
}

export default AddBoardForm