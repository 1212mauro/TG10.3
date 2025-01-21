import React, { useEffect, useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import DiscussionList from "../components/DiscussionList";
import discussionsData from "../../public/discussions";
import HeaderComp from "../components/HeaderComp";
import user from "../../public/userInfo"; 

const MainPage = () => {
  const [discussions, setDiscussions] = useState(discussionsData);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const onVote = (id) => {
    setDiscussions((previousDiscussions) =>
      previousDiscussions.map((discussion) =>
        discussion.id === id && !discussion.userVoted
          ? { ...discussion, votes: discussion.votes + 1, userVoted: true }
          : discussion
      )
    );
  };

  // Token and authentication check when the component loads
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    let urlToken = urlParams.get('token');
    if (urlToken) {
      localStorage.setItem('authToken', urlToken);
      navigate('/mainPage');
      return;
    }
    const token = localStorage.getItem('authToken'); // Get token from localStorage
    if (!token) {
      // If there is no token, redirect to the Login page
      navigate("/");
      return;
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <div className="flex-grow p-4 overflow-y-auto max-h-screen">
        <DiscussionList discussions={discussions} onVote={onVote} />
      </div>

      <aside className="w-1/4 bg-blue-600 text-white p-4 flex flex-col items-center">
        <h1 className="text-xl font-bold mb-4">StanBlog</h1>
        <HeaderComp username={user.username} onLogout={
          () => {
            localStorage.removeItem('authToken');
            navigate("/");
          }
        } />
      </aside>
    </div>
  );
};

export default MainPage;
