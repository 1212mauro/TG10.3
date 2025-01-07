import React, { useEffect, useState } from "react";
import Thread from "./Thread";
import AddThreadForm from "./AddThreadForm"; 
import client from '../lib/AxiosConfig'


function ThreadList({ threads, toVote }){
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [threadList, setThreadList] = useState(threads); 


  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const response = await client.get("/main")
    console.log(response)
    return response
  }

  const HandleOpenForm = () => {
    setIsFormOpen(true);
  };

  const HandleCloseForm = () => {
    setIsFormOpen(false);
  };

  const HandleSaveDiscussion = (newThread) => {
    console.log(newThread);
    setThreadList((prevDiscussion) => [...prevDiscussion, newThread]); //dodavanje u state
    client.post("/main/add", JSON.stringify(newThread))
  };

  return (
    <section className="container-xl lg:container m-auto">
      <h1 className="text-xl font-bold text-center">Diskusije</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-gray-300 rounded-lg p-6">
        {threadList.map((thread) => (
          <div key={thread.id} className="flex flex-col">
            <Thread thread={thread} toVote={toVote} />
          </div>
        ))}

        <div
          onClick={HandleOpenForm}
          className="flex flex-col justify-center items-center p-6 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-100"
        >
          <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
            Dodaj novu diskusiju
          </button>
        </div>
      </div>

      {isFormOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <AddThreadForm onClose={HandleCloseForm} onSave={HandleSaveDiscussion} />
        </div>
      )}
    </section>
  );
};

export default ThreadList;
