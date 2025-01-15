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

    const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("user")))

    useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    let uritoken = urlParams.get('token');
    if (uritoken === "tost") {
        localStorage.setItem('authToken', uritoken);
        navigate('/main');
        return;
    } else if(uritoken){
        let username = JSON.parse(atob(uritoken.split(".")[1])).sub
        let user = getOauthUser(username)
        console.log(user)
        setUser(user)
        localStorage.setItem('authToken', "tost");
        navigate('/main');
        return;
    }
    const token = localStorage.getItem('authToken'); // Dobijamo token iz sessionStorage
    if (!token) {
        // Ako nema tokena, preusmjeravamo na Login stranicu
        navigate("/");
        return;
    }
    }, [navigate]);

    async function getOauthUser(username) {
        return await client.get(`/auth/getOauthUser/${username}`)
    }

    return (
    <UserContext.Provider value={user}>
        <div>
            <HeaderComp username={user.username}
                        openBoardID={openBoardID}
                        setOpenBoardID={setOpenBoardID}
                        onLogout={() => {
                            localStorage.removeItem("authToken");
                            sessionStorage.removeItem("user");
                            navigate("/");
                        }}/>
            {openBoardID? <ThreadList boardID={openBoardID}/> : <BoardList setOpenBoard={setOpenBoardID} />}
        </div>
    </UserContext.Provider>
  )
};

export default MainPage
