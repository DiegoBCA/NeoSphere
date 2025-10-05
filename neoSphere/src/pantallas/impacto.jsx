// src/pantallas/Impacto.jsx

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// 🚀 Importaciones de Leaflet para el mapa y el círculo del cráter
import { MapContainer, TileLayer, Circle, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import { simulateAsteroidImpact } from "../utils/Operaciones";

// --- CONSTANTES DEL MAPA ---
// Coordenadas fijas para Puebla de Zaragoza (ejemplo)
const IMPACT_POSITION = [19.0413, -98.2062];
const MAP_ZOOM = 6;
// Rango de distancia para el slider
const MAX_DISTANCE_KM = 500;

const Impacto = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // --- 1. RECUPERACIÓN DE DATOS ---
  const { simulationResults: initialResults, inputParameters: inputs } =
    location.state || {};

  // Si no hay datos, redirigir al simulador
  useEffect(() => {
    if (!initialResults || !inputs) {
      console.error("Faltan parámetros de simulación. Redirigiendo.");
      navigate("/skyfallx-game"); // Usamos la ruta corregida
    }
  }, [initialResults, inputs, navigate]);

  // --- Estados de la Interfaz de Resultados ---
  const [distanceSliderValue, setDistanceSliderValue] = useState(10);
  const [selectedEffect, setSelectedEffect] = useState("Cráter");

  // Distancia REAL del observador en km
  const currentDistanceKm = useMemo(() => {
    return (distanceSliderValue / 100) * MAX_DISTANCE_KM;
  }, [distanceSliderValue]);

  // --- 2. RECALCULAR EFECTOS SEGÚN LA DISTANCIA ---
  const recalculatedEffects = useMemo(() => {
    if (!inputs) return null;

    const currentInputs = {
      ...inputs,
      distance_from_impact_km: currentDistanceKm,
    };

    // Si es un Airburst, solo actualizamos los efectos de distancia
    if (initialResults.scenario === "Airburst") {
      const newEffects = simulateAsteroidImpact(currentInputs);
      return {
        ...initialResults,
        airBlast: newEffects.airBlast,
        thermalRadiation: newEffects.thermalRadiation,
      };
    }

    // Si es un Impacto en Superficie, recalculamos todos los efectos de distancia
    return simulateAsteroidImpact(currentInputs);
  }, [inputs, currentDistanceKm, initialResults]);

  if (!inputs || !initialResults || !recalculatedEffects) {
    return (
      <div className="bg-[#0a0a3d] text-[#f4d03f] min-h-screen p-5 font-[Indie_Flower] text-center">
        loading data....
      </div>
    );
  }

  const {
    impactEnergyMegatons,
    crater,
    airBlast,
    seismicEffects,
    thermalRadiation,
    scenario,
  } = recalculatedEffects;
  const ejecta = initialResults.ejecta; // Mantener las eyecciones originales para Airburst message

  // 🔑 Cálculo del radio del cráter en metros para Leaflet
  const craterRadiusMeters =
    scenario !== "Airburst" && crater.finalDiameter_m
      ? crater.finalDiameter_m / 2
      : 0;

  // --- 3. FUNCIONES DE RENDERIZADO DE RESULTADOS ---

  const renderEffectDetails = useCallback(() => {
    if (scenario === "Airburst") {
      if (selectedEffect === "Cráter")
        return (
          <p className="text-sm mt-2">
            No se forma un cráter de impacto en este escenario de **explosión
            aérea**. La energía se disipa en la atmósfera a{" "}
            {(initialResults.burstAltitude / 1000).toFixed(1)} km de altitud.
          </p>
        );
      if (selectedEffect === "Retorno de eyecciones")
        return (
          <p className="text-sm mt-2">
            No hay eyecciones significativas ya que la explosión ocurrió en el
            aire.
          </p>
        );
    }

    switch (selectedEffect) {
      case "Cráter":
        return (
          <>
            <p className="text-xl font-bold mt-2">
              Diámetro Final: {(crater.finalDiameter_m / 1000).toFixed(2)} km
            </p>
            <p className="text-sm mt-1">
              Diámetro Transitorio:{" "}
              {(crater.transientDiameter_m / 1000).toFixed(2)} km
            </p>
            <p className="text-sm mt-1">Tipo: {crater.type}</p>
          </>
        );
      case "Onda Expansiva (AirBlast)":
        return (
          <>
            <p className="text-xl font-bold mt-2">
              {airBlast.overpressure_Pa.toLocaleString()} Pa
            </p>
            <p className="text-sm mt-1">
              Tiempo de llegada: {airBlast.arrival_time_s.toFixed(1)} segundos
            </p>
            <p className="text-sm mt-1">
              Velocidad del viento: {airBlast.wind_velocity_ms.toFixed(1)} m/s
            </p>
            <p className="text-red-400 font-bold mt-2">
              Daño Esperado: {airBlast.damageDescription}
            </p>
          </>
        );
      case "Radiación Térmica":
        return (
          <>
            <p className="text-xl font-bold mt-2">
              {thermalRadiation.thermalExposure_Jm2.toLocaleString(undefined, {
                maximumFractionDigits: 0,
              })}{" "}
              J/m²
            </p>
            <p className="text-sm mt-1">
              Radio de la bola de fuego:{" "}
              {thermalRadiation.fireballRadius_km.toFixed(2)} km
            </p>
            <p className="text-red-400 font-bold mt-2">
              Efectos de Ignición: {thermalRadiation.ignitionEffects}
            </p>
          </>
        );
      case "Retorno de eyecciones":
        // El cálculo de eyecciones es complejo de recalcular dinámicamente, se usa la capa de eyecciones original (o un valor precalculado)
        if (typeof initialResults.ejecta.thickness_m === "undefined")
          return (
            <p className="text-sm mt-2">{initialResults.ejecta.message}</p>
          );

        // El grosor de las eyecciones depende de la distancia y se recalcula, aunque su complejidad puede variar
        // Asumiendo que ejecta es parte del recalculado si es necesario, o usando el resultado inicial si no cambia.
        const currentEjecta =
          recalculatedEffects.ejecta || initialResults.ejecta;
        if (typeof currentEjecta.thickness_m === "undefined")
          return <p className="text-sm mt-2">{currentEjecta.message}</p>;

        return (
          <>
            <p className="text-xl font-bold mt-2">
              Grosor de la capa: {(currentEjecta.thickness_m * 1000).toFixed(2)}{" "}
              mm
            </p>
            <p className="text-sm mt-1">
              Tamaño promedio de fragmentos:{" "}
              {currentEjecta.meanFragmentSize_mm.toFixed(2)} mm
            </p>
          </>
        );
      default:
        return (
          <p className="text-sm mt-2">
            Selecciona un efecto para ver los detalles.
          </p>
        );
    }
  }, [
    selectedEffect,
    scenario,
    initialResults,
    recalculatedEffects,
    crater,
    airBlast,
    thermalRadiation,
  ]);

  // --- Renderizado principal ---
  return (
    <div className="bg-[#000000] text-[#f4d03f] min-h-screen p-5 font-bold">
      {/* Header */}
      <div className="flex justify-between items-center border-b-2 border-[#f4d03f] pb-2 mb-6">
        <h1 className="text-2xl font-bold">Skyfall X | Resultados</h1>
        <button
          onClick={() => navigate("/skyfallx-game")}
          className="hover:underline"
        >
          #Volver al Simulador
        </button>
      </div>

      {/*    
      <div className="border-2 border-dashed border-gray-500 rounded-lg p-3 mb-6 text-sm">
        <h3 className="font-bold mb-1">Inputs de la Simulación:</h3>
        <p>
          **Objeto:** {inputs.composition.toUpperCase()} ({inputs.density_kgm3}{" "}
          kg/m³), **Diámetro:** {inputs.diameter_km.toFixed(2)} km,
          **Velocidad:** {inputs.velocity_kms.toFixed(2)} km/s, **Ángulo:**{" "}
          {inputs.angle_deg}°
        </p>
        <p className="text-xs mt-1 text-gray-400">
          Escenario Inicial: **{scenario}**{" "}
          {scenario === "Airburst"
            ? `a ${(initialResults.burstAltitude / 1000).toFixed(1)} km.`
            : ""}
        </p>
      </div>*/}
      <div className="flex gap-6 flex-col md:flex-row">
        {/* Panel Izquierdo (Mapa y Resumen General) */}
        <div className="border-2 border-[#f4d03f] rounded-lg p-4 flex-1 flex flex-col items-center">
          <h3 className="text-lg font-bold mb-3">Zona de Impacto: Puebla</h3>

          {/* 🗺️ MAPA LEAFLET */}
          <div className="w-full h-120  bg-gray-700 rounded overflow-hidden mb-3">
            <MapContainer
              center={IMPACT_POSITION}
              zoom={MAP_ZOOM}
              className="h-full w-full"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              />

              {/* CÍRCULO QUE REPRESENTA EL CRÁTER O MARCADOR PARA AIRBURST */}
              {scenario !== "Airburst" && craterRadiusMeters > 0 ? (
                <Circle
                  center={IMPACT_POSITION}
                  radius={craterRadiusMeters} // Radio en metros
                  pathOptions={{
                    color: "red",
                    fillColor: "#f03",
                    fillOpacity: 0.5,
                    weight: 2,
                  }}
                >
                  <Popup>
                    Cráter de Impacto estimado (Diámetro:{" "}
                    {((craterRadiusMeters * 2) / 1000).toFixed(2)} km)
                  </Popup>
                </Circle>
              ) : (
                <Marker position={IMPACT_POSITION}>
                  <Popup>
                    {scenario === "Airburst"
                      ? "Explosión Aérea (Airburst) sobre Puebla."
                      : "Impacto en Superficie."}
                  </Popup>
                </Marker>
              )}
            </MapContainer>
          </div>
          {/* --------------------------- */}

          <p className="text-sm mt-4 text-center">
            **Energía Total Liberada:**
            <span className="block text-xl font-bold text-red-400">
              {impactEnergyMegatons.toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })}{" "}
              MT (Megatones de TNT)
            </span>
          </p>
        </div>

        {/* Panel Central (Detalles Dinámicos) */}
        <div className="border-2 border-[#f4d03f] rounded-lg p-4 flex-1">
          <h2 className="text-lg mb-4">Detalles del Impacto a Distancia</h2>

          {/* Distancia Slider */}
          <label className="block mt-2">Distancia del observador</label>
          <input
            type="range"
            min="0"
            max="100"
            value={distanceSliderValue}
            onChange={(e) => setDistanceSliderValue(Number(e.target.value))}
            className="w-full accent-red-600"
          />
          <p className="text-sm mt-1">
            Distancia: **{currentDistanceKm.toFixed(1)} km**
          </p>

          {/* Info dinámica del Efecto */}
          <label className="block mt-4">Efecto seleccionado: </label>
          <p className="text-xl font-bold text-yellow-300">{selectedEffect}</p>
          <div className="border-t border-[#f4d03f] mt-2 pt-2">
            {renderEffectDetails()}
          </div>

          {/* Sismógrafo */}
          <label className="block mt-6">
            Efectos Sísmicos (a {currentDistanceKm.toFixed(1)} km)
          </label>
          <div className="w-full h-16 bg-gray-800 flex items-center justify-center text-red-500 text-xl font-mono">
            MAG: {seismicEffects.richterMagnitude.toFixed(2)}
          </div>
          <p className="text-sm mt-1">
            Magnitud sísmica (Escala de Richter): **
            {seismicEffects.richterMagnitude.toFixed(2)}**
          </p>
          <p className="text-sm mt-1">
            Intensidad Mercalli Modificada: **{seismicEffects.mercalliIntensity}
            **
          </p>
        </div>

        {/* Panel Derecho (Selector de Efectos) */}
        <div className="border-2 border-[#f4d03f] rounded-lg p-4 flex-1 flex flex-col gap-4">
          <h3 className="font-bold text-lg border-b border-[#f4d03f] pb-2">
            Ver Detalle por Fenómeno
          </h3>
          {[
            "Cráter",
            "Onda Expansiva (AirBlast)",
            "Retorno de eyecciones",
            "Radiación Térmica",
          ].map((btn) => (
            <button
              key={btn}
              onClick={() => setSelectedEffect(btn)}
              className={`px-4 py-2 rounded transition ${
                selectedEffect === btn
                  ? "bg-[#f4d03f] text-[#0a0a3d] font-bold"
                  : "bg-transparent text-[#f4d03f] border border-[#f4d03f] hover:bg-[#3d0a0a]"
              }`}
            >
              {btn}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Impacto;
