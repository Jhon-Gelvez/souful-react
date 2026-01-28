import express from "express";
import cors from "cors";
import "dotenv/config";
import router from "./routes/itemRoutes.js";

const app = express();

app.use(cors());
app.use(express.json()); // Para poder leer JSON en los POST

// --- RUTAS ---
// Usar las rutas
app.use("/api/items", router);

app.use("/api/categories", categoryRoutes);

// PUERTO
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
