import React, { useState } from "react";

const Panel = () => {
  const [distance, setDistance] = useState(50);
  const [selectedEffect, setSelectedEffect] = useState("Retorno de eyecciones");

  return (
    <div className="bg-[#0a0a3d] text-[#f4d03f] min-h-screen p-5 font-[Indie_Flower]">
      {/* Header */}
      <div className="flex justify-between items-center border-b-2 border-[#f4d03f] pb-2 mb-6">
        <h1 className="text-2xl font-bold">Skyfall X</h1>
        <div>
          <a href="#" className="hover:underline">
            #Home
          </a>
        </div>
      </div>

      {/* Main */}
      <div className="flex gap-6 flex-col md:flex-row">
        {/* Panel Izquierdo */}
        <div className="border-2 border-[#f4d03f] rounded-lg p-4 flex-1 flex flex-col items-center">
          <div className="w-full h-64 bg-[#3d0a0a] flex items-center justify-center relative">
            <img
              src="./image.png"
              alt="Mapa impacto"
              className="w-full h-full object-cover"
            />
            <span className="absolute bottom-2 left-2 text-sm">+ Zoom</span>
          </div>
        </div>

        {/* Panel Central */}
        <div className="border-2 border-[#f4d03f] rounded-lg p-4 flex-1">
          <h2 className="text-lg mb-4">Detalles del impacto</h2>

          {/* Distancia */}
          <label className="block mt-2">Distancia del observador</label>
          <input
            type="range"
            min="0"
            max="100"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            className="w-full accent-yellow-400"
          />
          <p className="text-sm mt-1">Distancia: {distance} km</p>

          {/* Info dinámica */}
          <label className="block mt-4">Efecto seleccionado</label>
          <p className="text-xl font-bold">{selectedEffect}</p>

          {/* Energía */}
          <label className="block mt-4">Energía liberada en TNT</label>
          <p className="text-xl font-bold">XXX XXX XXX</p>

          {/* Nivel de destrucción */}
          <label className="block mt-4">Nivel de destrucción</label>
          <p className="text-red-400 font-bold">Alto</p>

          {/* Sismógrafo */}
          <label className="block mt-4">Sismógrafo</label>
          <div className="w-full h-16 bg-[#1a1a5d] flex items-center justify-center text-white">
            [Gráfico]
          </div>
          <p className="text-sm mt-1">
            Magnitud sísmica (escala de Richter): XXX
          </p>
        </div>

        {/* Panel Derecho */}
        <div className="border-2 border-[#f4d03f] rounded-lg p-4 flex-1 flex flex-col gap-4">
          {[
            "Retorno de eyecciones",
            "Cráter",
            "Impacto en océano Pacífico",
            "Efectos globales",
          ].map((btn) => (
            <button
              key={btn}
              onClick={() => setSelectedEffect(btn)}
              className="bg-[#f4d03f] text-[#0a0a3d] px-4 py-2 rounded hover:bg-yellow-300"
            >
              {btn}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Panel;
