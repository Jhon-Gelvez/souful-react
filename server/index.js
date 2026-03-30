import express from "express";
import cors from "cors";
import "dotenv/config";
import itemRoutes from "./routes/itemRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";

const app = express();

app.use(cors());
app.use(express.json()); // Para poder leer JSON en los POST

// --- RUTAS ---
// ruta de prueba

// Usar las rutas
app.use("/api/items", itemRoutes);

app.use("/api/categories", categoryRoutes);

app.get("/", (req, res) => {
    res.json({ 
        status: "online",
        message: "Server running on port 3001" 
    });
});
// PUERTO
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
