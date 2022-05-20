// build your server here and require it from index.js
const express = require("express");
// const projectRouter = require("./project/router");
// const resourceRouter = require("./resource/router");
// const taskRouter = require("./task/router");
const server = express();
server.use(express.json());
// server.use("/api/project", projectRouter);
// server.use("/api/resource", resourceRouter);
// server.use("/api/task", taskRouter);

server.get("/", (req, res) => {
  res.status(200).json({ message: "hey" });
});
server.use("*", (req, res) => {
  res.status(404).json({
    message: "not found",
  });
});

module.exports = server;
