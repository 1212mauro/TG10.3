import React from "react";
import VotingSection from "./VotingSection";

const Voting = ({ voting, onVote }) => {
  return (
    <div className="p-4 bg-gray-100 rounded-lg mb-2">
      <p className="text-sm text-gray-700 mb-1">{voting.question}</p>
      <VotingSection discussion={voting} onVote={onVote} />
      <div className="text-xs text-gray-500 flex justify-between">
        <span>{voting.user}</span>
        <span>{new Date(voting.timestamp).toLocaleString()}</span>
      </div>
    </div>
  );
};

export default Voting;
