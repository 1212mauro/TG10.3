import React, { useState } from "react";
import Diskusija from "./Diskusija";

const ListaDiskusija = ({ diskusije, naGlasanje }) => {
  
  const [isFormOpen, setIsFormOpen] = useState(false);

 
  const handleAddClick = () => {
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  return (
    <section className="container-xl lg:container m-auto">
      <h1 className="text-xl font-bold text-center">Diskusije</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-gray-300 rounded-lg p-6">
        {diskusije.map((diskusija) => (
          <div key={diskusija.id} className="flex flex-col">
            <Diskusija diskusija={diskusija} naGlasanje={naGlasanje} />
          </div>
        ))}
     
        <div
          onClick={handleAddClick}
          className="flex flex-col justify-center items-center p-6 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-100"
        >
          <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
            Dodaj novu diskusiju
          </button>
        </div>
      </div>

   
      {isFormOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Dodaj novu diskusiju</h2>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Naziv diskusije</label>
                <input
                  type="text"
                  className="w-full mt-2 p-2 border border-gray-300 rounded-lg"
                  placeholder="Unesite naziv diskusije"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Opis diskusije</label>
                <textarea
                  className="w-full mt-2 p-2 border border-gray-300 rounded-lg"
                  rows="4"
                  placeholder="Unesite detalje o diskusiji"
                ></textarea>
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={handleCloseForm}
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
        </div>
      )}
    </section>
  );
};

export default ListaDiskusija;
