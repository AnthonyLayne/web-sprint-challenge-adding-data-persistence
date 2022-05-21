// build your `Project` model here
const db = require("../../data/dbConfig");

function getAllResources() {
  return db("resources");
}

function insertResource(resource) {
  return db("resources").insert(resource);
}

module.exports = { getAllResources, insertResource };
