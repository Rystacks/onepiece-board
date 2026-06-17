const express = require("express");
const path = require("path");
const pool = require("./config/db");
require("dotenv").config();

const app = express();

app.use(express.static(path.join(__dirname, "../client/src")));

// Home route - fetch all arcs from DB
app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM arcs ORDER BY id ASC");
    const arcs = result.rows;

    const cards = arcs
      .map(
        (arc) => `
      <article class="arc-card">
        <a href="/arcs/${arc.slug}">
          <img src="${arc.image}" alt="${arc.name}" onerror="this.src='https://placehold.co/400x220/ffd600/0d0d0d?text=${encodeURIComponent(arc.name)}'"/>
          <div class="arc-card-body">
            <hgroup>
              <h2>${arc.name}</h2>
              <p class="saga-badge">${arc.saga}</p>
            </hgroup>
            <div class="arc-meta">
              <span>${arc.location}</span>
              <span>Episodes ${arc.episodes}</span>
            </div>
            <p class="arc-desc">${arc.description.slice(0, 100)}...</p>
          </div>
        </a>
      </article>
    `
      )
      .join("");

    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>One Piece Arc Guide</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css"/>
        <link rel="stylesheet" href="/css/style.css"/>
      </head>
      <body>
        <header class="site-header">
          <div class="container">
            <hgroup>
              <h1>One Piece Arc Guide</h1>
              <p>Every saga. Every island. Every legendary moment.</p>
            </hgroup>
          </div>
        </header>

        <main class="container">
          <div class="arc-grid">
            ${cards}
          </div>
        </main>

        <footer class="container">
          <p>Made for CodePath WEB103 &mdash; Data from a Render PostgreSQL database</p>
        </footer>
      </body>
      </html>
    `);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading arcs from database.");
  }
});

// Individual arc route - fetch single arc from DB
app.get("/arcs/:slug", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM arcs WHERE slug = $1",
      [req.params.slug]
    );

    if (result.rows.length === 0) {
      return res.status(404).send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8"/>
          <title>404 - Arc Not Found</title>
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css"/>
          <link rel="stylesheet" href="/css/style.css"/>
        </head>
        <body>
          <main class="container not-found">
            <div class="not-found-content">
              <h1>404</h1>
              <h2>You've sailed off the map.</h2>
              <p>This arc doesn't exist — not even in the New World.</p>
              <a href="/" role="button">Return to the Grand Line</a>
            </div>
          </main>
        </body>
        </html>
      `);
    }

    const arc = result.rows[0];
    const characters = arc.key_characters.map((c) => `<li>${c}</li>`).join("");

    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>${arc.name} | One Piece Arc Guide</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css"/>
        <link rel="stylesheet" href="/css/style.css"/>
      </head>
      <body>
        <header class="site-header">
          <div class="container">
            <a href="/" class="back-link">Back to all arcs</a>
          </div>
        </header>

        <main class="container">
          <div class="arc-detail">
            <div class="arc-detail-hero">
              <img src="${arc.image}" alt="${arc.name}" onerror="this.src='https://placehold.co/800x400/ffd600/0d0d0d?text=${encodeURIComponent(arc.name)}'"/>
            </div>

            <div class="arc-detail-content">
              <hgroup>
                <h1>${arc.name}</h1>
                <p class="saga-badge large">${arc.saga}</p>
              </hgroup>

              <div class="arc-stats">
                <div>
                  <strong>Location</strong>
                  <p>${arc.location}</p>
                </div>
                <div>
                  <strong>Episodes</strong>
                  <p>${arc.episodes}</p>
                </div>
              </div>

              <article>
                <header><strong>Summary</strong></header>
                <p>${arc.description}</p>
              </article>

              <article>
                <header><strong>Key Characters</strong></header>
                <ul class="character-list">
                  ${characters}
                </ul>
              </article>
            </div>
          </div>
        </main>

        <footer class="container">
          <p>Made for CodePath WEB103 &mdash; Data from a Render PostgreSQL database</p>
        </footer>
      </body>
      </html>
    `);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading arc from database.");
  }
});

// 404 catch-all
app.use((req, res) => {
  res.status(404).send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8"/>
      <title>404 - Page Not Found</title>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css"/>
      <link rel="stylesheet" href="/css/style.css"/>
    </head>
    <body>
      <main class="container not-found">
        <div class="not-found-content">
          <h1>404</h1>
          <h2>You've sailed off the map.</h2>
          <p>This page doesn't exist — not even in the New World.</p>
          <a href="/" role="button">Return to the Grand Line</a>
        </div>
      </main>
    </body>
    </html>
  `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`One Piece Arc Guide running on http://localhost:${PORT}`);
});
