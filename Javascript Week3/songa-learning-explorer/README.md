# Songa Learning Resource Explorer

A responsive learning-resource webpage built with HTML, CSS and vanilla JavaScript for the Songa Tech Sisters.

The project displays learning resources from a JavaScript array. Users can search by title or description, filter by category, mark resources as completed or incomplete, and view progress counts.

## Project files

```text
songa-learning-explorer/
├── index.html
├── style.css
├── script.js
└── README.md
```

## Features

- **Dynamic resource cards:** JavaScript creates each resource card from an array of objects. The HTML file does not contain manually written resource cards.
- **Search:** Search matches resource titles and descriptions. It is case-insensitive.
- **Category filter:** Filter by JavaScript, CSS, Git & GitHub, or Career Skills.
- **Combined filters:** Search and category selection are applied together.
- **Completion tracking:** Mark a resource as completed or incomplete. The button label and visual status update.
- **Progress counts:** The resource count reflects the currently matching results. The completed count reflects completed resources across the full resource array.
- **Empty state:** A message appears when no resources match the selected filters.
- **Responsive design:** The layout adapts to smaller screens.

## Technologies and concepts

- HTML for page structure.
- CSS for styling and responsive layout.
- JavaScript for data, logic and interaction.

The JavaScript practises variables, strings, numbers, Booleans, arrays, objects, functions, loops, conditions, `filter()`, `find()`, `forEach()`, DOM selection, `createElement()`, `textContent`, `classList`, `dataset`, event listeners and event delegation.

## How to run the project

1. Download or clone this repository.
2. Open the `songa-learning-explorer` folder.
3. Open `index.html` in a modern web browser.
4. Try searching for a word such as `guide` or `javascript`.
5. Select a category and confirm that it works together with the search.
6. Mark a resource as completed, then mark it incomplete again.
7. Open Developer Tools in your browser and check the Console for errors.


