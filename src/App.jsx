import { useEffect, useState } from "react";
import sun from "../public/Sun.svg";

import { FaLocationDot } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";

function App() {
  const [result, setResult] = useState({});
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleBtn = (e) => {
    e.preventDefault();
    if (!input) {
      alert("Veuillez entrer le nom d'une ville.");
      return;
    }
    setIsLoading(true); // Déclenche la recherche
  };

  useEffect(() => {
    if (!isLoading) return; // Si isLoading est false, on sort

    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=8e3aa44b57aeb6a24a275c902446039d&units=metric`;

    async function getData() {
      try {
        const response = await fetch(URL);

        if (!response.ok) {
          throw new Error("Ville introuvable ou autre erreur.");
        }

        const data = await response.json();
        setResult(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
        alert(error.message); // Affiche une alerte en cas d'erreur
      } finally {
        setIsLoading(false); // Réinitialise l'état de chargement
      }
    }

    getData();
  }, [isLoading, input]);

  return (
    <>
      <div className="bg-gradient-to-r from-[#a1c4fd] to-[#c2e9fb]">
        <div className=" flex justify-center min-h-screen items-center">
          <div className=" flex flex-col items-center gap-y-3 bg-[#fff] px-16 py-3 rounded-xl">
            <div className="text-2xl text-[#000]">
              <h1 className="font-bold">Weather App</h1>
            </div>
            <div>
              <div className="flex gap-2">
                <div className=" flex items-center gap-x-2">
                  <input
                    type="text"
                    placeholder="enter name city..."
                    className=" input p-2 bg-[#191717] rounded-md text-[#ffff] placeholder:text-[#ffffffcc] outline-none opacity-95"
                    onChange={handleInput}
                    value={input}
                  />
                  <button className="btn text-[#ffff] border-none bg-gradient-to-r from-[#a1c4fd] to-[#c2e9fb]" onClick={handleBtn}>Search</button>
                </div>
              </div>
            </div>
            <div className=" flex justify-center">
              <img src={sun} alt="" width={170} height={170} />
            </div>
            <div className="text-black text-5xl">
              <span>
                {result.main && result.main.temp
                  ? Math.round(result.main.temp) + "° C"
                  : "...° C"}
              </span>
            </div>
            <div className="text-black text-4xl">
              <span>
                {result.weather &&
                  result.weather[0] &&
                  result.weather[0].description}
              </span>
            </div>
            <div className="flex items-center">
              <FaLocationDot className="text-black text-2xl" />
              <span className="text-black text-lg">
                {result.name || "City or country name"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
