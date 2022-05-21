// build your `Project` model here
const db = require("../../data/dbConfig");

function getAllProjects() {
  return db("projects");
}

function insertProject(project) {
  return db("projects").insert(project);
}

module.exports = { getAllProjects, insertProject };
