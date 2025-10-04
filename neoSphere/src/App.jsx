import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Importa el componente de la barra de navegación
import NavBar from "./components/NavBar";

// Importa tus componentes de pantalla (rutas principales)
import Inicio from "./pantallas/inicio";
import Astronomy1 from "./pantallas/astronomy1";
import SkyfallX1 from "./pantallas/skyfallX1";
import Impacto from "./pantallas/impacto";

// 🚀 Importación corregida: Solo VideoLayout1 (el componente que lee el ID de la URL)
import VideoLayout1 from "./pantallas/pantvid/VideoLayout1";

function App() {
  return (
    <Router>
      {/* La barra de navegación se muestra en todas las rutas */}
      <NavBar />
      <Routes>
        {/* Rutas principales */}
        <Route path="/" element={<Inicio />} />
        <Route path="/astronomy-simulator" element={<Astronomy1 />} />
        <Route path="/skyfallx-game" element={<SkyfallX1 />} />

        {/* 🌠 Rutas de Resultado de Simulación */}

        {/* Ruta para mostrar los resultados de cálculo (desde SkyfallX1) */}
        <Route path="/impacto" element={<Impacto />} />

        {/* Ruta dinámica para el video de cada asteroide (desde Astronomy1) */}
        <Route path="/video/:id" element={<VideoLayout1 />} />

        {/* ⚠️ RUTA TEMPORALMENTE DESACTIVADA: 
        La ruta /info/:id (que debería usar SkyfallX1Info) 
        ha sido omitida según tu solicitud.
        */}
      </Routes>
    </Router>
  );
}

export default App;
