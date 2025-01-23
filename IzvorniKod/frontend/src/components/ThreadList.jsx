import React, { useContext, useEffect, useState } from "react";
import Thread from "./Thread";
import AddThreadForm from "./AddThreadForm"; 
import client from '../lib/AxiosConfig'
import { UserContext } from "../pages/MainPage";

function ThreadList({ boardID }){
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [threadList, setThreadList] = useState([]); 

  const user=useContext(UserContext)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const token = localStorage.getItem('authToken');
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    const response1 = await client.get(`/main/${boardID}/${user.userId}`, config)
    const response2 = await client.get(`/main/public/${boardID}`, config)
    console.log(response1.data)
    console.log(response2.data)
    setThreadList([...response1.data, ...response2.data])
    if (user.role === 'ADMIN'){
      let res = await client.get(`/main/allThreadsForBoard/${boardID}`, config)
      setThreadList(res.data)
    }
  }

  async function HandleSaveThread(newThread){
    newThread.boardID = boardID
    newThread.initiator = user
    console.log(newThread)
    const token = localStorage.getItem('authToken');
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    let response = await client.post(`/main/addThread/${boardID}`, JSON.stringify(newThread), config)
    newThread = response.data
    newThread.comments = []
    console.log(newThread)
    let setThread = response.data.public || response.data.participants.filter(p => p.userId == user.userId).length > 0 || user.role === 'ADMIN'
    setThread && setThreadList(p => [...p, response.data])

    console.log(threadList)
  };

  return (
    <div className="flex-grow p-4">
      <section className="container-xl lg:container m-auto">
        <h1 className="text-xl font-bold text-center">Diskusije</h1>

        <div className="flex flex-col gap-4 border-gray-300 rounded-lg p-6">
          {threadList.map(thread => (
            <div key={thread.threadID} className="flex flex-col">
                <Thread thread={thread} />
            </div>
          ))}

        <div
          onClick={() => setIsFormOpen(true)}
          // className="flex flex-col justify-center items-center p-6 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-100"
          className="flex flex-col justify-center items-center p-6 mt-4 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-100"

        >
          <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
            Dodaj novu diskusiju
          </button>
        </div>
      </div>

      {isFormOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <AddThreadForm onClose={() => setIsFormOpen(false)} onSave={HandleSaveThread} boardID={boardID} />
        </div>
      )}
      </section>
    </div>
  );
};

export default ThreadList;
