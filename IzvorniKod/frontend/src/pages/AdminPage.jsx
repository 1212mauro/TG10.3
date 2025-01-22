import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderComp from "../components/HeaderComp";
import client from "../lib/AxiosConfig";
import ManageBoardList from "../components/ManageBoardList";
import ManageUsersList from "../components/ManageUserList";

export const UserContext = createContext();

function AdminPage(){

    const [user, setUser] = useState(() => {
        const storedUser = sessionStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : undefined;
    });
    const [manageBoards, setManageBoards] = useState(true)

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (!token || !user || user.role !== 'ADMIN') {
            navigate("/")
        }
    }, [navigate, user]);

    return (
        <UserContext.Provider value={user}>
            {user && (<HeaderComp
                        username={user.username}
                        setOpenBoardID={(x) => null}
                        onLogout={() => {
                            localStorage.removeItem("authToken");
                            localStorage.removeItem("expiration");
                            sessionStorage.removeItem("user");
                            navigate("/");
                        }}/>)}
            <div className="relative flex flex-row w-full">
                <button
                    disabled={manageBoards}
                    onClick={() => setManageBoards(true)}
                    className={`ml-4 mt-4 bg-${!manageBoards ? "blue" : "gray"}-500 ${!manageBoards ? "hover:bg-blue-700" : ""} text-white py-4 px-4 rounded-lg`}
                >
                    Manage Boards
              </button>
              <button
                    disabled={!manageBoards}
                    onClick={() => setManageBoards(false)}
                    className={`ml-4 mt-4 bg-${manageBoards ? "blue" : "gray"}-500 ${manageBoards ? "hover:bg-blue-700" : ""} text-white py-4 px-4 rounded-lg`}
                >
                    Manage Users
              </button>
            </div>
            {manageBoards ? <ManageBoardList /> : <ManageUsersList />}
        </UserContext.Provider>
    );
};

export default AdminPage;