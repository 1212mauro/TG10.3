import React, { useEffect, useState } from "react";
import client from "../lib/AxiosConfig";
import UserToManage from "./UserToManage";

function ManageUsersList() {
  const [activeUser, setUser] = useState(JSON.parse(sessionStorage.getItem("user")));
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const token = localStorage.getItem("authToken");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    try {
      const res = await client.get(`/main/getUsers`, config);
      setUserList(res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  function isDisabled(role){
    return ((activeUser.role === 'ADMIN' && (role === 'ADMIN' || role === 'SUPERADMIN')) || (activeUser.role === 'SUPERADMIN' && role === 'SUPERADMIN'))
  }

  async function updateUser(updatedUser) {
    const token = localStorage.getItem("authToken");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    let res = await client.put(`/main/updateUser`, updatedUser, config)
    updatedUser = res.data
    setUserList(prevUsers => prevUsers.map(prevUser => prevUser.userId == updatedUser.userId ? updatedUser : prevUser))
  }

  return (
    <section className="container-xl lg:container m-auto">
      <h1 className="text-xl font-bold text-center">Upravljanje Korisnicima</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-gray-300 rounded-lg p-6">
        {userList.map((user) => (
          <UserToManage key={user.userId} disabled={isDisabled(user.role)} user={user} updateUser={(user) => updateUser(user)} />
        ))}
        {userList.length === 0 && (
          <p className="text-center text-gray-500 col-span-full">
            Nema dostupnih korisnika za prikaz.
          </p>
        )}
      </div>
    </section>
  );
}

export default ManageUsersList;