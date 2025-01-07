import React, { useState } from "react";
import ThreadDetails from "./ThreadDetails";
import VotingSection from "./VotingSection";

function Thread({ thread, toVote }){
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [comments, setComments] = useState(thread.comments);

  function handleReadMore(){
    setIsModalOpen(i => true);
    console.log(isModalOpen)
  };

  function handleAddComment(commentText){
    const newComment = {
      id: comments.length + 1,
      content: commentText,
      user: "current user",
      timestamp: Date.now(),
    };
    setComments(c => [...c, newComment]);
  };

  function handleVote(){
    toVote(thread.id);
  };

  return (
    <div id='7' className="p-4 bg-white shadow-md rounded-lg mb-4 border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-800">{thread.title}</h2>
      <p className="text-gray-600 mt-2">
        {thread.description.substring(0, 50)}...
      </p>
      <button onClick={handleReadMore} className="text-blue-500 text-sm mt-2">
        Pročitaj više
      </button>

      
      {thread.hasVoting && <VotingSection thread={thread} onVote={handleVote} />}

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