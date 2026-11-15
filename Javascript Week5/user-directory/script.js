// The complete list is kept here so searching never destroys the original data.
let allUsers = [];

// Select the HTML elements that JavaScript needs to update or listen to.
const reloadButton = document.getElementById("reload-button");
const searchInput = document.getElementById("search-input");
const statusMessage = document.getElementById("status-message");
const userList = document.getElementById("user-list");

const usersApiUrl = "https://jsonplaceholder.typicode.com/users";

// Display a message and optionally mark it as an error.
function showMessage(message, isError = false) {
    statusMessage.textContent = message;
    statusMessage.classList.toggle("error", isError);
}

// Create and display user cards from an array of users.
function displayUsers(users) {
    // Remove cards from the previous display before adding new ones.
    userList.replaceChildren();

    users.forEach(function (user) {
        const card = document.createElement("article");
        card.className = "user-card";

        const name = document.createElement("h3");
        name.textContent = user.name;

        const email = document.createElement("p");
        email.className = "user-detail";
        const emailLabel = document.createElement("strong");
        emailLabel.textContent = "Email: ";
        email.append(emailLabel, document.createTextNode(user.email));

        const city = document.createElement("p");
        city.className = "user-detail";
        const cityLabel = document.createElement("strong");
        cityLabel.textContent = "City: ";
        city.append(cityLabel, document.createTextNode(user.address.city));

        const organization = document.createElement("p");
        organization.className = "user-detail";
        const organizationLabel = document.createElement("strong");
        organizationLabel.textContent = "Organization: ";
        organization.append(
            organizationLabel,
            document.createTextNode(user.company.name)
        );

        card.append(name, email, city, organization);
        userList.appendChild(card);
    });
}

// Retrieve users from the external API.
async function loadUsers() {
    showMessage("Loading users from the server...");
    userList.replaceChildren();
    allUsers = [];
    searchInput.value = "";
    searchInput.disabled = true;
    reloadButton.disabled = true;
    reloadButton.textContent = "Loading...";

    try {
        const response = await fetch(usersApiUrl);

        // fetch() does not reject just because the server returns 404 or 500.
        if (!response.ok) {
            throw new Error("The server returned HTTP " + response.status);
        }

        const users = await response.json();

        // Confirm that the API returned an array.
        if (!Array.isArray(users)) {
            throw new Error("The API response was not a list of users.");
        }

        // Check that each record contains the fields required by this application.
        const validUsers = users.filter(function (user) {
            return user &&
                typeof user.name === "string" &&
                typeof user.email === "string" &&
                user.address &&
                typeof user.address.city === "string" &&
                user.company &&
                typeof user.company.name === "string";
        });

        if (validUsers.length !== users.length) {
            throw new Error("Some user records were missing required information.");
        }

        allUsers = users;

        if (allUsers.length === 0) {
            showMessage("The API request succeeded, but no users were returned.");
            return;
        }

        displayUsers(allUsers);
        searchInput.disabled = false;
        showMessage("Successfully loaded " + allUsers.length + " users.");
    } catch (error) {
        // This handles network failures, unsuccessful HTTP responses,
        // JSON parsing errors, and unexpected response data.
        showMessage(
            "Unable to load users. " + error.message +
            " Please check your connection and try again.",
            true
        );
    } finally {
        // This runs whether the request succeeds or fails.
        reloadButton.disabled = false;
        reloadButton.textContent = "↻ Reload users";
    }
}

// Search the original user array by name or email address.
function searchUsers() {
    const searchTerm = searchInput.value.trim().toLowerCase();

    if (allUsers.length === 0) {
        return;
    }

    if (searchTerm === "") {
        displayUsers(allUsers);
        showMessage("Showing all " + allUsers.length + " users.");
        return;
    }

    const matchingUsers = allUsers.filter(function (user) {
        const name = user.name.toLowerCase();
        const email = user.email.toLowerCase();

        return name.includes(searchTerm) || email.includes(searchTerm);
    });

    displayUsers(matchingUsers);

    if (matchingUsers.length === 0) {
        showMessage('No users found for "' + searchInput.value.trim() + '".');
    } else {
        showMessage(
            "Found " + matchingUsers.length + " matching user" +
            (matchingUsers.length === 1 ? "" : "s") + "."
        );
    }
}

// Event listeners connect user actions to the appropriate functions.
reloadButton.addEventListener("click", loadUsers);
searchInput.addEventListener("input", searchUsers);

// Load the directory when the page is ready.
loadUsers();
