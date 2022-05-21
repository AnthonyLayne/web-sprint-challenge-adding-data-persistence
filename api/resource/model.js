// build your `Project` model here
const db = require("../../data/dbConfig");

function getAllResources() {
  return db("resources");
}

function getResource(id) {
  return db("resources").where("resource_id", id).first();
}

function insertResource(resource) {
  return db("resources").insert(resource);
}

module.exports = { getAllResources, getResource, insertResource };
