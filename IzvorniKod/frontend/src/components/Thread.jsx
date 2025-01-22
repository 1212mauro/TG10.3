import React, { useState, useContext } from "react";
import ThreadDetails from "./ThreadDetails";
import VotingSection from "./VotingSection";


function Thread({ thread }){
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  function handleReadMore(){
    setIsModalOpen(true);
    console.log(isModalOpen)
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg mb-4 border border-gray-200 relative">
      {/* <h2 className="text-xl font-semibold text-gray-800">{thread.title}</h2> */}
      {/* <p className="text-gray-600 mt-2">
        {thread.description.substring(0, 40)}{thread.description.length > 40 && "..."}
      </p> */}
      <span
        className={`absolute top-2 right-2 text-sm font-semibold px-2 py-1 rounded-full ${
          thread.public
            ? "bg-green-200 text-green-800"
            : "bg-red-200 text-red-800"
        }`}
      >
        {thread.public ? "Public" : "Private"}
      </span>
      <h2 className="text-xl font-semibold text-gray-800 bg-gray-200 p-2 rounded-lg inline-block mb-4">
        {thread.title}
      </h2>
      <button onClick={handleReadMore} className="text-blue-500 text-sm absolute bottom-2 left-2">
        Read More
      </button>

      {isModalOpen && (
        <ThreadDetails
          thread={thread}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Thread;