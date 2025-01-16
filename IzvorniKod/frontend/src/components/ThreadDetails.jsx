import React, { useContext, useEffect, useState } from "react";
import Modal from "./Modal";
import CommentList from "./CommentList";
import AddComment from "./AddComment";
import { UserContext } from "../pages/MainPage";
import client from '../lib/AxiosConfig'

function ThreadDetails({ thread, onClose, handleAddComment }){
  const [isAddingComment, setIsAddingComment] = useState(false);
  const [comments, setComments] = useState(thread.comments);

  const user = useContext(UserContext)

  useEffect(() => {
    console.log(thread)
  }, []);

  function HandleSaveComment(comment){
    handleAddComment(comment);
    setIsAddingComment(() => false);
  };

  async function HandleDeleteComment(commentID) {
    const token = localStorage.getItem('authToken');
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    let res = await client.delete(`/main/deleteComment/${thread.threadID}/${commentID}`, config)
    let newComments = comments.filter(comment => comment.messageId != commentID) 
    console.log(newComments)
    setComments(() => newComments)
    console.log(res.data)
  }

  async function handleAddComment(commentText){
    const newComment = {
      id: null,
      content: commentText,
      timeSent: Date.now(),
      messageAuthor : user,
    };
    const token = localStorage.getItem('authToken');
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    let newComments = await client.post(`/main/addComment/${thread.threadID}`, JSON.stringify(newComment), config)
    console.log(newComments)
    setComments(newComments.data);
  };

  return (
    <Modal title={thread.title} onClose={onClose}>
      <p className="text-gray-700 mb-4">{thread.description}</p>
      <CommentList comments={comments} deleteComment={HandleDeleteComment}/>
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

export default ThreadDetails;
