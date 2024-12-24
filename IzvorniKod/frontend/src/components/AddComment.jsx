import React from 'react'

function AddComment({ HandleSaveComment, setNewComment }) {
  return (
    <div className="mt-4">
          <textarea
            className="w-full p-2 border border-gray-300 rounded-lg"
            rows="3"
            placeholder="Input comment"
            onChange={(e) => setNewComment(e.target.value)}
          ></textarea>
          <button
            onClick={HandleSaveComment}
            className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"> 
            Spremi comment </button>
        </div>
  )
}

export default AddComment