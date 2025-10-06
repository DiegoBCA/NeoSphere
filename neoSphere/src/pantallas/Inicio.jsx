import React from "react";
import Particles from "../components/Particles";
import { useNavigate } from "react-router-dom";
import BlurText from "../components/BlurText";
import { HoverBorderGradient } from "../components/hover-border-gradient";

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

      <div className="absolute flex flex-col justify-center items-center z-10 w-full">
        {/* Título animado */}
        <div className="flex flex-row items-center mb-10">
          <BlurText
            text="NEO"
            delay={100}
            animateBy="letters"
            direction="top"
            className="text-white text-9xl font-light tracking-wide drop-shadow-md mr-5"
          />
          <BlurText
            text="Sphere"
            delay={300}
            animateBy="letters"
            direction="top"
            className="text-white text-9xl font-light drop-shadow-sm"
          />
        </div>

        {/* Botones alineados */}
        <div className="flex flex-row justify-between w-[550px] mt-20">
          <HoverBorderGradient
            containerClassName=" hover:bg-[#FFDD0F]  rounded-lg transition flex items-center justify-center px-15 py-4 text-xl min-w-[200px]"
            as="button"
            onClick={() => navigate("/astronomy-simulator")}
          >
            Astroviary
          </HoverBorderGradient>

          <HoverBorderGradient
            containerClassName=" hover:bg-[#1D0175]  rounded-lg transition flex items-center justify-center px-15 py-4 text-xl min-w-[200px]"
            as="button"
            onClick={() => navigate("/skyfallx-game")}
          >
            Sky Fall X
          </HoverBorderGradient>
        </div>
      </div>
    </div>
  );
}

export default Inicio;
