import React, { useEffect, useState } from "react";
import client from "../lib/AxiosConfig";
import BoardToManage from "./BoardToManage";
import BoardManageForm from "./BoardManageForm";

function ManageBoardList() {
  const [boardList, setBoardList] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState(null);

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

  const handleBoardClick = (board) => {
    setSelectedBoard(board);
  };

  const handleCloseBoard = () => {
    setSelectedBoard(null);
  };

  return (
    <section className="container-xl lg:container m-auto">
      <h1 className="text-xl font-bold text-center">Upravljanje Pločama</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-gray-300 rounded-lg p-6">
        
        {boardList.map((board) => (
          <BoardToManage key={board.boardID} board={board} onManageClick={handleBoardClick}/>
        ))}
        {boardList.length == 0 && (
          <p className="text-center text-gray-500 col-span-full">
            No boards available to manage
          </p>
        )}
      </div>
      {selectedBoard && (
        <BoardManageForm board={selectedBoard} onClose={handleCloseBoard} />
      )}
    </section>
  );
}

export default ManageBoardList;