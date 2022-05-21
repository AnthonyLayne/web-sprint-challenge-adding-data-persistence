// build your `/api/projects` router here
const router = require("express").Router();
const PROJECT = require("./model");
const { validateKeys } = require("../utils");

const formatProject = (project) => ({
  ...project,
  project_completed: Boolean(project.project_completed),
});

router.get("/", async (req, res, next) => {
  try {
    const projects = await PROJECT.getAllProjects();
    res.json(projects.map(formatProject));
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  if (validateKeys(["project_name", "project_description", "project_completed"], req.body)) {
    try {
      const [insertionId] = await PROJECT.insertProject(req.body);
      res.json({ id: insertionId });
    } catch (err) {
      next(err);
    }
  } else {
    return res.status(400);
  }
});

module.exports = router;
