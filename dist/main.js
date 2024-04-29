"use strict";
// SELECT
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const group = document.getElementById("group");
const dateOfBirth = document.getElementById("dateOfBirth");
const salary = document.getElementById("salary");
const filterLevel = document.getElementById("filter");
const typeOfJob = document.getElementById("typeOfJob");
const isMarried = document.getElementById("isMarried");
// EDIT
const firstNameEdit = document.getElementById("firstNameEdit");
const lastNameEdit = document.getElementById("lastNameEdit");
const groupEdit = document.getElementById("groupEdit");
const dateOfBirthEdit = document.getElementById("dateOfBirthEdit");
const salaryEdit = document.getElementById("salaryEdit");
const filterLevelEdit = document.getElementById("filterLevelEdit");
const typeOfJobEdit = document.getElementById("typeOfJobEdit");
const isMarriedEdit = document.getElementById("isMarriedEdit");
const filterSelect = document.getElementById("filter-select");
const filterCountry = document.getElementById("filter-country");
const search = document.getElementById("search");
const studentsList = document.getElementById("students-list");
const btnAddStudent = document.getElementById("btn-add-student");
const btnEditStudent = document.getElementById("btn-edit-student");
const students = JSON.parse(localStorage.getItem("students")) || [];
displayStudents(students);
// DISPLAY STUDENTS
function displayStudents(students) {
    let str = "";
    students.map((student, i) => {
        str += `
      <tr>
                <td>${i + 1}</td>
                <td>${student.firstName}</td>
                <td>${student.lastName}</td>
                <td>${student.group}</td>
                <td>${student.dateOfBirth}</td>
                <td>${student.filterLevel}</td>
                <td>${student.typeOfJob}</td>
                <td>${student.salary}</td>
                <td>${student.isMarried ? "Yes" : "No"}</td>
                <td>
                  <button class="btn bg-primary btn-sm text-light" data-bs-toggle="modal"
                  data-bs-target="#editModal" onclick="editStudent(${student.id})">Edit</button>
                  <button class="btn btn-danger btn-sm" onclick='deleteStudent(${student.id})'>Delete</button>
                </td>
      </tr>
      `;
    });
    studentsList.innerHTML = str;
}
displayStudents(students);
// ADD STUDENT   //////CREATE
function addStudent() {
    const student = {
        id: students.length + 1,
        firstName: firstName.value,
        lastName: lastName.value,
        group: group.value,
        dateOfBirth: dateOfBirth.value,
        filterLevel: filterLevel.value,
        typeOfJob: typeOfJob.value,
        salary: salary.value,
        isMarried: isMarried.checked,
    };
    students.push(student);
    localStorage.setItem("students", JSON.stringify(students));
    location.reload();
    firstName.value = "";
    lastName.value = "";
    group.value = "";
    dateOfBirth.value = "";
    filterLevel.value = "";
    typeOfJob.value = "";
    salary.value = "";
    isMarried.checked = false;
}
btnAddStudent.addEventListener("click", addStudent);
// DELETE STUDENT  /////DELETE
function deleteStudent(id) {
    if (confirm("Are you sure to delete this student ?")) {
        let newStudents = students.filter((std) => std.id !== id);
        localStorage.setItem("students", JSON.stringify(newStudents));
        location.reload();
    }
}
// EDIT STUDENTS ////EDIT
let studentEditing;
function editStudent(id) {
    let student = students.find((student) => student.id === id);
    if (student) {
        studentEditing = student;
        firstNameEdit.value = student.firstName;
        lastNameEdit.value = student.lastName;
        groupEdit.value = student.group;
        dateOfBirthEdit.value = student.dateOfBirth;
        salaryEdit.value = student.salary;
        filterLevelEdit.value = student.filterLevel;
        typeOfJobEdit.value = student.typeOfJob;
        isMarriedEdit.checked = student.isMarried;
    }
}
// UPDATE STUDENTS ////
function updateStudent() {
    if (studentEditing) {
        const student = {
            id: studentEditing.id,
            firstName: firstNameEdit.value,
            lastName: lastNameEdit.value,
            group: groupEdit.value,
            dateOfBirth: dateOfBirthEdit.value,
            filterLevel: filterLevelEdit.value,
            typeOfJob: typeOfJobEdit.value,
            salary: salaryEdit.value,
            isMarried: isMarriedEdit.checked,
        };
        let newStudents = students.map((st) => st.id === student.id ? student : st);
        localStorage.setItem("students", JSON.stringify(newStudents));
        location.reload();
    }
}
btnEditStudent.addEventListener("click", updateStudent);
// FILTER LEVEL
filterSelect.addEventListener("change", function (e) {
    let grpp = e.target.value;
    let newStudentsList = [];
    if (grpp === "Select a level") {
        newStudentsList = students;
    }
    else {
        newStudentsList = students.filter((st) => st.filterLevel === grpp);
    }
    displayStudents(newStudentsList);
});
// FILTER COUNTRIES
filterCountry.addEventListener("change", function (e) {
    let grp = e.target.value;
    let newStudentsList = [];
    if (grp === "Select your country") {
        newStudentsList = students;
    }
    else {
        newStudentsList = students.filter((st) => st.group === grp);
    }
    displayStudents(newStudentsList);
});
// SEARCH STUDENTS 
search.addEventListener("input", function (e) {
    let text = e.target.value;
    let newSearchedList = [];
    if (text === "") {
        newSearchedList = students;
    }
    else {
        newSearchedList = students.filter((st) => st.firstName.toLowerCase().includes(text.toLowerCase()) ||
            st.lastName.toLowerCase().includes(text.toLowerCase()) ||
            st.group.toLowerCase().includes(text.toLowerCase()) ||
            st.group.toLowerCase().includes(text.toLowerCase()) ||
            st.filterLevel.toLowerCase().includes(text.toLowerCase()) ||
            st.salary.toLowerCase().includes(text.toLowerCase()) ||
            st.dateOfBirth.toLowerCase().includes(text.toLowerCase()) ||
            st.typeOfJob.toLowerCase().includes(text.toLowerCase()));
    }
    displayStudents(newSearchedList);
});
