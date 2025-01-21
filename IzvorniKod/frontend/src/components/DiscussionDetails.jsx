import React, { useState } from "react";
import Comment from "./Comment";
import Voting from "./Voting";
import Modal from "./Modal";

const DiscussionDetails = ({ discussion, comments, votings, onClose, onAddComment, onAddQuestion, onVote }) => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const [isAddingQuestion, setIsAddingQuestion] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [newQuestion, setNewQuestion] = useState("");

  const handleSaveComment = () => {
    onAddComment(newComment);
    setNewComment("");
    setIsAddingComment(false);
  };

  const handleSaveQuestion = () => {
    onAddQuestion(newQuestion);
    setNewQuestion("");
    setIsAddingQuestion(false);
  };

  return (
    <Modal title={discussion.title} onClose={onClose}>
      <p className="text-gray-700 mb-4">{discussion.description}</p>

      <div className="flex flex-col lg:flex-row gap-4 mt-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-2">Comments</h3>
          {comments.length > 0 ? (
            comments.map((comment) => <Comment key={comment.id} comment={comment} />)
          ) : (
            <p className="text-gray-500">No comments</p>
          )}

          {isAddingComment ? (
            <div className="mt-4">
              <textarea
                className="w-full p-2 border border-gray-300 rounded-lg"
                rows="3"
                placeholder="Enter your comment"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              ></textarea>
              <button
                onClick={handleSaveComment}
                className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
              >
                Save comment
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsAddingComment(true)}
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            >
              Add comment
            </button>
          )}
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-2">Votings</h3>
          {votings.length > 0 ? (
            votings.map((voting) => (
              <Voting key={voting.id} voting={voting} onVote={onVote} />
            ))
          ) : (
            <p className="text-gray-500">No votings</p>
          )}

          {isAddingQuestion ? (
            <div className="mt-4">
              <textarea
                className="w-full p-2 border border-gray-300 rounded-lg"
                rows="3"
                placeholder="Enter your question"
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
              ></textarea>
              <button
                onClick={handleSaveQuestion}
                className="mt-2 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
              >
                Save question
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsAddingQuestion(true)}
              className="mt-4 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
            >
              Add question
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default DiscussionDetails;
