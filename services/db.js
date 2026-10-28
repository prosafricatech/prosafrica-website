// SQLite connection for the website's own data.
//
// Uses node:sqlite, built into Node 22+, so this adds no dependency and needs
// no service to run alongside the site. Everything the rest of the code touches
// goes through the stores in this folder, not through this module directly —
// swapping SQLite for Postgres later means rewriting those stores, not the
// route handlers.
//
// REQUIREMENT: the process needs a writable, *persistent* disk at DATA_DIR.
// That is true on a normal Node host or a container with a mounted volume. On
// a serverless platform the filesystem is ephemeral and per-invocation, so
// rows written here would not survive — move to a hosted database before
// deploying there.

const fs = require("node:fs");
const { createRequire } = require("node:module");
const path = require("node:path");

// Resolved at runtime rather than imported directly: Turbopack does not know
// `node:sqlite` and fails the build with "Unsupported external type Url for
// commonjs reference". Going through createRequire keeps the specifier out of
// the bundler's module graph, so Node resolves it itself when the route runs.
const { DatabaseSync } = createRequire(__filename)("node:sqlite");

const dataDir = process.env.DATA_DIR || path.join(process.cwd(), ".data");

// The requirement above fails *silently* if it is ignored: on a serverless host
// every invocation gets its own throwaway filesystem, so the write succeeds,
// returns an id, and the row is gone by the next request. Nothing surfaces —
// demo notifications keep arriving by email while the table quietly stays
// empty — so the one chance to notice is a log line at startup. The legacy
// gulpfile still carries a "Dummy build task for Vercel" comment, which makes
// this more than hypothetical for this repo.
const ephemeralHost =
  process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME || process.env.NETLIFY;

let db;
let warned = false;

function getDb() {
  if (db) return db;

  if (ephemeralHost && !warned) {
    warned = true;
    console.warn(
      "[db] Serverless host detected. " +
        `SQLite at ${dataDir} is per-invocation here: rows written will not ` +
        "survive the request that wrote them. Move to a hosted database, or " +
        "point DATA_DIR at a mounted persistent volume.",
    );
  }

  fs.mkdirSync(dataDir, { recursive: true });
  db = new DatabaseSync(path.join(dataDir, "site.sqlite"));

  // WAL lets a read run while a write is in flight, which matters once the
  // content tables are read on every page render.
  db.exec("PRAGMA journal_mode = WAL");
  db.exec("PRAGMA foreign_keys = ON");
  migrate(db);

  return db;
}

function migrate(database) {
  database.exec(`
    CREATE TABLE IF NOT EXISTS demo_inquiries (
      id            INTEGER PRIMARY KEY AUTOINCREMENT,
      full_name     TEXT    NOT NULL,
      email         TEXT    NOT NULL,
      phone         TEXT    NOT NULL,
      organization  TEXT    NOT NULL,
      industry      TEXT    NOT NULL,
      description   TEXT    NOT NULL,
      -- 'pending' until the notification email resolves, then 'sent' or
      -- 'failed'. A 'failed' row is a lead that was captured but not yet
      -- announced, so it is the retry queue.
      email_status  TEXT    NOT NULL DEFAULT 'pending',
      email_error   TEXT,
      created_at    TEXT    NOT NULL DEFAULT (datetime('now')),
      updated_at    TEXT    NOT NULL DEFAULT (datetime('now'))
    );

    CREATE INDEX IF NOT EXISTS idx_demo_inquiries_status
      ON demo_inquiries (email_status, created_at);
  `);
}

module.exports = { getDb, dataDir };
