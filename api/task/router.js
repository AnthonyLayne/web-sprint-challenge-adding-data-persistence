// build your `/api/tasks` router here
const router = require("express").Router();
const TASK = require("./model");
const { validateKeys } = require("../utils");

const REQUIRED_KEYS = ["task_description"];

const API_DB_MAP = {
  true: 1,
  false: 0,
  1: true,
  0: false,
};

const formatTask = (task) => ({
  ...task,
  task_completed: API_DB_MAP[task.task_completed === undefined ? false : task.task_completed],
});

router.get("/", async (req, res, next) => {
  try {
    const tasks = await TASK.getAllTasks();
    return res.json(tasks.map(formatTask));
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  if (validateKeys(REQUIRED_KEYS, req.body)) {
    try {
      const task = await TASK.insertTask(formatTask(req.body)) //
        .then(([id]) => TASK.getTask(id));

      return res.json(formatTask(task));
    } catch (err) {
      return next(err);
    }
  }

  return res
    .status(400)
    .json({ message: `Missing one or more of the required keys: ${REQUIRED_KEYS.join(", ")}` });
});

module.exports = router;
