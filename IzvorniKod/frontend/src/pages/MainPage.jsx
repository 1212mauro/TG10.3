import React, { useEffect } from 'react'
import BoardList from '../components/BoardList';
import HeaderComp from '../components/HeaderComp';
import korisnik from "../../public/korisnikInfo"; 
import { useState } from 'react';
import ThreadList from '../components/ThreadList';

function MainPage() {

    const [openBoardID, setOpenBoardID] = useState(null)

    return (
    <div>
        <HeaderComp username={korisnik.korisnickoIme} openBoardID={openBoardID} setOpenBoardID={setOpenBoardID}/>
        {openBoardID? <ThreadList boardID={openBoardID}/> : <BoardList setOpenBoard={setOpenBoardID} />}
    </div>
  )
};

export default MainPage