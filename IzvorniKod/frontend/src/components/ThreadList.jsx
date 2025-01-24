import React, { createContext, useContext, useEffect, useState } from "react";
import Thread from "./Thread";
import AddThreadForm from "./AddThreadForm"; 
import client from '../lib/AxiosConfig'
import { UserContext } from "../pages/MainPage";

export const BoardContext = createContext()

function ThreadList({ boardID }){
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [threadList, setThreadList] = useState([]); 
  const [allowed, setAllowed] = useState([])

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
    const response2 = await client.get(`/main/allThreadsForBoard/${boardID}`, config)
    setThreadList(response2.data)
    setAllowed(response1.data)
  }

  async function handleDelete(thread){
    const token = localStorage.getItem('authToken');
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    let res = await client.delete(`/main/deleteThreadFromBoard/${boardID}/${thread.threadID}`, config)
    console.log(res)
    setThreadList(pastThreads => pastThreads.filter(pastThread => pastThread.threadID != thread.threadID))
  }

  async function handleSaveThread(newThread){
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
    let setThread = response.data.public || response.data.participants.filter(p => p.userId == user.userId).length > 0 || (user.role === 'ADMIN' || user.role === 'SUPERADMIN')
    setThreadList(p => [...p, response.data])
    setThread && setAllowed(a => [...a, response.data])
    console.log(threadList)
  };

  function isDisabled(thread){
    console.log(allowed)
    return (user.role === 'REPRESENTATIVE' || user.role === 'TENANT') && allowed.filter(allowedThread => allowedThread.threadID == thread.threadID).length == 0 && !thread.public
  }

  return (
    <BoardContext.Provider value={boardID}>
      <div className="flex-grow p-4">
        <section className="container-xl lg:container m-auto">
          <h1 className="text-xl font-bold text-center">Diskusije</h1>
          <div className="flex flex-col gap-4 border-gray-300 rounded-lg p-6">
            {threadList.map(thread => (
              <div key={thread.threadID} className="flex flex-col">
                  <Thread disabled={isDisabled(thread)} thread={thread} handleDelete={() => handleDelete(thread)}/>
              </div>
            ))}

          <div
            onClick={() => setIsFormOpen(true)}
            className="flex flex-col justify-center items-center p-6 mt-4 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-100"
          >
            <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
              Add new thread
            </button>
          </div>
        </div>

        {isFormOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <AddThreadForm onClose={() => setIsFormOpen(false)} onSave={handleSaveThread} boardID={boardID} />
          </div>
        )}
        </section>
      </div>
    </BoardContext.Provider>
  );
};

export default ThreadList;
