import React from 'react'
import { useState } from 'react';

function AddComment({ HandleSaveComment }) {

  const [newComment, setNewComment] = useState("");

  return (
    <div className="mt-4">
          <textarea
            className="w-full p-2 border border-gray-300 rounded-lg"
            rows="3"
            placeholder="Input comment"
            onChange={(e) => {console.log(newComment); setNewComment(e.target.value)}}
          ></textarea>
          <button
            onClick={() => HandleSaveComment(newComment)}
            className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"> 
            Save comment </button>
        </div>
  )
}

export default AddComment