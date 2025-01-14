import React, { useState } from 'react';
import diskusije from '../../public/diskusije'

const DodajDiskusijuForm = ({ onClose, onSave }) => {
  const [naziv, setNaziv] = useState('');
  const [opis, setOpis] = useState(''); 
  const [tip, setTip] = useState('public'); // New state for discussion type

  const handleSave = (e) => {
    e.preventDefault();
    const novaDiskusija = {
      id: Math.random(),
      naslov: naziv,
      opis,
      tip // Include the type in the new discussion object
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
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Tip diskusije</label>
          <select
            className="w-full mt-2 p-2 border border-gray-300 rounded-lg"
            value={tip}
            onChange={(e) => setTip(e.target.value)}
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
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
