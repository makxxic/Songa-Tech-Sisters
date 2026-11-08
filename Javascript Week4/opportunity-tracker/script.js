// My Opportunity Tracker
// concepts: forms, validation, arrays, objects, DOM manipulation and localStorage.

const STORAGE_KEY = "myOpportunityTracker";
const VALID_TYPES = ["Scholarship", "Internship", "Mentorship", "Training", "Other"];
const VALID_STATUSES = ["Interested", "Preparing", "Submitted"];

// These are clearly labelled demonstration records for first-time testing.
// They are not claims about real, currently open opportunities.
const SAMPLE_OPPORTUNITIES = [
  {
    id: 1001,
    name: "Sample Data Analytics Scholarship",
    type: "Scholarship",
    deadline: "2027-02-28",
    nextAction: "Review the eligibility criteria and prepare academic documents",
    status: "Interested"
  },
  {
    id: 1002,
    name: "Sample Software Engineering Internship",
    type: "Internship",
    deadline: "2027-01-20",
    nextAction: "Update my CV and prepare a portfolio link",
    status: "Preparing"
  },
  {
    id: 1003,
    name: "Sample Women in Technology Mentorship",
    type: "Mentorship",
    deadline: "2027-03-15",
    nextAction: "Draft a short statement explaining my learning goals",
    status: "Submitted"
  }
];

// Select the HTML elements that JavaScript needs to update.
const opportunityForm = document.querySelector("#opportunity-form");
const nameInput = document.querySelector("#opportunity-name");
const typeInput = document.querySelector("#opportunity-type");
const deadlineInput = document.querySelector("#application-deadline");
const nextActionInput = document.querySelector("#next-action");
const formFeedback = document.querySelector("#form-feedback");
const opportunityList = document.querySelector("#opportunity-list");
const emptyMessage = document.querySelector("#empty-message");
const totalCount = document.querySelector("#total-count");
const preparingCount = document.querySelector("#preparing-count");
const submittedCount = document.querySelector("#submitted-count");
const listCount = document.querySelector("#list-count");

// This array is the source of truth while the application is running.
let opportunities = [];

// Check the structure of saved records before trusting them.
function isValidOpportunity(opportunity) {
  return (
    opportunity !== null &&
    typeof opportunity === "object" &&
    (typeof opportunity.id === "number" || typeof opportunity.id === "string") &&
    typeof opportunity.name === "string" &&
    opportunity.name.trim() !== "" &&
    VALID_TYPES.includes(opportunity.type) &&
    typeof opportunity.deadline === "string" &&
    /^\d{4}-\d{2}-\d{2}$/.test(opportunity.deadline) &&
    typeof opportunity.nextAction === "string" &&
    opportunity.nextAction.trim() !== "" &&
    VALID_STATUSES.includes(opportunity.status)
  );
}

// Retrieve the saved opportunity array when the page opens.
function loadOpportunities() {
  let savedData;

  try {
    savedData = localStorage.getItem(STORAGE_KEY);
  } catch (error) {
    console.error("Could not access browser storage:", error);
    opportunities = SAMPLE_OPPORTUNITIES.map(function (opportunity) {
      return { ...opportunity };
    });
    showFeedback("Browser storage is unavailable. Changes may not remain after you close this page.", "error");
    return;
  }

  // Seed demonstration data only on the first visit.
  // A saved empty array remains empty and will not be reseeded.
  if (savedData === null) {
    opportunities = SAMPLE_OPPORTUNITIES.map(function (opportunity) {
      return { ...opportunity };
    });
    saveOpportunities();
    return;
  }

  try {
    const parsedData = JSON.parse(savedData);

    if (
      Array.isArray(parsedData) &&
      parsedData.every(isValidOpportunity)
    ) {
      opportunities = parsedData;
    } else {
      opportunities = [];
      showFeedback("Saved data had an unexpected format. Start with a fresh list.", "error");
    }
  } catch (error) {
    console.error("Could not load saved opportunities:", error);
    opportunities = [];
    showFeedback("Saved data could not be read. You can start a fresh list.", "error");
  }
}

// Convert the array into JSON text before saving it in localStorage.
function saveOpportunities() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(opportunities));
    return true;
  } catch (error) {
    console.error("Could not save opportunities:", error);
    showFeedback("Your changes are visible, but could not be saved in this browser.", "error");
    return false;
  }
}

function showFeedback(message, type) {
  formFeedback.textContent = message;
  formFeedback.className = "feedback";
  if (type) {
    formFeedback.classList.add(type);
  }
}

function clearFeedback() {
  showFeedback("", "");
}

function createStatusOption(status, currentStatus) {
  const option = document.createElement("option");
  option.value = status;
  option.textContent = status;
  option.selected = status === currentStatus;
  return option;
}

function getStatusClass(status) {
  if (status === "Preparing") return "status-preparing";
  if (status === "Submitted") return "status-submitted";
  return "status-interested";
}

function formatDeadline(dateValue) {
  // Add local midnight so the date input value is not shifted by UTC conversion.
  const date = new Date(`${dateValue}T00:00:00`);
  if (Number.isNaN(date.getTime())) return dateValue;

  return new Intl.DateTimeFormat(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric"
  }).format(date);
}

// Build each opportunity card with DOM methods and textContent.
function displayOpportunities() {
  opportunityList.textContent = "";

  opportunities.forEach(function (opportunity) {
    const card = document.createElement("article");
    card.classList.add("opportunity-card");

    const cardTop = document.createElement("div");
    cardTop.classList.add("card-top");

    const titleGroup = document.createElement("div");
    const name = document.createElement("h3");
    name.classList.add("opportunity-name");
    name.textContent = opportunity.name;

    const type = document.createElement("span");
    type.classList.add("opportunity-type");
    type.textContent = opportunity.type;

    titleGroup.append(name, type);

    const statusPill = document.createElement("span");
    statusPill.classList.add("status-pill", getStatusClass(opportunity.status));
    statusPill.textContent = opportunity.status;

    cardTop.append(titleGroup, statusPill);

    const details = document.createElement("div");
    details.classList.add("card-details");

    const deadlineGroup = document.createElement("div");
    const deadlineLabel = document.createElement("span");
    deadlineLabel.classList.add("detail-label");
    deadlineLabel.textContent = "Application deadline";
    const deadlineValue = document.createElement("p");
    deadlineValue.classList.add("detail-value");
    deadlineValue.textContent = formatDeadline(opportunity.deadline);
    deadlineGroup.append(deadlineLabel, deadlineValue);

    const actionGroup = document.createElement("div");
    const actionLabel = document.createElement("span");
    actionLabel.classList.add("detail-label");
    actionLabel.textContent = "Next action";
    const actionValue = document.createElement("p");
    actionValue.classList.add("detail-value");
    actionValue.textContent = opportunity.nextAction;
    actionGroup.append(actionLabel, actionValue);

    details.append(deadlineGroup, actionGroup);

    const actions = document.createElement("div");
    actions.classList.add("card-actions");

    const statusControl = document.createElement("div");
    statusControl.classList.add("status-control");

    const statusLabel = document.createElement("label");
    const statusSelectId = `status-${opportunity.id}`;
    statusLabel.htmlFor = statusSelectId;
    statusLabel.textContent = "Update status";

    const statusSelect = document.createElement("select");
    statusSelect.classList.add("status-select");
    statusSelect.id = statusSelectId;
    statusSelect.dataset.action = "status";
    statusSelect.dataset.id = String(opportunity.id);
    VALID_STATUSES.forEach(function (status) {
      statusSelect.append(createStatusOption(status, opportunity.status));
    });

    statusControl.append(statusLabel, statusSelect);

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.classList.add("delete-button");
    deleteButton.dataset.action = "delete";
    deleteButton.dataset.id = String(opportunity.id);
    deleteButton.textContent = "Delete";

    actions.append(statusControl, deleteButton);
    card.append(cardTop, details, actions);
    opportunityList.append(card);
  });

  emptyMessage.hidden = opportunities.length > 0;
  listCount.textContent = `${opportunities.length} saved`;

  updateProgressSummary();
}

// Calculate the summary figures from the current array.
function updateProgressSummary() {
  totalCount.textContent = opportunities.length;

  const preparing = opportunities.filter(function (opportunity) {
    return opportunity.status === "Preparing";
  }).length;

  const submitted = opportunities.filter(function (opportunity) {
    return opportunity.status === "Submitted";
  }).length;

  preparingCount.textContent = preparing;
  submittedCount.textContent = submitted;
}

// Generate a unique numeric ID for this small application.
function generateUniqueId() {
  let id = Date.now();
  while (opportunities.some(function (opportunity) {
    return String(opportunity.id) === String(id);
  })) {
    id += 1;
  }
  return id;
}

// Handle form submission and validate the user's entries.
opportunityForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = nameInput.value.trim();
  const type = typeInput.value;
  const deadline = deadlineInput.value;
  const nextAction = nextActionInput.value.trim();

  clearFeedback();

  if (name === "") {
    showFeedback("Please enter an opportunity name.", "error");
    nameInput.focus();
    return;
  }

  if (!VALID_TYPES.includes(type)) {
    showFeedback("Please select a valid opportunity type.", "error");
    typeInput.focus();
    return;
  }

  if (deadline === "") {
    showFeedback("Please select the application deadline.", "error");
    deadlineInput.focus();
    return;
  }

  if (nextAction === "") {
    showFeedback("Please describe the next action you need to take.", "error");
    nextActionInput.focus();
    return;
  }

  const newOpportunity = {
    id: generateUniqueId(),
    name: name,
    type: type,
    deadline: deadline,
    nextAction: nextAction,
    status: "Interested"
  };

  opportunities.push(newOpportunity);
  saveOpportunities();
  displayOpportunities();

  opportunityForm.reset();
  showFeedback("Opportunity added successfully.", "success");
  nameInput.focus();
});

// Event delegation: handle changes on any status dropdown in the list.
opportunityList.addEventListener("change", function (event) {
  const statusSelect = event.target.closest('select[data-action="status"]');

  if (!statusSelect || !opportunityList.contains(statusSelect)) {
    return;
  }

  const opportunityId = statusSelect.dataset.id;
  const newStatus = statusSelect.value;

  if (!VALID_STATUSES.includes(newStatus)) {
    showFeedback("That status is not valid.", "error");
    return;
  }

  const opportunity = opportunities.find(function (item) {
    return String(item.id) === opportunityId;
  });

  if (!opportunity) {
    showFeedback("The selected opportunity could not be found.", "error");
    return;
  }

  opportunity.status = newStatus;
  saveOpportunities();
  displayOpportunities();
  showFeedback("Opportunity status updated.", "success");
});

// Event delegation: handle Delete buttons for all opportunity cards.
opportunityList.addEventListener("click", function (event) {
  const deleteButton = event.target.closest('button[data-action="delete"]');

  if (!deleteButton || !opportunityList.contains(deleteButton)) {
    return;
  }

  const opportunityId = deleteButton.dataset.id;
  const opportunityExists = opportunities.some(function (item) {
    return String(item.id) === opportunityId;
  });

  if (!opportunityExists) {
    showFeedback("The selected opportunity could not be found.", "error");
    return;
  }

  opportunities = opportunities.filter(function (item) {
    return String(item.id) !== opportunityId;
  });

  saveOpportunities();
  displayOpportunities();
  showFeedback("Opportunity deleted.", "success");
});

// Start the application by restoring data and rendering the current array.
loadOpportunities();
displayOpportunities();
