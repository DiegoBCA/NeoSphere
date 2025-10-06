import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Importa el componente de la barra de navegación
import NavBar from "./components/NavBar";

// Importa tus componentes de pantalla (rutas principales)
// --- CORRECCIÓN FINAL: Se usa la ruta './pantallas/' y la capitalización de los archivos
// que se ven en la imagen adjunta (mayúsculas iniciales en casi todos).
import Inicio from "./pantallas/Inicio.jsx"; // Archivo con I mayúscula
import Astronomy1 from "./pantallas/Astronomy1.jsx"; // Archivo con A mayúscula (corregido)
import SkyfallX1 from "./pantallas/SkyfallX1.jsx"; // Archivo con S mayúscula (corregido)
import Impacto from "./pantallas/Impacto.jsx"; // Archivo con I mayúscula (corregido)
import Resultados from "./pantallas/Resultados.jsx"; // Archivo con R mayúscula (corregido)
import Orbit from "./pantallas/OrbitRedirect.jsx"; // <--- CORREGIDO: Usando el nombre real del archivo en la carpeta
import VideoLayout1 from "./pantallas/VideoLayout1.jsx"; // Archivo con V mayúscula (corregido)
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
