import React, { useEffect } from "react";

function OrbitRedirect() {
  // useEffect se ejecuta una vez después de que el componente se monta
  useEffect(() => {
    // Redirige al usuario a la URL externa
    window.location.href = "https://asteroid-db-2nk6.vercel.app/";
  }, []);

  return (
    <div>
      <p>Redirigiendo a Asteroid-DB...</p>
      {/* Esto se muestra muy brevemente o nada, dependiendo de la velocidad */}
    </div>
  );
}

export default OrbitRedirect;
