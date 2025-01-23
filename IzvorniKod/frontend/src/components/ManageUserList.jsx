import React, { useEffect, useState } from "react";
import client from "../lib/AxiosConfig";
import UserToManage from "./UserToManage";
import UserManageForm from "./UserManageForm";

function ManageUsersList() {
  const [userList, setUserList] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  // Dohvaćanje svih korisnika za administraciju
  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("authToken");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      try {
        const res = await client.get(`/main/getUsers`, config);
        setUserList(res.data);
        console.log("Fetched users:", res.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const handleCloseForm = () => {
    setSelectedUser(null);
  };

  return (
    <section className="container-xl lg:container m-auto">
      <h1 className="text-xl font-bold text-center">Upravljanje Korisnicima</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-gray-300 rounded-lg p-6">
        
        {userList.map((user) => (
          <UserToManage user={user} onManageClick={handleUserClick} />
        ))}

        {userList.length === 0 && (
          <p className="text-center text-gray-500 col-span-full">
            Nema dostupnih korisnika za prikaz.
          </p>
        )}
      </div>

      {selectedUser && (
        <UserManageForm user={selectedUser} onClose={handleCloseForm} />
      )}

    </section>
  );
}

export default ManageUsersList;