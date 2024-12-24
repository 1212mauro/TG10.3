import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import CommentList from "./CommentList";
import AddComment from "./AddComment";

function DiscussionDetails({ discussion, comments, onClose, handleAddComment }){
  const [isAddingComment, setIsAddingComment] = useState(false);

  useEffect(() => {
    console.log(discussion)
  }, []);

  function HandleSaveComment(comment){
    handleAddComment(comment);
    setIsAddingComment(false);
  };

  return (
    <Modal title={discussion.title} onClose={onClose}>
      <p className="text-gray-700 mb-4">{discussion.description}</p>
      <CommentList comments={comments} />
      {isAddingComment ? (
        <AddComment HandleSaveComment={HandleSaveComment}></AddComment>
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
