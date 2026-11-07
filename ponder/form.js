const form = document.querySelector("#fsyForm");
const travelRange = document.querySelector("#travelRange");
const notesContainer = document.querySelector("#notesContainer");
const notes = document.querySelector("#notes");
const output = document.querySelector("#output");
const campusBoxes = document.querySelectorAll('input[name="campus"]');

function updateNotesField() {
  const multiple = travelRange.value === "many";
  notesContainer.hidden = !multiple;
  notes.required = multiple;
  notes.disabled = !multiple;
}

travelRange.addEventListener("change", updateNotesField);
updateNotesField();

// Compare local calendar dates, avoiding UTC offsets when parsing date inputs.
function isPastDate(value) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const chosen = new Date(`${value}T00:00:00`);
  return Number.isNaN(chosen.getTime()) || chosen <= today;
}

function getSelectedCampuses() {
  return Array.from(campusBoxes)
    .filter(box => box.checked)
    .map(box => box.value);
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  output.textContent = "";

  const firstName = form.firstName.value.trim();
  const lastName = form.lastName.value.trim();
  const email = form.email.value.trim();
  const type = travelRange.value;
  const availableDate = form.availableDate.value;
  const selectedCampuses = getSelectedCampuses();
  const note = notes.value.trim();

  if (!firstName || !lastName || !email) {
    output.textContent = "Please enter your first name, last name, and email.";
    return;
  }
  if (selectedCampuses.length === 0) {
    output.textContent = "Please select at least one campus.";
    return;
  }
  if (type === "many" && !note) {
    output.textContent = "Please add a travel note.";
    return;
  }
  if (type === "many" && selectedCampuses.length < 2) {
    output.textContent = "Please select at least two campuses.";
    return;
  }
  if (type === "one" && selectedCampuses.length !== 1) {
    output.textContent = "Please select only one campus or choose two or more campuses.";
    return;
  }
  if (isPastDate(availableDate)) {
    output.textContent = "Please choose a date later than today.";
    return;
  }

  // Use textContent so submitted text is displayed safely as text.
  const heading = document.createElement("h2");
  heading.textContent = "Preference Submitted";
  output.append(heading);
  const details = [
    `${firstName} ${lastName}`,
    `Email: ${email}`,
    `Availability: ${availableDate}`,
    `Campuses: ${selectedCampuses.join(", ")}`,
    `Preference Level: ${type === "many" ? "Two or more campuses" : "One campus"}`
  ];
  if (type === "many") details.push(`Travel Notes: ${note}`);
  details.forEach(detail => {
    const paragraph = document.createElement("p");
    paragraph.textContent = detail;
    output.append(paragraph);
  });

  form.reset();
  updateNotesField();
});
