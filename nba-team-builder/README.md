# Web Development Project 7 - *NBA Team Builder*

Submitted by: **Ryan**

This web app: **A full-stack NBA team builder that lets users create custom basketball players with attributes like position, overall rating, playstyle, and team. Users can view their full squad, click into individual player detail pages, edit player attributes, and delete players. Built with React, React Router, and Supabase for persistent data storage. **

Time spent: **6** hours spent in total

## Required Features

The following **required** functionality is completed:

- [x] **The web app contains a page that features a create form to add a new crewmate**
  - Users can name their player
  - Users can set position, playstyle, and team by clicking option buttons, and overall rating using a slider
- [x] **The web app includes a summary page of all the user's added crewmates**
  - The gallery page displays all created players in a grid layout
  - Players are sorted by creation date with the most recently created appearing at the top
- [x] **A previously created crewmate can be updated from the list of crewmates in the summary page**
  - Each player card links to a detail page with an Edit Player button
  - The edit form pre-fills with the player's current attributes
  - After saving changes, updates are immediately reflected on the detail page and gallery
- [x] **A previously created crewmate can be deleted from the crewmate list**
  - The edit form includes a Delete Player button with a confirmation dialog
  - After deleting, the player is removed from the gallery immediately
- [x] **Each crewmate has a direct, unique URL link to an info page about them**
  - Clicking a player in the gallery navigates to `/player/:id`
  - The detail page shows position, rating, playstyle, team, and creation date
  - Users can navigate to the edit form directly from the detail page

The following **optional** features are implemented:

- [ ] A crewmate can be given a category upon creation which restricts their attribute value options
- [ ] A section of the summary page displays summary statistics about a user's crew
- [ ] The summary page displays a custom success metric about a user's crew

The following **additional** features are implemented:

* [x] Responsive player card grid layout
* [x] Confirmation dialog before deleting a player to prevent accidental deletions

## Video Walkthrough

Here's a walkthrough of implemented user stories:
<img src='https://i.imgur.com/SZSPAMN.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

GIF created with ScreenToGif

## Notes

The main challenge was setting up Supabase and connecting it to the React frontend. Also had to troubleshoot package installation issues caused by running npm commands from the wrong directory. Once the database connection was established, implementing CRUD operations with supabase-js was straightforward.

## License

    Copyright 2026 Ryan

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.