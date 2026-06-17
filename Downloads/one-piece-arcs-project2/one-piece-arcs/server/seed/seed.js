const fs = require("fs");
const path = require("path");
const pool = require("../config/db");
const arcs = require("./arcsData");

async function seed() {
  try {
    const schema = fs.readFileSync(
      path.join(__dirname, "../config/schema.sql"),
      "utf8"
    );
    await pool.query(schema);
    console.log("Table created.");

    for (const arc of arcs) {
      await pool.query(
        `INSERT INTO arcs (slug, name, saga, location, episodes, description, key_characters, image)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [
          arc.id,
          arc.name,
          arc.saga,
          arc.location,
          arc.episodes,
          arc.description,
          arc.keyCharacters,
          arc.image,
        ]
      );
      console.log(`Inserted: ${arc.name}`);
    }

    console.log("Seeding complete.");
    await pool.end();
  } catch (err) {
    console.error("Seed error:", err);
    process.exit(1);
  }
}

seed();
