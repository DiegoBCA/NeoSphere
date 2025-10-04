// src/pantallas/skyfallX1.jsx

import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { useNavigate } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import asteroideImg from "../assets/img/asteroideY.png";

// 🚀 Importamos la función de cálculo
import { simulateAsteroidImpact } from "../utils/Operaciones";

const SkyfallX1 = () => {
  // --- Estados de Control de Usuario ---
  const [size, setSize] = useState(50);
  const [speed, setSpeed] = useState(50);
  const [composition, setComposition] = useState("rocoso");
  const [density, setDensity] = useState(3000);
  // 🔑 NUEVO ESTADO: Ángulo de impacto (default 45 grados)
  const [angle, setAngle] = useState(45);

  // --- Estados de UI ---
  const [showWarning, setShowWarning] = useState(true);
  const [fadeIn, setFadeIn] = useState(false);

  const navigate = useNavigate();
  const position = [19.0413, -98.2062];

  // --- Mapeo de Valores para la Interfaz (ENTRADA) ---
  const current_diameter = 0.1 + (size / 100) * 2;
  const current_velocity = 12 + (speed / 100) * 18;

  const customIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  // Efecto para ajustar la densidad inicial al cambiar la composición
  useEffect(() => {
    if (composition === "rocoso") {
      setDensity(3000);
    } else if (composition === "metálico") {
      setDensity(8000);
    }
  }, [composition]);

  // --- LÓGICA DE LANZAMIENTO Y SIMULACIÓN (handleLaunch) ---
  const handleLaunch = () => {
    // 1. Definición de Parámetros de Simulación
    const simParams = {
      diameter_km: current_diameter,
      density_kgm3: density,
      velocity_kms: current_velocity,

      // 🔑 PARÁMETRO ACTUALIZADO: Usamos el estado del ángulo
      angle_deg: angle,

      // Parámetros Fijos
      distance_from_impact_km: 10,
      targetType: "land",
      waterDepth_m: 0,
    };

    // 2. 🚀 LLAMADA A LA FUNCIÓN DE CÁLCULO
    const results = simulateAsteroidImpact(simParams);

    // 3. Navegar a la página de impacto, pasando los resultados y los inputs
    navigate("/impacto", {
      state: {
        simulationResults: results,
        inputParameters: {
          ...simParams,
          composition: composition,
          targetLocation: "Puebla de Zaragoza (Tierra)",
        },
      },
    });
  };
  // -----------------------------------------------------------

  useEffect(() => {
    if (showWarning) {
      setTimeout(() => setFadeIn(true), 50);
    }
  }, [showWarning]);

  return (
    <div className="bg-black text-[#f4d03f] min-h-screen p-5 font-[Indie_Flower] relative">
      <header className="flex justify-between items-center border-b-2 border-[#f4d03f] pb-2 mb-6">
        <h1 className="text-2xl font-bold">Skyfall X</h1>
        <nav>
          <button
            onClick={() => navigate("/")}
            className="text-[#f4d03f] hover:underline cursor-pointer"
          >
            #Home
          </button>
        </nav>
      </header>

      <main className="flex gap-6 flex-col md:flex-row">
        {/* Panel Izquierdo (Imagen y Resumen de Entrada) */}
        <section className="border-2 border-[#f4d03f] rounded-lg p-4 flex-1">
          <div
            className="w-40 h-40 mx-auto bg-black rounded-lg border-2 border-[#f4d03f] flex justify-center items-center bg-center bg-contain bg-no-repeat"
            style={{ backgroundImage: `url(${asteroideImg})` }}
          ></div>
          <p className="text-center text-lg mt-2 mb-4">IMPACTOR 2025</p>

          {/* 📊 RESUMEN DE PARÁMETROS DE ENTRADA */}
          <h3 className="text-xl font-bold border-b border-[#f4d03f] pb-1 mt-4">
            Parámetros Actuales
          </h3>
          <ul className="text-sm mt-2 space-y-1">
            <li>
              Diámetro: <strong>{current_diameter.toFixed(3)} km</strong>
            </li>
            <li>
              Velocidad: <strong>{current_velocity.toFixed(2)} km/s</strong>
            </li>
            <li>
              Composición: <strong>{composition.toUpperCase()}</strong>
            </li>
            <li>
              Densidad: <strong>{density.toLocaleString()} kg/m³</strong>
            </li>
            <li>
              Ángulo: <strong>{angle}°</strong>
            </li>{" "}
            {/* 🔑 Muestra el ángulo actual */}
            <li>
              Objetivo: <strong>Tierra</strong>
            </li>
          </ul>
        </section>

        {/* Panel Central (Controles) */}
        <section className="border-2 border-[#f4d03f] rounded-lg p-4 flex-1">
          <h2 className="text-lg mb-4">
            Configura el asteroide y descubre el impacto que tendría en la
            Tierra
          </h2>

          <label className="block mt-2">
            Tamaño (Diámetro: {current_diameter.toFixed(3)} km)
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            className="w-full accent-yellow-400"
          />

          <label className="block mt-4">
            Velocidad (V. de Impacto: {current_velocity.toFixed(2)} km/s)
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="w-full accent-yellow-400"
          />

          {/* 🔑 NUEVO SLIDER: Ángulo de Impacto */}
          <label className="block mt-4">Ángulo de Impacto ({angle}°)</label>
          <input
            type="range"
            min="1"
            max="90"
            step="1"
            value={angle}
            onChange={(e) => setAngle(Number(e.target.value))}
            className="w-full accent-red-500"
          />
          <p className="text-xs text-gray-400 mt-1">
            (90° es impacto vertical, 1° es muy rasante)
          </p>

          <label className="block mt-4">Composición</label>
          <div className="flex gap-3 mt-2">
            {["rocoso", "metálico"].map((opt) => (
              <button
                key={opt}
                onClick={() => setComposition(opt)}
                className={`px-3 py-2 border border-[#f4d03f] rounded ${
                  composition === opt
                    ? "bg-[#f4d03f] text-[#0a0a3d]"
                    : "bg-transparent text-[#f4d03f]"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>

          {/* CONTROL MANUAL DE DENSIDAD */}
          <div className="mt-6">
            <label className="block">
              Densidad (Rho): <strong>{density.toLocaleString()} kg/m³</strong>
            </label>
            <input
              type="range"
              min="2000"
              max="9000"
              step="100"
              value={density}
              onChange={(e) => setDensity(Number(e.target.value))}
              className={`w-full ${
                composition === "metálico"
                  ? "accent-gray-400"
                  : "accent-yellow-400"
              }`}
            />
            <p className="text-xs text-gray-400 mt-1">
              {composition === "rocoso"
                ? "Rango típico: 2000 - 4000 kg/m³"
                : "Rango típico: 7000 - 9000 kg/m³"}
            </p>
          </div>
        </section>

        {/* Panel Derecho (Mapa) */}
        <section className="border-2 border-[#f4d03f] rounded-lg p-4 flex-1">
          <div className="h-64 rounded overflow-hidden mb-4 w-full">
            <MapContainer center={position} zoom={6} className="h-full w-full">
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
              />
              <Marker position={position} icon={customIcon}>
                <Popup>Puebla de Zaragoza</Popup>
              </Marker>
            </MapContainer>
          </div>
          <p className="mb-4">
            Zona de impacto: <strong>Puebla de Zaragoza (Tierra)</strong>
          </p>
          <button
            onClick={handleLaunch}
            className="bg-[#f4d03f] text-[#0a0a3d] px-4 py-2 rounded hover:bg-yellow-300"
          >
            Lanzar a la Tierra
          </button>
        </section>
      </main>

      {/* Modal de advertencia */}
      {showWarning && (
        <div
          className={`fixed inset-0 flex justify-center items-center bg-black bg-opacity-90 z-50 p-4 transition-opacity duration-700 ${
            fadeIn ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="bg-red-600 text-white rounded-lg p-6 max-w-xl text-center transform transition-transform duration-700 ease-out scale-90">
            <h2 className="text-2xl font-bold mb-4">⚠️ Advertencia</h2>
            <p className="mb-6">
              Esto es un simulador ficticio. El experimento es solo educativo.
            </p>
            <button
              onClick={() => setShowWarning(false)}
              className="bg-white text-red-600 px-6 py-2 rounded hover:bg-gray-100 transition"
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkyfallX1;
