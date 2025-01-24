import React, { useContext } from "react";
import { UserContext } from "../pages/MainPage";
import VotingSection from "./VotingSection";

function Comment({ comment, deleteComment, sizeOfThread, handleCreateMeeting }){

  const user = useContext(UserContext)

  const canDelete = comment.messageAuthor.userId == user.userId || user.role !== 'TENANT'
  
  return (
    <>
      <div className="px-4 py-2 bg-gray-100 rounded-lg mb-2">
        <div className="flex items-center justify-between h-12 bg-gray-100">
          <p className="text-gray-700 mb-1">{comment.content}</p>
          {canDelete && (<button onClick={() => deleteComment(comment.messageId)} className="bg-red-500 text-white text-sm px-3 py-1.5 rounded hover:bg-red-700 transition duration-300">
            Delete
          </button>)}
        </div>
        <div className="text-xs text-gray-500 flex justify-between">
          <span>{comment.messageAuthor.username}</span>
          <span>{new Date(comment.timeSent).toLocaleString()}</span>
        </div>
        {comment.hasVoting && <VotingSection message={comment} sizeOfThread={sizeOfThread} handleCreateMeeting={handleCreateMeeting}/>}
      </div>
    </>
  );
};

export default Comment;
