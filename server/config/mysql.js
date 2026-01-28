import { createPool } from "mysql2/promise";
import "dotenv/config";

export const db = createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// Para probar la conexión inmediatamente
async function testConnection() {
    try {
        const connection = await db.getConnection();
        console.log("✅ Conectado a la base de datos MySQL con Promises");
        connection.release(); // Muy importante liberar la conexión al terminar la prueba
    } catch (err) {
        console.error("❌ Error conectando a la base de datos:", err.message);
    }
}

testConnection();
