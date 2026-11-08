# My Opportunity Tracker

My Opportunity Tracker is a small, responsive web application that helps students organize scholarships, internships, mentorship programmes, training opportunities and other opportunities. It keeps important details, application deadlines and next actions together, while making it possible to track application progress.

## Features

- Add an opportunity with its name, type, application deadline and next action.
- Validate required fields and reject text fields containing only spaces.
- View each opportunity in its own dynamically generated card.
- Track each record using one of three statuses: **Interested**, **Preparing** or **Submitted**.
- Change an opportunity's status without affecting other records.
- Delete an opportunity.
- Automatically calculate total opportunities, opportunities being prepared and applications submitted.
- Save the opportunity array in browser `localStorage` using `JSON.stringify()`.
- Restore saved opportunities using `JSON.parse()` when the page opens.
- Responsive layout for desktop and mobile screens.
- Includes three clearly labelled sample records for first-time testing. 

## Project files

```text
opportunity-tracker/
├── index.html   # Page structure and form
├── style.css    # Layout, colours and responsive styling
├── script.js    # Validation, application logic and localStorage
└── README.md    # Project documentation
```

## How to run the application

1. Download or clone this repository.
2. Keep `index.html`, `style.css` and `script.js` in the same folder.
3. Open `index.html` in a modern web browser.
4. Add an opportunity using the form.
5. Change its status or delete it using the controls on its card.
6. Refresh the page to confirm that the records remain saved.

No package installation or build process is required. The application uses plain HTML, CSS and JavaScript.

> **Storage note:** Opportunities are saved in `localStorage` for the same browser and website origin. They are not automatically synchronized to another browser, device or user. Clearing the browser's site data can remove them.

## JavaScript concepts used

### Forms and validation
- `querySelector()` selects form elements.
- `.value` reads values entered by the user.
- `addEventListener("submit", ...)` handles form submission.
- `event.preventDefault()` prevents the browser's normal form submission.
- `.trim()` removes surrounding whitespace before text is validated.
- Conditions and early `return` statements reject invalid entries.

### Arrays and objects
- Each opportunity is represented by an object with `id`, `name`, `type`, `deadline`, `nextAction` and `status` properties.
- An array stores all opportunity objects.
- `push()` adds a new opportunity.
- `forEach()` displays the opportunity cards.
- `find()` locates an opportunity by its ID.
- `some()` checks whether an opportunity exists.
- `filter()` removes a selected opportunity and calculates progress totals.

### DOM manipulation and events
- `createElement()` creates cards, labels, buttons and dropdown options.
- `textContent` displays user-entered text safely as text.
- `classList.add()` applies CSS classes.
- `dataset` stores each opportunity ID and the action associated with a control.
- Event delegation handles status changes and Delete button clicks.

### Browser storage
- `localStorage.setItem()` saves the opportunity array.
- `localStorage.getItem()` retrieves saved data.
- `JSON.stringify()` converts the array into JSON text.
- `JSON.parse()` converts the stored text back into JavaScript data.
- `try...catch` handles invalid saved JSON.


## Scope and limitations

This is a front-end learning project. It stores information locally in the browser and does not have user accounts, a backend database, cloud synchronization, automatic deadline reminders or live opportunity listings.
