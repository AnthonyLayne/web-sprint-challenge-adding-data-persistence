// build your `/api/tasks` router here
const router = require("express").Router();
const TASKS = require("./model");
const { validateKeys } = require("../utils");

// `[POST] /api/tasks`
// - Example of response body: `{ "task_id":1,"task_name":"foo","task_description":null }`
router.get("/", async (req, res, next) => {
  try {
    const tasks = await TASKS.getAllTasks();
    res.json(tasks.map(formatTask));
  } catch (err) {
    next(err);
  }
});

// `[GET] /api/tasks`
// - Example of post body: `[{ "task_name":"foo","task_description":null  }]`
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
