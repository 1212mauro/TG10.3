import React, { useState, useContext } from "react";
import ThreadDetails from "./ThreadDetails";
import VotingSection from "./VotingSection";
import { UserContext } from "./ThreadList";
import client from '../lib/AxiosConfig'

function Thread({ thread }){
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [comments, setComments] = useState(thread.comments);

  const user = useContext(UserContext)
  
  
  function handleReadMore(){
    setIsModalOpen(i => true);
    console.log(isModalOpen)
  };

  function handleAddComment(commentText){
    const newComment = {
      id: null,
      content: commentText,
      timeSent: Date.now(),
      messageAuthor : user,
    };
    client.post(`/main/addComment/${thread.threadID}`, JSON.stringify(newComment))
    setComments(c => [...c, newComment]);
  };

  return (
    <div id='7' className="p-4 bg-white shadow-md rounded-lg mb-4 border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-800">{thread.title}</h2>
      <p className="text-gray-600 mt-2">
        {thread.description.substring(0, 40)}{thread.description.length > 40 && "..."}
      </p>
      <button onClick={handleReadMore} className="text-blue-500 text-sm mt-2">
        Pročitaj više
      </button>

      
      {thread.hasVoting && <VotingSection thread={thread} />}

      {isModalOpen && (
        <ThreadDetails
          thread={thread}
          comments={comments}
          onClose={() => setIsModalOpen(false)}
          handleAddComment={handleAddComment}
        />
      )}
    </div>
  );
};

export default Thread;