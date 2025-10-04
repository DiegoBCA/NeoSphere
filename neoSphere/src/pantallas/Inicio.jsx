import React from "react";
import Particles from "../components/Particles";
import { useNavigate } from "react-router-dom";

function Inicio() {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-screen bg-black flex justify-center items-center overflow-hidden">
      <div className="absolute inset-0">
        <Particles
          particleColors={["#ffffff", "#ffffff"]}
          particleCount={600}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>

      <div className="absolute flex flex-col justify-center items-center z-10">
        <h1 className="text-center text-6xl font-light mb-10">
          <span className="text-white tracking-wide drop-shadow-md">NEO</span>
          <span className="ml-3 text-white font-light drop-shadow-sm">
            Sphere
          </span>
        </h1>

        <button
          onClick={() => navigate("/simulator")}
          className="bg-gray-700 hover:bg-gray-600 cursor-pointer text-white px-6 py-3 rounded-lg transition"
        >
          Iniciar
        </button>
      </div>
    </div>
  );
}

export default Inicio;
