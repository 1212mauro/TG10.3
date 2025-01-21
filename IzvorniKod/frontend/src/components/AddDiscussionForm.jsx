import React, { useState } from 'react';
import discussions from '../../public/discussions'

const AddDiscussionForm = ({ onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState(''); 
  const [type, setType] = useState('public'); // New state for discussion type

  const handleSave = (e) => {
    e.preventDefault();
    const newDiscussion = {
      id: Math.random(),
      title,
      description,
      type // Include the type in the new discussion object
    };
    onSave(newDiscussion); 
    onClose(); 
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-96">
      <h2 className="text-xl font-bold mb-4">Add new discussion</h2>
      <form onSubmit={handleSave}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Discussion title</label>
          <input
            type="text"
            className="w-full mt-2 p-2 border border-gray-300 rounded-lg"
            placeholder="Enter discussion title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Discussion description</label>
          <textarea
            className="w-full mt-2 p-2 border border-gray-300 rounded-lg"
            rows="4"
            placeholder="Enter discussion details"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Discussion type</label>
          <select
            className="w-full mt-2 p-2 border border-gray-300 rounded-lg"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </div>
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-400"
          >
            Close
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDiscussionForm;
