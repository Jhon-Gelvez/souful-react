const express = require('express');
const mysql = require('mysql2');
const cloudinary = require('cloudinary').v2;
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json()); // Para poder leer JSON en los POST

// 1. Configurar Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// 2. Conexión a MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect(err => {
  if (err) throw err;
  console.log('✅ Conectado a la base de datos MySQL');
});

// --- RUTAS ---

// GET: Obtener todos los registros
app.get('/api/items', (req, res) => {
  const sql = "SELECT * FROM tu_tabla";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// POST: Guardar nuevo registro (Ya con el link de Cloudinary que mandes desde React)
app.post('/api/items', (req, res) => {
  const { nombre, descripcion, imagen_url } = req.body;
  const sql = "INSERT INTO tu_tabla (nombre, descripcion, imagen_url) VALUES (?, ?, ?)";
  
  db.query(sql, [nombre, descripcion, imagen_url], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Registro creado con éxito', id: result.insertId });
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});