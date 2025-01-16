import React, { useEffect, useState } from "react";
import Thread from "./Thread";
import AddThreadForm from "./AddThreadForm"; 
import client from '../lib/AxiosConfig'

function ThreadList({ boardID }){
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [threadList, setThreadList] = useState([]); 

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    console.log(boardID)
    const token = localStorage.getItem('authToken');
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    const response = await client.get(`/main/${boardID}`, config)
    console.log(response.data)
    setThreadList(response.data)
  }

  async function HandleSaveThread(newThread){
    newThread.boardID = boardID
    const token = localStorage.getItem('authToken');
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    let response = await client.post(`/main/addThread/${boardID}`, JSON.stringify(newThread), config)
    console.log(response.data)
    setThreadList(p => [...p, response.data])

    console.log(threadList)
  };

  return (
    <div className="flex-grow p-4">
      <section className="container-xl lg:container m-auto">
        <h1 className="text-xl font-bold text-center">Diskusije</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-gray-300 rounded-lg p-6">
          {threadList.map(thread => (
            <div key={thread.threadID} className="flex flex-col">
                <Thread thread={thread} />
            </div>
          ))}

        <div
          onClick={() => setIsFormOpen(true)}
          className="flex flex-col justify-center items-center p-6 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-100"
        >
          <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
            Dodaj novu diskusiju
          </button>
        </div>
      </div>

      {isFormOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <AddThreadForm onClose={() => setIsFormOpen(false)} onSave={HandleSaveThread} />
        </div>
      )}
      </section>
    </div>
  );
};

export default ThreadList;
