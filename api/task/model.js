// build your `Task` model here
const db = require("../../data/dbConfig");

function getAllTasks() {
  return db("tasks");
}

function insertTask(project) {
  return db("tasks").insert(project);
}

module.exports = { getAllTasks, insertTask };
