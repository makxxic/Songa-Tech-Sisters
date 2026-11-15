# API-Powered User Directory

A searchable user directory built with HTML, CSS and JavaScript. It retrieves sample user information from the JSONPlaceholder API and displays each user in a card.

## Features

- Retrieves users from `https://jsonplaceholder.typicode.com/users`.
- Displays each user's full name, email address, city and organization.
- Searches by part of a user's name or email address.
- Ignores capitalization and removes extra spaces from search terms.
- Shows loading, success, no-match, empty-response and error messages.
- Reloads the user list with a button.
- Creates user cards dynamically with JavaScript DOM methods.

## Project files

```text
user-directory/
├── index.html
├── style.css
├── script.js
└── README.md
```

## How to run the application

1. Download or clone the project.
2. Open the `user-directory` folder in Visual Studio Code or another code editor.
3. Open `index.html` using a local development server, such as the VS Code Live Server extension.
4. Make sure you have an internet connection because the application retrieves data from an external API.
5. The user directory should load automatically when the page opens.

You can also open `index.html` in a modern browser. A local development server is recommended when developing and testing.

## API data used

The application uses the JSONPlaceholder `/users` endpoint. The API returns sample users. The city and organization fields are nested in the response:

- Name: `user.name`
- Email: `user.email`
- City: `user.address.city`
- Organization: `user.company.name`

This is practice data, not a real organization's employee directory.

## JavaScript concepts practised

- `async` and `await`
- `fetch()` and Promises
- `try`, `catch` and `finally`
- HTTP response checking with `response.ok`
- JSON parsing with `response.json()`
- Arrays and objects, including nested object properties
- Functions and function parameters
- Array methods: `forEach()` and `filter()`
- String methods: `trim()`, `toLowerCase()` and `includes()`
- DOM selection and manipulation
- `document.createElement()`, `textContent`, `append()` and `appendChild()`
- Event listeners and the `input` and `click` events
- Conditional statements and error handling

