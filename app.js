import { api } from './api.js';

const studentsDiv = document.getElementById("students");
const saveBtn = document.getElementById("saveBtn");

let localStudents = [];

saveBtn.addEventListener("click", saveStudent);

async function loadStudents() {

  const students = await api.getStudents();

  localStudents = students.map(s => ({
    id: s.id,
    name: s.name,
    department: "N/A"
  }));

  displayStudents();
}

function displayStudents() {

  studentsDiv.innerHTML = localStudents.map(({ id, name, department }) => `
    <div class="card">
      <strong>${id} - ${name}</strong> (${department})
      <br/>
      <button onclick="editStudent(${id})">Edit</button>
      <button onclick="deleteStudent(${id})">Delete</button>
    </div>
  `).join("");
}

async function saveStudent() {

  const id = document.getElementById("studentId").value;
  const name = document.getElementById("studentName").value;
  const department = document.getElementById("department").value;

  if (!id) {

    const newStudent = await api.createStudent({ name, department });

    localStudents.push({
      id: newStudent.id,
      name,
      department
    });

  } else {

    await api.updateStudent(id, { name, department });

    const index = localStudents.findIndex(s => s.id == id);
    localStudents[index] = { id: Number(id), name, department };

  }

  clearForm();
  displayStudents();
}

window.editStudent = function(id) {

  const student = localStudents.find(s => s.id === id);

  document.getElementById("studentId").value = student.id;
  document.getElementById("studentName").value = student.name;
  document.getElementById("department").value = student.department;
}

window.deleteStudent = async function(id) {

  await api.deleteStudent(id);

  localStudents = localStudents.filter(s => s.id !== id);

  displayStudents();
}

function clearForm() {
  document.getElementById("studentId").value = "";
  document.getElementById("studentName").value = "";
  document.getElementById("department").value = "";
}

loadStudents();