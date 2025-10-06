// src/pantallas/Resultados.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MitigationVideo from "../assets/videos/Mitigation.mp4";
import SurfaceVideo from "../assets/videos/Surface.mp4"; // Usaremos este como impacto cinético
import KineticyVideo from "../assets/videos/Kinetic.mp4"; // (Asumiendo que tienes un video 'gravity.mp4')
import GravityVideo from "../assets/videos/Gravity.mp4"; // (Asumiendo que tienes un video 'coating.mp4')

// NOTA: Tienes que configurar la URL del video como un 'embed' o 'iframe' de YouTube.
// Esto se hace cambiando "watch?v=" por "embed/".
const mitigationStrategies = [
  {
    name: "MITIGATION",
    title: "MITIGATION",

    videoSrc: MitigationVideo, // <<-- ¡CAMBIA A URL EMBEBIDA!
  },
  {
    name: "Surface Coating",
    title: "Surface Coating:",
    description:
      "Cover part of the asteroid with a reflective or absorbent material to modify its thermal balance and take advantage of the Yarkovsky effect.",
    videoSrc: SurfaceVideo, // <<-- ¡CAMBIA A URL EMBEBIDA!
  },
  {
    name: "Kinetic Impact",
    title: "Kinetic Impact:",
    description:
      " It consists of launching a massive spacecraft at high speed to collide with the asteroid and alter its trajectory.",
    videoSrc: KineticyVideo, // <<-- ¡CAMBIA A URL EMBEBIDA!
  },
  {
    name: "Gravity Tractor",
    title: "Gravity Tractor",
    description:
      "A spacecraft is positioned near the asteroid and uses its gravitational pull to gradually alter the asteroid’s trajectory.",
    videoSrc: GravityVideo, // <<-- ¡CAMBIA A URL EMBEBIDA!
  },
];

const Resultados = () => {
  const navigate = useNavigate();

  // Estado para controlar la URL del video principal
  const [currentVideoUrl, setCurrentVideoUrl] = useState(
    mitigationStrategies[0].videoSrc // Muestra el primer video por defecto
  );

  // Estado para el botón activo
  const [activeStrategy, setActiveStrategy] = useState(
    mitigationStrategies[0].name
  );

  const handleButtonClick = (strategy) => {
    setCurrentVideoUrl(strategy.videoSrc);
    setActiveStrategy(strategy.name);
  };

  return (
    // Fondo Azul Oscuro
    <div className="min-h-screen bg-blue-950 text-white font-sans p-9 flex flex-col items-center">
      {/* Contenedor Principal de la Interfaz (Adaptado a video y botones) */}
      <div className="w-full max-w-8xl bg-gray-900 rounded-xl shadow-2xl p-18">
        <h2 className="text-5xl font-extrabold text-center text-yellow-400 mb-10">
          Mitigation strategies
        </h2>

        {/* Estructura de dos columnas */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
          {/* Columna 1 (2/3 del ancho en grandes pantallas): Video Grande */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xl font-bold text-gray-400 border-b border-gray-700 pb-2 mb-4">
              Explanation (Strategy: {activeStrategy})
            </h3>

            {/* Contenedor responsivo para el iframe de YouTube */}
            <div className="relative overflow-hidden w-full h-0 pb-[56.25%] rounded-lg shadow-2xl border-4 border-gray-700">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={currentVideoUrl}
                title="Video de Estrategia de Mitigación"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            <p className="text-center text-gray-400 text-sm pt-2">
              *The video plays embedded in the screen.
            </p>
          </div>

          {/* Columna 2 (1/3 del ancho): Botones con más texto */}
          <div className="lg:col-span-1 space-y-6">
            <h3 className="text-xl font-bold text-gray-400 border-b border-gray-700 pb-2">
              Select a Strategy
            </h3>

            {mitigationStrategies.map((strategy, index) => (
              <button
                key={index}
                onClick={() => handleButtonClick(strategy)}
                className={`w-full text-left p-4 rounded-lg transition-all shadow-xl border-2 
                           ${
                             activeStrategy === strategy.name
                               ? "bg-yellow-500 text-gray-900 border-yellow-500"
                               : "bg-gray-800 hover:bg-gray-700 text-white border-gray-700"
                           }
                           space-y-1`}
              >
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-extrabold">
                    {strategy.title}
                  </span>
                </div>
                <p
                  className={`text-base font-bold ${
                    activeStrategy === strategy.name
                      ? "text-gray-800"
                      : "text-gray-400"
                  }`}
                >
                  {strategy.description}
                </p>
              </button>
            ))}

            {/* Botón de Regreso */}
            <button
              onClick={() => navigate("/impacto")}
              className="w-full p-5 text-2xl font-extrabold rounded-lg shadow-2xl transition-all bg-gray-700 hover:bg-gray-600 text-white mt-4"
            >
              Return to Simulation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resultados;
