import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useNavigate } from "react-router-dom";
import asteroidImage from "../assets/img/asteroideY.png";
import { simulateAsteroidImpact } from "../utils/Operaciones";
import TextType from "../components/TextType";

// Fix para los iconos de Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

// Rangos de densidad en kg/m³
const DENSITY_RANGES = {
  Rocky: { min: 2000, max: 3000, initial: 2500 },
  Metallic: { min: 7000, max: 8000, initial: 7500 },
};

const SkyfallX1 = () => {
  const [diameter, setDiameter] = useState(2500); // metros
  const [speed, setSpeed] = useState(17.5); // km/s
  const [angle, setAngle] = useState(45); // grados
  const [composition, setComposition] = useState("Rocky");
  const [density, setDensity] = useState(DENSITY_RANGES.Rocky.initial);
  const navigate = useNavigate();
  const position = [19.0433, -98.2022]; // Coordenadas de Puebla, México

  useEffect(() => {
    setDensity(DENSITY_RANGES[composition].initial);
  }, [composition]);

  const handleLaunch = () => {
    const simParams = {
      diameter_km: diameter / 1000, // Convertir metros a kilómetros
      density_kgm3: density, // Ya está en kg/m³
      velocity_kms: speed, // Ya está en km/s
      angle_deg: angle,
      distance_from_impact_km: 10,
      targetType: "land",
    };

    const results = simulateAsteroidImpact(simParams);
    navigate("/video1", {
      state: {
        simulationResults: results,
        inputParameters: {
          ...simParams,
          composition,
          targetLocation: "Puebla, México (Tierra)",
        },
      },
    });
  };

  const currentRange = DENSITY_RANGES[composition];

  return (
    // Se mantiene el padding inferior grande (pb-20) para el espacio en la página
    <div className="bg-black text-white min-h-screen p-10 pb-20">
      {/* Título */}
      <header className="px-0 sm:px-10 py-5 border-b border-gray-800">
        <h1 className="text-2xl font-bold tracking-widest text-yellow-400">
          Skyfall X | Configuration
        </h1>
        <p className="mt-2 text-xl">
          <TextType
            text={[
              "Natural objects that encounter the Earth are either asteroids or comets. Asteroids are made of rock or iron and typically collide with the Earth’s atmosphere at velocities of 12–20 km/s. ",
            ]}
            typingSpeed={30}
            pauseDuration={20000}
            showCursor={true}
            cursorCharacter="|"
          />
        </p>
      </header>

      {/* Contenedor principal de los recuadros de 2 columnas */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sección izquierda: Imagen y parámetros */}
        {/* AJUSTE CLAVE 1: Limito la altura del recuadro izquierdo */}
        <div className="w-full md:w-1/3 bg-gray-900 rounded-lg p-4 border-2 border-yellow-400 h-fit max-h-[85vh]">
          <div className="flex justify-center mb-5 ">
            <img
              src={asteroidImage}
              alt="Asteroid"
              // CLASES CORREGIDAS Y AUMENTADAS: Usando valores válidos de Tailwind.
              className="w-360 h-90 object-contain"
            />
          </div>
          <p className="text-center text-2xl mb-5 font-bold text-yellow-400">
            Impactor
          </p>
          <h3 className="text-xl border-b border-yellow-400 pb-1 mb-2">
            Current parameters
          </h3>
          <ul className="space-y-2 text-2xl mb-2">
            <li>
              Diameter: <strong>{diameter} m</strong>
            </li>
            <li>
              Speed: <strong>{speed} km/s</strong>
            </li>
            <li>
              Angle: <strong>{angle}°</strong>
            </li>
            <li>
              Composition: <strong>{composition.toUpperCase()}</strong>
            </li>
            <li>
              Density: <strong>{density} kg/m³</strong>
            </li>
            <li>
              Object type: <strong>Asteroid</strong>
            </li>
          </ul>
        </div>

        {/* Sección derecha: Controles y mapa */}
        {/* AJUSTE CLAVE 2: Limito la altura del recuadro derecho */}
        <div className="w-full md:w-2/3 bg-gray-900 rounded-lg p-4 border-2 border-yellow-400 h-fit max-h-[85vh]">
          {/* Controles */}
          <div className="space-y-2 mb-6">
            {/* Slider para diámetro */}
            <div>
              <label className="block mb-1 text-yellow-400 text-xl">
                Size (Diameter: {diameter} m)
              </label>
              <input
                type="range"
                min="10"
                max="5000"
                step="10"
                value={diameter}
                onChange={(e) => setDiameter(Number(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-yellow-500"
              />
            </div>

            {/* Slider para velocidad */}
            <div>
              <label className="block mb-1 text-yellow-400 text-xl">
                Speed (Impact Speed: {speed} km/s)
              </label>
              <input
                type="range"
                min="5"
                max="30"
                step="0.5"
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-yellow-500"
              />
            </div>

            {/* Slider para ángulo */}
            <div>
              <label className="block mb-1 text-yellow-400 text-xl">
                Angle of Impact ({angle}°)
              </label>
              <input
                type="range"
                min="1"
                max="90"
                step="1"
                value={angle}
                onChange={(e) => setAngle(Number(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-red-500"
              />
              <p className="text-base text-gray-400 mt-1 ">
                (90° is vertical impact)
              </p>
            </div>

            {/* Botones para composición */}
            <div>
              <label className="block mb-1 text-yellow-400 text-xl">
                Composition
              </label>
              <div className="flex gap-3 mt-2">
                {["Rocky", "Metallic"].map((type) => (
                  <button
                    key={type}
                    onClick={() => setComposition(type)}
                    className={`px-3 py-2 border border-yellow-400 rounded ${
                      composition === type
                        ? "bg-yellow-400 text-black"
                        : "bg-transparent text-yellow-400"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Slider para densidad */}
            <div>
              <label className="block mb-1 text-yellow-400 text-xl">
                Density: <strong>{density} kg/m³</strong>
              </label>
              <input
                type="range"
                min={currentRange.min}
                max={currentRange.max}
                step="100"
                value={density}
                onChange={(e) => setDensity(Number(e.target.value))}
                className={`w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer ${
                  composition === "Metallic"
                    ? "accent-gray-400"
                    : "accent-yellow-400"
                }`}
              />
              <p className="text-base text-gray-400 mt-1">
                Range: {currentRange.min} – {currentRange.max} kg/m³
              </p>
            </div>
          </div>

          {/* Mapa */}
          <div className="h-50 mb-4 rounded-lg overflow-hidden border border-gray-700">
            <MapContainer
              center={position}
              zoom={12}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={position}>
                <Popup>Puebla, México</Popup>
              </Marker>
            </MapContainer>
          </div>

          {/* Botón de lanzamiento */}
          <button
            onClick={handleLaunch}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-4 rounded-lg transition"
          >
            Launch to Earth
          </button>
<<<<<<< Updated upstream
=======
        </section>
      </main>

      {/* Modal de advertencia */}
      {showWarning && (
        <div
          style={{ pointerEvents: "auto" }}
          className={`fixed inset-0 flex justify-center items-center bg-black bg-opacity-100 z-[9999] p-4 transition-opacity duration-700 ${
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
>>>>>>> Stashed changes
        </div>
      </div>
    </div>
  );
};

export default SkyfallX1;
