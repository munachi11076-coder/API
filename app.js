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
    email: s.email,
    address: s.address ? `${s.address.street}, ${s.address.city}`: "N/A", //
    department: "N/A"
  }));

  displayStudents();
}

function displayStudents() {

  studentsDiv.innerHTML = localStudents.map(({ id, name, department, email, address }) => `
    <div class="card">
      <strong>${id} - ${name}</strong> (${department})
      <br/>
      email: ${email}<br/>
     address:  ${address}<br/>
      <button onclick="editStudent(${id})">Edit</button>
      <button onclick="deleteStudent(${id})">Delete</button>
    </div>
  `).join("");
}

async function saveStudent() {

  const id = document.getElementById("studentId").value;
  const name = document.getElementById("studentName").value;
  const department = document.getElementById("department").value;
   const email = document.getElementById("studentEmail").value;
  const address = document.getElementById("studentAddress").value;

   const studentData = { name, department, email, address };


  if (!id) {

     const newStudent = await api.createStudent(studentData);
    localStudents.push({ id: newStudent.id, name, department, email, address });
  } else {
    await api.updateStudent(id, studentData);
    const index = localStudents.findIndex(s => s.id == id);
    localStudents[index] = { id: Number(id), name, department, email, address };
  }

  clearForm();
  displayStudents();
}

window.editStudent = function(id) {

  const student = localStudents.find(s => s.id === id);

  document.getElementById("studentId").value = student.id;
  document.getElementById("studentName").value = student.name;
  document.getElementById("department").value = student.department;
  document.getElementById("studentEmail").value = student.email;
  document.getElementById("studentAddress").value = student.address;
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
  document.getElementById("studentEmail").value = "";
  document.getElementById("studentAddress").value = "";
}

loadStudents();