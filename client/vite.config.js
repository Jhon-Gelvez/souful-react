import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],

    base: "/souful-react/", // Añades esta línea
    server: {
    host: true,         // Permite conexiones externas (móvil)
    strictPort: true,
    origin: 'https://2pnz8d41-5173.use2.devtunnels.ms', // Fuerza el origen del túnel
    hmr: false
  }
});
