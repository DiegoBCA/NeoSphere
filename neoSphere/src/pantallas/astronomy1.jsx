import React from "react";
import { useNavigate } from "react-router-dom";
import DomeGallery from "../components/DomeGallery";

const astronomy1 = () => {
  const navigate = useNavigate();

  const onEmpezarClick = () => {
    navigate("/"); // Cambia esto según tu estructura de rutas
  };

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <DomeGallery />

      <button
        onClick={onEmpezarClick}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-gray-500 hover:bg-gray-600 cursor-pointer text-white px-8 py-3 rounded-lg z-20"
      >
        Empezar
      </button>
    </div>
  );
};

export default astronomy1;
