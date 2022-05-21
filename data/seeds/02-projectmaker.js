const projects = [
  {
    project_id: 1,
    project_name: "Study",
    project_description: "Study backend coding",
    project_completed: false,
  },
];

const resources = [
  {
    resource_id: 1,
    resource_name: "JavaScript: the definitive guide",
    resource_description: "Learn and master JS",
  },
];

const tasks = [
  {
    task_id: 1,
    task_description: "Read JS book",
    task_notes: "take frequent breaks",
    task_completed: false,
    project_id: 1,
  },
];

const project_resources = [
  {
    project_id: 1,
    resource_id: 1,
  },
];

exports.seed = async function (knex) {
  await knex("projects").insert(projects);
  await knex("resources").insert(resources);
  await knex("tasks").insert(tasks);
  await knex("project_resources").insert(project_resources);
};
