import React from "react";
import { useNavigate } from "react-router-dom";
import asteroidesData from "../components/asteroides.json";

const astronomy1 = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
      <h2 className="text-4xl font-light mb-6">Simulador de Impacto</h2>
      <p className="text-gray-300 mb-10 text-center max-w-xl">
        Selecciona un asteroide para ver su simulación:
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        {asteroidesData.asteroides &&
          asteroidesData.asteroides.map((asteroide) => (
            <button
              key={asteroide.id}
              // 🚨 CAMBIO CLAVE: Navegar a la ruta de video, pasando el ID.
              onClick={() => navigate(`/video/${asteroide.id}`)}
              className="bg-yellow-400 hover:bg-yellow-300 text-black px-6 py-3 rounded-lg transition"
            >
              {asteroide.nombre}
            </button>
          ))}
      </div>
    </div>
  );
};

export default astronomy1;
