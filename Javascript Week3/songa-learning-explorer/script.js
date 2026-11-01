/*
 Songa Learning Resource Explorer
 */

// Storing the learning resources in an array of objects.
const resources = [
    {
        id: 1,
        title: "JavaScript Fundamentals",
        category: "JavaScript",
        description: "Learn variables, data types, operators, conditions, loops and functions.",
        completed: false
    },
    {
        id: 2,
        title: "DOM Manipulation for Beginners",
        category: "JavaScript",
        description: "Understand how to select HTML elements and update webpage content with JavaScript.",
        completed: false
    },
    {
        id: 3,
        title: "CSS Layout and Responsive Design",
        category: "CSS",
        description: "Practise styling webpages with the box model, Flexbox, Grid and media queries.",
        completed: false
    },
    {
        id: 4,
        title: "CSS Selectors and Visual Styling",
        category: "CSS",
        description: "Use selectors, colours, typography, spacing and reusable styles to improve a webpage.",
        completed: false
    },
    {
        id: 5,
        title: "Git and GitHub Essentials",
        category: "Git & GitHub",
        description: "Learn how to initialise a repository, track changes, commit work and push code to GitHub.",
        completed: false
    },
    {
        id: 6,
        title: "Working with Git Branches",
        category: "Git & GitHub",
        description: "Practise creating branches, switching between them and combining changes.",
        completed: false
    },
    {
        id: 7,
        title: "Building a Technical CV",
        category: "Career Skills",
        description: "Identify relevant skills and projects and present your experience clearly in a CV.",
        completed: false
    },
    {
        id: 8,
        title: "Preparing for Technical Interviews",
        category: "Career Skills",
        description: "Practise explaining your projects, solving problems and communicating your thinking.",
        completed: false
    }
];

// Selecting the HTML elements that JavaScript needs to work with.
const searchInput = document.querySelector("#search-input");
const categoryFilter = document.querySelector("#category-filter");
const resourceList = document.querySelector("#resource-list");
const emptyMessage = document.querySelector("#empty-message");
const resourceCount = document.querySelector("#resource-count");
const completedCount = document.querySelector("#completed-count");

// Keep the current search and category selections so both filters work together.
let currentSearch = "";
let currentCategory = "all";

// Display resource objects as HTML cards.
function displayResources(resourceArray) {
    // Clear the previous results before drawing the new set.
    resourceList.textContent = "";

    // Create a card for each resource in the array.
    resourceArray.forEach(function (resource) {
        const card = document.createElement("article");
        card.classList.add("resource-card");

        if (resource.completed) {
            card.classList.add("is-completed");
        }

        const topLine = document.createElement("div");
        topLine.classList.add("card-topline");

        const category = document.createElement("span");
        category.classList.add("category-tag");
        category.textContent = resource.category;

        const status = document.createElement("span");
        status.classList.add("status");
        status.textContent = resource.completed ? "Completed" : "Not completed";

        if (resource.completed) {
            status.classList.add("completed");
        }

        const title = document.createElement("h3");
        title.textContent = resource.title;

        const description = document.createElement("p");
        description.classList.add("description");
        description.textContent = resource.description;

        const button = document.createElement("button");
        button.classList.add("completion-button");
        button.type = "button";
        button.textContent = resource.completed
            ? "Mark as Incomplete"
            : "Mark as Completed";

        // Store the resource ID on the button so the parent can identify it.
        button.dataset.resourceId = resource.id;

        topLine.append(category, status);
        card.append(topLine, title, description, button);
        resourceList.appendChild(card);
    });

    // Show the supplied empty-state message only when there are no matches.
    emptyMessage.hidden = resourceArray.length !== 0;
}

// Apply search and category filtering together.
function filterResources() {
    const matchingResources = resources.filter(function (resource) {
        const searchableText =
            (resource.title + " " + resource.description).toLowerCase();

        const matchesSearch = searchableText.includes(currentSearch);
        const matchesCategory =
            currentCategory === "all" || resource.category === currentCategory;

        return matchesSearch && matchesCategory;
    });

    displayResources(matchingResources);
    updateProgress(matchingResources);
}

// Update the number of visible resources and all completed resources.
function updateProgress(visibleResources) {
    const totalCompleted = resources.filter(function (resource) {
        return resource.completed;
    }).length;

    resourceCount.textContent = "Resources: " + visibleResources.length;
    completedCount.textContent =
        "Completed: " + totalCompleted + " of " + resources.length;
}

// Listen for typing in the search box.
searchInput.addEventListener("input", function () {
    currentSearch = searchInput.value.toLowerCase().trim();
    filterResources();
});

// Listen for a category selection change.
categoryFilter.addEventListener("change", function () {
    currentCategory = categoryFilter.value;
    filterResources();
});

// Use event delegation instead of adding a listener to every button.
resourceList.addEventListener("click", function (event) {
    // closest() also handles clicks on any nested content inside a button.
    const clickedButton = event.target.closest("button[data-resource-id]");

    // Ignore clicks that did not come from a completion button.
    if (!clickedButton || !resourceList.contains(clickedButton)) {
        return;
    }

    const resourceId = Number(clickedButton.dataset.resourceId);

    // Find the matching resource object and reverse its Boolean status.
    const selectedResource = resources.find(function (resource) {
        return resource.id === resourceId;
    });

    if (!selectedResource) {
        return;
    }

    selectedResource.completed = !selectedResource.completed;

    // Re-render the currently filtered results and refresh the progress count.
    filterResources();
});

// Initial page display.
filterResources();
