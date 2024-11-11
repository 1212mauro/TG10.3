import React, { useState } from "react";
import Diskusija from "./Diskusija";
import DodajDiskusijuForm from "./DodajDiskusijuForm"; 
import diskusije from '../../public/diskusije'

const ListaDiskusija = ({ diskusije, naGlasanje}) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [diskusijeState, setDiskusijeState] = useState(diskusije); 

  const handleAddClick = () => {
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  const handleSaveDiskusija = (novaDiskusija) => {
    console.log(novaDiskusija);
    setDiskusijeState((prevDiskusije) => [...prevDiskusije, novaDiskusija]); //dodavanje u state
    
  };

  return (
    <section className="container-xl lg:container m-auto">
      <h1 className="text-xl font-bold text-center">Diskusije</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-gray-300 rounded-lg p-6">
        {diskusijeState.map((diskusija) => (
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
          <DodajDiskusijuForm onClose={handleCloseForm} onSave={handleSaveDiskusija} />
        </div>
      )}
    </section>
  );
};

export default ListaDiskusija;
