// build your `Task` model here
const db = require("../../data/dbConfig");

// - [ ] `[GET] /api/tasks`
//   - Even though `task_completed` is stored as an integer, the API uses booleans when interacting with the client
//   - Each task must include `project_name` and `project_description`
//   - Example of response body: `[{"task_id":1,"task_description":"baz","task_notes":null,"task_completed":false,"project_name:"bar","project_description":null}]`
function getAllTasks() {
  return db("tasks as t")
    .leftJoin("projects as p", "p.project_id", "t.project_id")
    .select(
      "task_id",
      "task_description",
      "task_notes",
      "task_completed",
      "project_name",
      "project_description"
    );
}

function getTask(id) {
  return db("tasks").where("task_id", id).first();
}

function insertTask(project) {
  return db("tasks").insert(project);
}

module.exports = { getAllTasks, getTask, insertTask };
