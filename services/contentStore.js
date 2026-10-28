// Editable site content.
//
// First content type: the client logo grid. docs/product-evidence-register.md
// treats that grid as blocking for public launch, because showing a company's
// name and mark is a customer-reference claim that needs (a) confirmation they
// are a live ProsERP customer and (b) written permission to use the logo.
//
// Holding the grid here rather than in a component array means a logo can be
// published the day its permission letter arrives, and pulled the day it is
// withdrawn, without a code change or a deploy.
//
// The safe default is OFF: a row seeded from the old hard-coded array starts
// `permitted = 0` and does not render until someone records the permission.

const { getDb } = require("./db");

function migrateContent(db) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS client_logos (
      id              INTEGER PRIMARY KEY AUTOINCREMENT,
      name            TEXT    NOT NULL UNIQUE,
      src             TEXT    NOT NULL,
      -- 0 until written permission is on file. Nothing renders without it.
      permitted       INTEGER NOT NULL DEFAULT 0,
      -- Where that permission is recorded, e.g. an email or file reference.
      permission_note TEXT,
      sort_order      INTEGER NOT NULL DEFAULT 0,
      created_at      TEXT    NOT NULL DEFAULT (datetime('now')),
      updated_at      TEXT    NOT NULL DEFAULT (datetime('now'))
    );
  `);
}

/** The 12 logos previously hard-coded in components/home-experience.tsx. */
const SEED_LOGOS = [
  { name: "Transpower", src: "/images/Transpower Logo.png" },
  { name: "White City International", src: "/images/WHITE-CITY-GENUINE-LOGO-2.png" },
  { name: "RES Company Ltd", src: "/images/LOGO Transparent.png" },
  { name: "GP Petrol Stations", src: "/images/GP-Logo.png" },
  { name: "Calia Service Station", src: "/images/canvasized victoria  logo.png" },
  { name: "Farmer's Basket", src: "/images/Farmer's Basket Logo-1.png" },
  { name: "Shalak Trading Company Ltd", src: "/images/Main-logo.png" },
  { name: "Dowy Beauty", src: "/images/Transparent Logo.png" },
  { name: "Buildsol", src: "/images/BUILDSOL LOGO-1.png" },
  { name: "Black Mountain", src: "/images/black_mountain.png" },
  { name: "Brecol", src: "/images/BRECOL_LOGO_PIC.png" },
  { name: "Namis", src: "/images/namis.png" },
];

let ready = false;

function db() {
  const database = getDb();
  if (!ready) {
    migrateContent(database);
    seedLogos(database);
    ready = true;
  }
  return database;
}

/** Inserts any missing seed logo, unpermitted. Never changes an existing row. */
function seedLogos(database) {
  const insert = database.prepare(
    `INSERT OR IGNORE INTO client_logos (name, src, permitted, sort_order)
     VALUES (?, ?, 0, ?)`,
  );
  SEED_LOGOS.forEach((logo, index) => insert.run(logo.name, logo.src, index));
}

// node:sqlite returns rows with a null prototype. React refuses to serialise
// those across the server/client boundary ("Only plain objects ... can be
// passed to Client Components"), so every row leaves this module as a plain
// object.
const plain = (rows) => rows.map((row) => ({ ...row }));

/** Logos cleared for publication, in display order. */
function publishedLogos() {
  return plain(
    db()
      .prepare(
        `SELECT name, src FROM client_logos
          WHERE permitted = 1
          ORDER BY sort_order ASC, name ASC`,
      )
      .all(),
  );
}

/** Every logo with its permission state — for review, not for the public page. */
function allLogos() {
  return plain(
    db().prepare(`SELECT * FROM client_logos ORDER BY sort_order ASC, name ASC`).all(),
  );
}

/** Records written permission for one logo, or withdraws it. */
function setLogoPermission(name, permitted, note) {
  return db()
    .prepare(
      `UPDATE client_logos
          SET permitted = ?, permission_note = ?, updated_at = datetime('now')
        WHERE name = ?`,
    )
    .run(permitted ? 1 : 0, note ?? null, name).changes;
}

module.exports = { allLogos, publishedLogos, setLogoPermission };
