import React from 'react'
import upvoteImage from "../assets/upvote.png";
import downvoteImage from "../assets/downvote.png";
import { startCase } from 'lodash'

function VoteButton({ type, votesOfType, handleUpVote, handleDownVote, isVoted }){

    const handler = (type === 'upvote' ? handleUpVote : handleDownVote)
    const imgSrc = (type === 'upvote' ? upvoteImage : downvoteImage)

    const upVoteStyle = (isVoted
        ? "bg-green-900 text-white cursor-not-allowed"
        : "bg-green-500 text-white hover:bg-blue-600")
    const downVoteStyle = (isVoted
        ? "bg-red-900 text-white cursor-not-allowed"
        : "bg-red-500 text-white hover:bg-blue-600"
    ) 

    const buttonStyle = (type === 'upvote' ? upVoteStyle : downVoteStyle)

    return (
        <button
            onClick={handler}
            disabled={isVoted}
            className={`px-4 py-2 text-sm font-medium flex items-center justify-center ${buttonStyle} rounded`}
        >
            <img src={imgSrc} alt={startCase(type)} className="w-4 h-4 mr-1" />
            <span>{votesOfType}</span>
        </button>
    )
}

export default VoteButton