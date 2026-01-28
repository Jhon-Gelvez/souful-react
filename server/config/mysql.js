// import mysql from "mysql2"; 
import {createPool} from "mysql2/promise"
// usar la version con promesas "mysql2/promise"
import "dotenv/config";
import { version } from "react";

export const db = createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

db.connect((err) => {
    if (err) throw err;
    console.log("✅ Conectado a la base de datos MySQL");
});
