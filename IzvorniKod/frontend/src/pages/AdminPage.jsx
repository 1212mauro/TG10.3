import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderComp from "../components/HeaderComp";
import ManageBoardList from "../components/ManageBoardList";
import ManageUsersList from "../components/ManageUsersList";
import client from "../lib/AxiosConfig";

export const UserContext = createContext();

export const AdminPage = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(() => {
    const storedUser = sessionStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : undefined;
  });

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/"); // Preusmjeravanje na Login ako nema tokena
      return;
    }

    if (!user) {
      getUser();
    }
  }, [navigate, user]);

  const getUser = async () => {
    const token = localStorage.getItem("authToken");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    try {
      const res = await client.get(`/main/userInfo`, config);
      const user = res.data;
      sessionStorage.setItem("user", JSON.stringify(user));
      setUser(user);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  return (
    <UserContext.Provider value={user}>
      <HeaderComp
        username={user?.username}
        adminPage="true"
        onLogout={() => {
          localStorage.removeItem("authToken");
          sessionStorage.removeItem("user");
          navigate("/");
        }}
      />
      <ManageBoardList />
      
      <ManageUsersList />
    </UserContext.Provider>
  );
};

export default AdminPage;
