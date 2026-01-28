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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

// GET: Obtener todos los registros
app.get("/api/items", (req, res) => {
    const sql = "SELECT * FROM tu_tabla";
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

// POST: Guardar nuevo registro (Ya con el link de Cloudinary que mandes desde React)
app.post("/api/items", (req, res) => {
    const { nombre, descripcion, imagen_url } = req.body;
    const sql = "INSERT INTO tu_tabla (nombre, descripcion, imagen_url) VALUES (?, ?, ?)";

    db.query(sql, [nombre, descripcion, imagen_url], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Registro creado con éxito", id: result.insertId });
    });
});
