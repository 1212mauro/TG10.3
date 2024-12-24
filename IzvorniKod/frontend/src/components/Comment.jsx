import React from "react";

function Comment({ comment }){
  return (
    <div className="p-4 bg-gray-100 rounded-lg mb-2">
      <p className="text-sm text-gray-700 mb-1">{comment.content}</p>
      <div className="text-xs text-gray-500 flex justify-between">
        <span>{comment.user}</span>
        <span>{new Date(comment.timestamp).toLocaleString()}</span>
      </div>
    </div>
  );
};

export default Comment;
