// build your `/api/projects` router here
const router = require("express").Router();
const PROJECT = require("./model");
const { validateKeys } = require("../utils");

const REQUIRED_KEYS = ["project_name"];

const API_DB_MAP = {
  true: 1,
  false: 0,
  1: true,
  0: false,
};

const formatProject = (project) => ({
  ...project,
  project_completed:
    API_DB_MAP[project.project_completed === undefined ? false : project.project_completed],
});

router.get("/", async (req, res, next) => {
  try {
    const projects = await PROJECT.getAllProjects();
    return res.json(projects.map(formatProject));
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  if (validateKeys(REQUIRED_KEYS, req.body)) {
    try {
      const project = await PROJECT.insertProject(formatProject(req.body)) //
        .then(([id]) => PROJECT.getProject(id));

      return res.json(formatProject(project));
    } catch (err) {
      return next(err);
    }
  }

  return res
    .status(400)
    .json({ message: `Missing one or more of the required keys: ${REQUIRED_KEYS.join(", ")}` });
});

module.exports = router;
