import { startCase } from 'lodash'
import React from 'react'
import Comment from './Comment'
import VotingSection from './VotingSection'

function CommentList({ label, comments, deleteComment }) {

    console.log(comments)
    return (
        // <div className="mt-4">
        //     <h3 className="text-lg font-semibold mb-2">comments</h3>
        //     {comments.length > 0 ?
        //         comments.map((comment) => (
        //             <Comment key={comment.id} comment={comment} deleteComment={deleteComment}/>
        //         )) :
        //         <p className="text-gray-500">Nema komentara</p>
        //     }
        // </div>

        <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2">{startCase(label)}</h3>
            {comments.length > 0 ? (
                comments.map((comment) => (
                    <Comment key={comment.id} comment={comment} deleteComment={deleteComment}/>))
                    ) : (
                    <p className="text-gray-500">No {label}</p>
                )}
        </div>
    )
}

export default CommentList