// components/Diskusija.jsx
import React, { useState } from "react";
import DiskusijaDetalji from "./DiskusijaDetalji";

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

  return (
    <div className="p-4 bg-white shadow-md rounded-lg mb-4 border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-800">{diskusija.naslov}</h2>
      <p className="text-gray-600 mt-2">
        {diskusija.opis.substring(0, 50)}...
      </p>
      <button onClick={handleReadMore} className="text-blue-500 text-sm mt-2">
        Pročitaj više
      </button>

      <div className="mt-4 flex items-center justify-between">
        <button
          onClick={() => naGlasanje(diskusija.id)}
          disabled={diskusija.korisnikGlasao}
          className={`px-4 py-2 text-sm font-medium ${
            diskusija.korisnikGlasao
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          } rounded`}
        >
          {diskusija.korisnikGlasao ? "Glasano" : "Glasaj"}
        </button>
        <span className="text-gray-700 font-medium">{diskusija.glasovi} glasova</span>
      </div>

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
