// build your `/api/resources` router here
const router = require("express").Router();
const RESOURCE = require("./model");
const { validateKeys } = require("../utils");

const REQUIRED_KEYS = ["resource_name"];

router.get("/", async (req, res, next) => {
  try {
    const resources = await RESOURCE.getAllResources();
    return res.json(resources);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  if (validateKeys(REQUIRED_KEYS, req.body)) {
    try {
      const resource = await RESOURCE.insertResource(req.body) //
        .then(([id]) => RESOURCE.getResource(id));

      return res.json(resource);
    } catch (err) {
      return next(err);
    }
  }

  return res
    .status(400)
    .json({ message: `Missing one or more of the required keys: ${REQUIRED_KEYS.join(", ")}` });
});

module.exports = router;
