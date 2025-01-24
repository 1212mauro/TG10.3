import React, { createContext, useEffect, useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import BoardList from '../components/BoardList';
import HeaderComp from '../components/HeaderComp';
import ThreadList from '../components/ThreadList';
import client from "../lib/AxiosConfig";
import axios from "axios";

export const UserContext = createContext()

function MainPage() {

    const [openBoardID, setOpenBoardID] = useState()
    const navigate = useNavigate()

    const [user, setUser] = useState(() => {
        const storedUser = sessionStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : undefined;
    });


    useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    let uritoken = urlParams.get('token');
    if (uritoken) {
        let expiration = urlParams.get('expiration');
        localStorage.setItem('authToken', uritoken);
        localStorage.setItem('expiration', expiration);
        getUser();
        navigate('/main');
        return;
    }
    const token = localStorage.getItem('authToken'); // Dobijamo token iz sessionStorage
    if (!token) {
        // Ako nema tokena, preusmjeravamo na Login stranicu
        navigate("/");
        return;
    }
    if (!user) {
        getUser();
    }
    }, [navigate]);

    const getUser = async () => {
        const token = localStorage.getItem('authToken');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        let res = await client.get(`/main/userInfo`, config)
        let user = res.data
        console.log(user)
        sessionStorage.setItem("user" , JSON.stringify(user))
        setUser(user)
    }

    useEffect(() => {
        const fetch = async () => {
            const token = localStorage.getItem('authToken');
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            let res = await client.get(`/main/getBoardsForUser/${user.userId}`, config)
            let boards = res.data
            boards.length == 1 && user.role !== 'ADMIN' && user.role !== 'SUPERADMIN' && setOpenBoardID(boards[0].boardID)
        }
        
        fetch()
    }, [user])

    async function test(){
        let testData={
            MeetingTitle : "test",
            ScheduledDate : new Date("01-02-2025 12:13:14"),
            MeetingSummary : "testiranje",
            ThreadTitle : "threadTitle1",
            ThreadDescription : "testiranje"
        }
        let res = await axios.post("https://apartmeet-backend.onrender.com/meetings/thread", testData)
        console.log(res)
    }

    return (
    <UserContext.Provider value={user}>
        {user && 
            <div>    
            <HeaderComp username={user.username}
                openBoardID={openBoardID}
                setOpenBoardID={setOpenBoardID}
                onLogout={() => {
                    localStorage.removeItem("authToken");
                    localStorage.removeItem("expiration");
                    sessionStorage.removeItem("user");
                    navigate("/");
                }}/>
                {openBoardID ? <ThreadList boardID={openBoardID}/> : <BoardList setOpenBoard={setOpenBoardID} />}
            </div>}
        <button onClick={test}>COOL BUTTON</button>
    </UserContext.Provider>
  )
};

export default MainPage
