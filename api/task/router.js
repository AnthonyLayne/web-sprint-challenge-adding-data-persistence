// build your `/api/tasks` router here
const router = require("express").Router();
const TASKS = require("./model");
const { validateKeys } = require("../utils");

const formatTask = (project) => ({
  ...project,
  task_completed: Boolean(project.task_completed),
});

router.get("/", async (req, res, next) => {
  try {
    const tasks = await TASKS.getAllTasks();
    res.json(tasks.map(formatTask));
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  if (validateKeys(["task_name", "task_description"], req.body)) {
    try {
      const [insertionId] = await TASKS.insertTask(req.body);
      res.json({ id: insertionId });
    } catch (err) {
      next(err);
    }
  } else {
    return res.status(400);
  }
});

module.exports = router;
