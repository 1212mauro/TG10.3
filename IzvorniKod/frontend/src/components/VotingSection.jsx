// src/components/VotingSection.js
import React, { useState } from "react";
import upvoteImage from "../assets/upvote.png";
import downvoteImage from "../assets/downvote.png";

const VotingSection = ({ diskusija, onVote }) => {
  const [upVotes, setUpVotes] = useState(diskusija.upVotes);
  const [downVotes, setDownVotes] = useState(diskusija.downVotes);
  const [votes, setVotes] = useState(diskusija.upVotes + diskusija.downVotes);
  const [isVoted, setIsVoted] = useState(false);
  const [lastVoteType, setLastVoteType] = useState(null); // Track last vote type

  const handleUpVote = () => {
    setUpVotes(upVotes + 1);
    setVotes(votes + 1);
    setIsVoted(true);
    setLastVoteType("upvote");
    onVote();
  };

  const handleDownVote = () => {
    setDownVotes(downVotes + 1);
    setVotes(votes + 1);
    setIsVoted(true);
    setLastVoteType("downvote");
    onVote();
  };

  const handleUndoVote = () => {
    if (!isVoted) return; // If no vote was made, do nothing

    if (lastVoteType === "upvote") {
      setUpVotes(upVotes - 1);
    } else if (lastVoteType === "downvote") {
      setDownVotes(downVotes - 1);
    }

    setVotes(votes - 1);
    setIsVoted(false);
    setLastVoteType(null);
  };

  return (
    <div className="mt-4 flex items-center justify-between">
      <button
        onClick={handleUpVote}
        disabled={isVoted}
        className={`px-4 py-2 text-sm font-medium flex items-center justify-center ${
          isVoted
            ? "bg-green-900 text-white cursor-not-allowed"
            : "bg-green-500 text-white hover:bg-blue-600"
        } rounded`}
      >
        <img src={upvoteImage} alt="Upvote" className="w-4 h-4 mr-1" />
        <span>{upVotes}</span>
      </button>

      <span className="text-gray-700 font-medium flex flex-col items-center text-center">
        Votes: {votes}
        <br />
        <button
        onClick={handleUndoVote}
        disabled={!isVoted}
        className="mt-2 bg-gray-500 text-white py-1 px-2 rounded hover:bg-gray-600"
        >
        UNDO VOTE
        </button>
      </span>


      <button
        onClick={handleDownVote}
        disabled={isVoted}
        className={`px-4 py-2 text-sm font-medium flex items-center justify-center ${
          isVoted
            ? "bg-red-900 text-white cursor-not-allowed"
            : "bg-red-500 text-white hover:bg-blue-600"
        } rounded`}
      >
        <img src={downvoteImage} alt="Downvote" className="w-4 h-4 mr-1" />
        <span>{downVotes}</span>
      </button>
    </div>
  );
};

export default VotingSection;
