# WEB103 Project 2 - *One Piece Arc Guide*

Submitted by: **Ryan Akem**

About this web app: **A guide to every major One Piece story arc, now powered by a PostgreSQL database hosted on Render. Browse all arcs on the home page and click any arc to see a detailed view pulled live from the database.**

Time spent: **X** hours

## Required Features

The following **required** functionality is completed:

- [x] **The web app uses only HTML, CSS, and JavaScript without a frontend framework**
- [x] **The web app is connected to a PostgreSQL database, with an appropriately structured database table for the list items**
  - [x] **NOTE: Your walkthrough added to the README must include a view of your Render dashboard demonstrating that your Postgres database is available**
  - [x] **NOTE: Your walkthrough added to the README must include a demonstration of your table contents. Use the psql command 'SELECT * FROM tablename;' to display your table contents.**

The following **optional** features are implemented:

- [ ] The user can search for items by a specific attribute

The following **additional** features are implemented:

- [x] Manga/comic book theme with Bangers font, halftone dot background, and ink border shadows
- [x] Separate `client` and `server` folder structure
- [x] Seed script (`server/seed/seed.js`) that builds the table schema and inserts all arc data in one run

## Video Walkthrough

Here's a walkthrough of implemented required features:

<img src='https://i.imgur.com/OJLK01N.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

GIF created with ScreenToGif

## Notes

Switched from a hardcoded JavaScript array to a PostgreSQL database hosted on Render. Created a seed script that builds the schema and inserts all 12 arcs in one run, so the database can be rebuilt easily if needed. Used the pg library with SSL enabled to connect to Render's external database URL.

## License

Copyright 2026 Ryan Akem

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

> http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.