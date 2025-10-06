import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Importa el componente de la barra de navegación
import NavBar from "./components/NavBar";

// Importa tus componentes de pantalla (rutas principales)
// --- CORRECCIÓN FINAL: Se usa la ruta './pantallas/' y la capitalización que Vercel requiere.
import Inicio from "./pantallas/Inicio.jsx";
import Astronomy1 from "./pantallas/astronomy1.jsx"; // <--- CORRECCIÓN DE MINÚSCULA APLICADA AQUÍ
import SkyfallX1 from "./pantallas/SkyfallX1.jsx";
import Impacto from "./pantallas/Impacto.jsx";
import Resultados from "./pantallas/Resultados.jsx";
import Orbit from "./pantallas/OrbitRedirect.jsx";
import VideoLayout1 from "./pantallas/VideoLayout1.jsx";
//import { Orbit } from "ogl";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        {/* Rutas principales */}
        <Route path="/" element={<Inicio />} />
        <Route path="/astronomy-simulator" element={<Astronomy1 />} />
        <Route path="/skyfallx-game" element={<SkyfallX1 />} />
        <Route path="/video1" element={<VideoLayout1 />} />
        <Route path="/impacto" element={<Impacto />} />
        <Route path="/result" element={<Resultados />} />
        <Route path="/orbita" element={<Orbit />} />
      </Routes>
    </Router>
  );
}

export default App;
