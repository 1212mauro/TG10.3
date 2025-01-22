import React from 'react'
import { useState } from 'react';

function AddQuestion({ HandleSaveQuestion }) {

  const [newQuestion, setNewQuestion] = useState("");

  return (
    <div className="mt-4">
          <textarea
            className="w-full p-2 border border-gray-300 rounded-lg"
            rows="3"
            placeholder="Input question"
            onChange={(e) => {setNewQuestion(e.target.value)}}
          ></textarea>
          <button
            onClick={() => HandleSaveQuestion(newQuestion)}
            className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"> 
            Save question </button>
        </div>
  )
}

export default AddQuestion