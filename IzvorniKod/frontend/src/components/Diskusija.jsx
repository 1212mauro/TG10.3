// components/Diskusija.jsx
import React, { useState } from "react";
import DiskusijaDetalji from "./DiskusijaDetalji";
import VotingSection from "./VotingSection";

const Diskusija = ({ diskusija, naGlasanje }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [komentari, setKomentari] = useState(diskusija.komentari);

  const handleReadMore = () => {
    setIsModalOpen(true);
  };

  const handleAddComment = (komentarTekst) => {
    const noviKomentar = {
      id: komentari.length + 1,
      komentar: komentarTekst,
      korisnik: "Trenutni korisnik",
      timestamp: Date.now(),
    };
    setKomentari([...komentari, noviKomentar]);
  };

  const handleVote = () => {
    naGlasanje(diskusija.id);
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg mb-4 border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-800">{diskusija.naslov}</h2>
      <p className="text-gray-600 mt-2">
        {diskusija.opis.substring(0, 50)}...
      </p>
      <button onClick={handleReadMore} className="text-blue-500 text-sm mt-2">
        Pročitaj više
      </button>

      
      {diskusija.hasVoting && <VotingSection diskusija={diskusija} onVote={handleVote} />}

      {isModalOpen && (
        <DiskusijaDetalji
          diskusija={diskusija}
          komentari={komentari}
          onClose={() => setIsModalOpen(false)}
          onAddComment={handleAddComment}
        />
      )}
    </div>
  );
};

export default Diskusija;