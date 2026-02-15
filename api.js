const BASE_URL = "https://jsonplaceholder.typicode.com";

export const api = {

  async getStudents() {
    const res = await fetch(`${BASE_URL}/users`);
    return await res.json();
  },

  async createStudent(student) {
    const res = await fetch(`${BASE_URL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(student)
    });
    return await res.json();
  },

  async updateStudent(id, student) {
    const res = await fetch(`${BASE_URL}/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(student)
    });
    return await res.json();
  },

  async deleteStudent(id) {
    await fetch(`${BASE_URL}/users/${id}`, {
      method: "DELETE"
    });
    return true;
  }

};