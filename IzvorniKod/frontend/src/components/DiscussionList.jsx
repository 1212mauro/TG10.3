import React, { useState } from "react";
import Discussion from "./Discussion";
import AddDiscussionForm from "./AddDiscussionForm"; 

const DiscussionList = ({ discussions, onVote }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [discussionsState, setDiscussionsState] = useState(discussions); 

  const handleAddClick = () => {
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  const handleSaveDiscussion = (newDiscussion) => {
    setDiscussionsState((prevDiscussions) => [...prevDiscussions, newDiscussion]);
  };

  return (
    <section className="container-xl lg:container m-auto">
      <h1 className="text-xl font-bold text-center">Discussions</h1>
      <div className="flex flex-col gap-4 border-gray-300 rounded-lg p-6">
        {discussionsState.map((discussion) => (
          <div key={discussion.id} className="flex flex-col">
            <Discussion discussion={discussion} onVote={onVote} />
          </div>
        ))}

        <div
          onClick={handleAddClick}
          className="flex flex-col justify-center items-center p-6 mt-4 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-100"
        >
          <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
            Add new discussion
          </button>
        </div>
      </div>

      {isFormOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <AddDiscussionForm onClose={handleCloseForm} onSave={handleSaveDiscussion} />
        </div>
      )}
    </section>
  );
};

export default DiscussionList;
