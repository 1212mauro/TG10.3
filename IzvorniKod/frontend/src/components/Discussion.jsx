import React, { useState } from "react";
import DiscussionDetails from "./DiscussionDetails";

const Discussion = ({ discussion, onVote }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [comments, setComments] = useState(discussion.comments || []);
  const [votings, setVotings] = useState(discussion.votings || []);

  const handleReadMore = () => {
    setIsModalOpen(true);
  };

  const handleAddComment = (commentText) => {
    const newComment = {
      id: comments.length + 1,
      comment: commentText,
      user: "Current user",
      timestamp: Date.now(),
    };
    setComments([...comments, newComment]);
  };

  const handleAddQuestion = (questionText) => {
    const newQuestion = {
      id: votings.length + 1,
      question: questionText,
      user: "Current user",
      timestamp: Date.now(),
      upVotes: 0, // Initialize upVotes to 0
      downVotes: 0, // Initialize downVotes to 0
      userVoted: false
    };
    setVotings([...votings, newQuestion]);
  };

  const handleVote = (votingId, vote) => {
    setVotings((prev) =>
      prev.map((voting) =>
        voting.id === votingId
          ? { ...voting, votes: (voting.votes || 0) + vote }
          : voting
      )
    );
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg mb-4 border border-gray-200 relative">
      <span
        className={`absolute top-2 right-2 text-sm font-semibold px-2 py-1 rounded-full ${
          discussion.type === "public"
            ? "bg-green-200 text-green-800"
            : "bg-red-200 text-red-800"
        }`}
      >
        {discussion.type === "public" ? "Public" : "Private"}
      </span>
      <h2 className="text-xl font-semibold text-gray-800 bg-gray-200 p-2 rounded-lg inline-block mb-4">
        {discussion.title}
      </h2>
      <button onClick={handleReadMore} className="text-blue-500 text-sm absolute bottom-2 left-2">
               Read more
      </button>

      {isModalOpen && (
        <DiscussionDetails
          discussion={discussion}
          comments={comments}
          votings={votings}
          onClose={() => setIsModalOpen(false)}
          onAddComment={handleAddComment}
          onAddQuestion={handleAddQuestion}
          onVote={handleVote}
        />
      )}
    </div>
  );
};

export default Discussion;
