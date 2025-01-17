import React, { createContext, useEffect, useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import BoardList from '../components/BoardList';
import HeaderComp from '../components/HeaderComp';
import ThreadList from '../components/ThreadList';
import client from "../lib/AxiosConfig";

export const UserContext = createContext()

function MainPage() {

    const [openBoardID, setOpenBoardID] = useState(null)
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
        let user = await client.get(`/main/userInfo`, config)
        console.log(user)
        sessionStorage.setItem("user" , JSON.stringify(user.data))
        setUser(user.data)
    }

    return (
    <UserContext.Provider value={user}>
        <div>
            <HeaderComp username={user?.username}
                        openBoardID={openBoardID ? openBoardID : undefined}
                        setOpenBoardID={setOpenBoardID}
                        onLogout={() => {
                            localStorage.removeItem("authToken");
                            sessionStorage.removeItem("user");
                            navigate("/");
                        }}/>
            {openBoardID? <ThreadList boardID={openBoardID ? openBoardID : undefined}/> : <BoardList setOpenBoard={setOpenBoardID} />}
        </div>
    </UserContext.Provider>
  )
};

export default MainPage
