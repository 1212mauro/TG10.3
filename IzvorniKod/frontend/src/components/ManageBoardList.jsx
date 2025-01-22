import React, { useEffect, useState } from "react";
import client from "../lib/AxiosConfig";

function ManageBoardList() {
  const [boardList, setBoardList] = useState([]);

  // Dohvaćanje svih ploča za administraciju
  useEffect(() => {
    const fetchBoards = async () => {
      const token = localStorage.getItem("authToken");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      try {
        const res = await client.get(`/main/getBoards`, config);
        setBoardList(res.data);
        console.log("Fetched boards:", res.data);
      } catch (error) {
        console.error("Error fetching boards:", error);
      }
    };

    fetchBoards();
  }, []);

  return (
    <section className="container-xl lg:container m-auto">
      <h1 className="text-xl font-bold text-center">Upravljanje Pločama</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-gray-300 rounded-lg p-6">
        {boardList.map((board, index) => (
          <div
            key={index}
            className="bg-gray-200 p-4 border border-gray-300 w-full text-center rounded-lg"
          >
            <p className="font-bold">{board.address}</p>
            <button
              onClick={() => console.log("Manage board:", board.boardID)}
              className="mt-4 py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white rounded-lg"
            >
              Manage Board
            </button>
          </div>
        ))}
        {boardList.length === 0 && (
          <p className="text-center text-gray-500 col-span-full">
            Nema dostupnih ploča za prikaz.
          </p>
        )}
      </div>
    </section>
  );
}

export default ManageBoardList;
