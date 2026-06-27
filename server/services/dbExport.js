import { spawn } from "child_process";
import path from "path";
import { existsSync, createWriteStream } from "fs";
import { fileURLToPath } from "url";
import "dotenv/config";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "../..");
const outputPath = path.join(projectRoot, "database", "soulfulart.sql");

function findMysqldump() {
  const isWin = process.platform === "win32";
  const candidates = isWin
    ? [
        "C:\\Program Files\\MySQL\\MySQL Server 8.0\\bin\\mysqldump.exe",
        "C:\\Program Files\\MySQL\\MySQL Workbench 8.0\\mysqldump.exe",
        "C:\\xampp\\mysql\\bin\\mysqldump.exe",
      ]
    : [
        "/usr/bin/mysqldump",
        "/usr/local/bin/mysqldump",
        "/usr/local/mysql/bin/mysqldump",
      ];
  return candidates.find(existsSync) || "mysqldump";
}

const MYSQLDUMP = findMysqldump();
let timeoutId = null;

function runExport() {
  return new Promise((resolve, reject) => {
    const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, PORT_DB } = process.env;

    const args = [
      `-h${DB_HOST}`,
      `-P${PORT_DB || 3306}`,
      `-u${DB_USER}`,
      `-p${DB_PASSWORD}`,
      DB_NAME,
    ];

    const mysqldump = spawn(MYSQLDUMP, args);
    const writeStream = createWriteStream(outputPath);

    mysqldump.stdout.pipe(writeStream);

    let stderr = "";
    mysqldump.stderr.on("data", (data) => { stderr += data.toString(); });

    mysqldump.on("error", (err) => {
      console.error("Failed to start mysqldump:", err.message);
      reject(err);
    });

    writeStream.on("error", (err) => {
      console.error("Error writing dump file:", err.message);
      reject(err);
    });

    mysqldump.on("close", (code) => {
      writeStream.end();
      if (code !== 0) {
        const msg = `mysqldump exited with code ${code}: ${stderr}`;
        console.error(msg);
        reject(new Error(msg));
        return;
      }
      console.log("Database exported to database/soulfulart.sql");
      resolve();
    });
  });
}

export function dbExport() {
  if (timeoutId) clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    timeoutId = null;
    runExport();
  }, 2000);
}

if (
  process.argv[1] &&
  path.resolve(fileURLToPath(import.meta.url)) === path.resolve(process.argv[1])
) {
  runExport();
}
