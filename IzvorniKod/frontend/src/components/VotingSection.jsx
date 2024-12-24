import React, { useState } from "react";
import UndoVoteButton from "./UndoVoteButton";
import VoteButton from "./VoteButton";

function VotingSection({ discussion, onVote }){
  const [upVotes, setUpVotes] = useState(discussion.upVotes);
  const [downVotes, setDownVotes] = useState(discussion.downVotes);
  const [isVoted, setIsVoted] = useState(false);
  const [lastVoteType, setLastVoteType] = useState(null); // Track last vote type

  const handleUpVote = () => {
    setUpVotes(uv =>uv + 1);
    setIsVoted(true);
    setLastVoteType("upvote");
    onVote();
  };

  const handleDownVote = () => {
    setDownVotes(dv => dv + 1);
    setIsVoted(true);
    setLastVoteType("downvote");
    onVote();
  };

  function handleUndoVote(){

    if (lastVoteType === "upvote") {
      setUpVotes(uv => uv - 1);
    } else if (lastVoteType === "downvote") {
      setDownVotes(dv => dv - 1);
    }
    setIsVoted(false);
    setLastVoteType(null);
  };

  return (
    <div className="mt-4 flex items-center justify-between">
      <VoteButton type='upvote' votesOfType={upVotes} handleUpVote={handleUpVote} handleDownVote={handleDownVote} isVoted={isVoted}></VoteButton>
      <UndoVoteButton handleUndoVote={handleUndoVote} votes={downVotes + upVotes} isVoted={isVoted}></UndoVoteButton>
      <VoteButton type='downvote' votesOfType={downVotes} handleUpVote={handleUpVote} handleDownVote={handleDownVote} isVoted={isVoted}></VoteButton>
    </div>
  );
};

export default VotingSection;
