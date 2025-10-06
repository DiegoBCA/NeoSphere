import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Importa el componente de la barra de navegación
import NavBar from "./components/NavBar";

// Importa tus componentes de pantalla (rutas principales)
// --- CORRECCIÓN DE CASING (Sensibilidad a Mayúsculas/Minúsculas) ---
// Se asume que el directorio es 'Pantallas' y los archivos inician con mayúscula.
import Inicio from "./Pantallas/Inicio";
import Astronomy1 from "./Pantallas/Astronomy1";
import SkyfallX1 from "./Pantallas/SkyfallX1";
import Impacto from "./Pantallas/Impacto";
import Resultados from "./Pantallas/Resultados";
import Orbit from "./pantallas/OrbitRedirect";
import VideoLayout1 from "./Pantallas/VideoLayout1";
//import { Orbit } from "ogl"; // Comentario, no es necesario cambiar

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
