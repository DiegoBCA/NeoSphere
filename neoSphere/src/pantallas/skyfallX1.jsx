// src/pantallas/skyfallX1.jsx

import React, { useState, useEffect, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { useNavigate } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import asteroideImg from "../assets/img/asteroideY.png";
import { simulateAsteroidImpact } from "../utils/Operaciones";

// --- RANGOS DE DENSIDAD CONSTANTES ---
const DENSITY_RANGES = {
  Rocky: { min: 2000, max: 3000, initial: 2500 },
  metallic: { min: 7000, max: 8000, initial: 7500 },
};

const SkyfallX1 = () => {
  // ... (estados existentes)
  const [size, setSize] = useState(50);
  const [speed, setSpeed] = useState(50);
  const [composition, setComposition] = useState("Rocky");
  const [density, setDensity] = useState(DENSITY_RANGES.Rocky.initial);
  const [angle, setAngle] = useState(45);

  const [showWarning, setShowWarning] = useState(true);
  const [fadeIn, setFadeIn] = useState(false);

  const navigate = useNavigate();
  const position = [19.0413, -98.2062];

  const current_diameter = 0.1 + (size / 100) * 2;
  const current_velocity = 12 + (speed / 100) * 18;

  const customIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  useEffect(() => {
    setDensity(DENSITY_RANGES[composition].initial);
  }, [composition]);

  // --- LÓGICA DE LANZAMIENTO Y SIMULACIÓN (handleLaunch) ---
  const handleLaunch = () => {
    // 1. Definición de Parámetros de Simulación
    const simParams = {
      diameter_km: current_diameter,
      density_kgm3: density,
      velocity_kms: current_velocity,
      angle_deg: angle,

      distance_from_impact_km: 10,
      targetType: "land",
    };

    // 2. 🚀 LLAMADA A LA FUNCIÓN DE CÁLCULO
    const results = simulateAsteroidImpact(simParams);

    // 3. 🔑 NAVEGAR A /video1, enviando los resultados para la transición
    navigate("/video1", {
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

  const currentRange = DENSITY_RANGES[composition];

  useEffect(() => {
    if (showWarning) {
      setTimeout(() => setFadeIn(true), 50);
    }
  }, [showWarning]);

  return (
    // ... (El resto del JSX de SkyfallX1.jsx permanece igual,
    //      incluyendo los sliders y botones que llaman a handleLaunch)

    <div className="bg-black text-[#f4d03f] min-h-screen p-5 font-bold relative">
      {/* ... (todo el JSX de la interfaz) ... */}

      <header className="flex justify-between items-center border-b-2 border-[#f4d03f] pb-2 mb-6">
        <h1 className="text-2xl font-bold">Skyfall X</h1>
      </header>

      <main className="flex gap-6 flex-col md:flex-row">
        {/* Panel Izquierdo (Imagen y Resumen de Entrada) */}
        <section className="border-2 border-[#f4d03f] rounded-lg p-4 flex-1">
          <div
            className="w-100 h-130 mx-auto bg-black rounded-lg border-2 border-[#f4d03f] flex justify-center items-center bg-center bg-contain bg-no-repeat"
            style={{ backgroundImage: `url(${asteroideImg})` }}
          ></div>
          <p className="text-center text-lg mt-2 mb-4">IMPACTOR 2025</p>

          {/* 📊 RESUMEN DE PARÁMETROS DE ENTRADA */}
          <h3 className="text-xl font-bold border-b border-[#f4d03f] pb-1 mt-4">
            Current parameters
          </h3>
          <ul className="text-sm mt-2 space-y-1">
            <li>
              Diamater: <strong>{current_diameter.toFixed(3)} km</strong>
            </li>
            <li>
              Speed: <strong>{current_velocity.toFixed(2)} km/s</strong>
            </li>
            <li>
              Composition: <strong>{composition.toUpperCase()}</strong>
            </li>
            <li>
              Density: <strong>{density.toLocaleString()} kg/m³</strong>
            </li>
            <li>
              Angle: <strong>{angle}°</strong>
            </li>
            <li>
              Objective: <strong>Earth</strong>
            </li>
          </ul>
        </section>

        {/* Panel Central (Controles) */}
        <section className="border-2 border-[#f4d03f] rounded-lg p-4 flex-1">
          <h2 className="text-lg mb-4">
            Configure the asteroid and discover the impact it would have on the
            Earth
          </h2>

          <label className="block mt-2">
            Size (Diameter: {current_diameter.toFixed(3)} km)
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
            Speed (Impact Speed: {current_velocity.toFixed(2)} km/s)
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="w-full accent-yellow-400"
          />

          {/* SLIDER: Ángulo de Impacto */}
          <label className="block mt-4">Angle of Impact ({angle}°)</label>
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
            (90° is vertical impact, 1° is very low angle)
          </p>

          <label className="block mt-4">Composition</label>
          <div className="flex gap-3 mt-2">
            {["Rocky", "metallic"].map((opt) => (
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

          <div className="mt-6">
            <label className="block">
              Density (Rho): <strong>{density.toLocaleString()} kg/m³</strong>
            </label>
            <input
              type="range"
              min={currentRange.min}
              max={currentRange.max}
              step="100"
              value={density}
              onChange={(e) => setDensity(Number(e.target.value))}
              className={`w-full ${
                composition === "metallic"
                  ? "accent-gray-400"
                  : "accent-yellow-400"
              }`}
            />
            <p className="text-xs text-gray-400 mt-1">
              Current range: {currentRange.min} kg/m³ a {currentRange.max} kg/m³
            </p>
          </div>
        </section>

        {/* Panel Derecho (Mapa) */}
        <section className="border-2 border-[#f4d03f] rounded-lg p-4 flex-1">
          <div className="h-140 rounded overflow-hidden mb-4 w-full">
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
            Impact zone: <strong>Puebla de Zaragoza (Tierra)</strong>
          </p>
          <button
            onClick={handleLaunch}
            className="bg-[#f4d03f] text-[#0a0a3d] px-4 py-2 rounded hover:bg-yellow-300"
          >
            Launch to Earth
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
            <h2 className="text-2xl font-bold mb-4">⚠️ Warning</h2>
            <p className="mb-6">
              You are about to unleash an asteroid upon Earth. Its impact will
              bring chaos, destruction, and irreversible consequences to the
              world. Are you certain you want to proceed?
            </p>
            <button
              onClick={() => setShowWarning(false)}
              className="bg-white text-red-600 px-6 py-2 rounded hover:bg-gray-100 transition"
            >
              Understood
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkyfallX1;
