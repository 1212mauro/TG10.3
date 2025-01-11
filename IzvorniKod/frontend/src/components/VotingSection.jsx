import React, { useState } from "react";
import UndoVoteButton from "./UndoVoteButton";
import VoteButton from "./VoteButton";
import client from "../lib/AxiosConfig";

function VotingSection({ thread }){
  const [votes, setVotes] = useState(thread.votes.map(vote => vote.voteType))
  const [isVoted, setIsVoted] = useState(false);
  const [lastVoteType, setLastVoteType] = useState(null); // Track last vote type

  const id = thread.threadID

  const upVotes = votes.reduce((total,x) => total+(x==="UPVOTE"), 0)
  const downVotes = votes.length - upVotes

  const handleVote = (vote) => {
    console.log(id)
    setVotes(v => [...v, vote])
    let UserVoted = {
      voter : { userId : 1,
                username : "tost",
                passwordHash : "most"
      },
      voteType : vote,
    }
    client.put(`/main/vote/${id}`, JSON.stringify(UserVoted))
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
      <VoteButton type='upvote' votesOfType={upVotes} handleVote={() => handleVote("UPVOTE")} isVoted={isVoted}></VoteButton>
      <UndoVoteButton handleUndoVote={handleUndoVote} votes={downVotes + upVotes} isVoted={isVoted}></UndoVoteButton>
      <VoteButton type='downvote' votesOfType={downVotes} handleVote={() => handleVote("DOWNVOTE")} isVoted={isVoted}></VoteButton>
    </div>
  );
};

export default VotingSection;
