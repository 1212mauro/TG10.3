import React, { useEffect, useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import ListaDiskusija from "../components/ListaDiskusija";
import diskusijeData from "../../public/diskusije";
import HeaderComp from "../components/HeaderComp";
import korisnik from "../../public/korisnikInfo"; 

const MainPage = () => {
  const [diskusije, postaviDiskusije] = useState(diskusijeData);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const naGlasanje = (id) => {
    postaviDiskusije((prethodneDiskusije) =>
      prethodneDiskusije.map((diskusija) =>
        diskusija.id === id && !diskusija.korisnikGlasao
          ? { ...diskusija, glasovi: diskusija.glasovi + 1, korisnikGlasao: true }
          : diskusija
      )
    );
  };

  // Provjera tokena i autentifikacije prilikom učitavanja komponente
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    let uritoken = urlParams.get('token');
    if (uritoken) {
      localStorage.setItem('authToken', uritoken);
      navigate('/mainPage');
      return;
    }
    const token = localStorage.getItem('authToken'); // Dobijamo token iz sessionStorage
    if (!token) {
      // Ako nema tokena, preusmjeravamo na Login stranicu
      navigate("/");
      return;
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <div className="flex-grow p-4 overflow-y-auto max-h-screen">
        <ListaDiskusija diskusije={diskusije} naGlasanje={naGlasanje} />
      </div>

      <aside className="w-1/4 bg-blue-600 text-white p-4 flex flex-col items-center">
        <h1 className="text-xl font-bold mb-4">StanBlog</h1>
        <HeaderComp username={korisnik.korisnickoIme} onLogout={
          () => {
            localStorage.removeItem('authToken');
            navigate("/");
          }
        } />
      </aside>
    </div>
  );
};

export default MainPage;
