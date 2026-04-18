# Web Development Project 6 - *Superhero Database*

Submitted by: **Ryan**

This web app: **An expanded superhero database dashboard featuring data visualizations and individual hero detail pages. Users can explore 731 heroes and villains, search and filter by alignment, view charts showing the strongest characters and alignment breakdown, and click into any hero for a full detail page including biography, appearance, power stats radar chart, connections, and work info.**

Time spent: **2.5** hours spent in total

## Required Features

The following **required** functionality is completed:

- [x] **Clicking on an item in the list view displays more details about it**
  - Clicking on a hero card navigates to a dedicated detail view for that hero
  - Detail view includes biography, appearance, connections, work, and a radar chart of power stats — none of which appear in the dashboard list
  - The search bar and alignment filter are visible in the dashboard sidebar
- [x] **Each detail view of an item has a direct, unique URL link to that item's detail view page**
  - Each hero links to `/hero/:id` using React Router, giving every character a unique URL
- [x] **The app includes at least two unique charts developed using the fetched data that tell an interesting story**
  - Bar chart showing the top 10 strongest characters across the dataset
  - Pie chart showing the breakdown of alignments (heroes, villains, neutral)

The following **optional** features are implemented:

- [ ] The site's customized dashboard contains more content that explains what is interesting about the data
- [ ] The site allows users to toggle between different data visualizations

The following **additional** features are implemented:

* [x] Radar chart on each hero's detail page visualizing all 6 power stats
* [x] Red and black themed UI with hover effects on hero cards
* [x] Alignment tags color coded by type (green for heroes, red for villains, yellow for neutral)
* [x] Back button on detail page returns user to dashboard

## Video Walkthrough

Here's a walkthrough of implemented user stories:

<img src='https://i.imgur.com/uIo4lMF.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

GIF created with ScreenToGif

## Notes

Setting up React Router with dynamic routes using useParams was the main challenge. Also had to restructure App.jsx to separate the Dashboard and App components so heroes state could be shared between the dashboard and detail views.

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