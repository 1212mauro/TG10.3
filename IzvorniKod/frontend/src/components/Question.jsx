import React, { useContext } from "react";
import { UserContext } from "../pages/MainPage";

function Question({ question, deleteQuestion }){

  const user = useContext(UserContext)

  const canDelete = question.messageAuthor.userId == user.userId || user.role !== 'TENANT'

  console.log(question)

  return (
    <div className="px-4 py-2 bg-gray-100 rounded-lg mb-2">
      <div class="flex items-center justify-between h-12 bg-gray-100">
        <p className="text-gray-700 mb-1">{question.content}</p>
        <VotingSection discussion={voting} onVote={onVote} />
        {canDelete && (<button onClick={() => deleteQuestion(question.messageId)} class="bg-red-500 text-white text-sm px-3 py-1.5 rounded hover:bg-red-700 transition duration-300">
          Delete
        </button>)}
      </div>
      <div className="text-xs text-gray-500 flex justify-between">
        <span>{question.messageAuthor.username}</span>
        <span>{new Date(question.timeSent).toLocaleString()}</span>
      </div>
    </div>
  );
};

export default Question;
