import React, { useEffect, useState } from "react";
import client from "../lib/AxiosConfig";

function ManageUsersList() {
  const [userList, setUserList] = useState([]);

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

  return (
    <section className="container-xl lg:container m-auto">
      <h1 className="text-xl font-bold text-center">Upravljanje Korisnicima</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-gray-300 rounded-lg p-6">
        {userList.map((user, index) => (
          <div
            key={index}
            className="bg-gray-200 p-4 border border-gray-300 w-full text-center rounded-lg"
          >
            <p className="font-bold">{user.username}</p>
            <p>{user.email}</p>
            <p>{user.role}</p>
            <button
              onClick={() => console.log("Manage user:", user.userId)}
              className="mt-4 py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white rounded-lg"
            >
                Manage Users
            </button>
          </div>
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
