import React from 'react'
import Comment from './Comment'

function CommentList({ comments, deleteComment }) {

    console.log(comments)
    return (
        <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2">Comments</h3>
            {comments.length > 0 ?
                comments.map((comment) => (
                    <Comment key={comment.id} comment={comment} deleteComment={deleteComment}/>
                )) :
                <p className="text-gray-500">No comments</p>
            }
        </div>
    )
}

export default CommentList