const form = document.querySelector("#ticketForm");
const ticketType = document.querySelector("#ticketType");
const credentialField = document.querySelector("#credentialField");
const credential = document.querySelector("#credential");
const credentialLabel = document.querySelector("#credentialLabel");
const credentialHint = document.querySelector("#credentialHint");
const output = document.querySelector("#output");

function updateCredentialField() {
  const type = ticketType.value;
  credentialField.hidden = !type;
  credential.disabled = !type;
  credential.required = Boolean(type);
  credential.value = "";
  credential.removeAttribute("aria-invalid");
  const student = type === "student";
  credentialLabel.textContent = student ? "Student I#" : "Access Code";
  credentialHint.textContent = student ? "Enter your 9 digit student I number." : "Enter the event access code EVENT131.";
  credential.inputMode = student ? "numeric" : "text";
}

ticketType.addEventListener("change", updateCredentialField);
updateCredentialField();

function isFutureDate(value) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  // Parse as local time so the calendar day is not shifted by a UTC offset.
  const chosen = new Date(`${value}T00:00:00`);
  return !Number.isNaN(chosen.getTime()) && chosen > today;
}

form.addEventListener("submit", event => {
  event.preventDefault();
  output.replaceChildren();
  output.className = "";
  const fields = form.elements;
  Array.from(fields).forEach(field => field.removeAttribute("aria-invalid"));
  const firstName = fields.firstName.value.trim();
  const lastName = fields.lastName.value.trim();
  const email = fields.email.value.trim();
  fields.email.value = email;
  const date = fields.eventDate.value;
  const type = ticketType.value;
  const code = credential.value.trim();
  const errors = [];
  function addError(field, message) {
    field.setAttribute("aria-invalid", "true");
    errors.push(message);
  }
  if (!firstName) addError(fields.firstName, "Please enter your first name.");
  if (!lastName) addError(fields.lastName, "Please enter your last name.");
  if (!email || !fields.email.validity.valid) addError(fields.email, "Please enter a valid email address.");
  if (!["student", "guest"].includes(type)) addError(ticketType, "Please choose Student or Guest.");
  if (!isFutureDate(date)) addError(fields.eventDate, "Please choose an event date later than today.");
  if (type === "student" && !/^\d{9}$/.test(code)) addError(credential, "Student I# must be 9 digits.");
  if (type === "guest" && code !== "EVENT131") addError(credential, "Access Code must be EVENT131.");

  if (errors.length) {
    output.className = "error";
    const list = document.createElement("ul");
    errors.forEach(message => {
      const item = document.createElement("li");
      item.textContent = message;
      list.append(item);
    });
    output.append(list);
    output.focus();
    return;
  }

  const heading = document.createElement("h2");
  heading.textContent = "Ticket Created";
  output.append(heading);
  // Display user input as text; never interpret it as HTML.
  [`${firstName} ${lastName}`, `Email: ${email}`, `Type: ${type}`, `Event Date: ${date}`].forEach(detail => {
    const paragraph = document.createElement("p");
    paragraph.textContent = detail;
    output.append(paragraph);
  });
  form.reset();
  updateCredentialField();
  output.focus();
});
