import React, { useState } from "react";
import Discussion from "./Discussion";
import AddDiscussionForm from "./AddDiscussionForm"; 

function DiscussionList({ discussions, toVote }){
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [discussionsState, setDiscussionsState] = useState(discussions); 

  const HandleOpenForm = () => {
    setIsFormOpen(true);
  };

  const HandleCloseForm = () => {
    setIsFormOpen(false);
  };

  const HandleSaveDiscussion = (newDiscussion) => {
    console.log(newDiscussion);
    setDiscussionsState((prevDiscussion) => [...prevDiscussion, newDiscussion]); //dodavanje u state
  };

  return (
    <section className="container-xl lg:container m-auto">
      <h1 className="text-xl font-bold text-center">Diskusije</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-gray-300 rounded-lg p-6">
        {discussionsState.map((discussion) => (
          <div key={discussion.id} className="flex flex-col">
            <Discussion discussion={discussion} toVote={toVote} />
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
          <AddDiscussionForm onClose={HandleCloseForm} onSave={HandleSaveDiscussion} />
        </div>
      )}
    </section>
  );
};

export default DiscussionList;
