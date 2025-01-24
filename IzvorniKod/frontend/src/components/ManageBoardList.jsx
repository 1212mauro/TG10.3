import React, { useEffect, useState } from "react";
import client from "../lib/AxiosConfig";
import BoardToManage from "./BoardToManage";

function ManageBoardList() {
  const [boardList, setBoardList] = useState([]);

  useEffect(() => {
    const fetchBoards = async () => {
      const token = localStorage.getItem("authToken");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      try {
        const res = await client.get(`/main/getBoards`, config);
        setBoardList(res.data);
      } catch (error) {
        console.error("Error fetching boards:", error);
      }
    };
    fetchBoards();
  }, []);

  async function updateBoard(updatedBoard){
    const token = localStorage.getItem("authToken");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    let res = await client.put(`/main/updateBoard`, updatedBoard, config)
    updatedBoard = res.data
    setBoardList(prevBoards => prevBoards.map(prevBoard => prevBoard.boardID == updatedBoard.boardID ? updatedBoard : prevBoard))
  }

  return (
    <section className="container-xl lg:container m-auto">
      <h1 className="text-xl font-bold text-center">Upravljanje Pločama</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-gray-300 rounded-lg p-6">
        {boardList.map((board) => (
          <BoardToManage board={board} updateBoard={(board) => updateBoard(board)} />
        ))}
        {boardList.length == 0 && (
          <p className="text-center text-gray-500 col-span-full">
            No boards available to manage
          </p>
        )}
      </div>
    </section>
  );
}

export default ManageBoardList;