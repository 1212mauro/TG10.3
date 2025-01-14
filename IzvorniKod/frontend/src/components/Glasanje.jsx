import React from "react";
import VotingSection from "./VotingSection";

const Glasanje = ({ glasanje, onVote }) => {
  return (
    <div className="p-4 bg-gray-100 rounded-lg mb-2">
      <p className="text-sm text-gray-700 mb-1">{glasanje.pitanje}</p>
      <VotingSection diskusija={glasanje} onVote={onVote} />
      <div className="text-xs text-gray-500 flex justify-between">
        <span>{glasanje.korisnik}</span>
        <span>{new Date(glasanje.timestamp).toLocaleString()}</span>
      </div>
    </div>
  );
};

export default Glasanje;
