import Database from "better-sqlite3";
import path from "path";

// singleton - don't want multiple connections stomping on each other
let _db: Database.Database | null = null;

function getDb(): Database.Database {
  if (!_db) {
    const dbPath = path.join(process.cwd(), "ecard.db");
    _db = new Database(dbPath);
    _db.pragma("journal_mode = WAL");
    _db.pragma("foreign_keys = ON");
    migrate(_db);
  }
  return _db;
}

function migrate(db: Database.Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS cards (
      id TEXT PRIMARY KEY,
      user_id TEXT,
      photo_url TEXT,
      template TEXT NOT NULL DEFAULT 'gradient-sunset',
      text_config TEXT NOT NULL DEFAULT '{}',
      created_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (user_id) REFERENCES users(id)
    );
  `);
}

export default getDb;
