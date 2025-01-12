import React, { useContext, useEffect, useState } from "react";
import UndoVoteButton from "./UndoVoteButton";
import VoteButton from "./VoteButton";
import client from "../lib/AxiosConfig";

import { UserContext } from "./ThreadList";

function VotingSection({ thread }){
  const [votes, setVotes] = useState(thread.votes)
  const [isVoted, setIsVoted] = useState();
  const [upVotes, setUpVotes] = useState(votes.reduce((total,x) => total+(x.voteType==="UPVOTE"), 0));

  const user = useContext(UserContext)

  useEffect(() => {
    setIsVoted(thread.votes.filter(vote => vote.voter.userId == user.userId).length > 0)
  }, [])

  useEffect(() => {
    setUpVotes(votes.reduce((total,x) => total+(x.voteType==="UPVOTE"), 0));
  }, [votes])

  async function handleVote(vote){
    setIsVoted(true)
    let UserVoted = {
      voter : user,
      voteType : vote,
    }
    let res = await client.put(`/main/vote/${thread.threadID}`, JSON.stringify(UserVoted))
    console.log(res.data.votes)
    setVotes(v => res.data.votes)
  };

  async function handleUndoVote(){

    // console.log(thread.votes.filter((vote) => vote.voter.userId == user.userId))
    let voteToDelete = votes.filter((vote) => vote.voter.userId == user.userId)[0]
    // console.log(voteToDelete.voteID + "VOTE ID")

    let res = await client.delete(`/main/deleteVote/${thread.threadID}/${voteToDelete.voteID}`)
    console.log(res)

    console.log(votes)
    console.log(votes.filter(vote => vote.voteID != voteToDelete.voteID))
    setVotes(votes.filter(vote => vote.voteID != voteToDelete.voteID))
    setIsVoted(false);
  };

  return (
    <div className="mt-4 flex items-center justify-between">
      <VoteButton type='upvote' votesOfType={upVotes} handleVote={() => handleVote("UPVOTE")} isVoted={isVoted}></VoteButton>
      <UndoVoteButton handleUndoVote={handleUndoVote} votes={votes.length} isVoted={isVoted}></UndoVoteButton>
      <VoteButton type='downvote' votesOfType={votes.length - upVotes} handleVote={() => handleVote("DOWNVOTE")} isVoted={isVoted}></VoteButton>
    </div>
  );
};

export default VotingSection;
