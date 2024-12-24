import React, { useState } from "react";
import Modal from "./Modal";
import CommentList from "./CommentList";
import AddComment from "./AddComment";

function DiscussionDetails({ discussion, comments, onClose, onAddComment }){
  const [isAddingComment, setIsAddingComment] = useState(false);
  const [newComment, setNewComment] = useState("");

  const HandleSaveComment = () => {
    onAddComment(newComment);
    setNewComment("");
    setIsAddingComment(false);
  };

  return (
    <Modal title={discussion.naslov} onClose={onClose}>
      <p className="text-gray-700 mb-4">{discussion.opis}</p>
      <CommentList comments={comments} />
      {isAddingComment ? (
        <AddComment HandleSave={HandleSaveComment} setNewComment={setNewComment}></AddComment>
      ) : (
        <button
          onClick={() => setIsAddingComment(true)}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          Add comment
        </button>
      )}
    </Modal>
  );
};

export default DiscussionDetails;
