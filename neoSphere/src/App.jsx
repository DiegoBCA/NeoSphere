import { useState } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Inicio from "./pantallas/inicio";
import Carousel from "./pantallas/Carousel";

function App() {
  return (
    <Router>
      <main className="min-h-screen bg-black text-white overflow-hidden">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/simulator" element={<Carousel />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
