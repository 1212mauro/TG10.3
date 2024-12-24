import React, { useState } from "react";
import DiscussionDetails from "./DiscussionDetails";
import VotingSection from "./VotingSection";

function Discussion({ discussion, toVote }){
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [comments, setComments] = useState(discussion.comments);

  const handleReadMore = () => {
    setIsModalOpen(true);
  };

  const handleAddComment = (commentText) => {
    const newComment = {
      id: comments.length + 1,
      comment: commentText,
      user: "current user",
      timestamp: Date.now(),
    };
    setComments(c => [...c, newComment]);
  };

  const handleVote = () => {
    toVote(discussion.id);
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg mb-4 border border-gray-200">
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
          onAddComment={handleAddComment}
        />
      )}
    </div>
  );
};

export default Discussion;