// Client logo permissions — read and record them.
//
//   node scripts/logo-permissions.js                       list every logo
//   node scripts/logo-permissions.js allow "Name" "note"   record permission
//   node scripts/logo-permissions.js deny  "Name"          withdraw it
//
// Why this exists: `client_logos.permitted` defaults to 0 and the database it
// lives in is `.data/`, which is git-ignored. So a fresh clone — another
// laptop, a CI runner, the Amplify SSR function — starts with all twelve logos
// seeded but unpermitted, and the homepage renders the unnamed formulation
// instead of the grid. That is the permission gate working as designed, but it
// means the decision has to be recorded again on each machine, and there was
// no way to do that short of opening the database by hand.
//
// The note is not decoration. It is where the permission is recorded — an
// email, a signed letter, a file reference. Set it to something a person can
// actually follow back; "confirmed verbally" tells a future reader nothing.

const { allLogos, setLogoPermission } = require("../services/contentStore");

const [command, name, note] = process.argv.slice(2);

const list = () => {
  const rows = allLogos();
  const permitted = rows.filter((row) => row.permitted).length;
  console.log(`${rows.length} logos, ${permitted} cleared for publication\n`);
  for (const row of rows) {
    console.log(
      `  ${row.permitted ? "shown " : "hidden"}  ${row.name.padEnd(28)} ` +
        `${row.permission_note ?? ""}`,
    );
  }
  if (permitted === 0) {
    console.log(
      "\nNothing is cleared, so the homepage renders the unnamed formulation.",
    );
  }
};

if (!command || command === "list") {
  list();
  process.exit(0);
}

if (command !== "allow" && command !== "deny") {
  console.error(`Unknown command "${command}". Use list, allow or deny.`);
  process.exit(1);
}

if (!name) {
  console.error(`${command} needs a logo name, exactly as "list" prints it.`);
  process.exit(1);
}

if (command === "allow" && !note) {
  console.error(
    'allow needs a note saying where the permission is recorded, e.g.\n' +
      '  node scripts/logo-permissions.js allow "Transpower" "Email from X, 28 Oct 2026"',
  );
  process.exit(1);
}

const changed = setLogoPermission(name, command === "allow", note);

if (changed === 0) {
  console.error(`No logo named "${name}". Run with no arguments to see the names.`);
  process.exit(1);
}

console.log(`${name}: ${command === "allow" ? "now shown" : "now hidden"}\n`);
list();
