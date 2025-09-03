import sqlite3 from "sqlite3";
import { open } from "sqlite";

export async function initDB() {
  const db = await open({
    filename: "mydb.sqlite",
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      verif_status TEXT DEFAULT 'PENDING',
      verification_token TEXT,
      token_expires_at INTEGER
    )
  `);

  console.log("DB SQLite initialized ✅");
  return db;
}

export default initDB;