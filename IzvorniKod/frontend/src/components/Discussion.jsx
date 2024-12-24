import React, { useState } from "react";
import DiscussionDetails from "./DiscussionDetails";
import VotingSection from "./VotingSection";

function Discussion({ discussion, toVote }){
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [comments, setComments] = useState(discussion.comments);

  function handleReadMore(){
    console.log(1)
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
    toVote(discussion.id);
  };

  return (
    <div id='7' className="p-4 bg-white shadow-md rounded-lg mb-4 border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-800">{discussion.naslov}</h2>
      <p className="text-gray-600 mt-2">
        {discussion.description.substring(0, 50)}...
      </p>
      <button onClick={handleReadMore} className="text-blue-500 text-sm mt-2">
        Pročitaj više
      </button>

      
      {discussion.hasVoting && <VotingSection discussion={discussion} onVote={handleVote} />}

      {isModalOpen && (
        <DiscussionDetails
          discussion={discussion}
          comments={comments}
          onClose={() => setIsModalOpen(false)}
          handleAddComment={handleAddComment}
        />
      )}
    </div>
  );
};

export default Discussion;