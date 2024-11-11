import React from "react";

const Komentar = ({ komentar }) => {
  return (
    <div className="p-4 bg-gray-100 rounded-lg mb-2">
      <p className="text-sm text-gray-700 mb-1">{komentar.komentar}</p>
      <div className="text-xs text-gray-500 flex justify-between">
        <span>{komentar.korisnik}</span>
        <span>{new Date(komentar.timestamp).toLocaleString()}</span>
      </div>
    </div>
  );
};

export default Komentar;
