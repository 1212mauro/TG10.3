import React, { useContext, useEffect, useState } from "react";
import UndoVoteButton from "./UndoVoteButton";
import VoteButton from "./VoteButton";
import client from "../lib/AxiosConfig";

import { UserContext } from "../pages/MainPage";

function VotingSection({ message, sizeOfThread, handleCreateMeeting }){
  const [votes, setVotes] = useState(message.votes)
  const [isVoted, setIsVoted] = useState();
  const [upVotes, setUpVotes] = useState(message.votes.reduce((total,x) => total+(x.voteType==="UPVOTE"), 0));

  const user = useContext(UserContext)

  useEffect(() => {
    setIsVoted(message.votes.filter(vote => vote.voter.userId == user.userId).length > 0)
  }, [])

  useEffect(() => {
    let v = votes.reduce((total,x) => total+(x.voteType==="UPVOTE"), 0);
    setUpVotes(v)
    if( v > 0.25*sizeOfThread){
      handleCreateMeeting()
    }
  }, [votes])

  async function handleVote(vote){
    setIsVoted(true)
    let UserVoted = {
      voter : user,
      voteType : vote,
    }
    const token = localStorage.getItem('authToken');
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    let res = await client.put(`/main/vote/${message.messageId}`, JSON.stringify(UserVoted), config)
    setVotes(res.data.votes)
  };

  async function handleUndoVote(){
    let voteToDelete = votes.filter((vote) => vote.voter.userId == user.userId)[0]
    const token = localStorage.getItem('authToken');
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    let res = await client.delete(`/main/deleteVote/${message.messageId}/${voteToDelete.voteID}`, config)

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
