import React from 'react'

function UndoVoteButton({ handleUndoVote, votes, isVoted }) {

    return (
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
    )
    }

export default UndoVoteButton