import Database from "bun:sqlite";
import fs from "fs";
import path from "path";
import { STORE_DIR } from "../config.js";
let db = null;
function createSchema(database) {
    database.exec(`
    CREATE TABLE IF NOT EXISTS chats (
      jid TEXT PRIMARY KEY,
      name TEXT,
      last_message_time TEXT
    );
    CREATE INDEX IF NOT EXISTS idx_chats_last_message_time ON chats(last_message_time);
    CREATE TABLE IF NOT EXISTS messages (
      id TEXT,
      chat_jid TEXT,
      sender TEXT,
      sender_name TEXT,
      content TEXT,
      content_blocks TEXT,
      link_previews TEXT,
      timestamp TEXT,
      is_from_me INTEGER,
      is_bot_message INTEGER DEFAULT 0,
      PRIMARY KEY (id, chat_jid),
      FOREIGN KEY (chat_jid) REFERENCES chats(jid)
    );
    CREATE INDEX IF NOT EXISTS idx_timestamp ON messages(timestamp);
    CREATE INDEX IF NOT EXISTS idx_messages_chat_jid ON messages(chat_jid);
    CREATE INDEX IF NOT EXISTS idx_messages_chat_jid_timestamp ON messages(chat_jid, timestamp);
    CREATE INDEX IF NOT EXISTS idx_messages_chat_jid_bot_timestamp ON messages(chat_jid, is_bot_message, timestamp);

    CREATE VIRTUAL TABLE IF NOT EXISTS messages_fts USING fts5(
      content,
      chat_jid UNINDEXED,
      sender UNINDEXED,
      sender_name UNINDEXED,
      timestamp UNINDEXED,
      is_bot_message UNINDEXED,
      content='messages',
      content_rowid='rowid'
    );

    CREATE TRIGGER IF NOT EXISTS messages_ai AFTER INSERT ON messages BEGIN
      INSERT INTO messages_fts(rowid, content, chat_jid, sender, sender_name, timestamp, is_bot_message)
      VALUES (new.rowid, new.content, new.chat_jid, new.sender, new.sender_name, new.timestamp, new.is_bot_message);
    END;

    CREATE TRIGGER IF NOT EXISTS messages_ad AFTER DELETE ON messages BEGIN
      INSERT INTO messages_fts(messages_fts, rowid, content, chat_jid, sender, sender_name, timestamp, is_bot_message)
      VALUES ('delete', old.rowid, old.content, old.chat_jid, old.sender, old.sender_name, old.timestamp, old.is_bot_message);
    END;

    CREATE TRIGGER IF NOT EXISTS messages_au AFTER UPDATE ON messages BEGIN
      INSERT INTO messages_fts(messages_fts, rowid, content, chat_jid, sender, sender_name, timestamp, is_bot_message)
      VALUES ('delete', old.rowid, old.content, old.chat_jid, old.sender, old.sender_name, old.timestamp, old.is_bot_message);
      INSERT INTO messages_fts(rowid, content, chat_jid, sender, sender_name, timestamp, is_bot_message)
      VALUES (new.rowid, new.content, new.chat_jid, new.sender, new.sender_name, new.timestamp, new.is_bot_message);
    END;

    CREATE TABLE IF NOT EXISTS media (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      filename TEXT NOT NULL,
      content_type TEXT NOT NULL,
      data BLOB NOT NULL,
      thumbnail BLOB,
      metadata TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );
    CREATE INDEX IF NOT EXISTS idx_media_created_at ON media(created_at);

    CREATE TABLE IF NOT EXISTS message_media (
      message_rowid INTEGER NOT NULL,
      media_id INTEGER NOT NULL,
      PRIMARY KEY (message_rowid, media_id),
      FOREIGN KEY (media_id) REFERENCES media(id)
    );
    CREATE INDEX IF NOT EXISTS idx_message_media_message_rowid ON message_media(message_rowid);
    CREATE INDEX IF NOT EXISTS idx_message_media_media_id ON message_media(media_id);

    CREATE TABLE IF NOT EXISTS tool_outputs (
      id TEXT PRIMARY KEY,
      created_at TEXT NOT NULL,
      source TEXT,
      size_bytes INTEGER,
      line_count INTEGER,
      summary TEXT,
      path TEXT
    );
    CREATE INDEX IF NOT EXISTS idx_tool_outputs_created_at ON tool_outputs(created_at);

    CREATE VIRTUAL TABLE IF NOT EXISTS tool_outputs_fts USING fts5(
      content,
      output_id UNINDEXED
    );

    CREATE TABLE IF NOT EXISTS scheduled_tasks (
      id TEXT PRIMARY KEY,
      chat_jid TEXT NOT NULL,
      prompt TEXT NOT NULL,
      model TEXT,
      schedule_type TEXT NOT NULL,
      schedule_value TEXT NOT NULL,
      next_run TEXT,
      last_run TEXT,
      last_result TEXT,
      status TEXT DEFAULT 'active',
      created_at TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_next_run ON scheduled_tasks(next_run);
    CREATE INDEX IF NOT EXISTS idx_status ON scheduled_tasks(status);
    CREATE INDEX IF NOT EXISTS idx_scheduled_tasks_created_at ON scheduled_tasks(created_at);
    CREATE INDEX IF NOT EXISTS idx_scheduled_tasks_last_run ON scheduled_tasks(last_run);

    CREATE TABLE IF NOT EXISTS task_run_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      task_id TEXT NOT NULL,
      run_at TEXT NOT NULL,
      duration_ms INTEGER NOT NULL,
      status TEXT NOT NULL,
      result TEXT,
      error TEXT,
      FOREIGN KEY (task_id) REFERENCES scheduled_tasks(id)
    );
    CREATE INDEX IF NOT EXISTS idx_task_run_logs ON task_run_logs(task_id, run_at);

    CREATE TABLE IF NOT EXISTS router_state (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS token_usage (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      chat_jid TEXT NOT NULL,
      run_at TEXT NOT NULL,
      input_tokens INTEGER DEFAULT 0,
      output_tokens INTEGER DEFAULT 0,
      cache_read_tokens INTEGER DEFAULT 0,
      cache_write_tokens INTEGER DEFAULT 0,
      total_tokens INTEGER DEFAULT 0,
      cost_input REAL DEFAULT 0,
      cost_output REAL DEFAULT 0,
      cost_cache_read REAL DEFAULT 0,
      cost_cache_write REAL DEFAULT 0,
      cost_total REAL DEFAULT 0,
      model TEXT,
      provider TEXT,
      api TEXT,
      turns INTEGER DEFAULT 0
    );
    CREATE INDEX IF NOT EXISTS idx_token_usage_chat_jid ON token_usage(chat_jid);
    CREATE INDEX IF NOT EXISTS idx_token_usage_run_at ON token_usage(run_at);
    CREATE INDEX IF NOT EXISTS idx_token_usage_chat_jid_run_at ON token_usage(chat_jid, run_at);
  `);
}
function ensureMessageColumns(database) {
    const columns = database.prepare("PRAGMA table_info(messages)").all();
    const existing = new Set(columns.map((col) => col.name));
    const ensureColumn = (name) => {
        if (existing.has(name))
            return;
        try {
            database.exec(`ALTER TABLE messages ADD COLUMN ${name} TEXT`);
        }
        catch {
            // ignore if column already exists or cannot be added
        }
    };
    ensureColumn("content_blocks");
    ensureColumn("link_previews");
}
function ensureFts(database) {
    const row = database.prepare("PRAGMA user_version").get();
    const version = typeof row?.user_version === "number" ? row.user_version : 0;
    if (version >= 1)
        return;
    database.exec("INSERT INTO messages_fts(messages_fts) VALUES('rebuild');");
    database.exec("PRAGMA user_version = 1;");
}
function ensureScheduledTaskColumns(database) {
    const columns = database.prepare("PRAGMA table_info(scheduled_tasks)").all();
    const existing = new Set(columns.map((col) => col.name));
    if (!existing.has("model")) {
        try {
            database.exec("ALTER TABLE scheduled_tasks ADD COLUMN model TEXT");
        }
        catch {
            // ignore if column already exists or cannot be added
        }
    }
}
export function initDatabase() {
    const dbPath = path.join(STORE_DIR, "messages.db");
    fs.mkdirSync(path.dirname(dbPath), { recursive: true });
    db = new Database(dbPath);
    db.exec("PRAGMA journal_mode = WAL;");
    db.exec("PRAGMA busy_timeout = 5000;");
    createSchema(db);
    ensureMessageColumns(db);
    ensureScheduledTaskColumns(db);
    ensureFts(db);
}
export function getDb() {
    if (!db) {
        throw new Error("Database not initialized");
    }
    return db;
}
