// components/Diskusija.jsx
import React, { useState } from "react";
import DiskusijaDetalji from "./DiskusijaDetalji";
import VotingSection from "./VotingSection";

const Diskusija = ({ diskusija, naGlasanje }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [komentari, setKomentari] = useState(diskusija.komentari);
  const [glasanja, setGlasanja] = useState(diskusija.glasanja);

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
  const handleAddQuestion = (pitanjeTekst) => {
    const novoPitanje = {
      id: glasanja.length + 1,
      pitanje: pitanjeTekst,
      korisnik: "Trenutni korisnik",
      timestamp: Date.now(),
    };
    setGlasanja([...glasanja, novoPitanje]);
  }

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

      {isModalOpen && (
        <DiskusijaDetalji
          diskusija={diskusija}
          komentari={komentari}
          glasanja={glasanja}
          onClose={() => setIsModalOpen(false)}
          onAddComment={handleAddComment}
          onAddQuestion={handleAddQuestion}
        />
      )}
    </div>
  );
};

export default Diskusija;