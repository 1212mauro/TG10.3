import React from "react";

function Comment({ comment, deleteComment }){

  console.log(comment)

  return (
    <div className="px-4 py-2 bg-gray-100 rounded-lg mb-2">
      <div class="flex items-center justify-between h-12 bg-gray-100">
        <p className="text-gray-700 mb-1">{comment.content}</p>
        <button onClick={() => deleteComment(comment.messageId)} class="bg-red-500 text-white text-sm px-3 py-1.5 rounded hover:bg-red-700 transition duration-300">Delete</button>
      </div>
      <div className="text-xs text-gray-500 flex justify-between">
        <span>{comment.messageAuthor.username}</span>
        <span>{new Date(comment.timeSent).toLocaleString()}</span>
      </div>
    </div>
  );
};

export default Comment;
