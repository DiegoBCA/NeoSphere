// pantallas/Impacto.jsx
import React from "react";
import { useLocation } from "react-router-dom";

const Impacto = () => {
  const location = useLocation();
  const { simulationResults, target } = location.state || {};

  if (!simulationResults) {
    return <h1>Error: No se encontraron resultados de la simulación.</h1>;
  }

  // Si hubo un error en la entrada atmosférica (e.g., diámetro muy pequeño)
  if (simulationResults.error) {
    return (
      <div className="p-10 text-white bg-black h-screen">
        <h1>Error de Simulación</h1>
        <p>{simulationResults.error}</p>
        <p>Intenta con un asteroide más grande o más rápido.</p>
      </div>
    );
  }

  // Componente para mostrar resultados (ejemplo)
  return (
    <div className="p-10 text-white bg-black min-h-screen pt-20">
      <h1 className="text-4xl font-bold mb-4">
        Resultado del Impacto en {target}
      </h1>
      <p className="text-xl mb-6">Escenario: {simulationResults.scenario}</p>

      {/* Muestra un resultado del Airburst o Impacto en Superficie */}
      {simulationResults.scenario === "Airburst" ? (
        <p>
          El asteroide explotó en el aire a una altitud de
          <strong className="text-yellow-400">
            {" "}
            {simulationResults.burstAltitude_km.toFixed(2)} km
          </strong>
          .
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl mt-4">Cráter</h2>
            <p>
              Diámetro Final:{" "}
              <strong className="text-yellow-400">
                {(simulationResults.crater.finalDiameter_m / 1000).toFixed(2)}{" "}
                km
              </strong>
            </p>
            <p>
              Tipo:{" "}
              <strong className="text-yellow-400">
                {simulationResults.crater.type}
              </strong>
            </p>
          </div>
          <div>
            <h2 className="text-2xl mt-4">Onda de Choque (Air Blast)</h2>
            <p>
              Sobrepresión a 10 km:{" "}
              <strong className="text-yellow-400">
                {(simulationResults.airBlast.overpressure_Pa / 1000).toFixed(2)}{" "}
                kPa
              </strong>
            </p>
            <p>
              Daño estimado:{" "}
              <strong className="text-yellow-400">
                {simulationResults.airBlast.damageDescription}
              </strong>
            </p>
          </div>
          {/* ... Agrega más resultados aquí (sísmicos, eyectados, etc.) */}
        </div>
      )}
    </div>
  );
};

export default Impacto;
