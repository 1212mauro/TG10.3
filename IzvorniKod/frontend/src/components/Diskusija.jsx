import React, { useState } from "react";

const Diskusija = ({ diskusija, naGlasanje }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleReadMore = () => {
    setIsExpanded(true);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsExpanded(false);
  };

  const displayDescription = isExpanded ? diskusija.opis : diskusija.opis.substring(0, 50) + "...";

  return (
    <div className="p-4 bg-white shadow-md rounded-lg mb-4 border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-800">{diskusija.naslov}</h2>
      <p className="text-gray-600 mt-2">{displayDescription}</p>

      {/* Show "Read More" if description is truncated */}
      {diskusija.opis.length > 50 && !isExpanded && (
        <button
          onClick={handleReadMore}
          className="text-blue-500 text-sm mt-2"
        >
          Pročitaj više
        </button>
      )}

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
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">{diskusija.naslov}</h2>
            <p className="text-gray-700">{diskusija.opis}</p>
            <button
              onClick={handleCloseModal}
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            >
              Zatvori
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Diskusija;
