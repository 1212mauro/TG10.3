import React, { useState } from 'react';
import diskusije from '../../public/diskusije'

const DodajDiskusijuForm = ({ onClose, onSave }) => {
  const [naziv, setNaziv] = useState('');
  const [opis, setOpis] = useState('');
  const [hasVoting, setHasVoting] = useState(false); 

  const handleSave = (e) => {
    e.preventDefault();
    const novaDiskusija = {
      id: Math.random(),
      naslov: naziv,
      opis,
      upVotes: 0,
      downVotes: 0,
      glasovi: 0,
      korisnikGlasao: false,
      hasVoting,
    };
    onSave(novaDiskusija); 
    onClose(); 
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-96">
      <h2 className="text-xl font-bold mb-4">Dodaj novu diskusiju</h2>
      <form onSubmit={handleSave}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Naziv diskusije</label>
          <input
            type="text"
            className="w-full mt-2 p-2 border border-gray-300 rounded-lg"
            placeholder="Unesite naziv diskusije"
            value={naziv}
            onChange={(e) => setNaziv(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Opis diskusije</label>
          <textarea
            className="w-full mt-2 p-2 border border-gray-300 rounded-lg"
            rows="4"
            placeholder="Unesite detalje o diskusiji"
            value={opis}
            onChange={(e) => setOpis(e.target.value)}
          ></textarea>
        </div>
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            checked={hasVoting}
            onChange={(e) => setHasVoting(e.target.checked)}
            className="mr-2"
          />
          <label className="text-sm font-medium text-gray-700">Voting</label>
        </div>
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-400"
          >
            Zatvori
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
          >
            Spremi
          </button>
        </div>
      </form>
    </div>
  );
};

export default DodajDiskusijuForm;
