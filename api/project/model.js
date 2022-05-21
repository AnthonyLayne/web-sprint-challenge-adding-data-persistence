// build your `Project` model here
const db = require("../../data/dbConfig");

function getAllProjects() {
  return db("projects");
}

function getProject(id) {
  return db("projects").where("project_id", id).first();
}

function insertProject(project) {
  return db("projects").insert(project);
}

module.exports = { getAllProjects, getProject, insertProject };
