import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Se elimina 'base: "./",'. Vercel por defecto usa la raíz ('/').
  // Se elimina la línea comentada para evitar confusiones.
});
