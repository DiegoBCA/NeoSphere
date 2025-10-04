import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// NOTA: Para funcionar en este entorno de un solo archivo,
// no podemos usar importaciones relativas de videos como "../../assets/videos/aste.mp4".
// Debemos referenciar las rutas públicas directas (/videos/...).

// Aseguramos que el componente reciba el asteroideId, que es crucial para la lógica de navegación
const VideoLayout1 = ({ asteroideId }) => {
  const [showWarning, setShowWarning] = useState(false);
  const navigate = useNavigate();

  // LÓGICA CRÍTICA: SOLO el ID '1' navega a /info. Los demás regresan a /simulator.
  const shouldNavigateToInfo = asteroideId === "1";

  const handleLaunchClick = () => setShowWarning(true);

  const handleAcceptWarning = () => {
    setShowWarning(false);

    // Navegación dinámica basada en el ID
    if (shouldNavigateToInfo) {
      // Si es el Asteroide 1, navega a su página de configuración de Info
      navigate(`/info/${asteroideId}`);
    } else {
      // Si es cualquier otro ID, regresa al simulador
      navigate("/simulator");
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black font-sans">
      {/* Video principal de fondo */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover opacity-80"
        autoPlay
        loop
        muted
      >
        {/* Usamos la ruta pública del video */}
        <source src="/videos/aste.mp4" type="video/mp4" />
        Tu navegador no soporta el tag de video.
      </video>

      {/* Recuadro de video pequeño (Miniatura) */}
      <div className="absolute top-5 right-5 w-80 h-52 border-2 border-white rounded-xl overflow-hidden shadow-lg z-10 md:w-[360px] md:h-[220px]">
        <video className="w-full h-full object-cover" autoPlay loop muted>
          {/* Usamos la ruta pública del video */}
          <source src="/videos/orbi.mp4" type="video/mp4" />
          Tu navegador no soporta el tag de video.
        </video>
      </div>

      {/* Recuadro de texto informativo (Mejorado para responsividad y contenido dinámico) */}
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                    bg-black bg-opacity-70 text-white p-6 rounded-xl max-w-4xl w-11/12 md:max-w-xl z-10 text-center shadow-2xl backdrop-blur-sm 
                    md:top-1/3 md:left-6 md:transform-none"
      >
        <h2 className="text-2xl font-extrabold mb-3 text-red-400">
          Asteroide {asteroideId}: Evaluación de Trayectoria
        </h2>
        <p className="text-sm md:text-base max-h-40 overflow-y-auto custom-scrollbar">
          Este es el recuadro con texto encima del video. La trayectoria del
          asteroide **{asteroideId}** ha sido modelada. Este es el único
          asteroide que permite la configuración manual del impacto.
        </p>
      </div>

      {/* Botón de Lanzamiento (ajustado con estilos de Tailwind estándar) */}
      <div className="absolute bottom-6 right-6 z-10">
        <button
          onClick={handleLaunchClick}
          className="bg-red-700 text-white px-8 py-4 rounded-full hover:bg-red-800 transition text-2xl font-bold shadow-2xl transform hover:scale-105 active:scale-95"
        >
          {shouldNavigateToInfo ? "Configurar Impacto" : "Continuar"}
        </button>
      </div>

      {/* Advertencia (Modal con contenido dinámico) */}
      {showWarning && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-90 z-50 p-4">
          <div className="bg-red-700 text-white rounded-xl p-8 max-w-lg text-center shadow-2xl">
            <h2 className="text-3xl font-extrabold mb-4">
              ⚠️ Advertencia de Simulación
            </h2>
            <p className="mb-6 text-lg">
              Estás a punto de iniciar la simulación para el Asteroide{" "}
              {asteroideId}.
              {shouldNavigateToInfo
                ? " Este es el único asteroide que permite la configuración manual de su impacto."
                : " Este asteroide solo permite la visualización. Serás redirigido al simulador principal."}
            </p>
            <button
              onClick={handleAcceptWarning}
              className="bg-white text-red-700 px-8 py-3 rounded-full hover:bg-gray-100 transition font-bold"
            >
              Entendido
            </button>
          </div>
        </div>
      )}

      {/* Estilos para scrollbar en la caja de texto */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #fca5a5; border-radius: 3px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
      `}</style>
    </div>
  );
};

export default VideoLayout1;
