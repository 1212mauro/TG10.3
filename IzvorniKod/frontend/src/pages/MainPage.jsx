import React, { createContext, useEffect, useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import BoardList from '../components/BoardList';
import HeaderComp from '../components/HeaderComp';
import ThreadList from '../components/ThreadList';
import client from "../lib/AxiosConfig";

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
            console.log(boards[0].boardID)
            boards.length == 1 && user.role !== 'ADMIN' && setOpenBoardID(boards[0].boardID)
        }
        
        fetch()
    }, [user])

    return (
    <UserContext.Provider value={user}>
        <div>
            <HeaderComp username={user?.username}
                        openBoardID={openBoardID}
                        setOpenBoardID={setOpenBoardID}
                        onLogout={() => {
                            localStorage.removeItem("authToken");
                            localStorage.removeItem("expiration");
                            sessionStorage.removeItem("user");
                            navigate("/");
                        }}/>
            {user && (openBoardID ? <ThreadList boardID={openBoardID}/> : <BoardList setOpenBoard={setOpenBoardID} />)}
        </div>
    </UserContext.Provider>
  )
};

export default MainPage
