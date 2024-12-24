import React from 'react'
import Comment from './Comment'

function CommentList({ comments }) {

    console.log(comments)
    return (
        <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">comments</h3>
            {comments.length > 0 ?
                comments.map((comment) => (
                    <Comment key={comment.id} comment={comment} />
                )) :
                <p className="text-gray-500">Nema komentara</p>
            }
        </div>
    )
    }

export default CommentList