import React, { useState } from "react";
import upvoteImage from "../assets/upvote.png";
import downvoteImage from "../assets/downvote.png";

const VotingSection = ({ diskusija, onVote }) => {
  const [upVotes, setUpVotes] = useState(diskusija.upVotes);
  const [downVotes, setDownVotes] = useState(diskusija.downVotes);
  const [userVote, setUserVote] = useState(null); // "upvote", "downvote", or null

  const handleVote = (voteType) => {
    if (voteType === userVote) {
      // Undo vote
      if (voteType === "upvote") setUpVotes(upVotes - 1);
      if (voteType === "downvote") setDownVotes(downVotes - 1);
      setUserVote(null);
      onVote(null); // Notify parent about the undone vote
    } else {
      // Change or cast vote
      if (userVote === "upvote") setUpVotes(upVotes - 1);
      if (userVote === "downvote") setDownVotes(downVotes - 1);

      if (voteType === "upvote") setUpVotes(upVotes + 1);
      if (voteType === "downvote") setDownVotes(downVotes + 1);

      setUserVote(voteType);
      onVote(voteType); // Notify parent about the new vote
    }
  };

  return (
    <div className="mt-4 flex items-center justify-between">
      <button
        onClick={() => handleVote("upvote")}
        className={`px-4 py-2 text-sm font-medium flex items-center justify-center ${
          userVote === "upvote"
            ? "bg-green-900 text-white"
            : "bg-green-500 text-white hover:bg-green-600"
        } rounded`}
      >
        <img src={upvoteImage} alt="Upvote" className="w-4 h-4 mr-1" />
        <span>{upVotes}</span>
      </button>

      <span className="text-gray-700 font-medium flex flex-col items-center text-center">
        Total Votes: {upVotes + downVotes}
      </span>

      <button
        onClick={() => handleVote("downvote")}
        className={`px-4 py-2 text-sm font-medium flex items-center justify-center ${
          userVote === "downvote"
            ? "bg-red-900 text-white"
            : "bg-red-500 text-white hover:bg-red-600"
        } rounded`}
      >
        <img src={downvoteImage} alt="Downvote" className="w-4 h-4 mr-1" />
        <span>{downVotes}</span>
      </button>
    </div>
  );
};

export default VotingSection;
