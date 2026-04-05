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

  // add columns if they don't exist yet
  const cols = db.prepare("PRAGMA table_info(cards)").all() as Array<{
    name: string;
  }>;
  if (!cols.some((c) => c.name === "animated")) {
    db.exec("ALTER TABLE cards ADD COLUMN animated INTEGER NOT NULL DEFAULT 0");
  }
  if (!cols.some((c) => c.name === "format")) {
    db.exec(
      "ALTER TABLE cards ADD COLUMN format TEXT NOT NULL DEFAULT 'landscape'",
    );
  }
  if (!cols.some((c) => c.name === "photo_transform")) {
    db.exec(
      "ALTER TABLE cards ADD COLUMN photo_transform TEXT NOT NULL DEFAULT '{\"scale\":1,\"x\":0,\"y\":0}'",
    );
  }
}

export default getDb;
