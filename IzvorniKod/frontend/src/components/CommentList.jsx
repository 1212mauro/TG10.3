import { startCase } from 'lodash'
import React from 'react'
import Comment from './Comment'

function CommentList({ label, comments, deleteComment }) {

    return (
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