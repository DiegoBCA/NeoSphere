import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Importa el componente de la barra de navegación
import NavBar from "./components/NavBar";

// Importa tus componentes de pantalla (rutas principales)
import Inicio from "./pantallas/inicio";
import Astronomy1 from "./pantallas/astronomy1";
import SkyfallX1 from "./pantallas/skyfallX1";
import Impacto from "./pantallas/impacto";

import VideoLayout1 from "./pantallas/VideoLayout1";

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
      </Routes>
    </Router>
  );
}

export default App;
