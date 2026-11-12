"use strict";

// forEach: display and log every item, as shown in the output image.
const numberWords = ["one", "two", "three"];
const wordList = document.querySelector("#word-list");

numberWords.forEach((word) => {
    console.log(word);
    wordList.innerHTML += `<li>${word}</li>`;
});

// Use the instructor's conversion function without an undeclared global.
function convert(grade) {
    let points;
    switch (grade) {
        case "A":
            points = 4;
            break;
        case "B":
            points = 3;
            break;
        case "C":
            points = 2;
            break;
        case "D":
            points = 1;
            break;
        case "F":
            points = 0;
            break;
        default:
            alert("not a valid grade");
    }
    return points;
}

// The image shows three point values totaling 7; these grades produce that result.
const grades = ["A", "B", "F"];
const gradePoints = grades.map(convert);
console.log(gradePoints);

// reduce returns one accumulated value, rather than a new array.
const totalPoints = gradePoints.reduce((total, points) => total + points, 0);
console.log(totalPoints);
const gpa = totalPoints / gradePoints.length;
console.log(gpa);

const words = ["watermelon", "peach", "apple", "tomato", "grape"];
// The reference shows three filtered words: keep those shorter than six letters.
const shortWords = words.filter((word) => word.length < 6);
console.log(shortWords);

// Array indexes start at zero, so apple is at index 2.
const appleIndex = words.indexOf("apple");
console.log(appleIndex);

// Objects and template literals: preserve the instructor's student sample data.
const students = [
    {last: "Andrus", first: "Aaron"},
    {last: "Masa", first: "Manny"},
    {last: "Tanda", first: "Tamanda"}
];

document.querySelector("#student-list").innerHTML = students.map((student) => `
    <p class="student-name">${student.first} ${student.last}</p>
`).join("");
