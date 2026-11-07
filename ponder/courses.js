const aCourse = {
  code: "CSE121b",
  name: "Javascript Language",
  logo: "images/js-logo.png",
  sections: [
    { sectionNum: 1, roomNum: "STC 353", enrolled: 26, days: "TTh", instructor: "Bro T" },
    { sectionNum: 2, roomNum: "STC 347", enrolled: 28, days: "TTh", instructor: "Sis A" }
  ],
  enrollStudent: function (sectionNum) {
    const sectionIndex = this.sections.findIndex(
      section => section.sectionNum === Number(sectionNum)
    );
    if (sectionIndex < 0) return false;
    this.sections[sectionIndex].enrolled++;
    renderSections(this.sections);
    return true;
  }
};

function sectionTemplate(section) {
  return `<tr>
    <td>${section.sectionNum}</td>
    <td>${section.roomNum}</td>
    <td>${section.enrolled}</td>
    <td>${section.days}</td>
    <td>${section.instructor}</td>
  </tr>`;
}

function renderSections(sections) {
  document.querySelector("#sections").innerHTML = sections.map(sectionTemplate).join("");
}

document.querySelector("#courseName").textContent = aCourse.name;
document.querySelector("#courseCode").textContent = aCourse.code;
renderSections(aCourse.sections);

document.querySelector("#enrollmentForm").addEventListener("submit", function (event) {
  event.preventDefault();
  const input = document.querySelector("#sectionNumber");
  const sectionNum = input.value.trim();
  const status = document.querySelector("#status");
  if (!sectionNum || !Number.isInteger(Number(sectionNum)) || !aCourse.enrollStudent(sectionNum)) {
    status.textContent = "Please enter an existing section number: 1 or 2.";
    status.className = "error";
    input.setAttribute("aria-invalid", "true");
    return;
  }
  status.className = "";
  input.removeAttribute("aria-invalid");
  status.textContent = `Student enrolled in section ${Number(sectionNum)}.`;
});
