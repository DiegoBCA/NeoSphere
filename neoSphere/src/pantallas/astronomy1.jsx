import React from "react";
import { useNavigate } from "react-router-dom";
import DomeGallery from "../components/DomeGallery";
import { HoverBorderGradient } from "../components/hover-border-gradient";

const astronomy1 = () => {
  const navigate = useNavigate();

  const onEmpezarClick = () => {
    navigate("/"); // Cambia esto según tu estructura de rutas
  };
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "relative",
        backgroundColor: "#808080", // Fondo gris
      }}
    >
      <DomeGallery openedImageWidth="80vw" openedImageHeight="80vh" />
      <div className="absolute bottom-40 left-45/100 transform -translate-x-1/2">
        <HoverBorderGradient
          containerClassName="rounded-lg transition flex items-center justify-center px-10 py-4 text-xl min-w-[200px] bg-black border-2 border-gray-500 hover:bg-[#FFDD0F]"
          as="button"
          onClick={() => navigate("/orbita")}
        >
          Órbitas
        </HoverBorderGradient>
      </div>
    </div>
  );
};

export default astronomy1;
