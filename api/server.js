const express = require("express");

const projectRouter = require("./project/router");
const resourceRouter = require("./resource/router");
const taskRouter = require("./task/router");

const server = express();

server.use(express.json());

server.use("/api/resources", resourceRouter);
server.use("/api/projects", projectRouter);
server.use("/api/tasks", taskRouter);

server.use("*", (req, res) => {
  res.status(404).json({
    message: "not found",
  });
});

module.exports = server;
