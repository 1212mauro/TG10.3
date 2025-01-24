import React, { useContext, useEffect, useState } from "react";
import Modal from "./Modal";
import CommentList from "./CommentList";
import AddComment from "./AddComment";
import { UserContext } from "../pages/MainPage";
import client from '../lib/AxiosConfig'
import { BoardContext } from "./ThreadList";
import MeetingDisplay from "./MeetingDisplay";

function ThreadDetails({ thread, onClose, handleAddComment }){
  const [isAddingComment, setIsAddingComment] = useState(false);
  const [isAddingQuestion, setIsAddingQuestion] = useState(false);
  const [comments, setComments] = useState(thread.comments);
  const [meeting, setMeeting] = useState(thread.meeting);
  const [viewMeetingOpen, setViewMeetingOpen] = useState(false);

  const user = useContext(UserContext)

  function HandleSaveComment(comment, hasVoting){
    handleAddComment(comment, hasVoting);
    setIsAddingComment(() => false);
    setIsAddingQuestion(() => false);
  };

  async function HandleDeleteComment(commentID) {
    const token = localStorage.getItem('authToken');
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    let res = await client.delete(`/main/deleteComment/${thread.threadID}/${commentID}`, config)
    let newComments = comments.filter(comment => comment.messageId != commentID) 
    setComments(() => newComments)
  }

  async function handleAddComment(commentText, hasVoting){
    let newComment = {
      id: null,
      content: commentText,
      timeSent: Date.now(),
      messageAuthor : user,
      hasVoting : hasVoting
    };
    const token = localStorage.getItem('authToken');
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    let res = await client.post(`/main/addComment/${thread.threadID}`, JSON.stringify(newComment), config)
    newComment = res.data
    newComment.votes = []
    console.log(newComment)
    setComments(c => [...c, newComment]);
  };

  return (
    <Modal title={thread.title} onClose={onClose}>
      {!viewMeetingOpen ? (
        <><p className="text-gray-700 mb-4">{thread.description}</p><div className="flex flex-col lg:flex-row gap-4 mt-4">
          <CommentList label={"comments"} comments={comments.filter(comment => !comment.hasVoting)} deleteComment={HandleDeleteComment} />
          {meeting && <button
            onClick={() => setViewMeetingOpen(true)}
            className="absolute top-8 right-16 bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700"
          >
            View meeting details
          </button>}
          {isAddingComment ? (
            <AddComment HandleSaveComment={(content) => HandleSaveComment(content, false)} />
          ) : (
            <button
              onClick={() => setIsAddingComment(true)}
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            >
              Add comment
            </button>
          )}
          <CommentList label={"questions"} comments={comments.filter(comment => comment.hasVoting)} deleteComment={HandleDeleteComment} thread={thread} setMeeting={setMeeting} />
          {(user.role === 'ADMIN' || user.role === 'SUPERADMIN' || user.userId == thread.initiator.userId) && (
            isAddingQuestion ? (
              <AddComment HandleSaveComment={(content) => HandleSaveComment(content, true)} />
            ) : (
              <button
                onClick={() => setIsAddingQuestion(true)}
                className="mt-4 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
              >
                Add comment
              </button>
            ))}
        </div></>
    ) : (
      <MeetingDisplay meeting={meeting} onClose={() => setViewMeetingOpen(false)} />
    )}
    </Modal>
  );
};

export default ThreadDetails;
