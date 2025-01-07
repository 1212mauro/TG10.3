import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ThreadList from "../components/ThreadList";
import diskusijeData from "../../public/threads";
import HeaderComp from "../components/HeaderComp";
import korisnik from "../../public/korisnikInfo"; 

function MainPage(){
  const [threads, setThreads] = useState(diskusijeData);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  function toVote(id){
    setThreads((prevDiscussion) =>
      prevDiscussion.map((discussion) =>
        discussion.id === id && !discussion.korisnikGlasao
          ? { ...discussion, glasovi: discussion.glasovi + 1, korisnikGlasao: true }
          : discussion
      )
    );
  };

  //Provjera tokena i autentifikacije prilikom učitavanja komponente
  useEffect(() => {
    const token = localStorage.getItem('authToken'); // Dobijamo token iz sessionStorage
    if (!token) {
      // Ako nema tokena, preusmjeravamo na Login stranicu
      navigate("/");
      return;
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <div className="flex-grow p-4">
        <ThreadList threads={threads} toVote={toVote} />
      </div>

      <aside className="w-1/4 bg-blue-600 text-white p-4 flex flex-col items-center">
        <h1 className="text-xl font-bold mb-4">StanBlog</h1>
        <HeaderComp username={korisnik.korisnickoIme} />
      </aside>
    </div>
  );
};

export default MainPage;
