import React, { useEffect } from 'react'
import BoardList from '../components/BoardList';
import HeaderComp from '../components/HeaderComp';
import korisnik from "../../public/korisnikInfo"; 
import { useState } from 'react';
import ThreadList from '../components/ThreadList';

function MainPage() {

    const [openBoardID, setOpenBoardID] = useState(null)

    useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    let uritoken = urlParams.get('token');
    if (uritoken) {
      localStorage.setItem('authToken', uritoken);
      navigate('/mainPage');
      return;
    }
    const token = localStorage.getItem('authToken'); // Dobijamo token iz sessionStorage
    if (!token) {
      // Ako nema tokena, preusmjeravamo na Login stranicu
      navigate("/");
      return;
    }
    }, [navigate]);
    
    return (
    <div>
        <HeaderComp username={korisnik.korisnickoIme} 
                    openBoardID={openBoardID} 
                    setOpenBoardID={setOpenBoardID}
                    onLogout={() => {
                        localStorage.removeItem('authToken');
                        navigate("/");
                    }
        />
        {openBoardID? <ThreadList boardID={openBoardID}/> : <BoardList setOpenBoard={setOpenBoardID} />}
    </div>
  )
};

export default MainPage
