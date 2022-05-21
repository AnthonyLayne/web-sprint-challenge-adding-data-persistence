// build your `/api/resources` router here
const router = require("express").Router();
const RESOURCES = require("./model");
const { validateKeys } = require("../utils");

router.get("/", async (req, res, next) => {
  try {
    const resources = await RESOURCES.getAllResources();
    res.json(resources.map(formatResource));
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  if (validateKeys(["resource_name", "resource_description"], req.body)) {
    try {
      const [insertionId] = await RESOURCES.insertResource(req.body);
      res.json({ id: insertionId });
    } catch (err) {
      next(err);
    }
  } else {
    return res.status(400);
  }
});

module.exports = router;
