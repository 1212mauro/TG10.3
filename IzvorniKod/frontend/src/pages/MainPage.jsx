import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
    const token = sessionStorage.getItem("authToken"); // Dobijamo token iz sessionStorage
    if (!token) {
      // Ako nema tokena, preusmjeravamo na Login stranicu
      navigate("/");
      return;
    }

    // Ako token postoji, šaljemo GET zahtjev s Authorization headerom
    const fetchData = async () => {
      try {
        const response = await fetch("/mainPage", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`, // Dodajemo token u Authorization header
          },
        });

        if (response.ok) {
          // Ako je odgovor uspješan, nastavljamo sa učitavanjem stranice
          console.log("Korisnik autoriziran!");
        } else {
          // Ako je odgovor 401 (Unauthorized), preusmjeravamo korisnika
          setError("Neautoriziran pristup. Molimo prijavite se.");
          navigate("/"); // Preusmjeravamo na Login
        }
      } catch (error) {
        console.error("Greška u autentifikaciji:", error);
        setError("Došlo je do pogreške prilikom autentifikacije.");
        navigate("/"); // Preusmjeravamo na Login u slučaju greške
      }
    };

    fetchData();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <div className="flex-grow p-4">
        <ListaDiskusija diskusije={diskusije} naGlasanje={naGlasanje} />
      </div>

      <aside className="w-1/4 bg-blue-600 text-white p-4 flex flex-col items-center">
        <h1 className="text-xl font-bold mb-4">StanBlog</h1>
        <HeaderComp username={korisnik.korisnickoIme} />
      </aside>
    </div>
  );
};

export default MainPage;
